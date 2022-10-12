import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  generateMapDataWithKeyFieldPair,
  generateMapArrayDataWithKeyPair,
  checkObjectIsEmpty,
  removeDuplicateItemsFromArray,
  checkItemInArray,
} from '../common/helpers/util.helper';
import { RpcExc } from '../common/exceptions/custom.exception';
import {
  OrderStatusConst,
  GroupSellableProductsStatus,
  GroupSellableProductsResult,
} from '../common/constants/order.constant';
import {
  OrderShippingStatusConst,
  OrderShippingStatusFilterConst,
} from '../common/constants/order-shipping.constant';
import {
  calculateProductWeight,
  processProductTranslateData,
} from '../common/helpers/product.helper';
import { convertOrderShippingStatusToOrderShippingStatusFilter } from '../common/helpers/order.helper';
import { FindAllTypesDto } from './dto/find-all-types.dto';
import { GetCustomerOrderShippingDto } from './dto/get-customer-order-shipping.dto';
import { IpnUpdateShippingDto } from './dto/ipn-update-shipping.dto';
import {
  ActionShipping,
  ResultShippingStatus,
  ResultShippingError,
  CalculateShippingPriceResult,
  CalculateShippingPriceResultInterface,
  CreateShippingResult,
  CreateShippingResultInterface,
  OrderShippingDriverInterface,
  OrderShippingTypeConst,
  OrderShippingDriverConst,
  OrderShippingDriverTypeConst,
  OrderShippingDeliveryOptionsConst,
  IpnDataParseResult,
  IpnDataParseResultInterface,
  DataIpnUpdateShipping,
  InformationProductShip,
  InformationProductWeight,
  ConvertLogToStatusResultInterface,
} from './driver/base.driver';
import { GhtkDriver } from './driver/ghtk.driver';
import { InventoryRepository } from '../inventory/repository/inventory.repository';
import { CityRepository } from '../city/repository/city.repository';
import { City } from '../city/schema/city.schema';
import { DistrictRepository } from '../district/repository/district.repository';
import { District } from '../district/schema/district.schema';
import { WardRepository } from '../ward/repository/ward.repository';
import { Ward } from '../ward/schema/ward.schema';
import { ProductRepository } from '../product/repository/product.repository';
import { Product } from '../product/schema/product.schema';
import { OrderRepository } from '../order/repository/order.repository';
import { OrderShippingRepository } from './repository/order-shipping.repository';
import { OrderShippingDetailRepository } from './repository/order-shipping-detail.repository';
import { OrderShippingHistoryRepository } from './repository/order-shipping-history.repository';
import { OrderService } from '../order/order.service';

@Injectable()
export class OrderShippingService {
  constructor(
    private i18n: I18nService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private ghtkDriver: GhtkDriver,
    private inventoryRepository: InventoryRepository,
    private cityRepository: CityRepository,
    private districtRepository: DistrictRepository,
    private wardRepository: WardRepository,
    private productRepository: ProductRepository,
    private orderShippingRepository: OrderShippingRepository,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
  ) {}

  async getListShippingTypes(reqData: FindAllTypesDto) {
    const fail = await this.i18n.t(
      'order-shipping.validate.calculate_price_fail',
    );
    const rsValidateOrder =
      await this.orderService.validateProductsOrderAndReturnList(
        {
          products: reqData.products,
        },
        {
          countryId: reqData.countryId,
          cityId: reqData.cityId,
          districtId: reqData.districtId,
          wardId: reqData.wardId,
        },
      );
    // Validate products in order fail
    const errMsg = rsValidateOrder['error_messages'];
    if (
      !checkObjectIsEmpty(errMsg['products']) ||
      !checkObjectIsEmpty(errMsg['combos'])
    ) {
      throw new RpcExc(`bad_request:${fail}`);
    }
    const groupSellableProducts: GroupSellableProductsResult =
      await this.orderService.groupSellableProductsFollowInventoryAndShippingAddress(
        rsValidateOrder.list.groups_assigned_inventory,
        {
          address: reqData.address,
          country: reqData.countryId,
          city: reqData.cityId,
          district: reqData.districtId,
          ward: reqData.wardId,
        },
        rsValidateOrder.list.products,
        rsValidateOrder.list.product_combos,
      );
    if (GroupSellableProductsStatus.FAIL == groupSellableProducts.status) {
      throw new RpcExc(`bad_request:${fail}`);
    }
    const deliveryOptions: any[] = [OrderShippingDeliveryOptionsConst.GHTC];
    // TODO: GHTK disable GHN temporary, we will use env config to enable / disable it.
    const disabledGHN = this.configService.get<boolean>(
      'shipping.ghn_disabled',
    );
    if (!disabledGHN) {
      deliveryOptions.push(OrderShippingDeliveryOptionsConst.GHN);
    }
    const results: any[] = [];
    const inventoriesWithProduct: any = groupSellableProducts.inventories;
    const mapCities = generateMapDataWithKeyFieldPair(
      'id',
      'name',
      groupSellableProducts.cities,
    );
    const mapDistricts = generateMapDataWithKeyFieldPair(
      'id',
      'name',
      groupSellableProducts.districts,
    );
    const mapProducts = generateMapDataWithKeyFieldPair(
      'id',
      '',
      groupSellableProducts.products,
    );
    if (
      !mapCities.hasOwnProperty(reqData.cityId) ||
      !mapDistricts.hasOwnProperty(reqData.districtId)
    ) {
      throw new RpcExc(`bad_request:${fail}`);
    }
    const province = mapCities[reqData.cityId];
    const district = mapDistricts[reqData.districtId];
    const promisesCalculateShippingPrice: any[] = [];
    let stopProcessBecauseInvalidInventory = false;
    let canShip = true;
    try {
      const inventoryIds = Object.keys(inventoriesWithProduct);
      for (const inventoryId of inventoryIds) {
        if (inventoriesWithProduct.hasOwnProperty(inventoryId)) {
          const inventoryWithProduct = inventoriesWithProduct[inventoryId];
          const { cityId, districtId, products } = inventoryWithProduct;
          if (
            mapCities.hasOwnProperty(cityId) &&
            mapDistricts.hasOwnProperty(districtId)
          ) {
            const pick_province = mapCities[cityId];
            const pick_district = mapDistricts[districtId];
            let totalWeight = 0;
            const inforProductsShip: InformationProductShip[] = [];
            if (!checkObjectIsEmpty(products)) {
              const productIds = Object.keys(products);
              for (const productId of productIds) {
                const product = mapProducts[productId];
                let weight = 0;
                let number = 0;
                products[productId].forEach((element) => {
                  number += element.number;
                  weight = element.weight;
                });
                const height = parseFloat(product['height']);
                const length = parseFloat(product['length']);
                const width = parseFloat(product['width']);
                const total = number;
                // Check condition can ship with weight is Gram
                const inforProductWeight: InformationProductWeight = {
                  height: height,
                  length: length,
                  weight: weight,
                  width: width,
                };
                const productWeight =
                  calculateProductWeight(inforProductWeight);
                const inforProductShip: InformationProductShip = {
                  ...inforProductWeight,
                  total: total,
                  weight: productWeight,
                };
                inforProductsShip.push(inforProductShip);
                // GHTK calculate shipping price with weight is Gram
                totalWeight += total * productWeight;
              }
              // TODO: process check can ship with each driver: GHTK and LTP
              const rsCheckCanShip = await this.checkCanShip(inforProductsShip);
              if (rsCheckCanShip == ResultShippingStatus.FAIL) {
                canShip = false;
                break;
              }
              // TODO: process add data calculate shipping price with each driver: GHTK and LTP
              deliveryOptions.forEach((deliver) => {
                const data = {
                  pick_province,
                  pick_district,
                  province,
                  district,
                  deliver_option: deliver,
                  weight: totalWeight,
                };
                promisesCalculateShippingPrice.push(
                  this.calculateShippingPrice(data),
                );
              });
            }
          } else {
            stopProcessBecauseInvalidInventory = true;
            break;
          }
        }
      }
      if (stopProcessBecauseInvalidInventory) {
        throw new RpcExc(`bad_request:${fail}`);
      }
      // TODO: process calculate shipping price with each driver: GHTK and LTP
      let rsCanculateShipPrice: any[] = [];
      if (canShip) {
        rsCanculateShipPrice = await Promise.all(
          promisesCalculateShippingPrice,
        );
      }
      Object.values(OrderShippingDriverConst).forEach(async (id: any) => {
        if (isNaN(id)) {
          return;
        }
        const [name] = await Promise.all([
          this.i18n.t(`order-shipping.drivers.${id}.name`),
        ]);
        const result: any = {
          id,
          name,
          types: [],
        };
        // TODO: process extract data calculate shipping price with driver LTP
        if (OrderShippingDriverConst.LTP == id) {
          const [name, description] = await Promise.all([
            this.i18n.t(
              `order-shipping.drivers.${id}.types.${OrderShippingTypeConst.GHTC}.name`,
            ),
            this.i18n.t(
              `order-shipping.drivers.${id}.types.${OrderShippingTypeConst.GHTC}.description`,
            ),
          ]);
          const price = -1;
          const disabled = false;
          const detail: any[] = [];
          // TODO: split shipping price by inventory with driver LTP, same on driver GHTK
          for (const inventoryId of inventoryIds) {
            if (inventoriesWithProduct.hasOwnProperty(inventoryId)) {
              const inventoryWithProduct = inventoriesWithProduct[inventoryId];
              delete inventoryWithProduct.products;
              detail.push({
                ...inventoryWithProduct,
                shipping_price: -1,
              });
            }
          }
          result.types.push({
            id: OrderShippingTypeConst.GHTC,
            name,
            description,
            price,
            disabled,
            detail,
          });
        } else {
          const types = OrderShippingDriverTypeConst[id];
          if (types && types.length) {
            types.forEach(async (type) => {
              if (isNaN(id)) {
                return;
              }
              // TODO: GHTK disable GHN temporary, we will use env config to enable / disable it.
              if (OrderShippingTypeConst.GHN == type && disabledGHN) {
                return;
              }

              const [name, description] = await Promise.all([
                this.i18n.t(`order-shipping.drivers.${id}.types.${type}.name`),
                this.i18n.t(
                  `order-shipping.drivers.${id}.types.${type}.description`,
                ),
              ]);
              let price = 0;
              let disabled = true;
              const detail: any[] = [];
              if (canShip) {
                let begin = -1;
                switch (type) {
                  case OrderShippingTypeConst.GHTC:
                    begin = 0;
                    break;
                  case OrderShippingTypeConst.GHN:
                    begin = 1;
                    break;
                }
                if (-1 == begin) {
                  throw new RpcExc(`bad_request:${fail}`);
                }
                for (
                  let index = begin, indexInventory = begin;
                  index < rsCanculateShipPrice.length;
                  index = index + 2, indexInventory++
                ) {
                  const rsGet = rsCanculateShipPrice[index];
                  if (!rsGet || rsGet.status == ResultShippingStatus.FAIL) {
                    throw new RpcExc(`bad_request:${fail}`);
                  }
                  price += rsGet.result.total;
                  const inventoryWithProduct =
                    inventoriesWithProduct[
                      inventoryIds[index - indexInventory]
                    ];
                  delete inventoryWithProduct.products;
                  detail.push({
                    ...inventoryWithProduct,
                    shipping_price: rsGet.result.total,
                  });
                }
                disabled = false;
              }
              result.types.push({
                id: type,
                name,
                description,
                price,
                disabled,
                detail,
              });
            });
          }
        }
        results.push(result);
      });

      return results;
    } catch (err) {
      throw new RpcExc(`bad_request:${fail}`);
    }
  }

  async checkCanShip(
    data: InformationProductShip[],
  ): Promise<ResultShippingStatus> {
    const driver = this.configService.get<string>('shipping.driver');
    switch (driver) {
      case 'ghtk':
        return await this.ghtkDriver.checkCanShip(data);
    }
    return ResultShippingStatus.FAIL;
  }

  async calculateShippingPrice(data: any) {
    const driver = this.configService.get<string>('shipping.driver');
    switch (driver) {
      case 'ghtk':
        return await this.ghtkDriver.calculateShippingPrice(data);
    }
    return null;
  }

  async createOrderShipping(data: any) {
    const driver = this.configService.get<string>('shipping.driver');
    switch (driver) {
      case 'ghtk':
        return await this.ghtkDriver.createShipping(data);
    }
    return null;
  }

  async cancelOrderShipping(data: any) {
    const driver = this.configService.get<string>('shipping.driver');
    switch (driver) {
      case 'ghtk':
        return await this.ghtkDriver.cancelShipping(data);
    }
    return null;
  }

  async getCustomerOrderShipping(reqData: GetCustomerOrderShippingDto) {
    const [result, notFoundMsg] = await Promise.all([
      this.orderShippingRepository
        .createQueryBuilder('order_shipping')
        .innerJoinAndSelect(
          'order_shipping.order',
          'order_shipping_order',
          'order_shipping_order.customerId = :customerId AND order_shipping_order.id = :orderId',
          {
            customerId: reqData.customer,
            orderId: reqData.order_id,
          },
        )
        .innerJoinAndSelect(
          'order_shipping.histories',
          'order_shipping_histories',
        )
        .innerJoinAndSelect('order_shipping.detail', 'order_shipping_detail')
        .innerJoinAndSelect(
          'order_shipping_detail.order_detail',
          'order_shipping_detail_order_detail',
        )
        .innerJoinAndSelect(
          'order_shipping_detail_order_detail.product',
          'order_shipping_detail_order_detail_product',
        )
        .leftJoinAndSelect(
          'order_shipping_detail_order_detail_product.images',
          'order_shipping_detail_order_detail_product_images',
          'is_thumbnail = :is_thumbnail',
          {
            is_thumbnail: 1,
          },
        )
        .leftJoinAndSelect(
          'order_shipping_detail_order_detail_product.translates',
          'order_shipping_detail_order_detail_product_translates',
          'language_code= :lang',
          {
            lang: reqData.lang,
          },
        )
        .where('order_shipping.id = :id', {
          id: reqData.id,
        })
        .orderBy('order_shipping_histories.created_at', 'DESC')
        .getOne(),
      this.i18n.t('order.validate.not_found'),
    ]);
    if (!result) {
      throw new RpcExc(`not_found:${notFoundMsg}`);
    }
    // Can not tracking with LTP driver
    if (OrderShippingDriverConst.LTP == result.driver) {
      throw new RpcExc(`not_found:${notFoundMsg}`);
    }
    // Can not tracking when order shipping cancelled
    if (
      OrderShippingStatusFilterConst.CANCELLED ==
      convertOrderShippingStatusToOrderShippingStatusFilter(result.status)
    ) {
      throw new RpcExc(`not_found:${notFoundMsg}`);
    }
    result['products'] = result.detail.map((item) => {
      const processedTranslate = processProductTranslateData(
        item.order_detail.product.translates,
      );
      delete item.order_detail.product.translates;
      return {
        ...item.order_detail.product,
        ...processedTranslate[reqData.lang],
      };
    });
    result['tracking'] = [];
    for (const history of result.histories) {
      let convertLogToStatusResult: ConvertLogToStatusResultInterface = null;
      if (OrderShippingDriverConst.GHTK == result.driver) {
        convertLogToStatusResult = await this.ghtkDriver.convertLogToStatus(
          history.log,
        );
      }
      if (ResultShippingStatus.OK == convertLogToStatusResult.status) {
        result['tracking'].push({
          status: convertLogToStatusResult.result,
          created_at: history.created_at,
        });
      }
    }
    const orderShippingStatusIdsTracking = [
      OrderShippingStatusFilterConst.CONFIRMED,
      OrderShippingStatusFilterConst.RECEIVING,
      OrderShippingStatusFilterConst.DELIVERING,
      OrderShippingStatusFilterConst.DELIVERED_FULL,
    ];
    const promisesGetShippingStatusLabel: any[] = [];
    orderShippingStatusIdsTracking.forEach((statusId) => {
      promisesGetShippingStatusLabel.push(
        this.i18n.t(`order-shipping.filter_status.${statusId}`),
      );
    });
    const orderShippingStatusLabelsTracking = await Promise.all(
      promisesGetShippingStatusLabel,
    );
    result['shipping_statuses'] = {};
    for (
      let index = 0;
      index < orderShippingStatusIdsTracking.length;
      index++
    ) {
      const statusId = orderShippingStatusIdsTracking[index];
      const statusLabel = orderShippingStatusLabelsTracking[index];
      result['shipping_statuses'][statusId] = statusLabel;
    }

    return result;
  }

  async ipnUpdateShipping(data: IpnUpdateShippingDto) {
    const driver = this.configService.get<string>('shipping.driver');
    let rs: IpnDataParseResultInterface;
    switch (driver) {
      case 'ghtk':
        rs = await this.ghtkDriver.ipnUpdateShipping(data);
    }
    // TODO: logging response of IPN when fail
    if (rs.status == ResultShippingStatus.FAIL) {
      return rs;
      //throw new RpcExc(`bad_request:fail`);
    }
    const orderShipping = await this.orderShippingRepository
      .createQueryBuilder('order_shipping')
      .innerJoinAndSelect('order_shipping.detail', 'order_shipping_detail')
      .innerJoinAndSelect('order_shipping.order', 'order_shipping_order')
      .where('order_shipping.shipping_code_request= :shipping_code_request', {
        shipping_code_request: rs.result.shipping_code_request,
      })
      .andWhere(
        'order_shipping.shipping_code_response= :shipping_code_response',
        {
          shipping_code_response: rs.result.shipping_code_response,
        },
      )
      .getOne();
    // TODO: logging response of IPN when fail
    if (!orderShipping) {
      return rs;
      //throw new RpcExc(`bad_request:fail`);
    }
    // TODO: process when order shipping is not done all
    // TODO: return_part_package - Nếu bằng 1 là đơn giao hàng một phần
    // TODO: check current order shipping status with new status
    // Cancelling order shipping
    if (OrderShippingStatusConst.CANCELLED == rs.result.status) {
      // Can not cancel when current status of order shipping is cancelled
      if (OrderShippingStatusConst.CANCELLED == orderShipping.status) {
        throw new RpcExc(`bad_request:fail`);
      }
    }
    const dataUpdateOrderShipping = {
      id: orderShipping.id,
      status: rs.result.status,
    };
    const dataUpdateOrderShippingDetail: any[] = [];
    orderShipping.detail.forEach((element) => {
      dataUpdateOrderShippingDetail.push({
        id: element.id,
        status: rs.result.status,
      });
    });
    const dataCreateOrderShippingHistory = {
      order_shipping_id: orderShipping.id,
      log: JSON.stringify({
        action: ActionShipping.IPN_UPDATE,
        ...rs,
      }),
    };

    const rsUpdate = await this.orderShippingRepository.manager.transaction(
      async (entityManager) => {
        const orderRepo = entityManager.getCustomRepository(OrderRepository);
        const orderShippingRepo = entityManager.getCustomRepository(
          OrderShippingRepository,
        );
        const orderShippingDetailRepo = entityManager.getCustomRepository(
          OrderShippingDetailRepository,
        );
        const orderShippingHistoryRepo = entityManager.getCustomRepository(
          OrderShippingHistoryRepository,
        );
        const { id, status } = orderShipping.order;
        if (
          OrderStatusConst.PENDING_PAYMENT == status ||
          OrderStatusConst.CANCELLED == status ||
          OrderStatusConst.FAILED == status ||
          OrderStatusConst.REFUNDED == status
        ) {
          throw new RpcExc(`bad_request:fail`);
        }

        const promisesUpdate: any[] = [
          orderShippingRepo.save(dataUpdateOrderShipping, {
            transaction: false,
          }),
          orderShippingDetailRepo.save(dataUpdateOrderShippingDetail, {
            transaction: false,
          }),
          orderShippingHistoryRepo.save(dataCreateOrderShippingHistory, {
            transaction: false,
          }),
        ];
        // TODO: map order shipping status with order status
        // TODO: check current order status with new status
        /*
        let newOrderStatus = 0;
        const allOrderShippings = await orderShippingRepo.find({
          where: {
            orderId: id,
          },
        });
        let countDelivering = 0;
        let countDelivered = 0;
        const countOrderShippingDetail = allOrderShippings.length;
        allOrderShippings.forEach((element) => {
          switch (element.status) {
            case OrderShippingStatusConst.DELIVERING:
              countDelivering++;
              break;
            case OrderShippingStatusConst.DELIVERED:
              countDelivered++;
              break;
          }
        });
        if (0 < countDelivering) {
          newOrderStatus = OrderStatusConst.DELIVERING;
        }
        if (countOrderShippingDetail == countDelivered) {
          newOrderStatus = OrderStatusConst.DELIVERED;
        }
        if (0 != newOrderStatus) {
          promisesUpdate.push(
            orderRepo.save(
              {
                id: id,
                status: newOrderStatus,
              },
              {
                transaction: false,
              },
            ),
          );
        }
        */
        await Promise.all(promisesUpdate);
        return true;
      },
    );

    return 'ok';
  }

  checkShippingTypeValidOnDriver(driver: number, type: number): boolean {
    let rs = false;
    if (!driver || !type) {
      return rs;
    }
    const validDrivers = Object.values(OrderShippingDriverConst);
    const validShippingTypes = Object.values(OrderShippingTypeConst);
    // TODO: GHTK disable GHN temporary, we will use env config to enable / disable it.
    const disabledGHN = this.configService.get<boolean>(
      'shipping.ghn_disabled',
    );
    if (
      !checkItemInArray(validDrivers, driver) ||
      !checkItemInArray(validShippingTypes, type)
    ) {
      return rs;
    }
    switch (driver) {
      case OrderShippingDriverConst.GHTK:
        rs = OrderShippingTypeConst.GHN != type || !disabledGHN;
        break;
      case OrderShippingDriverConst.LTP:
        rs = OrderShippingTypeConst.GHTC == type;
        break;
    }

    return rs;
  }
}

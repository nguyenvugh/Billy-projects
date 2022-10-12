import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Not, In, Brackets } from 'typeorm';
import {
  OrderStatusConst,
  GroupSellableProductsStatus,
  GroupSellableProductsResult,
  ShippingAddress,
  CheckRealtimeDataProductsInOrderResult,
} from '../common/constants/order.constant';
import { OrderPaymentTypeConst } from '../common/constants/order-payment.constant';
import {
  SliderStatusConst,
  SliderTypeConst,
} from '../common/constants/slider.constant';
import { BooleanValue } from '../common/constants/global.constant';
import {
  CouponErrorCodes,
  CouponSearchStatusConst,
  CouponStatusConst,
  CouponTypeConst,
} from '../common/constants/coupon.constant';
import {
  OrderShippingStatusFilterConst,
  OrderShippingStatusConst,
} from 'src/common/constants/order-shipping.constant';
import { ProductStatusDisplayConst } from '../common/constants/product.constant';
import { FlashSaleStatusConst } from '../common/constants/flash-sale.constant';
import { RpcExc } from '../common/exceptions/custom.exception';
import {
  generateMapDataWithKeyFieldPair,
  generateMapArrayDataWithKeyPair,
  generateUniqueString,
  checkObjectIsEmpty,
  checkItemInArray,
} from '../common/helpers/util.helper';
import {
  calculateOrderCouponPriceOfOrder,
  calculateProductCouponPriceOfProduct,
  checkCouponCanUse,
  CheckCouponCanUseResultInterface,
} from '../common/helpers/coupon.helper';
import { parseOffsetAndLimit } from '../common/helpers/paginate.helper';
import {
  combineMultiOrderShippingStatusesToOneOrderShippingStatusFilter,
  convertOrderShippingStatusToOrderShippingStatusFilter,
  groupProductsOrderToProductsAndProductCombos,
  validateProductsAndProductCombosOrder,
  checkAndAssignInventoryToProductsAndProductCombosOrder,
  GroupProductsAndProductCombosOrderInterface,
} from '../common/helpers/order.helper';
import { calculateOnlinePaymentTax } from '../common/helpers/order-payment.helper';
import {
  processProductTranslateData,
  calculateProductWeight,
} from '../common/helpers/product.helper';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FindAllOrdersDto } from './dto/find-all-orders.dto';
import { FindOneOrderDto } from './dto/find-one-order.dto';
import { CancelOneOrderDto } from './dto/cancel-one-order.dto';
import { ValidateProductsOrderDto } from './dto/validate-products-order.dto';
import { OrderProductDto } from './dto/order-product.dto';
import { OrderShippingOnlyAddressDto } from './dto/order-shipping-only-address.dto';
import { CouponDetailInOrderDto } from './dto/coupon-detail-in-order.dto';
import { ProductComboDetailInOrderDto } from './dto/product-combo-detail-in-order.dto';
import { ProductComboProductDetailInOrderDto } from './dto/product-combo-product-detail-in-order.dto';
import { CityRepository } from '../city/repository/city.repository';
import { DistrictRepository } from '../district/repository/district.repository';
import { WardRepository } from '../ward/repository/ward.repository';
import { OrderRepository } from './repository/order.repository';
import { Order } from './schema/order.schema';
import { OrderPaymentRepository } from '../order-payment/repository/order-payment.repository';
import { OrderHistoryRepository } from '../order-history/repository/order-history.repository';
import { OrderShippingRepository } from '../order-shipping/repository/order-shipping.repository';
import { OrderShippingHistoryRepository } from '../order-shipping/repository/order-shipping-history.repository';
import { OrderShippingDetailRepository } from '../order-shipping/repository/order-shipping-detail.repository';
import { InventoryRepository } from '../inventory/repository/inventory.repository';
import { Inventory } from '../inventory/schema/inventory.schema';
import { InventoryProductRepository } from '../inventory-product/repository/inventory.repository';
import { FlashSaleProductRepository } from '../flash-sale/repository/flash-sale-product.repository';
import { ProductComboRepository } from '../product-combo/repository/product-combo.repository';
import { ProductCombo } from '../product-combo/schema/product-combo.schema';
import { ProductComboDetail } from '../product-combo/schema/product-combo-detail.schema';
import { ProductRepository } from '../product/repository/product.repository';
import { Product } from '../product/schema/product.schema';
import { CharityRepository } from '../charity/repository/charity.repository';
import { CharityProductRepository } from '../charity/repository/charity-product.repository';
import { CouponRepository } from '../coupon/repositories/coupon.repository';
import { Coupon } from '../coupon/schemas/coupon.schema';
import { CouponRequirement } from '../coupon/schemas/coupon-requirement.schema';
import { MapInventoryCityToCustomerCityRepository } from '../city/repository/map_inventory_city_to_customer_city.repository';
import { FlashSaleRepository } from '../flash-sale/repository/flash-sale.repository';
import { FlashSale } from '../flash-sale/schema/flash-sale.schema';
import { FlashSaleProduct } from '../flash-sale/schema/flash-sale-product.schema';
import { Slider } from '../promotion/schema/slider.schema';
import { OrderPaymentService } from '../order-payment/order-payment.service';
import { FlashSaleService } from '../flash-sale/flash-sale.service';
import { PromotionService } from '../promotion/promotion.service';
import { CharityService } from '../charity/charity.service';
import { CouponService } from '../coupon/coupon.service';
import {
  RequestPaymentLinkStatus,
  RequestPaymentLinkResultInterface,
  ActionPayment,
} from '../order-payment/driver/base.driver';
import {
  ActionShipping,
  ResultShippingStatus,
  OrderShippingTypeConst,
  OrderShippingDriverConst,
  OrderShippingDeliveryOptionsConst,
  OrderShippingFreeshipOptionsConst,
  DataCreateShipping,
  ProductShippingCreateOrder,
  OrderInfoCreateOrder,
  CreateShippingResult,
  CreateShippingResultInterface,
  InformationProductShip,
  InformationProductWeight,
  CancelShippingResultInterface,
} from '../order-shipping/driver/base.driver';
import { OrderShippingService } from '../order-shipping/order-shipping.service';

@Injectable()
export class OrderService {
  constructor(
    private cityRepository: CityRepository,
    private districtRepository: DistrictRepository,
    private wardRepository: WardRepository,
    private orderRepository: OrderRepository,
    private orderShippingRepo: OrderShippingRepository,
    private orderShippingHistoryRepo: OrderShippingHistoryRepository,
    private productRepo: ProductRepository,
    private productComboRepo: ProductComboRepository,
    private inventoryRepo: InventoryRepository,
    private mapInventoryCityToCustomerCityRepo: MapInventoryCityToCustomerCityRepository,
    private flashSaleRepo: FlashSaleRepository,
    @Inject(forwardRef(() => OrderPaymentService))
    private orderPaymentService: OrderPaymentService,
    private orderShippingService: OrderShippingService,
    private flashSaleService: FlashSaleService,
    private promotionService: PromotionService,
    private charityService: CharityService,
    private couponService: CouponService,
    private i18n: I18nService,
  ) {}

  async createOne(createOrderDto: CreateOrderDto) {
    const dataValidateProductsOrder: ValidateProductsOrderDto = {
      products: createOrderDto.products,
    };
    const orderShippingOnlyAddress: OrderShippingOnlyAddressDto = {
      countryId: createOrderDto.shipping.countryId,
      cityId: createOrderDto.shipping.cityId,
      districtId: createOrderDto.shipping.districtId,
      wardId: createOrderDto.shipping.wardId,
    };
    const [
      currentFlashSale,
      activatingProductPromotions,
      activeCharity,
      rsValidateOrder,
      createFail,
    ] = await Promise.all([
      this.flashSaleService.getCurrentFlashSaleQuery().getOne(),
      this.promotionService
        .getActivatingPromotionQuery()
        .andWhere('slider.type = :type', {
          type: SliderTypeConst.PRODUCT,
        })
        .getMany(),
      this.charityService.getActivatingCharityQuery().getOne(),
      this.validateProductsOrderAndReturnList(
        dataValidateProductsOrder,
        orderShippingOnlyAddress,
      ),
      this.i18n.t('order.validate.create_fail'),
    ]);
    let couponInvalid = '';
    let activeCoupons = [];
    if (createOrderDto.coupon_code) {
      [activeCoupons, couponInvalid] = await Promise.all([
        this.couponService.getActivatingCouponQuery().getMany(),
        this.i18n.t('order.validate.coupon_invalid'),
      ]);
    }
    // Validate products in order fail
    const errMsg = rsValidateOrder['error_messages'];
    let productsOutOfStock = false;
    if (
      !checkObjectIsEmpty(errMsg['products']) ||
      !checkObjectIsEmpty(errMsg['combos'])
    ) {
      //throw new RpcExc(`bad_request:${createFail}`);
      productsOutOfStock = true;
    }
    // Check realtime data products in order
    const rsCheckRealtimeData: CheckRealtimeDataProductsInOrderResult =
      await this.checkRealtimeDataProductsInOrder(
        createOrderDto.products,
        rsValidateOrder.list.products,
        rsValidateOrder.list.product_combos,
        currentFlashSale,
        activatingProductPromotions,
        createOrderDto.customerId,
        createOrderDto.coupon_code,
        createOrderDto.coupon,
        activeCoupons,
      );
    if (BooleanValue.FALSE == rsCheckRealtimeData.status) {
      return rsCheckRealtimeData;
    }
    if (productsOutOfStock) {
      rsCheckRealtimeData.status = BooleanValue.FALSE;
      return rsCheckRealtimeData;
    }
    // Check payment type and shipping driver are valid
    if (
      !this.orderPaymentService.checkPaymentTypeValidOnDriver(
        createOrderDto.shipping.driver,
        createOrderDto.payment.type,
      )
    ) {
      throw new RpcExc(`bad_request:${createFail}`);
    }
    // Check shipping type and shipping driver are valid
    if (
      !this.orderShippingService.checkShippingTypeValidOnDriver(
        createOrderDto.shipping.driver,
        createOrderDto.shipping.type,
      )
    ) {
      throw new RpcExc(`bad_request:${createFail}`);
    }
    // Check online payment type and online payment method are valid
    if (
      OrderPaymentTypeConst.ONLINE == createOrderDto.payment.type &&
      false ==
        this.orderPaymentService.checkOnlinePaymentMethod(
          createOrderDto.payment.online_payment_method,
        )
    ) {
      throw new RpcExc(`bad_request:${createFail}`);
    }
    const groupSellableProducts: GroupSellableProductsResult =
      await this.groupSellableProductsFollowInventoryAndShippingAddress(
        rsValidateOrder.list.groups_assigned_inventory,
        {
          address: createOrderDto.shipping.address,
          country: createOrderDto.shipping.countryId,
          city: createOrderDto.shipping.cityId,
          district: createOrderDto.shipping.districtId,
          ward: createOrderDto.shipping.wardId,
        },
        rsValidateOrder.list.products,
        rsValidateOrder.list.product_combos,
      );
    if (groupSellableProducts.status == GroupSellableProductsStatus.FAIL) {
      // TODO: return detail product remain and product sold out
      throw new RpcExc(`bad_request:${createFail}`);
    }
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
    const mapWards = generateMapDataWithKeyFieldPair(
      'id',
      'name',
      groupSellableProducts.wards,
    );
    if (
      !mapCities.hasOwnProperty(createOrderDto.shipping.cityId) ||
      !mapDistricts.hasOwnProperty(createOrderDto.shipping.districtId) ||
      !mapWards.hasOwnProperty(createOrderDto.shipping.wardId)
    ) {
      throw new RpcExc(`bad_request:${createFail}`);
    }
    const mapProducts = generateMapDataWithKeyFieldPair(
      'id',
      '',
      groupSellableProducts.products,
    );
    // Get coupon data
    let couponCanUse = false;
    let activeCoupon = null;
    let couponId = 0;
    let couponQuantity = 0;
    let couponLimit = 0;
    let couponPrice = 0;
    let mapProductsInCoupon = {};
    if (createOrderDto.coupon_code) {
      const rsCheckCouponCanUse: CheckCouponCanUseResultInterface =
        checkCouponCanUse(
          createOrderDto.coupon_code,
          activeCoupons,
          createOrderDto.payment.type,
          createOrderDto.customerId,
        );
      if (!rsCheckCouponCanUse.canUse) {
        throw new RpcExc(`bad_request:${couponInvalid}`);
      }
      activeCoupon = rsCheckCouponCanUse.coupon;
      const numberUsedCouponOfCustomer = await this.orderRepository.find({
        where: {
          customerId: createOrderDto.customerId,
          coupon_id: activeCoupon.id,
          status: Not(
            In([
              OrderStatusConst.CANCELLED,
              OrderStatusConst.FAILED,
              OrderStatusConst.REFUNDED,
            ]),
          ),
        },
      });
      // Customer can not use coupon
      if (numberUsedCouponOfCustomer && numberUsedCouponOfCustomer.length) {
        if (numberUsedCouponOfCustomer.length >= activeCoupon.limit) {
          throw new RpcExc(`bad_request:${couponInvalid}`);
        }
      }
    }
    if (activeCoupon) {
      couponCanUse = true;
      couponId = activeCoupon.id;
      couponQuantity = activeCoupon.quantity;
      couponLimit = activeCoupon.limit;
      if (CouponTypeConst.PRODUCT_QUANTITY == activeCoupon.type) {
        mapProductsInCoupon = generateMapArrayDataWithKeyPair(
          'product',
          activeCoupon.requirements,
        );
      }
    }
    // Get flash sale data
    let flashSaleId = 0;
    let mapProductInFlashSale: any = {};
    if (
      currentFlashSale &&
      currentFlashSale.products &&
      currentFlashSale.products.length
    ) {
      flashSaleId = currentFlashSale.id;
      mapProductInFlashSale = generateMapDataWithKeyFieldPair(
        'product_id',
        '',
        currentFlashSale.products,
      );
    }
    // Get promotion data
    let mapProductPromotions: any = {};
    if (activatingProductPromotions && activatingProductPromotions.length) {
      mapProductPromotions = generateMapDataWithKeyFieldPair(
        'product',
        '',
        activatingProductPromotions,
      );
    }
    // Get charity data
    let mapCharityProducts: any = {};
    let charityId = 0;
    let charityTotal = 0;
    let charityNewTotal = 0;
    if (
      activeCharity &&
      activeCharity.products &&
      activeCharity.products.length
    ) {
      mapCharityProducts = generateMapDataWithKeyFieldPair(
        'product',
        '',
        activeCharity.products,
      );
      charityId = activeCharity.id;
      charityTotal = Number(activeCharity.total);
      charityNewTotal = charityTotal;
    }
    let errorFromCreateShipping3rd = '';
    // Process create order in transaction
    const orderCreated = await this.orderRepository.manager.transaction(
      async (entityManager) => {
        // Load repositories
        const orderRepo = entityManager.getCustomRepository(OrderRepository);
        const orderPaymentRepo = entityManager.getCustomRepository(
          OrderPaymentRepository,
        );
        const orderHistoryRepo = entityManager.getCustomRepository(
          OrderHistoryRepository,
        );
        const orderShippingRepo = entityManager.getCustomRepository(
          OrderShippingRepository,
        );
        const orderShippingDetailRepo = entityManager.getCustomRepository(
          OrderShippingDetailRepository,
        );
        const inventoryProductRepo = entityManager.getCustomRepository(
          InventoryProductRepository,
        );
        const flashSaleProductRepo = entityManager.getCustomRepository(
          FlashSaleProductRepository,
        );
        const productRepo =
          entityManager.getCustomRepository(ProductRepository);
        const productComboRepo = entityManager.getCustomRepository(
          ProductComboRepository,
        );
        const charityRepo =
          entityManager.getCustomRepository(CharityRepository);
        const charityProductRepo = entityManager.getCustomRepository(
          CharityProductRepository,
        );
        const couponRepo = entityManager.getCustomRepository(CouponRepository);

        // Calculate sub total include coupon sale price
        let subtotal = 0;
        const orderDetails: any[] = [];
        const dataCreateOrderShipping: DataCreateShipping[] = [];
        const orderCode = generateUniqueString();
        const { type, returnUrl, customerIpAddress } = createOrderDto.payment;
        const mapOrderShipRequestCodeWithProducts: any = {};
        let stopProcessBecauseInvalid = false;
        const dataUpdateNumRemainProductsInInventory: any[] = [];
        const dataRestoreNumRemainProductsInInventory: any[] = [];
        const dataUpdateFlashSaleProduct: any[] = [];
        const dataRestoreFlashSaleProduct: any[] = [];
        const driverShipping = createOrderDto.shipping.driver;
        const dataUpdateCharity: any = {};
        const dataRestoreCharity: any = {};
        const dataUpdateCharityDetail: any[] = [];
        const dataRestoreCharityDetail: any[] = [];
        const dataUpdateCoupon: any = {};
        const dataRestoreCoupon: any = {};
        const dataUpdateProduct: any[] = [];
        const dataRestoreProduct: any[] = [];
        if (couponCanUse) {
          dataUpdateCoupon['id'] = couponId;
          dataRestoreCoupon['id'] = couponId;
          dataRestoreCoupon['quantity'] = couponQuantity;
        }

        const inventoriesWithProduct: any = groupSellableProducts.inventories;
        const inventoryIds = Object.keys(inventoriesWithProduct);
        for (const inventoryId of inventoryIds) {
          const inventoryWithProduct = inventoriesWithProduct[inventoryId];
          const {
            cityId,
            districtId,
            wardId,
            name,
            address,
            phone_number,
            products,
          } = inventoryWithProduct;
          const productsShipping: ProductShippingCreateOrder[] = [];
          const orderShippingInfo = {} as OrderInfoCreateOrder;
          const shipRequestCode = `${orderCode}-${inventoryId}`;
          // Calculate total price of order shipping without coupon sale price
          let orderShippingPrice = 0;
          if (
            !mapOrderShipRequestCodeWithProducts.hasOwnProperty(shipRequestCode)
          ) {
            mapOrderShipRequestCodeWithProducts[shipRequestCode] = {};
          }
          if (
            mapCities.hasOwnProperty(cityId) &&
            mapDistricts.hasOwnProperty(districtId) &&
            mapWards.hasOwnProperty(wardId)
          ) {
            const inforProductsShip: InformationProductShip[] = [];
            if (!checkObjectIsEmpty(products)) {
              const productIds = Object.keys(products);
              for (const productId of productIds) {
                const mapProduct = mapProducts[productId];
                const mapInventoriesProductRemainingNumber =
                  generateMapDataWithKeyFieldPair(
                    'inventory_id',
                    '',
                    mapProduct.inventory_products,
                  );
                const inventoryProductRemainingNumber =
                  mapInventoriesProductRemainingNumber[inventoryId][
                    'remaining_number'
                  ];
                const inventoryProductId =
                  mapInventoriesProductRemainingNumber[inventoryId]['id'];
                const height = parseFloat(mapProduct['height']);
                const length = parseFloat(mapProduct['length']);
                const width = parseFloat(mapProduct['width']);
                const originalPrice = mapProduct['price'];
                const numberProductSoldBefore = Number(mapProduct['num_sold']);
                const dataOrderDetail: any = {
                  productId,
                  inventoryId,
                  original_price: originalPrice,
                };
                const price = originalPrice;
                let weight = 0;
                let totalNumberProductOrder = 0;
                let productCanUseCoupon = true;
                products[productId].forEach((element) => {
                  let productInSale = false;
                  let productInCharity = false;
                  let productInPromotion = false;
                  let productInCombo = false;
                  weight = element.weight;
                  const { number, product_combo_id, percentage } = element;
                  totalNumberProductOrder += number;
                  if (product_combo_id) {
                    productInCombo = true;
                  }
                  if (mapProductPromotions.hasOwnProperty(productId)) {
                    productInPromotion = true;
                  }
                  if (mapProductInFlashSale.hasOwnProperty(productId)) {
                    if (mapProductInFlashSale[productId]['quantity'] > 0) {
                      productInSale = true;
                    }
                  }
                  if (mapCharityProducts.hasOwnProperty(productId)) {
                    if (
                      mapCharityProducts[productId]['quantity'] >
                      mapCharityProducts[productId]['sold']
                    ) {
                      productInCharity = true;
                    }
                  }
                  const cloneDataOrderDetail = {
                    ...dataOrderDetail,
                  };

                  if (
                    productInPromotion ||
                    productInSale ||
                    productInCombo ||
                    productInCharity
                  ) {
                    // Coupon code is valid but can not use because product in: flash sale, promotion, charity or combo
                    if (couponCanUse) {
                      throw new RpcExc(`bad_request:${couponInvalid}`);
                    }
                    // Mark product can not use coupon because in: flash sale, promotion, charity or combo
                    productCanUseCoupon = false;

                    if (productInCombo) {
                      const comboPrice =
                        originalPrice -
                        Math.floor((percentage * originalPrice) / 100);
                      cloneDataOrderDetail['number'] = number;
                      cloneDataOrderDetail['combo_price'] =
                        originalPrice - comboPrice;
                      cloneDataOrderDetail['product_combo_id'] =
                        product_combo_id;
                      cloneDataOrderDetail['total'] = comboPrice * number;
                      orderDetails.push(cloneDataOrderDetail);
                      subtotal += number * comboPrice;
                      orderShippingPrice += number * comboPrice;
                    } else {
                      if (productInSale) {
                        const { id, quantity, percentage } =
                          mapProductInFlashSale[productId];
                        const salePrice =
                          originalPrice -
                          Math.floor((percentage * originalPrice) / 100);
                        const leftNumber = number - quantity;
                        let firstNumber = number;
                        // Number buy greater than number sale -> split detail
                        if (leftNumber > 0) {
                          orderDetails.push({
                            ...cloneDataOrderDetail,
                            number: leftNumber,
                            total: originalPrice * leftNumber,
                          });
                          subtotal += leftNumber * originalPrice;
                          orderShippingPrice += leftNumber * originalPrice;
                          firstNumber = quantity;
                        }
                        cloneDataOrderDetail['number'] = firstNumber;
                        cloneDataOrderDetail['sale_price'] =
                          originalPrice - salePrice;
                        cloneDataOrderDetail['flash_sale_id'] = flashSaleId;
                        cloneDataOrderDetail['total'] = salePrice * firstNumber;
                        orderDetails.push(cloneDataOrderDetail);
                        subtotal += firstNumber * salePrice;
                        orderShippingPrice += firstNumber * salePrice;
                        dataUpdateFlashSaleProduct.push({
                          id,
                          quantity: quantity > number ? quantity - number : 0,
                        });
                        dataRestoreFlashSaleProduct.push({
                          id,
                          quantity: quantity,
                        });
                      } else if (productInCharity) {
                        subtotal += number * originalPrice;
                        orderShippingPrice += number * originalPrice;
                        const { id, quantity, percentage, sold } =
                          mapCharityProducts[productId];
                        const charityPrice = Math.floor(
                          (percentage * originalPrice) / 100,
                        );
                        const numberProductsAllowCharity = quantity - sold;
                        const leftNumber = number - numberProductsAllowCharity;
                        let firstNumber = number;
                        // Number buy greater than number sale -> split detail
                        if (leftNumber > 0) {
                          orderDetails.push({
                            ...cloneDataOrderDetail,
                            number: leftNumber,
                            total: originalPrice * leftNumber,
                          });
                          firstNumber = numberProductsAllowCharity;
                        }
                        cloneDataOrderDetail['number'] = firstNumber;
                        cloneDataOrderDetail['charity_id'] = charityId;
                        cloneDataOrderDetail['total'] =
                          originalPrice * firstNumber;
                        orderDetails.push(cloneDataOrderDetail);
                        charityNewTotal += charityPrice * firstNumber;
                        dataUpdateCharity['id'] = charityId;
                        dataRestoreCharity['id'] = charityId;
                        dataUpdateCharityDetail.push({
                          id,
                          sold: Number(sold) + firstNumber,
                        });
                        dataRestoreCharityDetail.push({
                          id,
                          sold: sold,
                        });
                      } else if (productInPromotion) {
                        const { id, percentage } =
                          mapProductPromotions[productId];
                        const promotionPrice =
                          originalPrice -
                          Math.floor((percentage * originalPrice) / 100);
                        cloneDataOrderDetail['number'] = number;
                        cloneDataOrderDetail['promotion_price'] =
                          originalPrice - promotionPrice;
                        cloneDataOrderDetail['promotion_id'] = id;
                        cloneDataOrderDetail['total'] = promotionPrice * number;
                        orderDetails.push(cloneDataOrderDetail);
                        subtotal += number * promotionPrice;
                        orderShippingPrice += number * promotionPrice;
                      }
                    }
                  } else {
                    let couponPriceOfProduct = 0;
                    // Coupon code is valid
                    if (
                      couponCanUse &&
                      mapProductsInCoupon.hasOwnProperty(productId)
                    ) {
                      // Can not use coupon because product in: flash sale, promotion, charity or combo
                      if (!productCanUseCoupon) {
                        throw new RpcExc(`bad_request:${couponInvalid}`);
                      }
                      const productInCoupon = mapProductsInCoupon[productId];
                      couponPriceOfProduct =
                        calculateProductCouponPriceOfProduct(
                          productInCoupon,
                          number,
                          originalPrice,
                        );
                      if (0 < couponPriceOfProduct) {
                        couponPriceOfProduct = couponPriceOfProduct * number;
                        couponPrice += couponPriceOfProduct;
                      }
                    }
                    cloneDataOrderDetail['number'] = number;
                    cloneDataOrderDetail['total'] =
                      price * number - couponPriceOfProduct;
                    if (couponPriceOfProduct > 0) {
                      cloneDataOrderDetail['coupon_id'] = couponId;
                      cloneDataOrderDetail['coupon_price'] =
                        couponPriceOfProduct;
                    }
                    orderDetails.push(cloneDataOrderDetail);
                    subtotal += number * price;
                    orderShippingPrice += number * price;
                  }
                });
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
                  total: totalNumberProductOrder,
                  // Check condition can ship with weight is Gram
                  weight: productWeight,
                };
                const productCode = mapProduct['code'];
                productsShipping.push({
                  name: productCode,
                  // GHTK create order shipping with weight is Gram
                  weight: productWeight * totalNumberProductOrder,
                  price: originalPrice,
                  quantity: totalNumberProductOrder,
                  product_code: productCode,
                });
                if (
                  !mapOrderShipRequestCodeWithProducts[
                    shipRequestCode
                  ].hasOwnProperty(productId)
                ) {
                  mapOrderShipRequestCodeWithProducts[shipRequestCode][
                    productId
                  ] = {};
                }
                inforProductsShip.push(inforProductShip);
                dataUpdateNumRemainProductsInInventory.push({
                  id: inventoryProductId,
                  remaining_number:
                    inventoryProductRemainingNumber - totalNumberProductOrder,
                });
                dataRestoreNumRemainProductsInInventory.push({
                  id: inventoryProductId,
                  remaining_number: inventoryProductRemainingNumber,
                });
                dataUpdateProduct.push({
                  id: Number(productId),
                  num_sold: numberProductSoldBefore + totalNumberProductOrder,
                });
                dataRestoreProduct.push({
                  id: Number(productId),
                  num_sold: numberProductSoldBefore,
                });
              }
              if (!inforProductsShip.length) {
                stopProcessBecauseInvalid = true;
                break;
              }
              let rsCheckCanShip = ResultShippingStatus.OK;
              // TODO: check can ship with driver LTP
              if (OrderShippingDriverConst.GHTK == driverShipping) {
                rsCheckCanShip = await this.orderShippingService.checkCanShip(
                  inforProductsShip,
                );
              }
              if (rsCheckCanShip == ResultShippingStatus.FAIL) {
                stopProcessBecauseInvalid = true;
                break;
              }
            } else {
              stopProcessBecauseInvalid = true;
              break;
            }
          } else {
            stopProcessBecauseInvalid = true;
            break;
          }
          orderShippingInfo.id = shipRequestCode;
          orderShippingInfo.pick_name = name;
          orderShippingInfo.pick_money =
            OrderPaymentTypeConst.COD == type ? orderShippingPrice : 0;
          orderShippingInfo.is_freeship =
            OrderPaymentTypeConst.COD == type
              ? OrderShippingFreeshipOptionsConst.NO
              : OrderShippingFreeshipOptionsConst.YES;
          orderShippingInfo.pick_address = address;
          orderShippingInfo.pick_province = mapCities[cityId];
          orderShippingInfo.pick_district = mapDistricts[districtId];
          orderShippingInfo.pick_tel = phone_number;
          orderShippingInfo.name = createOrderDto.shipping.name;
          orderShippingInfo.address = createOrderDto.shipping.address;
          orderShippingInfo.province =
            mapCities[createOrderDto.shipping.cityId];
          orderShippingInfo.district =
            mapDistricts[createOrderDto.shipping.districtId];
          orderShippingInfo.ward = mapWards[createOrderDto.shipping.wardId];
          orderShippingInfo.tel = createOrderDto.shipping.phone_number;
          orderShippingInfo.email = createOrderDto.shipping.email;
          orderShippingInfo.value = orderShippingPrice;
          switch (createOrderDto.shipping.type) {
            case OrderShippingTypeConst.GHTC:
              orderShippingInfo.deliver_option =
                OrderShippingDeliveryOptionsConst.GHTC;
              break;
            case OrderShippingTypeConst.GHN:
              orderShippingInfo.deliver_option =
                OrderShippingDeliveryOptionsConst.GHN;
              break;
          }
          dataCreateOrderShipping.push({
            products: productsShipping,
            order: orderShippingInfo,
          });
        }
        // Check all data ok
        if (
          stopProcessBecauseInvalid ||
          !dataCreateOrderShipping.length ||
          !dataUpdateNumRemainProductsInInventory.length ||
          checkObjectIsEmpty(mapOrderShipRequestCodeWithProducts)
        ) {
          throw new RpcExc(`bad_request:${createFail}`);
        }
        // Create order
        const dataCreateOrder: any = {
          customerId: createOrderDto.customerId ?? null,
          code: orderCode,
          subtotal: subtotal,
          total: subtotal,
          status:
            type == OrderPaymentTypeConst.COD
              ? OrderStatusConst.CONFIRMED
              : OrderStatusConst.PENDING_PAYMENT,
        };
        if (couponCanUse) {
          if (CouponTypeConst.ORDER == activeCoupon.type) {
            couponPrice = calculateOrderCouponPriceOfOrder(
              activeCoupon.requirements,
              subtotal,
            );
          }
          if (couponPrice > 0) {
            subtotal = subtotal - couponPrice;
            dataUpdateCoupon['quantity'] = couponQuantity - 1;
            dataCreateOrder['coupon_price'] = couponPrice;
            dataCreateOrder['coupon_id'] = couponId;
            dataCreateOrder['total'] = subtotal;
          }
        }
        const orderCreated = await orderRepo.save(dataCreateOrder, {
          transaction: false,
        });
        if (!orderCreated) {
          throw new RpcExc(`bad_request:${createFail}`);
        }
        let promisesSave: any[] = [];
        if (dataUpdateCharity.hasOwnProperty('id')) {
          dataUpdateCharity['total'] = charityNewTotal;
        }
        if (dataRestoreCharity.hasOwnProperty('id')) {
          dataRestoreCharity['total'] = charityTotal;
        }
        // Update number remain of products in inventories
        promisesSave.push(
          inventoryProductRepo.save(dataUpdateNumRemainProductsInInventory, {
            transaction: false,
          }),
        );
        // Update number remain of products in flash sales
        if (dataUpdateFlashSaleProduct && dataUpdateFlashSaleProduct.length) {
          promisesSave.push(
            flashSaleProductRepo.save(dataUpdateFlashSaleProduct, {
              transaction: false,
            }),
          );
        }
        // Update number remain of products in charity
        if (dataUpdateCharityDetail && dataUpdateCharityDetail.length) {
          promisesSave.push(
            charityProductRepo.save(dataUpdateCharityDetail, {
              transaction: false,
            }),
          );
        }
        // Update total of charity
        if (dataUpdateCharity.hasOwnProperty('id')) {
          promisesSave.push(
            charityRepo.save(dataUpdateCharity, {
              transaction: false,
            }),
          );
        }
        // Update quantity of coupon
        if (couponPrice > 0) {
          promisesSave.push(
            couponRepo.save(dataUpdateCoupon, {
              transaction: false,
            }),
          );
        }
        // Update number sold of products
        if (dataUpdateProduct && dataUpdateProduct.length) {
          promisesSave.push(
            productRepo.save(dataUpdateProduct, {
              transaction: false,
            }),
          );
        }
        await Promise.all(promisesSave);
        let orderFailed = false;
        const orderCreatedFailed = {
          id: orderCreated['id'],
          status: OrderStatusConst.FAILED,
        };
        // Create shippping
        // TODO: call create order shipping with LTP driver
        const dataShipping: any[] = [];
        let shippingPrice = 0;
        if (OrderShippingDriverConst.LTP == driverShipping) {
          dataShipping.push({
            ...createOrderDto.shipping,
            orderId: orderCreated['id'],
            status: 1,
          });
        } else {
          const promisesCreateOrderShipping: any[] = [];
          dataCreateOrderShipping.forEach((data) => {
            promisesCreateOrderShipping.push(
              this.orderShippingService.createOrderShipping(data),
            );
          });
          const rsCreateOrderShipping: CreateShippingResultInterface[] =
            await Promise.all(promisesCreateOrderShipping);
          rsCreateOrderShipping.forEach((rs) => {
            // TODO: check status of data return when create order shipping valid
            // TODO: compare with constant status defined
            if (ResultShippingStatus.FAIL == rs.status) {
              orderFailed = true;
              errorFromCreateShipping3rd = rs.error;
            }
            const shipCodeRequest = rs.request.order.id;
            shippingPrice += rs.result.total;
            const dataOrderShippingCreate: any = {
              ...createOrderDto.shipping,
              shipping_code_request: shipCodeRequest,
              price: rs.result.total,
              orderId: orderCreated['id'],
              status: rs.result.status,
              histories: [
                {
                  log: JSON.stringify({
                    action: ActionShipping.CREATE_ORDER,
                    ...rs,
                  }),
                },
              ],
            };
            if (ResultShippingStatus.OK == rs.status) {
              dataOrderShippingCreate['shipping_code_response'] =
                rs.result.code;
            }
            dataShipping.push(dataOrderShippingCreate);
          });
        }
        let orderTotalPrice = subtotal + shippingPrice;
        // Calculate online payment tax when payment type is online
        const dataSaveOrderPayment: any = {
          type: type,
        };
        if (OrderPaymentTypeConst.ONLINE == createOrderDto.payment.type) {
          const onlinePaymentTax = calculateOnlinePaymentTax(
            createOrderDto.payment.online_payment_method,
            orderTotalPrice,
          );
          if (!onlinePaymentTax) {
            throw new RpcExc(`bad_request:${createFail}`);
          }
          orderTotalPrice += onlinePaymentTax;
          dataSaveOrderPayment['online_payment_method'] =
            createOrderDto.payment.online_payment_method;
          dataSaveOrderPayment['online_payment_tax'] = onlinePaymentTax;
        }
        const dataUpdateOrder: any = {
          id: orderCreated['id'],
          shipping_price: shippingPrice,
          total: orderTotalPrice,
          detail: orderDetails,
          payments: [dataSaveOrderPayment],
          histories: [
            {
              log: 'Create order',
            },
          ],
        };
        if (orderFailed) {
          dataUpdateOrder.status = OrderStatusConst.FAILED;
        }
        const [orderWithRelation, ordersShipping] = await Promise.all([
          orderRepo.save(dataUpdateOrder, {
            transaction: false,
          }),
          orderShippingRepo.save(dataShipping, {
            transaction: false,
          }),
        ]);
        if (orderFailed) {
          // Restore number remain of products in inventories
          promisesSave = [
            inventoryProductRepo.save(dataRestoreNumRemainProductsInInventory, {
              transaction: false,
            }),
          ];
          // Restore number remain of products in flash sales
          if (
            dataRestoreFlashSaleProduct &&
            dataRestoreFlashSaleProduct.length
          ) {
            promisesSave.push(
              flashSaleProductRepo.save(dataRestoreFlashSaleProduct, {
                transaction: false,
              }),
            );
          }
          // Restore number remain of products in charity
          if (dataRestoreCharityDetail && dataRestoreCharityDetail.length) {
            promisesSave.push(
              charityProductRepo.save(dataRestoreCharityDetail, {
                transaction: false,
              }),
            );
          }
          // Restore total of charity
          if (dataRestoreCharity.hasOwnProperty('id')) {
            promisesSave.push(
              charityRepo.save(dataRestoreCharity, {
                transaction: false,
              }),
            );
          }
          // Restore quantity of coupon
          if (couponPrice > 0) {
            promisesSave.push(
              couponRepo.save(dataRestoreCoupon, {
                transaction: false,
              }),
            );
          }
          // Restore number sold of products
          if (dataRestoreProduct && dataRestoreProduct.length) {
            promisesSave.push(
              productRepo.save(dataRestoreProduct, {
                transaction: false,
              }),
            );
          }
          await Promise.all(promisesSave);
          return orderCreatedFailed;
        }
        const mapOrderDetail = generateMapArrayDataWithKeyPair(
          'productId',
          orderWithRelation.detail,
        );
        const dataOrderShipDetail: any[] = [];
        ordersShipping.forEach((orderShipping) => {
          // TODO: map data order shipping detail with LTP driver
          const driver = orderShipping.driver;
          const orderShipId = orderShipping.id;
          const orderShipStatus = orderShipping.status;
          if (OrderShippingDriverConst.LTP == driver) {
            const orderShipRequestCodes = Object.keys(
              mapOrderShipRequestCodeWithProducts,
            );
            for (const orderShipRequestCode of orderShipRequestCodes) {
              const productsInShipRequestCode =
                mapOrderShipRequestCodeWithProducts[orderShipRequestCode];
              Object.keys(productsInShipRequestCode).forEach((productId) => {
                if (!mapOrderDetail.hasOwnProperty(productId)) {
                  //throw new RpcExc(`bad_request:${createFail}`);
                  orderFailed = true;
                } else {
                  const productOrderDetail = mapOrderDetail[productId];
                  productOrderDetail.forEach((element) => {
                    dataOrderShipDetail.push({
                      order_shipping_id: orderShipId,
                      order_detail_id: element['id'],
                      status: orderShipStatus,
                    });
                  });
                }
              });
            }
          } else {
            const orderShipRequestCode = orderShipping.shipping_code_request;
            if (
              !mapOrderShipRequestCodeWithProducts.hasOwnProperty(
                orderShipRequestCode,
              )
            ) {
              //throw new RpcExc(`bad_request:${createFail}`);
              orderFailed = true;
            } else {
              const productsInShipRequestCode =
                mapOrderShipRequestCodeWithProducts[orderShipRequestCode];
              Object.keys(productsInShipRequestCode).forEach((productId) => {
                if (!mapOrderDetail.hasOwnProperty(productId)) {
                  //throw new RpcExc(`bad_request:${createFail}`);
                  orderFailed = true;
                } else {
                  const productOrderDetail = mapOrderDetail[productId];
                  productOrderDetail.forEach((element) => {
                    dataOrderShipDetail.push({
                      order_shipping_id: orderShipId,
                      order_detail_id: element['id'],
                      status: orderShipStatus,
                    });
                  });
                }
              });
            }
          }
        });
        promisesSave = [
          orderHistoryRepo.save(
            {
              orderId: orderWithRelation['id'],
              log: 'Create shipping order',
            },
            {
              transaction: false,
            },
          ),
          orderShippingDetailRepo.save(dataOrderShipDetail, {
            transaction: false,
          }),
        ];
        if (orderFailed) {
          promisesSave.push(
            orderRepo.save(
              {
                id: orderCreated['id'],
                status: OrderStatusConst.FAILED,
              },
              {
                transaction: false,
              },
            ),
          );
          // Restore number remain of products in inventories
          promisesSave = [
            inventoryProductRepo.save(dataRestoreNumRemainProductsInInventory, {
              transaction: false,
            }),
          ];
          // Restore number remain of products in flash sales
          if (
            dataRestoreFlashSaleProduct &&
            dataRestoreFlashSaleProduct.length
          ) {
            promisesSave.push(
              flashSaleProductRepo.save(dataRestoreFlashSaleProduct, {
                transaction: false,
              }),
            );
          }
          // Restore number remain of products in charity
          if (dataRestoreCharityDetail && dataRestoreCharityDetail.length) {
            promisesSave.push(
              charityProductRepo.save(dataRestoreCharityDetail, {
                transaction: false,
              }),
            );
          }
          // Restore total of charity
          if (dataRestoreCharity.hasOwnProperty('id')) {
            promisesSave.push(
              charityRepo.save(dataRestoreCharity, {
                transaction: false,
              }),
            );
          }
          // Restore quantity of coupon
          if (couponPrice > 0) {
            promisesSave.push(
              couponRepo.save(dataRestoreCoupon, {
                transaction: false,
              }),
            );
          }
          // Restore number sold of products
          if (dataRestoreProduct && dataRestoreProduct.length) {
            promisesSave.push(
              productRepo.save(dataRestoreProduct, {
                transaction: false,
              }),
            );
          }
        }
        //console.log(dataOrderShipDetail);
        await Promise.all(promisesSave);
        if (orderFailed) {
          return orderCreatedFailed;
        }
        // Payment online
        if (type == OrderPaymentTypeConst.ONLINE) {
          const orderPayment = orderWithRelation.payments[0];
          // Generate request payment link
          const requestPaymentLinkResult: RequestPaymentLinkResultInterface =
            this.orderPaymentService.generateRequestPaymentLink({
              amount: orderWithRelation.total,
              online_payment_method:
                createOrderDto.payment.online_payment_method,
              order_code: orderCreated.code,
              return_url: returnUrl,
              customer_ip_address: customerIpAddress,
            });
          //console.log(requestPaymentLinkResult);
          if (
            requestPaymentLinkResult.status == RequestPaymentLinkStatus.FAIL
          ) {
            //throw new RpcExc(`bad_request:${createFail}`);
            orderFailed = true;
          }
          // Save order payment log and order log
          promisesSave = [
            orderHistoryRepo.save(
              {
                orderId: orderWithRelation['id'],
                log: 'Request payment link',
              },
              {
                transaction: false,
              },
            ),
            orderPaymentRepo.save(
              {
                id: orderPayment['id'],
                histories: [
                  {
                    log: JSON.stringify({
                      action: ActionPayment.REQUEST_PAYMENT,
                      url: requestPaymentLinkResult.link,
                      params: requestPaymentLinkResult.req_params,
                    }),
                  },
                ],
              },
              {
                transaction: false,
              },
            ),
          ];
          if (orderFailed) {
            promisesSave.push(
              orderRepo.save(
                {
                  id: orderCreated['id'],
                  status: OrderStatusConst.FAILED,
                },
                {
                  transaction: false,
                },
              ),
            );
            // Restore number remain of products in inventories
            promisesSave = [
              inventoryProductRepo.save(
                dataRestoreNumRemainProductsInInventory,
                {
                  transaction: false,
                },
              ),
            ];
            // Restore number remain of products in flash sales
            if (
              dataRestoreFlashSaleProduct &&
              dataRestoreFlashSaleProduct.length
            ) {
              promisesSave.push(
                flashSaleProductRepo.save(dataRestoreFlashSaleProduct, {
                  transaction: false,
                }),
              );
            }
            // Restore number remain of products in charity
            if (dataRestoreCharityDetail && dataRestoreCharityDetail.length) {
              promisesSave.push(
                charityProductRepo.save(dataRestoreCharityDetail, {
                  transaction: false,
                }),
              );
            }
            // Restore total of charity
            if (dataRestoreCharity.hasOwnProperty('id')) {
              promisesSave.push(
                charityRepo.save(dataRestoreCharity, {
                  transaction: false,
                }),
              );
            }
            // Restore quantity of coupon
            if (couponPrice > 0) {
              promisesSave.push(
                couponRepo.save(dataRestoreCoupon, {
                  transaction: false,
                }),
              );
            }
            // Restore number sold of products
            if (dataRestoreProduct && dataRestoreProduct.length) {
              promisesSave.push(
                productRepo.save(dataRestoreProduct, {
                  transaction: false,
                }),
              );
            }
          }
          await Promise.all(promisesSave);
          if (orderFailed) {
            return orderCreatedFailed;
          }
          orderCreated['request_payment_link'] = requestPaymentLinkResult.link;
        }

        return orderCreated;
      },
    );

    if (!orderCreated || orderCreated['status'] == OrderStatusConst.FAILED) {
      if ('' != errorFromCreateShipping3rd) {
        throw new RpcExc(`bad_request:${errorFromCreateShipping3rd}`);
      } else {
        throw new RpcExc(`bad_request:${createFail}`);
      }
    }

    return {
      status: BooleanValue.TRUE,
      order: orderCreated,
    };
  }

  async findAllOrders(reqData: FindAllOrdersDto) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    let query = this.orderRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.shippings', 'order_shippings')
      // TODO: can not join, need research to know why.
      /*
      .leftJoinAndSelect(
        'order_shippings.histories',
        'order_shippings_histories',
      )
      */
      .innerJoinAndSelect('order.detail', 'order_detail')
      .innerJoinAndSelect('order_detail.inventory', 'order_detail_inventory')
      .innerJoinAndSelect('order_detail.product', 'order_detail_product')
      .leftJoinAndSelect(
        'order_detail_product.images',
        'order_detail_product_images',
        'is_thumbnail = :is_thumbnail',
        {
          is_thumbnail: 1,
        },
      )
      .leftJoinAndSelect(
        'order_detail_product.translates',
        'order_detail_product_translates',
        'language_code = :lang',
        {
          lang: reqData.lang,
        },
      )
      .where('order.customerId = :customer', {
        customer: reqData.customer,
      })
      .andWhere('order.status NOT IN(:status)', {
        status: OrderStatusConst.FAILED,
      })
      .orderBy({
        'order.created_at': 'DESC',
      })
      .skip(offset)
      .take(limit);
    if (reqData.search) {
      query = query.andWhere(
        new Brackets((qb) => {
          qb.where('order_detail_product_translates.name LIKE :product_name', {
            product_name: `%${reqData.search}%`,
          }).orWhere('order.code LIKE :order_code', {
            order_code: `%${reqData.search}%`,
          });
        }),
      );
    }
    const [data, count] = await query.getManyAndCount();
    const maxPage = Math.ceil(count / limit);
    const orderShippingIds: any[] = [];
    for (const item of data) {
      for (const shipping of item.shippings) {
        if (!checkItemInArray(orderShippingIds, shipping.id)) {
          orderShippingIds.push(shipping.id);
        }
      }
    }
    const orderShippingHistories = await this.orderShippingHistoryRepo.find({
      where: {
        order_shipping_id: In(orderShippingIds),
      },
      order: {
        created_at: 'DESC',
      },
    });
    const mapOrderShippingHistories = generateMapArrayDataWithKeyPair(
      'order_shipping_id',
      orderShippingHistories,
    );
    const promiseReFormattedResults: any[] = [];
    for (const item of data) {
      for (let index = 0; index < item.shippings.length; index++) {
        const shipping = item.shippings[index];
        if (mapOrderShippingHistories.hasOwnProperty(shipping.id)) {
          item.shippings[index]['histories'] =
            mapOrderShippingHistories[shipping.id];
        }
      }
      promiseReFormattedResults.push(
        this.reFormatOrderResponse(item, reqData.lang),
      );
    }
    const results = await Promise.all(promiseReFormattedResults);
    return { results, total: count, max_page: maxPage };
  }

  async findOneOrder(reqData: FindOneOrderDto) {
    const { id, lang, customer } = reqData;
    const [order, notFoundMsg] = await Promise.all([
      this.orderRepository
        .createQueryBuilder('order')
        .innerJoinAndSelect('order.shippings', 'order_shippings')
        .leftJoinAndSelect(
          'order_shippings.histories',
          'order_shippings_histories',
        )
        .leftJoinAndSelect('order_shippings.country', 'order_shippings_country')
        .leftJoinAndSelect('order_shippings.city', 'order_shippings_city')
        .leftJoinAndSelect(
          'order_shippings.district',
          'order_shippings_district',
        )
        .leftJoinAndSelect('order_shippings.ward', 'order_shippings_ward')
        .innerJoinAndSelect('order.payments', 'order_payments')
        .innerJoinAndSelect('order.detail', 'order_detail')
        .innerJoinAndSelect('order_detail.shipping', 'order_detail_shipping')
        .innerJoinAndSelect('order_detail.inventory', 'order_detail_inventory')
        .innerJoinAndSelect('order_detail.product', 'order_detail_product')
        .leftJoinAndSelect(
          'order_detail_product.images',
          'order_detail_product_images',
          'is_thumbnail = :is_thumbnail',
          {
            is_thumbnail: 1,
          },
        )
        .leftJoinAndSelect(
          'order_detail_product.translates',
          'order_detail_product_translates',
          'language_code = :lang',
          {
            lang: lang,
          },
        )
        .where(
          'order.customerId = :customer AND order.id = :id AND order.status NOT IN(:status)',
          {
            customer: customer,
            id: id,
            status: OrderStatusConst.FAILED,
          },
        )
        .orderBy('order_shippings_histories.created_at', 'DESC')
        .getOne(),
      this.i18n.t('order.validate.not_found'),
    ]);
    if (!order) {
      throw new RpcExc(`not_found:${notFoundMsg}`);
    }
    const result = await this.reFormatOrderResponse(order, lang);

    return result;
  }

  async cancelOneOrder(reqData: CancelOneOrderDto) {
    const { id, customer, note } = reqData;
    const [order, notFoundMsg, cancelSuccess, cancelFail] = await Promise.all([
      this.orderRepository
        .createQueryBuilder('order')
        .innerJoinAndSelect('order.shippings', 'order_shippings')
        .where('order.customerId = :customer AND order.id = :id', {
          customer: customer,
          id: id,
        })
        .getOne(),
      this.i18n.t('order.validate.not_found'),
      this.i18n.t('order.validate.cancel_success'),
      this.i18n.t('order.validate.cancel_fail'),
    ]);
    if (!order) {
      throw new RpcExc(`not_found:${notFoundMsg}`);
    }
    const checkCanCancelOrder = await this.checkCanCancelOrder(order);
    if (!checkCanCancelOrder) {
      throw new RpcExc(`bad_request:${cancelFail}`);
    }
    const promisesUpdateData: any[] = [];
    promisesUpdateData.push(
      this.orderRepository.save({
        id: order.id,
        status: OrderStatusConst.CANCELLED,
        note,
      }),
    );
    const dataUpdateOrderShippings: any[] = [];
    const dataInsertOrderShippingsHistory: any[] = [];
    const promisesCancelOrderShipping: any[] = [];
    const orderShippingDriver = order.shippings[0].driver;
    if (OrderShippingDriverConst.GHTK == orderShippingDriver) {
      // TODO: tìm giải pháp xử lý khi 1 trong các lời gọi hủy đơn hàng của GHTK bị lỗi
      order.shippings.forEach((shipping) => {
        promisesCancelOrderShipping.push(
          this.orderShippingService.cancelOrderShipping(shipping),
        );
      });
      const rsCancelOrderShippings: CancelShippingResultInterface[] =
        await Promise.all(promisesCancelOrderShipping);
      for (let index = 0; index < rsCancelOrderShippings.length; index++) {
        const rsCancelOrderShipping = rsCancelOrderShippings[index];
        const orderShipping = order.shippings[index];
        if (ResultShippingStatus.FAIL == rsCancelOrderShipping.status) {
          throw new RpcExc(`bad_request:${cancelFail}`);
        }
        const dataUpdateOrderShipping: any = {
          id: orderShipping.id,
          status: OrderShippingStatusConst.CANCELLED,
        };
        dataUpdateOrderShippings.push(dataUpdateOrderShipping);
        dataInsertOrderShippingsHistory.push({
          order_shipping_id: orderShipping.id,
          log: JSON.stringify({
            action: ActionShipping.CANCEL_ORDER,
            note: `Cancel by customer ${customer}`,
            ...rsCancelOrderShipping,
          }),
        });
      }
    } else {
      order.shippings.forEach((shipping) => {
        dataUpdateOrderShippings.push({
          id: shipping.id,
          status: OrderShippingStatusFilterConst.CANCELLED,
        });
      });
    }
    if (dataUpdateOrderShippings.length) {
      promisesUpdateData.push(
        this.orderShippingRepo.save(dataUpdateOrderShippings),
      );
    }
    if (dataInsertOrderShippingsHistory.length) {
      promisesUpdateData.push(
        this.orderShippingHistoryRepo.save(dataInsertOrderShippingsHistory),
      );
    }
    await Promise.all(promisesUpdateData);
    return cancelSuccess;
  }

  async validateProductsOrder(reqData: ValidateProductsOrderDto) {
    const rsValidate = await this.validateProductsOrderAndReturnList(reqData);
    return rsValidate['error_messages'];
  }

  async validateProductsOrderAndReturnList(
    reqData: ValidateProductsOrderDto,
    shipping: OrderShippingOnlyAddressDto = null,
  ) {
    const [failMsg, outOfStockMsg] = await Promise.all([
      this.i18n.t('order.validate.validate_product_order_fail'),
      this.i18n.t('order.validate.validate_product_order_out_of_stock_product'),
    ]);
    const rsGroups = groupProductsOrderToProductsAndProductCombos(reqData);
    if (checkObjectIsEmpty(rsGroups)) {
      throw new RpcExc(`bad_request:${failMsg}`);
    }
    const { groups, product_ids, product_combo_ids } = rsGroups;
    const queryGetProducts = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect(
        'product.inventory_products',
        'product_inventory_products',
        //'product_inventory_products.remaining_number > 0',
      )
      .leftJoinAndSelect(
        'product_inventory_products.inventory',
        'product_inventory_products_inventory',
      )
      .where('product.id IN (:...product_ids)', {
        product_ids: product_ids,
      })
      .andWhere('product.status_display = :statusDisplay', {
        statusDisplay: ProductStatusDisplayConst.SHOW,
      });
    const promises: any[] = [
      queryGetProducts.getMany(),
      this.mapInventoryCityToCustomerCityRepo.find(),
    ];
    if (product_combo_ids && product_combo_ids.length) {
      promises.push(
        this.productComboRepo
          .createQueryBuilder('product_combo')
          .innerJoinAndSelect('product_combo.details', 'product_combo_details')
          .where('product_combo.id IN (:...product_combo_ids)', {
            product_combo_ids: product_combo_ids,
          })
          .andWhere('product_combo.status = :status', {
            status: BooleanValue.TRUE,
          })
          .getMany(),
      );
    }
    const results = await Promise.all(promises);
    let products = results[0];
    const dataInventoryCityToCustomerCities = results[1];
    let productCombos = [];
    if (product_combo_ids && product_combo_ids.length) {
      productCombos = results[2];
    }
    /*
    if (
      !validateProductsAndProductCombosOrder(groups, products, productCombos)
    ) {
      throw new RpcExc(`bad_request:${failMsg}`);
    }
    */
    const groupsAssignedInventory =
      checkAndAssignInventoryToProductsAndProductCombosOrder(
        groups,
        products,
        productCombos,
        dataInventoryCityToCustomerCities,
        shipping,
      );
    // TODO: Because in function check and assign, we decrease number remainning of each product in inventory
    // TODO: It change data in products variable, Node JS reference (i guest). Need research to know why.
    // TODO: We need query again to get list products
    products = await queryGetProducts.getMany();
    const rs: any = {
      error_messages: {
        products: {},
        combos: {},
      },
      list: {
        products,
        product_combos: productCombos,
        groups_assigned_inventory: groupsAssignedInventory,
      },
    };
    if (checkObjectIsEmpty(groupsAssignedInventory)) {
      throw new RpcExc(`bad_request:${failMsg}`);
    }

    try {
      for (const key in groupsAssignedInventory) {
        if (groupsAssignedInventory.hasOwnProperty(key)) {
          const group: GroupProductsAndProductCombosOrderInterface =
            groupsAssignedInventory[key];
          if (group.max_number_can_buy > -1) {
            let errMsg = outOfStockMsg;
            errMsg = errMsg.replace(
              '@@remaining_number@@',
              group.max_number_can_buy,
            );
            if (group.product_id) {
              rs['error_messages']['products'][group.product_id] = errMsg;
            } else if (group.product_combo_id) {
              rs['error_messages']['combos'][group.product_combo_id] = errMsg;
            }
          }
        }
      }

      return rs;
    } catch (err) {
      throw new RpcExc(`bad_request:${failMsg}`);
    }
  }

  async checkRealtimeDataProductsInOrder(
    productsInOrder: OrderProductDto[],
    products: Product[],
    productCombos: ProductCombo[],
    currentFlashSale: FlashSale,
    promotionProducts: Slider[],
    customerId: number,
    couponCode: string,
    couponDetail: CouponDetailInOrderDto,
    activeCoupons: Coupon[],
  ) {
    if (!productsInOrder || !productsInOrder.length) {
      return null;
    }
    const rs: CheckRealtimeDataProductsInOrderResult = {
      status: BooleanValue.FALSE,
      products: productsInOrder,
    };
    if (couponDetail) {
      rs.coupon = couponDetail;
    }
    const mapProducts =
      products && products.length
        ? generateMapDataWithKeyFieldPair('id', '', products)
        : {};
    const mapProductCombos =
      productCombos && productCombos.length
        ? generateMapDataWithKeyFieldPair('id', '', productCombos)
        : {};
    rs.status = BooleanValue.TRUE;
    let rsCheckIsOk = true;
    const flashSaleIds: any[] = [];
    rs.products.forEach((item) => {
      if (item.product.flash_sale) {
        const { id } = item.product.flash_sale;
        if (!checkItemInArray(flashSaleIds, id)) {
          flashSaleIds.push(id);
        }
      }
    });
    const mapFlashSales = currentFlashSale
      ? generateMapDataWithKeyFieldPair('id', '', [currentFlashSale])
      : {};
    //console.log(mapFlashSales);
    const mapProductPromotionsById =
      promotionProducts && promotionProducts.length
        ? generateMapDataWithKeyFieldPair('id', '', promotionProducts)
        : {};
    //console.log(mapProductPromotionsById);
    const mapProductPromotionsByProductId =
      promotionProducts && promotionProducts.length
        ? generateMapDataWithKeyFieldPair('product', '', promotionProducts)
        : {};
    //console.log(mapProductPromotionsByProductId);
    // nếu trường hợp khi mua 1 combo, mà 1 sp trong combo đó bị xóa đi, không còn nữa
    // vậy là toàn bộ sp khác trong combo đó cũng phải đc xóa khỏi cart
    const productComboIdsInvalid: any[] = [];
    const productIdsInCombosOfOrder: any = {};
    const newProducts: OrderProductDto[] = [];
    for (const item of rs.products) {
      if (!mapProducts.hasOwnProperty(item.productId)) {
        rsCheckIsOk = false;
        continue;
      }
      if (item.comboId) {
        if (
          !mapProductCombos.hasOwnProperty(item.comboId) ||
          checkItemInArray(productComboIdsInvalid, item.comboId)
        ) {
          rsCheckIsOk = false;
          continue;
        }
        if (!productIdsInCombosOfOrder.hasOwnProperty(item.comboId)) {
          productIdsInCombosOfOrder[item.comboId] = [];
        }
        if (
          !checkItemInArray(
            productIdsInCombosOfOrder[item.comboId],
            item.productId,
          )
        ) {
          productIdsInCombosOfOrder[item.comboId].push(item.productId);
        }
      }
      //console.log(item.product);

      /**
       * Begin check realtime data product
       */

      const product: Product = mapProducts[item.productId];
      //console.log(product);
      // Check status
      if (item.product.status != product.status_display) {
        rsCheckIsOk = false;
        item.product.status = product.status_display;
      }
      // Check dimension
      if (
        item.product.dimension.height != product.height ||
        item.product.dimension.length != product.length ||
        item.product.dimension.width != product.width
      ) {
        rsCheckIsOk = false;
        item.product.dimension.height = product.height;
        item.product.dimension.length = product.length;
        item.product.dimension.width = product.width;
      }
      // Check weight
      if (item.product.weight != product.weight) {
        rsCheckIsOk = false;
        item.product.weight = product.weight;
      }
      // Check allow COD
      if (item.product.allow_cod != product.allow_cod) {
        rsCheckIsOk = false;
        item.product.allow_cod = product.allow_cod;
      }
      // Check price
      if (item.product.price != product.price) {
        rsCheckIsOk = false;
        item.product.price = product.price;
      }

      /**
       * End check realtime data product
       */

      /**
       * Begin check realtime data product combo
       */

      // Customer choose buy product from combo
      let buyProductFromCombo = false;
      if (item.comboId) {
        if (!item.product_combo) {
          if (!checkItemInArray(productComboIdsInvalid, item.comboId)) {
            productComboIdsInvalid.push(item.comboId);
          }
          rsCheckIsOk = false;
          continue;
        }
        const productCombo: ProductCombo = mapProductCombos[item.comboId];
        const mapProductInCombo = generateMapDataWithKeyFieldPair(
          'product_id',
          '',
          productCombo.details,
        );
        if (!mapProductInCombo.hasOwnProperty(item.productId)) {
          if (!checkItemInArray(productComboIdsInvalid, item.comboId)) {
            productComboIdsInvalid.push(item.comboId);
          }
          rsCheckIsOk = false;
          continue;
        }
        buyProductFromCombo = true;
        const productInCombo: ProductComboDetail =
          mapProductInCombo[item.productId];
        if (
          productCombo.status != item.product_combo.status ||
          productCombo.number_products != item.product_combo.number_products ||
          productCombo.total_price != item.product_combo.total_price ||
          productInCombo.quantity != item.product_combo.detail.quantity ||
          productInCombo.percentage != item.product_combo.detail.percentage
        ) {
          rsCheckIsOk = false;
          item.product_combo.status = productCombo.status;
          item.product_combo.number_products = productCombo.number_products;
          item.product_combo.total_price = productCombo.total_price;
          item.product_combo.detail.quantity = productInCombo.quantity;
          item.product_combo.detail.percentage = productInCombo.percentage;
        }
      }

      /**
       * End check realtime data product combo
       */

      /**
       * Begin check realtime data flash sale
       */

      const hasNotCurrentFlashSale = currentFlashSale ? false : true;
      let flashSale: FlashSale = null;
      let mapProductsInFlashSale = {};
      let productInFlashSale: FlashSaleProduct = null;
      if (item.product.flash_sale) {
        // Can not allow product in combo has flash sale
        if (buyProductFromCombo) {
          rsCheckIsOk = false;
          delete item.product.flash_sale;
        } else {
          const { id, percentage, quantity } = item.product.flash_sale;
          // Has not active flash sale -> delete
          if (hasNotCurrentFlashSale) {
            rsCheckIsOk = false;
            delete item.product.flash_sale;
          } else {
            let flashSaleHadChange = false;
            let productIsNotInFlashSale = false;
            if (!mapFlashSales.hasOwnProperty(id)) {
              flashSale = currentFlashSale;
            } else {
              flashSale = mapFlashSales[id];
            }
            mapProductsInFlashSale = generateMapDataWithKeyFieldPair(
              'product_id',
              '',
              flashSale.products,
            );
            // Check product in flash sale
            if (!mapProductsInFlashSale.hasOwnProperty(item.productId)) {
              productIsNotInFlashSale = true;
            } else {
              productInFlashSale = mapProductsInFlashSale[item.productId];
              // Check percentage of product in flash sale
              if (productInFlashSale.percentage != percentage) {
                flashSaleHadChange = true;
              }
              // Check percentage of product in flash sale
              else if (productInFlashSale.quantity != quantity) {
                flashSaleHadChange = true;
              }
            }
            if (productIsNotInFlashSale) {
              rsCheckIsOk = false;
              delete item.product.flash_sale;
            } else if (flashSaleHadChange) {
              rsCheckIsOk = false;
              item.product.flash_sale.percentage =
                productInFlashSale.percentage;
              item.product.flash_sale.quantity = productInFlashSale.quantity;
            }
          }
        }
      } else if (!hasNotCurrentFlashSale && !buyProductFromCombo) {
        flashSale = currentFlashSale;
        mapProductsInFlashSale = generateMapDataWithKeyFieldPair(
          'product_id',
          '',
          flashSale.products,
        );
        // Check product in flash sale
        if (mapProductsInFlashSale.hasOwnProperty(item.productId)) {
          rsCheckIsOk = false;
          productInFlashSale = mapProductsInFlashSale[item.productId];
          item.product.flash_sale = {
            id: flashSale.id,
            percentage: productInFlashSale.percentage,
            quantity: productInFlashSale.quantity,
          };
        }
      }

      /**
       * End check realtime data flash sale
       */

      /**
       * Begin check realtime data promotion
       */

      let hasNotPromotion =
        promotionProducts && promotionProducts.length ? false : true;
      let promotion: Slider = null;
      if (item.product.promotion) {
        // Can not allow product in combo has flash sale
        if (buyProductFromCombo) {
          rsCheckIsOk = false;
          delete item.product.promotion;
        } else {
          const { id, percentage } = item.product.promotion;
          // Has not active flash sale -> delete
          if (hasNotPromotion) {
            rsCheckIsOk = false;
            delete item.product.promotion;
          } else {
            let promotionHadChange = false;
            if (!mapProductPromotionsById.hasOwnProperty(id)) {
              // Check has any promotion of product
              if (
                mapProductPromotionsByProductId.hasOwnProperty(item.productId)
              ) {
                promotion = mapProductPromotionsByProductId[item.productId];
                promotionHadChange = true;
              } else {
                hasNotPromotion = true;
              }
            } else {
              promotion = mapProductPromotionsById[id];
              // Check product in promotion
              if (promotion.product != item.productId) {
                hasNotPromotion = true;
              }
              // Check percentage of product in flash sale
              else if (promotion.percentage != percentage) {
                promotionHadChange = true;
              }
            }
            if (hasNotPromotion || promotionHadChange) {
              rsCheckIsOk = false;
              if (hasNotPromotion) {
                delete item.product.promotion;
              } else {
                item.product.promotion.percentage = promotion.percentage;
              }
            }
          }
        }
      } else if (!hasNotPromotion && !buyProductFromCombo) {
        // Check product in promotion
        if (mapProductPromotionsByProductId.hasOwnProperty(item.productId)) {
          rsCheckIsOk = false;
          promotion = mapProductPromotionsByProductId[item.productId];
          item.product.promotion = {
            id: promotion.id,
            percentage: promotion.percentage,
          };
        }
      }

      /**
       * End check realtime data promotion
       */

      newProducts.push(item);
    }

    // Có sp mới đc thêm vào combo
    // Xóa hết các sp khác trong combo
    if (productCombos && productCombos.length) {
      productCombos.forEach((productCombo) => {
        if (
          productCombo.details &&
          productCombo.details.length &&
          productIdsInCombosOfOrder.hasOwnProperty(productCombo.id)
        ) {
          const productIdsInComboOfOrder: any[] =
            productIdsInCombosOfOrder[productCombo.id];
          productCombo.details.forEach((detail) => {
            if (
              !checkItemInArray(productIdsInComboOfOrder, detail.product_id)
            ) {
              if (!checkItemInArray(productComboIdsInvalid, productCombo.id)) {
                productComboIdsInvalid.push(productCombo.id);
              }
            }
          });
        }
      });
    }
    // Remove again with products belong to combos that invalid
    const finalNewProducts: OrderProductDto[] = [];
    for (const item of newProducts) {
      if (item.comboId) {
        if (checkItemInArray(productComboIdsInvalid, item.comboId)) {
          rsCheckIsOk = false;
          continue;
        }
      }
      finalNewProducts.push(item);
    }
    rs.products = finalNewProducts;

    /**
     * Begin check realtime data coupon
     */

    let hasNotActiveCoupon =
      activeCoupons && activeCoupons.length ? false : true;
    // Check is using coupon and logged in
    if (couponCode && customerId) {
      const mapCouponsByCode = generateMapDataWithKeyFieldPair(
        'code',
        '',
        activeCoupons,
      );
      // Check coupon code exists
      if (mapCouponsByCode.hasOwnProperty(couponCode)) {
        const newDataOfCouponCode: Coupon = mapCouponsByCode[couponCode];
        let couponCodeHadChange = false;
        if (
          rs.coupon.quantity != newDataOfCouponCode.quantity ||
          rs.coupon.type != newDataOfCouponCode.type ||
          rs.coupon.requirements.length !=
            newDataOfCouponCode.requirements.length
        ) {
          couponCodeHadChange = true;
        } else {
          const mapNewDataRequirementsCouponCodeByPrice =
            generateMapDataWithKeyFieldPair(
              'price',
              '',
              newDataOfCouponCode.requirements,
            );
          const mapNewDataRequirementsCouponCodeByProduct =
            generateMapDataWithKeyFieldPair(
              'product',
              '',
              newDataOfCouponCode.requirements,
            );
          for (const requirement of rs.coupon.requirements) {
            // Check data coupon by total price
            if (requirement.price) {
              if (
                !mapNewDataRequirementsCouponCodeByPrice.hasOwnProperty(
                  requirement.price,
                )
              ) {
                couponCodeHadChange = true;
                break;
              }
              const newDataRequirementCouponCode: CouponRequirement =
                mapNewDataRequirementsCouponCodeByPrice[requirement.price];
              if (
                newDataRequirementCouponCode.type != requirement.type ||
                newDataRequirementCouponCode.value != requirement.value
              ) {
                couponCodeHadChange = true;
                break;
              }
            }
            // Check data coupon by product
            else if (requirement.product) {
              if (
                !mapNewDataRequirementsCouponCodeByProduct.hasOwnProperty(
                  requirement.product,
                )
              ) {
                couponCodeHadChange = true;
                break;
              }
              const newDataRequirementCouponCode: CouponRequirement =
                mapNewDataRequirementsCouponCodeByProduct[requirement.product];
              if (
                newDataRequirementCouponCode.quantity != requirement.quantity ||
                newDataRequirementCouponCode.percentage !=
                  requirement.percentage
              ) {
                couponCodeHadChange = true;
                break;
              }
            } else {
              couponCodeHadChange = true;
              break;
            }
          }
        }
        if (couponCodeHadChange) {
          rsCheckIsOk = false;
          rs.coupon.quantity = newDataOfCouponCode.quantity;
          rs.coupon.type = newDataOfCouponCode.type;
          rs.coupon.requirements = newDataOfCouponCode.requirements.map(
            (item) => {
              if (item.price) {
                return {
                  price: item.price,
                  type: item.type,
                  value: item.value,
                };
              } else {
                return {
                  product: item.product,
                  quantity: item.quantity,
                  percentage: item.percentage,
                };
              }
            },
          );
        }
      } else {
        hasNotActiveCoupon = true;
      }
    } else {
      hasNotActiveCoupon = true;
    }
    if (hasNotActiveCoupon && rs.coupon) {
      rsCheckIsOk = false;
      delete rs.coupon;
    }

    /**
     * End check realtime data coupon
     */

    if (!rsCheckIsOk) {
      rs.status = BooleanValue.FALSE;
    }

    //console.log(rs.status);
    //console.log(rs.products);
    return rs;
  }

  async groupSellableProductsFollowInventoryAndShippingAddress(
    groupsAssignedInventory: any,
    shipping: ShippingAddress,
    products: Product[],
    productCombos: ProductCombo[],
  ): Promise<GroupSellableProductsResult> {
    const rs: GroupSellableProductsResult = {
      status: GroupSellableProductsStatus.FAIL,
      inventories: {},
      cities: [],
      districts: [],
      wards: [],
      products: [],
    };
    if (
      checkObjectIsEmpty(groupsAssignedInventory) ||
      !products ||
      !products.length
    ) {
      return rs;
    }
    try {
      const { address, country, city, district, ward } = shipping;
      if (!city || !district) {
        return rs;
      }
      const citiIds: any[] = [];
      const districtIds: any[] = [];
      const wardIds: any[] = [];
      citiIds.push(city);
      districtIds.push(district);
      wardIds.push(ward);
      const inventoryIds: any[] = [];
      for (const key in groupsAssignedInventory) {
        if (groupsAssignedInventory.hasOwnProperty(key)) {
          const group: GroupProductsAndProductCombosOrderInterface =
            groupsAssignedInventory[key];
          if (!checkItemInArray(inventoryIds, group.inventory_id)) {
            inventoryIds.push(group.inventory_id);
          }
        }
      }
      const inventories: Inventory[] = await this.inventoryRepo.findByIds(
        inventoryIds,
      );
      if (!inventories || !inventories.length) {
        return rs;
      }
      const inventoriesWithProduct: any = {};
      const mapProducts = generateMapDataWithKeyFieldPair('id', '', products);
      const mapProductCombos = generateMapDataWithKeyFieldPair(
        'id',
        '',
        productCombos,
      );
      const mapInventories = generateMapDataWithKeyFieldPair(
        'id',
        '',
        inventories,
      );
      for (const key in groupsAssignedInventory) {
        if (groupsAssignedInventory.hasOwnProperty(key)) {
          const group: GroupProductsAndProductCombosOrderInterface =
            groupsAssignedInventory[key];
          const {
            product_id,
            product_combo_id,
            inventory_id,
            products,
            number,
          } = group;
          const inventory: Inventory = mapInventories[inventory_id];
          const {
            id,
            cityId,
            districtId,
            wardId,
            name,
            address,
            phone_number,
          } = inventory;
          if (!checkItemInArray(citiIds, cityId)) {
            citiIds.push(cityId);
          }
          if (!checkItemInArray(districtIds, districtId)) {
            districtIds.push(districtId);
          }
          if (!checkItemInArray(wardIds, wardId)) {
            wardIds.push(wardId);
          }
          if (!inventoriesWithProduct.hasOwnProperty(id)) {
            inventoriesWithProduct[id] = {
              id,
              cityId,
              districtId,
              wardId,
              name,
              address,
              phone_number,
              // Using to calculate shipping price
              products: {},
              // Using to display products and product combos that inventory will sell
              groups: {
                products: [],
                product_combos: [],
              },
            };
          }
          if (product_id) {
            const product: Product = mapProducts[product_id];
            const weight = product['weight'] * 1000;
            if (
              !inventoriesWithProduct[id]['products'].hasOwnProperty(product_id)
            ) {
              inventoriesWithProduct[id]['products'][product_id] = [];
            }
            inventoriesWithProduct[id]['products'][product_id].push({
              id: product_id,
              weight,
              number,
            });
            inventoriesWithProduct[id]['groups']['products'].push(product_id);
          } else if (product_combo_id) {
            inventoriesWithProduct[id]['groups']['product_combos'].push(
              product_combo_id,
            );
            const productCombo: ProductCombo =
              mapProductCombos[product_combo_id];
            const mapProductsInCombo = generateMapDataWithKeyFieldPair(
              'product_id',
              '',
              productCombo.details,
            );
            products.forEach((productInCombo) => {
              const { product_id, number } = productInCombo;
              const product: Product = mapProducts[product_id];
              const weight = product['weight'] * 1000;
              const mapProductInCombo = mapProductsInCombo[product_id];
              const { product_combo_id, percentage } = mapProductInCombo;
              if (
                !inventoriesWithProduct[id]['products'].hasOwnProperty(
                  product_id,
                )
              ) {
                inventoriesWithProduct[id]['products'][product_id] = [];
              }
              inventoriesWithProduct[id]['products'][product_id].push({
                id: product_id,
                weight,
                number,
                product_combo_id,
                percentage,
              });
            });
          }
        }
      }
      const [cities, districts, wards] = await Promise.all([
        this.cityRepository.findByIds(citiIds),
        this.districtRepository.findByIds(districtIds),
        this.wardRepository.findByIds(wardIds),
      ]);
      if (
        !cities ||
        !cities.length ||
        !districts ||
        !districts.length ||
        !wards ||
        !wards.length
      ) {
        return rs;
      }
      rs.status = GroupSellableProductsStatus.OK;
      rs.inventories = inventoriesWithProduct;
      rs.cities = cities;
      rs.districts = districts;
      rs.wards = wards;
      rs.products = products;
    } catch (err) {}

    return rs;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  private async reFormatOrderResponse(order: Order, lang: string) {
    if (!order) {
      return order;
    }
    if (order.shippings && order.shippings.length) {
      const orderShippingDriver = order.shippings[0].driver;
      let orderShippingPrice = 0;
      order['shipping'] = order.shippings[0];
      const shippingHistoryDates: any[] = [];
      if (OrderShippingDriverConst.GHTK == orderShippingDriver) {
        const orderShippingStatuses: any[] = [];
        // Combine and convert shipping status to shipping status filter when using GHTK service
        order.shippings.forEach((item) => {
          orderShippingStatuses.push(item.status);
          orderShippingPrice += item.price;
          item.histories.forEach((history) => {
            shippingHistoryDates.push(history.created_at);
          });
        });
        order['shipping']['status'] =
          combineMultiOrderShippingStatusesToOneOrderShippingStatusFilter(
            orderShippingStatuses,
          );
        order['shipping']['price'] = orderShippingPrice;
      }
      delete order.shippings;
      [
        order['shipping']['driver_name'],
        order['shipping']['type_name'],
        order['shipping']['status_name'],
        order['shipping']['status_message'],
      ] = await Promise.all([
        this.i18n.t(
          `order-shipping.drivers.${order['shipping']['driver']}.name`,
        ),
        this.i18n.t(
          `order-shipping.drivers.${order['shipping']['driver']}.types.${order['shipping']['type']}.name`,
        ),
        this.i18n.t(
          `order-shipping.filter_status.${order['shipping']['status']}`,
        ),
        this.i18n.t(
          `order-shipping.filter_status_message.${order['shipping']['status']}`,
        ),
      ]);
      order['shipping']['status_dates'] = shippingHistoryDates;
      if (OrderShippingDriverConst.LTP == orderShippingDriver) {
        delete order['shipping']['status_message'];
        delete order['shipping']['status_dates'];
      }
    }
    if (order.payments && order.payments.length) {
      order['payment'] = order.payments[0];
      order['payment']['type_name'] = await this.i18n.t(
        `order-payment.types.${order['payment']['type']}.name`,
      );
      delete order.payments;
    }
    order.detail = order.detail.map((detail) => {
      const processedTranslate = processProductTranslateData(
        detail.product.translates,
      );
      delete detail.product.translates;
      detail.product = {
        ...detail.product,
        ...processedTranslate[lang],
      };

      return detail;
    });

    return order;
  }

  private async checkCanCancelOrder(order: Order) {
    let rs = false;
    if (!order || !order.shippings || !order.shippings.length) {
      return rs;
    }
    // Check status of order shipping
    const orderShippingDriver = order.shippings[0].driver;
    if (OrderShippingDriverConst.GHTK == orderShippingDriver) {
      for (const ship of order.shippings) {
        const orderShippingStatusFilter =
          convertOrderShippingStatusToOrderShippingStatusFilter(ship.status);
        rs =
          OrderShippingStatusFilterConst.CONFIRMED ==
            orderShippingStatusFilter ||
          OrderShippingStatusFilterConst.RECEIVING == orderShippingStatusFilter;
        if (!rs) {
          break;
        }
      }
    } else {
      rs =
        Number(OrderShippingStatusFilterConst.CONFIRMED) ==
          order.shippings[0].status ||
        Number(OrderShippingStatusFilterConst.RECEIVING) ==
          order.shippings[0].status;
    }
    // TODO: check status of order

    return rs;
  }
}

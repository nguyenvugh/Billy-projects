import {
  OrderShippingStatusConst,
  OrderShippingStatusFilterConst,
  weightOrderShippingStatusFilterConst,
} from '../constants/order-shipping.constant';
import { ValidateProductsOrderDto } from '../../order/dto/validate-products-order.dto';
import { OrderShippingOnlyAddressDto } from '../../order/dto/order-shipping-only-address.dto';
import {
  checkItemInArray,
  generateMapDataWithKeyFieldPair,
  generateMapArrayDataWithKeyPair,
  checkObjectIsEmpty,
  findMatchElementsFromMultiArrays,
  sortArrayObjectsByField,
} from './util.helper';
import { Product } from '../../product/schema/product.schema';
import { ProductCombo } from '../../product-combo/schema/product-combo.schema';
import { MapInventoryCityToCustomerCity } from '../../city/schema/map_inventory_city_to_customer_city.schema';
import { Inventory } from '../../inventory/schema/inventory.schema';

export const convertOrderShippingStatusFilterToOrderShippingStatuses = (
  orderShippingStatusFilter: OrderShippingStatusFilterConst,
): OrderShippingStatusConst[] => {
  switch (orderShippingStatusFilter) {
    case OrderShippingStatusFilterConst.CONFIRMED:
      return [OrderShippingStatusConst.NOT_RECEIVE];
    case OrderShippingStatusFilterConst.RECEIVING:
      return [OrderShippingStatusConst.RECEIVED];
    case OrderShippingStatusFilterConst.DELIVERING:
      return [
        OrderShippingStatusConst.PICKED,
        OrderShippingStatusConst.DELIVERING,
      ];
    case OrderShippingStatusFilterConst.DELIVERED_FULL:
      return [OrderShippingStatusConst.DELIVERED];
    case OrderShippingStatusFilterConst.DELIVERED_NOT_FULL:
      return [OrderShippingStatusConst.DELIVERED];
    case OrderShippingStatusFilterConst.CANCELLED:
      return [
        OrderShippingStatusConst.CAN_NOT_PICK,
        OrderShippingStatusConst.CANCELLED,
      ];
    case OrderShippingStatusFilterConst.REFUNDED:
      return [OrderShippingStatusConst.CAN_NOT_DELIVERY];
    default:
      return [OrderShippingStatusConst.NOT_RECEIVE];
  }
};

export const convertOrderShippingStatusToOrderShippingStatusFilter = (
  orderShippingStatus: OrderShippingStatusConst,
): OrderShippingStatusFilterConst => {
  switch (orderShippingStatus) {
    case OrderShippingStatusConst.NOT_RECEIVE:
      return OrderShippingStatusFilterConst.CONFIRMED;
    case OrderShippingStatusConst.RECEIVED:
      return OrderShippingStatusFilterConst.RECEIVING;
    case OrderShippingStatusConst.PICKED:
    case OrderShippingStatusConst.DELIVERING:
      return OrderShippingStatusFilterConst.DELIVERING;
    case OrderShippingStatusConst.DELIVERED:
      return OrderShippingStatusFilterConst.DELIVERED_FULL;
    case OrderShippingStatusConst.CAN_NOT_PICK:
    case OrderShippingStatusConst.CANCELLED:
      return OrderShippingStatusFilterConst.CANCELLED;
    case OrderShippingStatusConst.CAN_NOT_DELIVERY:
      return OrderShippingStatusFilterConst.REFUNDED;
    default:
      return OrderShippingStatusFilterConst.CONFIRMED;
  }
};

export const combineMultiOrderShippingStatusesToOneOrderShippingStatusFilter = (
  orderShippingStatuses: OrderShippingStatusConst[],
) => {
  let combinedOrderShippingStatusFilter =
    OrderShippingStatusFilterConst.CANCELLED;
  orderShippingStatuses.forEach((orderShippingStatus) => {
    const orderShippingStatusFilter =
      convertOrderShippingStatusToOrderShippingStatusFilter(
        orderShippingStatus,
      );
    if (
      weightOrderShippingStatusFilterConst[orderShippingStatusFilter] <
      weightOrderShippingStatusFilterConst[combinedOrderShippingStatusFilter]
    ) {
      combinedOrderShippingStatusFilter = orderShippingStatusFilter;
    }
  });

  return combinedOrderShippingStatusFilter;
};

export const groupProductsOrderToProductsAndProductCombos = (
  productsOrder: ValidateProductsOrderDto,
) => {
  try {
    const rs: any = {
      groups: {},
      product_ids: [],
      product_combo_ids: [],
    };
    const checkProductComboDuplicate: any = {};
    for (const item of productsOrder.products) {
      const { productId, comboId, number } = item;
      if (!checkItemInArray(rs.product_ids, productId)) {
        rs.product_ids.push(productId);
      }
      const keyProduct = `product-${[productId]}`;
      const keyProductCombo = `combo-${comboId}`;
      const keyCheckDup = `${productId}-${comboId}`;
      // Check duplicate product - combo
      if (checkProductComboDuplicate.hasOwnProperty(keyCheckDup)) {
        return {};
      }
      checkProductComboDuplicate[keyCheckDup] = 1;
      if (!comboId) {
        rs['groups'][keyProduct] = {
          product_id: productId,
          number,
        };
      } else {
        if (!checkItemInArray(rs.product_combo_ids, comboId)) {
          rs.product_combo_ids.push(comboId);
        }
        if (!rs['groups'].hasOwnProperty(keyProductCombo)) {
          rs['groups'][keyProductCombo] = {
            product_combo_id: comboId,
            products: [],
          };
        }
        rs['groups'][keyProductCombo]['products'].push({
          product_id: productId,
          number,
        });
      }
    }

    return rs;
  } catch (err) {
    return {};
  }
};

export const validateProductsAndProductCombosOrder = (
  groups: any,
  products: Product[],
  productCombos: ProductCombo[] = [],
) => {
  if (checkObjectIsEmpty(groups) || !products.length) {
    return false;
  }
  try {
    const mapProducts = generateMapDataWithKeyFieldPair('id', '', products);
    const mapProductCombos = generateMapDataWithKeyFieldPair(
      'id',
      '',
      productCombos,
    );
    for (const key in groups) {
      if (groups.hasOwnProperty(key)) {
        const group: GroupProductsAndProductCombosOrderInterface = groups[key];
        if (group.product_id) {
          // Check product exists
          if (!mapProducts.hasOwnProperty(group['product_id'])) {
            return false;
          }
        } else if (group.product_combo_id) {
          const { product_combo_id, products } = group;
          // Check product combo exists
          if (!mapProductCombos.hasOwnProperty(product_combo_id)) {
            return false;
          }
          if (!products || !products.length) {
            return false;
          }
          const productCombo: ProductCombo = mapProductCombos[product_combo_id];
          const mapProductComboDetail = generateMapDataWithKeyFieldPair(
            'product_id',
            'quantity',
            productCombo.details,
          );
          for (const product of products) {
            const { product_id, number } = product;
            // Check product exists
            // Check product belong to product combo
            if (
              !mapProducts.hasOwnProperty(product_id) ||
              !mapProductComboDetail.hasOwnProperty(product_id)
            ) {
              return false;
            }
            const quantity = mapProductComboDetail[product_id];
            // Check number product of combo in order and number product of combo in data combo detail
            if (0 != number % quantity) {
              return false;
            }
          }
        } else {
          return false;
        }
      }
    }
    // TODO: check if buy combo then must have full products of combo
  } catch (err) {
    return false;
  }

  return true;
};

export const checkAndAssignInventoryToProductsAndProductCombosOrder = (
  groups: any,
  products: Product[],
  productCombos: ProductCombo[] = [],
  dataInventoryCityToCustomerCities: MapInventoryCityToCustomerCity[],
  shipping: OrderShippingOnlyAddressDto = null,
) => {
  if (checkObjectIsEmpty(groups)) {
    return groups;
  }
  try {
    const mapProducts = products.length
      ? generateMapDataWithKeyFieldPair('id', '', products)
      : {};
    const mapProductCombos = dataInventoryCityToCustomerCities.length
      ? generateMapDataWithKeyFieldPair('id', '', productCombos)
      : {};
    const mapInventoryCityToCustomerCities = generateMapArrayDataWithKeyPair(
      'inventory_city_id',
      dataInventoryCityToCustomerCities,
    );
    for (const key in groups) {
      if (groups.hasOwnProperty(key)) {
        const group: GroupProductsAndProductCombosOrderInterface = groups[key];
        group.max_number_can_buy = -1;
        if (group.product_id) {
          const { product_id, number } = group;
          // Check product exists
          if (mapProducts.hasOwnProperty(group['product_id'])) {
            const product: Product = mapProducts[product_id];
            const findInventoryRs: FindInventoryCanSellProductRsInterface =
              findInventoryCanSellProduct(
                product,
                number,
                mapInventoryCityToCustomerCities,
                shipping,
              );
            if (findInventoryRs.result) {
              group.inventory_id = findInventoryRs.inventories_can_buy[0];
              /*group.remaining_number = getRemainingNumberProductInInventory(
                product,
                group.inventory_id,
              );*/
              mapProducts[product_id] = updateRemainingNumberProductInInventory(
                product,
                group.inventory_id,
                number,
              );
            } else {
              if (findInventoryRs.inventories_max_can_buy.length) {
                // Get inventory has highest remaining number of product
                const inventory =
                  findInventoryRs.inventories_max_can_buy[
                    findInventoryRs.inventories_max_can_buy.length - 1
                  ];
                group.max_number_can_buy = inventory.remaining_number;
                mapProducts[product_id] =
                  updateRemainingNumberProductInInventory(
                    product,
                    inventory.inventory_id,
                    group.max_number_can_buy,
                  );
              } else {
                group.max_number_can_buy = 0;
              }
            }
          } else {
            group.max_number_can_buy = 0;
          }
        } else if (group.product_combo_id) {
          const { product_combo_id, products } = group;
          // Check product combo exists
          if (mapProductCombos.hasOwnProperty(product_combo_id)) {
            const productCombo: ProductCombo =
              mapProductCombos[product_combo_id];
            const mapProductsInCombo = generateMapDataWithKeyFieldPair(
              'product_id',
              'quantity',
              productCombo.details,
            );
            const inventoriesCanSellProductsInCombo: any[] = [];
            const inventoriesMaxCanSellProductsInCombo: any[] = [];
            const mapInventoriesMaxCanSellProductsInCombo: any = {};
            let hasProductSoldOut = false;
            for (const product of products) {
              const { product_id, number } = product;
              const productObj: Product = mapProducts[product_id];
              const findInventoryRs: FindInventoryCanSellProductRsInterface =
                findInventoryCanSellProduct(
                  productObj,
                  number,
                  mapInventoryCityToCustomerCities,
                  shipping,
                );
              mapInventoriesMaxCanSellProductsInCombo[product_id] =
                generateMapDataWithKeyFieldPair(
                  'inventory_id',
                  'remaining_number',
                  findInventoryRs.inventories_max_can_buy,
                );
              if (findInventoryRs.result) {
                inventoriesCanSellProductsInCombo.push(
                  findInventoryRs.inventories_can_buy,
                );
              } else {
                if (findInventoryRs.inventories_max_can_buy.length) {
                  const inventoryIds =
                    findInventoryRs.inventories_max_can_buy.map((item) => {
                      return item.inventory_id;
                    });
                  inventoriesMaxCanSellProductsInCombo.push(inventoryIds);
                } else {
                  hasProductSoldOut = true;
                  break;
                }
              }
            }
            if (!hasProductSoldOut) {
              // All products in combo can buy
              if (!inventoriesMaxCanSellProductsInCombo.length) {
                // Find inventory sell all of products in combo
                const inventoriesCanSellAllProductsInCombo =
                  findMatchElementsFromMultiArrays(
                    inventoriesCanSellProductsInCombo,
                  );
                if (inventoriesCanSellAllProductsInCombo.length) {
                  // TODO: get first inventory can sell all of products in combo (temporary solution)
                  group.inventory_id = inventoriesCanSellAllProductsInCombo[0];
                  for (let index = 0; index < products.length; index++) {
                    const product = products[index];
                    const { product_id, number } = product;
                    const productObj: Product = mapProducts[product_id];
                    /*group.products[index].remaining_number =
                      getRemainingNumberProductInInventory(
                        productObj,
                        group.inventory_id,
                      );*/
                    mapProducts[product_id] =
                      updateRemainingNumberProductInInventory(
                        productObj,
                        group.inventory_id,
                        number,
                      );
                  }
                } else {
                  group.max_number_can_buy = 0;
                }
              }
              // Has at least one product can buy with number in order
              // Calcualte maximum number of product combo can buy
              else {
                const inventoriesMaxCanSellAllProductsInCombo =
                  findMatchElementsFromMultiArrays(
                    inventoriesMaxCanSellProductsInCombo,
                  );
                if (inventoriesMaxCanSellAllProductsInCombo.length) {
                  let maxNumberProductComboCanBuy = -1;
                  // TODO: get first inventory can sell all of products in combo (temporary solution)
                  const inventoryMaxCanSellAllProductsInCombo =
                    inventoriesMaxCanSellAllProductsInCombo[0];
                  for (const product of products) {
                    const { product_id, number } = product;
                    const productObj: Product = mapProducts[product_id];
                    const maxNumberProductCanBuy =
                      mapInventoriesMaxCanSellProductsInCombo[product_id][
                        inventoryMaxCanSellAllProductsInCombo
                      ];
                    const numberProductInComboDefinition =
                      mapProductsInCombo[product_id];
                    const newMaxNumberProductComboCanBuy = Math.floor(
                      maxNumberProductCanBuy / numberProductInComboDefinition,
                    );
                    if (
                      -1 == maxNumberProductComboCanBuy ||
                      newMaxNumberProductComboCanBuy <
                        maxNumberProductComboCanBuy
                    ) {
                      maxNumberProductComboCanBuy =
                        newMaxNumberProductComboCanBuy;
                    }
                    mapProducts[product_id] =
                      updateRemainingNumberProductInInventory(
                        productObj,
                        inventoryMaxCanSellAllProductsInCombo,
                        maxNumberProductCanBuy,
                      );
                  }
                  group.max_number_can_buy = maxNumberProductComboCanBuy;
                } else {
                  group.max_number_can_buy = 0;
                }
              }
            } else {
              group.max_number_can_buy = 0;
            }
          } else {
            group.max_number_can_buy = 0;
          }
        }
        groups[key] = group;
      }
    }
  } catch (err) {}

  return groups;
};

export const findInventoryCanSellProduct = (
  product: Product,
  numberBuy: number,
  mapInventoryCitiesToCustomerCities: any,
  shipping: OrderShippingOnlyAddressDto = null,
): FindInventoryCanSellProductRsInterface => {
  const rs: FindInventoryCanSellProductRsInterface = {
    result: false,
    inventories_can_buy: [],
    inventories_max_can_buy: [],
  };
  if (
    !product ||
    !numberBuy ||
    numberBuy < 0 ||
    checkObjectIsEmpty(mapInventoryCitiesToCustomerCities)
  ) {
    return rs;
  }
  if (!product.inventory_products || !product.inventory_products.length) {
    return rs;
  }
  try {
    let inventoriesSortByPriority = null;
    const mapInventoryProducts = generateMapDataWithKeyFieldPair(
      'inventory_id',
      'inventory',
      product.inventory_products,
    );
    if (shipping) {
      // Get inventory by priority order: same province -> in map province -> random
      inventoriesSortByPriority = {
        same_province: null,
        in_map_province: null,
        random: [],
      };
    }
    for (const element of product.inventory_products) {
      const { remaining_number, inventory_id } = element;
      if (remaining_number > 0) {
        // TODO: hiện tại chỉ cho phép lấy hàng từ 1 kho hàng duy nhất
        // TODO: sau này cần giải pháp để cho phép lấy hàng từ nhiều kho khác nhau
        rs.inventories_max_can_buy.push({
          inventory_id,
          remaining_number,
        });
        if (remaining_number >= numberBuy) {
          // check distance between shipping address and inventory's address to find the inventory that nearest
          if (shipping) {
            const inventory: Inventory = mapInventoryProducts[inventory_id];
            if (inventory.cityId == shipping.cityId) {
              inventoriesSortByPriority['same_province'] = inventory_id;
            } else {
              let mapCustomerCityIds = [];
              if (
                mapInventoryCitiesToCustomerCities.hasOwnProperty(
                  inventory.cityId,
                )
              ) {
                const mapInventoryCityToCustomerCities: MapInventoryCityToCustomerCity[] =
                  mapInventoryCitiesToCustomerCities[inventory.cityId];
                mapCustomerCityIds = mapInventoryCityToCustomerCities.map(
                  (item) => {
                    return item.customer_city_id;
                  },
                );
              }
              if (checkItemInArray(mapCustomerCityIds, shipping.cityId)) {
                inventoriesSortByPriority['in_map_province'] = inventory_id;
              } else {
                inventoriesSortByPriority['random'].push(inventory_id);
              }
            }
          } else {
            rs.inventories_can_buy.push(inventory_id);
          }
        }
      }
    }
    if (shipping) {
      if (inventoriesSortByPriority['same_province']) {
        rs.inventories_can_buy.push(inventoriesSortByPriority['same_province']);
      }
      if (inventoriesSortByPriority['in_map_province']) {
        rs.inventories_can_buy.push(
          inventoriesSortByPriority['in_map_province'],
        );
      }
      if (inventoriesSortByPriority['random'].length) {
        inventoriesSortByPriority['random'].forEach((element) => {
          rs.inventories_can_buy.push(element);
        });
      }
    }
    if (rs.inventories_can_buy.length) {
      rs.result = true;
    }
    if (rs.inventories_max_can_buy.length) {
      // Sort inventory - remaining number ASC
      rs.inventories_max_can_buy = sortArrayObjectsByField(
        rs.inventories_max_can_buy,
        'remaining_number',
      );
    }
  } catch (err) {}

  return rs;
};

export const getRemainingNumberProductInInventory = (
  product: Product,
  inventoryId: number,
) => {
  if (!product || !inventoryId) {
    return 0;
  }
  if (!product.inventory_products || !product.inventory_products.length) {
    return 0;
  }
  try {
    for (const element of product.inventory_products) {
      const { inventory_id } = element;
      if (inventory_id == inventoryId) {
        return element.remaining_number;
      }
    }
  } catch (err) {}

  return 0;
};

export const updateRemainingNumberProductInInventory = (
  product: Product,
  inventoryId: number,
  numberBuy: number,
) => {
  if (!product || !inventoryId || !numberBuy || numberBuy < 0) {
    return product;
  }
  if (!product.inventory_products || !product.inventory_products.length) {
    return product;
  }
  try {
    product.inventory_products = product.inventory_products.map((element) => {
      const { inventory_id } = element;
      if (inventory_id == inventoryId) {
        element.remaining_number -= numberBuy;
      }
      return element;
    });
  } catch (err) {}

  return product;
};

interface ProductInComboOrderInterface {
  product_id: number;
  number: number;
  //remaining_number: number;
}

interface InventoryCanSellProductInterface {
  inventory_id: number;
  remaining_number: number;
}

export interface GroupProductsAndProductCombosOrderInterface {
  product_id?: number;
  product_combo_id?: number;
  products?: ProductInComboOrderInterface[];
  number?: number;
  inventory_id?: number;
  max_number_can_buy?: number;
  //remaining_number?: number;
}

interface FindInventoryCanSellProductRsInterface {
  result: boolean;
  inventories_can_buy: number[];
  inventories_max_can_buy: InventoryCanSellProductInterface[];
}

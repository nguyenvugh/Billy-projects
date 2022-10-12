import {
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Image,
  Link as LinkUI,
  Stack,
  Text,
} from "@chakra-ui/react";
import Breadcrumb from "@ltp/components/Breadcrumb";
import Container from "@ltp/components/Container";
import { keyCache } from "@ltp/constants/data";
import useTranslation from "@ltp/hooks/useTranslation";
import { readCache } from "@ltp/services/datacache";
import { ROUTE_PRODUCT } from "@ltp/utils/constant";
import Lodash from "lodash";
import Link from "next/link";
import { useRouter, withRouter } from "next/router";
import useShoppingCart from "pages/shopping-cart/hook";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { MetadataTags } from "SEOs/meta-tag";
import DiscountCode from "./components/DiscountCode";
import TableCart from "./components/Table";

function ShoppingCart() {
  const router = useRouter();
  const { t, locale } = useTranslation();
  const { couponList, handleItemClick, discountSelect = {} } = useShoppingCart();
  const { items: listCart, removeItem, updateItemQuantity, updateItem } = useCart();
  const [datacart, setDatacart] = useState([]);
  const [productCouponList, setProductCouponList] = useState([]);
  const [dataCartCouponList, setDataCartCouponList] = useState([]);
  const [isApplyDiscount, setIsApplyDiscount] = useState(false);
  const [invalidOrder, setInvalidOrder] = useState({});
  useEffect(() => {
    const res = readCache(keyCache.invalidOrder, {});
    setInvalidOrder(res);
  }, []);
  useEffect(() => {
    setDatacart(listCart);
  }, [listCart]);
  useEffect(() => {
    let resCart = [];
    const idCarts = [];
    let idxProduct = -1;
    if (router?.query?.validate_cart === "true") {
      listCart.forEach((item) => {
        let isCombo = false;
        let product = {};
        let filterOrderInValid = [];
        if (item.comboId) {
          filterOrderInValid = invalidOrder?.products?.filter(
            (val) => val.comboId === item.comboId,
          );
          isCombo = true;
          if (filterOrderInValid?.length) {
            const item0 = filterOrderInValid[0];
            const detailCurrent = [];
            (filterOrderInValid || []).forEach((element) => {
              idxProduct = 1;
              const productComboDetail = item.details.find(
                (productCombo) => productCombo.product.id === element.productId,
              );
              const detail = {
                allow_cod: element?.product.allow_cod,
                contact_nlt: element?.product.contact_nlt,
                height: element?.product?.dimension?.height,
                length: element?.product.dimension?.length,
                width: element?.product?.dimension?.width,
                price: element?.product.price,
                weight: element?.product.weight,
              };
              detailCurrent.push({
                ...productComboDetail,
                quantity: element.product_combo.detail.quantity,
                percentage: element.product_combo.detail.percentage,
                detail: { ...element.detail, ...detail },
              });
            });
            const paramsUpdate = {
              ...item,
              status: item0?.product_combo.status,
              number_products: item0?.product_combo.number_products,
              total_price: item0?.product_combo.total_price,
              price: item0?.product_combo.total_price,
              itemTotal: item0?.product_combo.total_price,
              details: detailCurrent,
            };
            updateItem(item.id, paramsUpdate);
            resCart.push(paramsUpdate);
          } else {
            removeItem(item.id);
          }
        } else {
          filterOrderInValid = invalidOrder?.products?.filter(
            (val) => val.productId === item.idProduct,
          );
          if (filterOrderInValid?.length) {
            if (
              filterOrderInValid[0]?.product?.flash_sale?.id &&
              !idCarts.includes(item.idProduct)
            ) {
              if (item.quantity <= filterOrderInValid[0]?.product?.flash_sale?.quantity) {
                product = filterOrderInValid[0]?.product;
                idCarts.push(item.idProduct);
              }
            } else {
              product = { ...filterOrderInValid[0]?.product, flash_sale: {} };
              if (idCarts.includes(item.idProduct)) {
                idxProduct = resCart.findIndex((value) => value.idProduct === item.idProduct);
                if (idxProduct !== -1) {
                  product = {};
                  resCart[idxProduct].quantity = +resCart[idxProduct].quantity + +item.quantity;
                  updateItem(resCart[idxProduct].id, resCart[idxProduct]);
                }
              }
              if (!idCarts.includes(item.idProduct)) {
                idCarts.push(item.idProduct);
              }
            }
          }
        }
        if (!Lodash.isEmpty(product) && idxProduct === -1) {
          const itemUpdate = {
            ...item,
            allow_cod: product.allow_cod,
            contact_nlt: product?.contact_nlt,
            height: product?.dimension?.height,
            length: product.dimension?.length,
            width: product?.dimension?.width,
            price: product.price,
            weight: product.weight,
          };
          if (product?.flash_sale?.id) {
            itemUpdate.flash_sale = {
              ...item.flash_sale,
              ...product.flash_sale,
              flash_sale_id: product.flash_sale.id,
            };
          } else {
            itemUpdate.flash_sale = {};
          }
          if (product?.promotion?.id) {
            itemUpdate.promotion = {
              ...item.promotion,
              ...product.promotion,
              id: product.promotion.id,
            };
          } else {
            itemUpdate.promotion = {};
          }
          if (!Lodash.isEmpty(product?.product_combo)) {
            itemUpdate.total_price = product?.product_combo.total_price;
            itemUpdate.number_products = product?.product_combo.number_products;
            itemUpdate.status = product?.product_combo.status;
          }
          updateItem(itemUpdate.id, itemUpdate);
          resCart.push(itemUpdate);
        } else if (idxProduct === -1) {
          updateItem(item.id, item);
          resCart.push(item);
        } else if (idxProduct !== -1 && !isCombo) {
          removeItem(item.id);
        }
        idxProduct = -1;
      });
    } else {
      resCart = listCart;
    }
    setDataCartCouponList(resCart);
    setDatacart(resCart);
  }, [invalidOrder, router.query?.validate_cart]);

  const [orderError, setOrderError] = useState(() => {
    let data;
    try {
      data = JSON.parse(router.query.data);
    } catch (e) {
      // throw new Error(e);
      console.log(e);
    }
    return data;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productCouponList.length == 0) {
      removeCouponList();
      return;
    }
    const mergeCartAndCoupon = datacart.map((item, idx) => {
      const obj = item;
      if (item.id === productCouponList[idx]?.id) {
        if (productCouponList[idx].coupon) obj.coupon = productCouponList[idx].coupon;
      }
      return obj;
    });
    setDataCartCouponList(mergeCartAndCoupon);
  }, [datacart]);

  const getProductCouponList = (coupons) => {
    if (coupons.length == 0) {
      setProductCouponList([]);
      removeCouponList();
      return;
    }
    const couponsByKey = coupons.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {});
    const couponsByIds = coupons.map((coupon) => coupon.id);
    const mergeCartAndCoupon = dataCartCouponList.map((product) => {
      if (couponsByIds.includes(product.id)) {
        const coupon = { ...couponsByKey[product.id].coupon };
        // eslint-disable-next-line no-param-reassign
        if (coupon && Object.keys(coupon.length > 0)) product.coupon = coupon;
      }
      return product;
    });
    setDataCartCouponList(mergeCartAndCoupon);
    setProductCouponList(coupons);
  };

  const updatePricingCartList = (list) => {
    setDataCartCouponList(list);
    setProductCouponList([]);
  };

  useEffect(() => {
    if (setIsApplyDiscount) setIsApplyDiscount(false);
  }, [isApplyDiscount]);

  const removeCouponList = () => {
    const removedCouponList = datacart.map((item) => {
      const obj = item;
      obj?.coupon && delete obj?.coupon;
      return obj;
    });

    setDataCartCouponList(removedCouponList);
  };

  const handleUpdateItemQuantity = (id, quantity) => {
    updateItemQuantity(id, quantity);
    setIsApplyDiscount(true);
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
    setIsApplyDiscount(true);
  };

  return (
    <div>
      <MetadataTags title={t("cart")} notIndex />
      <main>
        <Container>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link href="/">
                <BreadcrumbLink>{t("homePage")}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <Text>{t("cart")}</Text>
            </BreadcrumbItem>
          </Breadcrumb>
          {datacart.length > 0 ? (
            <div>
              <Stack direction="row">
                <Flex alignItems="center" mb={12}>
                  <Text as="h1" display="inline" fontSize="24px" fontWeight="bold" color="#2154FF">
                    {t("cart")}
                  </Text>
                  <Text as="span" fontSize="18px" color="#2154FF" ml="12px">
                    {datacart.length} {t("items")}
                  </Text>
                </Flex>
              </Stack>
              <TableCart
                productCouponList={productCouponList}
                datacart={dataCartCouponList}
                removeItem={handleRemoveItem}
                updateItemQuantity={handleUpdateItemQuantity}
                orderError={orderError}
                loading={loading}
              />
              <Box marginBottom="100px">
                <DiscountCode
                  updatePricingCartList={updatePricingCartList}
                  shouldApplyDiscount={isApplyDiscount}
                  productCouponList={getProductCouponList}
                  onItemClick={handleItemClick}
                  couponList={couponList}
                  datacart={datacart}
                  setOrderError={setOrderError}
                  loading={loading}
                  setLoading={setLoading}
                  discountSelect={discountSelect}
                />
              </Box>
            </div>
          ) : (
            <Box pb={{ base: 8, md: 16, lg: 16 }}>
              <Box textAlign="center">
                <Image
                  paddingTop="110px"
                  src="/imgs/mock/shopping-cart/ic_cart_empty.png"
                  alt="Icon Cart Is Empty"
                  margin="0 auto"
                  padding="0 15%"
                />
                <Text padding="38px 24px" fontSize="18px" fontWeight="500" color="#000000">
                  {t("noProductInYourStore")}
                </Text>
                <Link passHref shallow href={ROUTE_PRODUCT(locale)}>
                  <LinkUI
                    color="#FFFFFF"
                    bg="#FEBD17"
                    borderRadius="4px"
                    padding="11px 28px"
                    display="inline-block"
                    _hover={{
                      textDecoration: "none",
                    }}
                  >
                    {t("continueShopping")}
                  </LinkUI>
                </Link>
              </Box>
            </Box>
          )}
        </Container>
      </main>
    </div>
  );
}

export default withRouter(ShoppingCart);

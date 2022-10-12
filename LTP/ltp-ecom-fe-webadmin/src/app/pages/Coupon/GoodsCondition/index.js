import { Box, Grid, InputAdornment, MenuItem } from "@material-ui/core";
import DangerButton from "app/components/Button/DangerButton";
import DropdownMenu from "app/components/DropDownMenu";
import TextFields from "app/components/TextFields";
import { LANG_VI } from "app/utils/constant";
import { useCallback, useEffect, useState } from "react";
import Lodash from "lodash";
import { fetchProductsCouponAxios } from "app/services/product";
import { getTranslateField } from "app/utils";
import { isNumeric, numberWithCommas, unsignText } from "app/utils/common";
import Select from "react-select";

const GoodsCondition = ({
  index,
  goodsCondition,
  lang,
  detail,
  onRemove,
  setGoodsConditionList,
  goodsConditionList,
  validate,
}) => {
  const [productSelect, setProductSelect] = useState({});
  const [open, setOpen] = useState(false);
  const [listAllProduct, setListAllProduct] = useState([]);
  const [productsTrans, setProductsTrans] = useState([]);
  const [productsTransOld, setProductsTransOld] = useState([]);
  const formatPrice = (value) => {
    let res = (value || "")
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return res;
  };
  const onChaneDiscount = (e) => {
    let value = e.target.value;
    const isValidNumber = isNumeric(value || 0);
    if (!isValidNumber) return;
    if (parseInt(value) > 100) {
      changeValueGoodsCondition({ percentage: "100" });
    } else {
      changeValueGoodsCondition({ percentage: value });
    }
  };

  const remove = () => {
    onRemove instanceof Function && onRemove(index);
  };

  const onChangeProduct = (product) => {
    setProductSelect(product);
    changeValueGoodsCondition({ product: product });
    setOpen(false);
  };
  const changeValueGoodsCondition = (value) => {
    let flag = { ...goodsCondition, ...value };
    let arr1 = Lodash.slice(goodsConditionList, 0, index);
    let arr2 = Lodash.slice(goodsConditionList, index + 1);
    setGoodsConditionList([...arr1, flag, ...arr2]);
  };

  const onChaneQuantity = (e) => {
    changeValueGoodsCondition({ quantity: e.target.value });
  };
  useEffect(() => {
    const getProductList = async () => {
      const res = await fetchProductsCouponAxios();
      let results = Lodash.get(res, "data.data", []);

      setListAllProduct(results);
    };
    getProductList();
  }, []);
  useEffect(() => {
    if (listAllProduct.length) {
      const results = listAllProduct.map((item) => {
        const translates = Lodash.get(item, "translates", []);
        const trans = translates.filter((el) => el.language_code === lang);
        const resTras = trans.length ? trans[0] : {};
        const { id, ...rest } = resTras;
        return {
          ...item,
          ...rest,
          value: item.id,
          label: resTras?.name || "",
        };
      });
      const product = results.filter(
        (item) =>
          +item.id === (goodsCondition.product?.id || goodsCondition.product)
      );
      setProductSelect(product[0] || {});
      if ((product[0] || {})?.id) {
        changeValueGoodsCondition({ product: product[0] || {} });
      }
      setProductsTrans(results);
      // setProductsTransOld(results);
    }
  }, [lang, listAllProduct]);

  // const onChangeSearch = (text) => {
  //   if (text) {
  //     const textSearch = unsignText(text.toLowerCase());
  //     const arrFilter = productsTrans.filter((item) =>
  //       unsignText(item.name.toLowerCase()).includes(textSearch)
  //     );
  //     setProductsTrans(arrFilter);
  //   } else {
  //     setProductsTrans(productsTransOld);
  //   }
  // };

  const validateQuantity = () => {
    const item2 = goodsConditionList[index] || {};
    if (goodsConditionList.length > 1 && +index > 0 && !!item2) {
      const isProductExist = goodsConditionList.filter(
        (el, indexCondition) =>
          (el?.product?.id || el?.product) ===
            (item2?.product?.id || item2?.product) && indexCondition != index
      );
      const ProductExist = goodsConditionList.filter(
        (el, indexCondition) =>
          (el?.product?.id || el?.product) ===
            (item2?.product?.id || item2?.product) && indexCondition < index
      );
      if (isProductExist.length >= 1 && ProductExist.length > 0) {
        const item1 = ProductExist[ProductExist.length - 1];
        let quantity1 = +item1?.quantity;
        let quantity2 = +item2.quantity;
        if (quantity1 >= quantity2) {
          return true;
        }
      }
    }
    return false;
  };
  const validatePercentage = () => {
    const item2 = goodsConditionList[index] || {};
    if (goodsConditionList.length > 1 && +index > 0 && !!item2) {
      const isProductExist = goodsConditionList.filter(
        (el, indexCondition) =>
          (el?.product?.id || el?.product) ===
            (item2?.product?.id || item2?.product) && indexCondition != index
      );
      const ProductExist = goodsConditionList.filter(
        (el, indexCondition) =>
          (el?.product?.id || el?.product) ===
            (item2?.product?.id || item2?.product) && indexCondition < index
      );
      if (isProductExist.length >= 1 && ProductExist.length > 0) {
        const item1 = ProductExist[ProductExist.length - 1];
        let percentage1 = +item1.percentage;
        let percentage2 = +item2.percentage;
        if (+percentage1 >= +percentage2) {
          return true;
        }
      }
    }
    return false;
  };
  const helperTextQuantity = () => {
    let error = "";
    if (lang === LANG_VI) {
      if (validate && !goodsCondition.quantity) {
        error = "Số lượng từ được yêu cầu";
      } else if (validate && validateQuantity()) {
        error = "Số lượng không hợp lệ với sản phẩm trước";
      }
    } else {
      if (validate && !goodsCondition.quantity) {
        error = "Buy quantity is require";
      } else if (validate && validateQuantity()) {
        error = "Quantity is not valid with previous product";
      }
    }
    return error;
  };
  const helperTextPercentage = () => {
    let error = "";
    if (lang === LANG_VI) {
      if (validate && !goodsCondition.percentage) {
        error = "Giảm giá được yêu cầu";
      }
    } else {
      if (validate && !goodsCondition.percentage) {
        error = "Discount is require";
      }
    }
    return error;
  };
  // const stopImmediatePropagation = (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  // };
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <TextFields
          label={lang === LANG_VI ? "Sản phẩm" : "Product"}
          required
          helperText={lang === LANG_VI ? "Chọn sản phẩm" : "Select product"}
          error={validate && !productSelect?.id}
        >
          <Select
            value={productSelect}
            onChange={onChangeProduct}
            options={productsTrans}
            isSearchable
            isDisabled={detail}
            menuPortalTarget={document.querySelector("body")}
            menuContainerStyle={{ zIndex: 999 }}
            classNamePrefix="select"
          />
          {/* <DropdownMenu
            renderButton={renderButton}
            open={open}
            setOpen={setOpen}
            disabled={detail}
            clickToClose={false}
          >
            <MenuItem
              dense
              divider
              onClickCapture={stopImmediatePropagation}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <input
                className="text-field-input"
                onChange={(e) => {
                  setTimeout(() => {
                    onChangeSearch(e.target.value);
                  }, 300);
                }}
              />
            </MenuItem>
            {Array.isArray(productsTrans) &&
              productsTrans.map((item) => (
                <MenuItem key={item.id} onClick={() => onChangeProduct(item)}>
                  {item.name}
                </MenuItem>
              ))}
          </DropdownMenu> */}
        </TextFields>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextFields
          label={lang === LANG_VI ? "Số lượng từ" : "Buy quantity"}
          required
          placeholder={lang === LANG_VI ? "Từ" : "From"}
          type="number"
          disabled={detail}
          helperText={helperTextQuantity()}
          error={
            (validate && !goodsCondition.quantity) ||
            (validate && validateQuantity())
          }
          onChange={onChaneQuantity}
          value={goodsCondition.quantity}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextFields
          label={lang === LANG_VI ? "Giảm giá (%)" : "Discount (%)"}
          required
          helperText={helperTextPercentage()}
          error={
            (validate && !goodsCondition.percentage) ||
            (validate && validatePercentage())
          }
        >
          <Box display="flex" alignItems="center">
            {/* <input
              type="number"
              className="text-field-input"
              placeholder="%"
              disabled={detail}
              value={formatPrice(goodsCondition.percentage)}
              onChange={onChaneDiscount}
            /> */}

            <TextFields
              // className="text-field-input"
              placeholder="%"
              endAdornment={
                <InputAdornment position="end">
                  <Box color="#3A3A3A" fontWeight="bold">
                    %
                  </Box>
                </InputAdornment>
              }
              value={numberWithCommas(goodsCondition.percentage)}
              onChange={onChaneDiscount}
              inputProps={{ maxLength: 5 }}
              disabled={detail}
            />
            {!detail && (
              <DangerButton
                style={{ marginLeft: 16 }}
                onClick={remove}
                disabled={goodsConditionList.length <= 1}
              >
                Xóa
              </DangerButton>
            )}
          </Box>
        </TextFields>
      </Grid>
    </Grid>
  );
};
GoodsCondition.defaultProps = {
  goodsCondition: {},
};
export default GoodsCondition;

const productList = [
  {
    id: 1,
    name: "Sản phẩm 1",
  },
  {
    id: 2,
    name: "Sản phẩm 2",
  },
];

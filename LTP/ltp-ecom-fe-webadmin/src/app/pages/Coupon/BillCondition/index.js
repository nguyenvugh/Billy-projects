import {
  Box,
  Grid,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import DangerButton from "app/components/Button/DangerButton";
import GrayButton from "app/components/Button/GrayButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import TextFields from "app/components/TextFields";
import { LANG_VI } from "app/utils/constant";
import { Fragment, useCallback, useState } from "react";
import Lodash from "lodash";
const BillCondition = ({
  index,
  billCondition,
  lang,
  detail,
  onRemove,
  billConditionList,
  setBillConditionList,
  validate,
  setValidate
}) => {
  const onValidateCondition = () => {
    const item2 = billConditionList[index] || {};
    if (billConditionList.length > 1 && +index > 0 && !!item2) {
      const item1 = billConditionList[index - 1] || {};
      let value1 = item1?.value;
      let value2 = item2?.value;
      if (item1?.type === 1) {
        value1 = (+item1?.value / +item1.price) * 100;
      }
      if (item2?.type === 1) {
        value2 = (+item2?.value / +item2?.price) * 100;
      }
      if (value2) {
        if (+value1 >= +value2) {
          return true;
        }
      }
    }
    return false;
  };
  const onValidateConditionPrice = () => {
    const item2 = billConditionList[index] || {};
    if (billConditionList.length > 1 && +index > 0 && !!item2) {
      const item1 = billConditionList[index - 1] || {};
      let price1 = item1?.price;
      let price2 = item2?.price;
      if (price2) {
        if (+price1 > +price2) {
          return true;
        }
      }
    }
    return false;
  };
  const [type, setType] = useState(billCondition?.type || 1);
  const formatPrice = (value) => {
    let res = (value || "")
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return res;
  };
  const onChaneTotal = (e) => {
    let value = e.target.value.replaceAll(".", "");
    if (/^0{2,}/.test(value) || /\D+/.test(value)) {
      return;
    } else {
      changeValueBillCondition({
        price: value,
      });
    }
  };
  const onChaneDiscount = (e) => {
    let value = e.target.value.replaceAll(".", "");
    if (/^0{2,}/.test(value) || /\D+/.test(value)) {
      return;
    }
    if (type === 2) {
      if (+value <= 100) {
        if (/^0[1-9]/.test(value)) {
          changeValueBillCondition({ value: value.slice(1) });
        } else {
          changeValueBillCondition({ value: value });
        }
      }
    } else {
      if (/^0[1-9]/.test(value)) {
        changeValueBillCondition({ value: value.slice(1) });
      } else {
        if(+value > billCondition.price){
          setValidate(true)
        }else{
          setValidate(false)
        }
        changeValueBillCondition({ value: value });
      }
    }
  };
  const onChangeUnit = (unit) => {
    if (billCondition?.type) {
      setType(unit);
      changeValueBillCondition({ type: unit, value: "" });
    }
  };
  const changeValueBillCondition = (value) => {
    let flag = { ...billCondition, ...value };
    let arr1 = Lodash.slice(billConditionList, 0, index);
    let arr2 = Lodash.slice(billConditionList, index + 1);
    setBillConditionList([...arr1, flag, ...arr2]);
  };
  const remove = () => {
    onRemove instanceof Function && onRemove(index);
  };
  const helperTextDiscount = () => {
    let error = "";
    if (lang === LANG_VI) {
      if (validate && !billCondition.value) {
        error = "Giảm giá được yêu cầu";
      } else if (validate && onValidateCondition()) {
        error = "Điều kiện sau phải lớn hơn điều kiện trước";
      } else if (validate && type === 1 && +billCondition.value > +billCondition.price) {
        error = "Giảm giá phải bé hơn tổng tiền hàng";
      }
    } else {
      if (validate && !billCondition.value) {
        error = "Discount is require";
      } else if (validate && onValidateCondition()) {
        error = "The latter condition must be greater than the former";
      }else if (validate && type === 1 && +billCondition.value > +billCondition.price) {
        error = "The discount must be less than the total amount";
      }
    }
    return error;
  };
  const helperTextDiscountPrice = () => {
    let error = "";
    if (lang === LANG_VI) {
      if (validate && !billCondition.value) {
        error = "Tổng tiền hàng được yêu cầu";
      } else if (validate && onValidateConditionPrice()) {
        error = "Tổng tiền hàng không phù hợp với điều kiện trước";
      }
    } else {
      if (validate && !billCondition.value) {
        error = "Total order price is require";
      } else if (validate && onValidateConditionPrice()) {
        error =
          "The total amount of goods does not match the previous condition";
      }
    }
    return error;
  };

  return (
    <Grid container spacing={4} style={{ marginBottom: 15 }}>
      <Grid item xs={12} md={4} style={{ paddingTop: 0, paddingBottom: 0 }}>
        <TextFields
          label={lang === LANG_VI ? "Tổng tiền hàng" : "Total order price"}
          required
          helperText={helperTextDiscountPrice()}
          error={
            (validate && !billCondition.price) ||
            (validate && onValidateConditionPrice())
          }
          placeholder={lang === LANG_VI ? "Từ" : "From"}
          disabled={detail}
          value={formatPrice(billCondition.price)}
          onChange={onChaneTotal}
          endAdornment={
            <InputAdornment position="end">
              <span>
                <strong>VND</strong>
              </span>
            </InputAdornment>
          }
        />
      </Grid>
      <Grid item xs={12} md={8} style={{ paddingTop: 0, paddingBottom: 0 }}>
        <TextFields
          label={lang === LANG_VI ? "Giảm giá" : "Discount"}
          required
          helperText={helperTextDiscount()}
          error={
            (validate && !billCondition.value) ||
            (validate && onValidateCondition()) || 
            (validate && type === 1 && +billCondition.value > +billCondition.price)
          }
        >
          <Box display="flex" alignItems="center">
            <OutlinedInput
              style={{ width: "50%", height: 38 }}
              disabled={detail}
              placeholder={lang === LANG_VI ? "Từ" : "From"}
              value={
                type === 1
                  ? formatPrice(billCondition.value)
                  : billCondition.value
              }
              onChange={onChaneDiscount}
              endAdornment={
                type === 1 ? (
                  <InputAdornment position="end">
                    <span>
                      <strong>VND</strong>
                    </span>
                  </InputAdornment>
                ) : null
              }
            />
            {type === 1 ? (
              <Fragment>
                <PrimaryButton style={{ marginLeft: 8, pointerEvents: "none" }}>
                  VND
                </PrimaryButton>
                <GrayButton
                  style={{ marginLeft: 8 }}
                  onClick={() => onChangeUnit(2)}
                  disabled={detail}
                >
                  %
                </GrayButton>
              </Fragment>
            ) : (
              type === 2 && (
                <Fragment>
                  <GrayButton
                    style={{ marginLeft: 8 }}
                    onClick={() => onChangeUnit(1)}
                    disabled={detail}
                  >
                    VND
                  </GrayButton>
                  <PrimaryButton
                    style={{ marginLeft: 8, pointerEvents: "none" }}
                  >
                    %
                  </PrimaryButton>
                </Fragment>
              )
            )}
            {!detail && (
              <DangerButton
                style={{ marginLeft: 24 }}
                onClick={remove}
                disabled={billConditionList.length <= 1}
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

BillCondition.defaultProps = {
  billConditionList: [],
  setBillConditionList: () => {},
  validate: false,
};
export default BillCondition;

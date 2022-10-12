import { CircularProgress, OutlinedInput } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { ACTION_TYPE } from "app/reducers/product";
import { LANG_VI, PAGE_SIZE_UNLIMIT } from "app/utils/constant";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SelectProduct = ({ value, onChange, disabled = false }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const productList = useSelector((store) => store.product.productList);
  const loading = useSelector((store) => store.product.loading);

  useEffect(() => {
    if (!disabled) {
      dispatch({
        type: ACTION_TYPE.GET_PRODUCT_LIST_REQUEST,
        params: { page: 1, limit: PAGE_SIZE_UNLIMIT }
      })
    }
  }, [dispatch, disabled])

  const onOpen = () => {
    if (!disabled) {
      setOpen(true);
    }
  }

  const onClose = () => {
    setOpen(false);
  }

  const onChangeProduct = (e, product) => {
    setOpen(false);
    onChange instanceof Function && onChange(product);
  }

  const renderInput = (params) => {
    return (
      <OutlinedInput
        ref={params.InputProps.ref}
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password',
          onChange: e => {
            if (disabled) return;
            params.inputProps.onChange(e);
          },
          onBlur: () => {
            setOpen(false);
          }
        }}
        className="text-input"
        placeholder="Tìm sản phẩm"
        fullWidth
        disabled={disabled}
        endAdornment={
          !disabled &&
          <Fragment>
            {loading ? <CircularProgress size={18} style={{ marginRight: 4 }} /> : null}
            {params.InputProps.endAdornment}
          </Fragment>
        }
      />
    )
  }

  return (
    <Autocomplete
      style={{ width: "100%" }}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      getOptionSelected={(option, value) => option?.id === value?.id}
      getOptionLabel={option => (option?.[LANG_VI]?.name || "")}
      options={loading ? [] : productList}
      loading={loading}
      renderInput={renderInput}
      defaultValue={value}
      onChange={onChangeProduct}
    />
  )
}

export default SelectProduct;
import { Button, Divider, Grid, makeStyles, Modal } from '@material-ui/core';
import { formatVND } from 'app/utils/common';

import React, { useEffect, useState, useLayoutEffect } from 'react';
import CalendarPicker from 'app/components/CalendarPicker';
import Input from '../components/Input';
import { getProductList as _getProductList, createFlashSale as _createFlashSale, updateFlashSale as _updateFlashSale, PRODUCT_STATUS } from 'app/services/flashsale';
import { formatDateTime } from 'app/utils/validate';

export const __FLASH_SALE = {
  name: '',
  startDate: '',
  endDate: '',
};


const FIELDS = {
  name: {
    label: 'Tên chương trình',
    placeholder: 'Nhập tên chương trình'
  },
  startDate: {
    label: 'Ngày bắt đầu',
    placeholder: 'dd/mm/yyyy hh:mm'
  },
  endDate: {
    label: 'Ngày kết thúc',
    placeholder: 'dd/mm/yyyy hh:mm'
  }
};


function AddFlashSale({ isCreate, isOpen, onClose, onSubmit, defaultForm }) {
  const classes = useStyles();
  const [errors, setErrors] = useState(__FLASH_SALE);
  const [form, setForm] = useState(__FLASH_SALE);


  const createFlashSale = async () => {
    try {
      const params = {
        name: form.name.trim(),
        start_date: form.startDate,
        end_date: form.endDate
      };
      const request = await _createFlashSale(params);
      onSubmit && onSubmit();
    } catch (error) {

    }
  };

  const handleChange = (key, value) => {
    // console.log(value);
    setForm(prevState => ({ ...prevState, [key]: value }));
  };
  const handleAddProduct = () => {
    const isValid = validateForm();
    if (!isValid) return;
    createFlashSale();
  };


  const handleClose = () => { onClose && onClose(); };
  const validateForm = () => {
    let isValid = true;
    const isEmpty = Object.keys(form).every((key, val, arr) => {
      return form[key] && String(form[key]).length > 0;
    });

    if (!isEmpty) {
      const errorMessage = Object.keys(form).reduce((obj, key, index) => {
        return ({ ...obj, [key]: !form[key] && `${FIELDS[key].label} được yêu cầu` });
      }, {});
      setErrors(errorMessage);
      isValid = false;
    }

    // if (new Date(form.startDate) < new Date()) {
    //   setErrors(prevState => ({ ...prevState, startDate: 'Ngày bắt đầu không hợp lệ' }));
    //   isValid = false;
    // }

    if (new Date(form.endDate) < new Date(form.startDate)) {
      setErrors(prevState => ({ ...prevState, endDate: 'Ngày kết thúc không hợp lệ' }));
      isValid = false;
    }

    return isValid;

  };
  return (
    <Modal
      open={isOpen}
    // onClose={handleClose}
    >
      <div className={classes.container}>
        <header className={classes.header}>
          <span>{isCreate ? 'Thêm Flashsale' : 'Sửa Flashsale'}</span>
        </header>

        <article className={classes.article}>
          <Grid container>
            <Grid item xs>
              <Grid container spacing={2}>

                <Grid item xs>
                  <Input
                    required
                    error={errors.name}
                    id='name'
                    defaultValue={form.name}
                    labelName={FIELDS.name.label}
                    placeholder={FIELDS.name.placeholder}
                    onChange={(val) => handleChange('name', val)}
                  />
                </Grid>

                <Grid item xs>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs>
                  <CalendarPicker
                    required
                    error={errors.startDate}
                    type='datetime-local'
                    displayValue={formatDateTime(form.startDate)}
                    defaultValue={form.startDate}
                    labelName={FIELDS.startDate.label}
                    placeholder={FIELDS.startDate.placeholder}
                    onChange={(val) => handleChange('startDate', val)}
                  />
                </Grid>
                <Grid item xs>
                  <CalendarPicker
                    required
                    error={errors.endDate}
                    type='datetime-local'
                    displayValue={formatDateTime(form.endDate)}
                    defaultValue={form.endDate}
                    labelName={FIELDS.endDate.label}
                    placeholder={FIELDS.endDate.placeholder}
                    onChange={(val) => handleChange('endDate', val)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{ marginTop: 24 }}>

          </Grid>
        </article>
        {/* {alertError.isShow && <p class={classes.error}>{alertError.error}</p>} */}
        <footer className={classes.footer}>
          <Grid className={classes.buttons} container spacing={2}>
            <Grid item xs={3}>
              <Button
                fullWidth
                onClick={handleClose}
                variant="outlined"
                classes={{
                  root: classes.cancelButton,
                  label: classes.labelCancelButton
                }}>
                Huỷ
              </Button>
            </Grid>

            <Grid item xs={3}>
              <Button
                fullWidth
                disableElevation
                onClick={handleAddProduct}
                variant="contained"
                classes={{
                  root: classes.addButton,
                  label: classes.labelAddButton,
                }}>
                {isCreate ? 'Thêm' : 'Lưu lại'}
              </Button>
            </Grid>
          </Grid>
        </footer>

      </div>
    </Modal>
  );
}

AddFlashSale.defaultProps = {
  isOpen: false,
  isCreate: true,
  products: [],
  defaultData: {
    productId: '',
    productName: '',
    productQuantity: '',
    productPrice: '',
    productDiscount: '',
    productReducedPrice: '',
    productStatus: '',
  }
};


const useStyles = makeStyles(theme => ({
  container: {
    width: '550px',
    backgroundColor: '#ffffff',

    borderRadius: '6px',
    padding: '16px',

    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

  },

  header: {
    borderBottom: '1px solid #EEEEEE',
    padding: '8px 12px 12px',
    '& span': {
      fontSize: '18px',
      fontWeight: 600,
      margin: 0,
    }
  },

  article: {
    borderBottom: '1px solid #EEEEEE',
    padding: '14px 12px 20px',
    '& .MuiGrid-item > div:not(:first-child)': {
      // marginTop: 24,
    }
  },

  footer: {
    marginTop: '24px',
    marginBottom: '14px'
  },
  buttons: {
    justifyContent: 'flex-end'
  },

  cancelButton: {
  },
  addButton: {
    backgroundColor: '#3952D3'
  },
  labelCancelButton: {
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  labelAddButton: {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },

  productReducedPriceLabel: {
    color: '#49A8FF'
  },

  productReducedPriceInput: {
    backgroundColor: '#EEF2FF',
    '& .MuiInputBase-input': {
      color: '#1E72C0'
    },
    '& .MuiInputAdornment-root > span': {
      color: '#1E72C0'
    }
  },
  error: {
    color: '#EA403F',
    fontSize: 14
  }

}));



export default AddFlashSale;
import { createSlice } from "@reduxjs/toolkit";
import {
  createCoupon,
  deleteCoupons,
  editCoupon,
  getCouponId,
  getCouponList,
} from "app/services/coupon";
import { PAGE_SIZE } from "app/utils/constant";
export const fetchListCoupon = (params) => async (dispatch, getState) => {
  try {
    const response = await getCouponList(params);
    let payload = {
      listCoupon: response.data?.data.results || [],
      totalCoupons: response.data?.data.totalRecords || 0,
    };
    dispatch(updateData(payload));
    return response;
  } catch (error) {
    return error;
  }
};
export const fetchCoupon = (params) => async (dispatch, getState) => {
  try {
    const response = await getCouponId(params);
    let payload = {
      coupon: response.data?.data || {},
    };
    dispatch(updateData(payload));
    return response;
  } catch (error) {
    return error;
  }
};
export const fetchCreateCoupon = (params) => async (dispatch, getState) => {
  try {
    const response = await createCoupon(params);
    const state = getState().coupon;
    const listCoupon = state.listCoupon || [];
    if (listCoupon.length) {
      let payloadListCoupon = {
        listCoupon: [
          {
            ...(response?.data?.data || {}),
            ...params,
            start_date: params.start_date,
            start_time: params.start_time,
            end_date: params.end_date,
            end_time: params.end_time,
            translates: params.contents,
            requirements:
              params.type === 1
                ? params.order_requirements
                : params.product_requirements,
          },
          ...listCoupon,
        ],
      };
      dispatch(updateData(payloadListCoupon));
    } else {
      dispatch(fetchListCoupon({ page: 1, limit: PAGE_SIZE }));
    }
    return response;
  } catch (error) {
    return error;
  }
};
export const fetchUpdateCoupon = (params) => async (dispatch, getState) => {
  try {
    const response = await editCoupon(params);
    const state = getState().coupon;
    const listCoupon = state.listCoupon || [];
    if (listCoupon.length) {
      let payloadListCoupon = {
        listCoupon: [
          ...listCoupon.map((item) => {
            if (item.id === +params.id) {
              return {
                ...params,
                start_date: params.start_date,
                start_time: params.start_time,
                end_date: params.end_date,
                end_time: params.end_time,
                translates: params.contents,
                requirements:
                  params.type === 1
                    ? params.order_requirements
                    : params.product_requirements,
              };
            } else {
              return item;
            }
          }),
        ],
      };
      dispatch(updateData(payloadListCoupon));
    } else {
      dispatch(fetchListCoupon({ page: 1, limit: PAGE_SIZE }));
    }
    return response;
  } catch (error) {
    return error;
  }
};
export const fetchDeleteCoupons = (params) => async (dispatch, getState) => {
  try {
    const { ids } = params;
    const response = await deleteCoupons({ ids: ids.join(",") });
    return response;
  } catch (error) {
    return error;
  }
};
export const setupCoupon = createSlice({
  name: "coupon",
  initialState: {
    listCoupon: [],
    totalCoupons: 0,
    coupon: {},
  },
  reducers: {
    updateData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateData } = setupCoupon.actions;
export default setupCoupon.reducer;

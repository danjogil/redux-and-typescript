import { RootState } from "@/store";
import { Shipment } from "@/types";
import {
  createSlice,
  PayloadAction,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import axios from "axios";

export interface ShipmentState {
  shipments: Shipment[];
  currentShipment: Shipment;
  isLoading: boolean;
}

const initialState: ShipmentState = {
  shipments: [],
  currentShipment: {
    id: "",
    orderNo: "",
    date: "",
    customer: "",
    trackingNo: "",
    status: "",
    consignee: "",
  },
  isLoading: false,
};

const shipmentsSlice = createSlice({
  name: "shipments",
  initialState,
  reducers: {
    getShipments(state, action: PayloadAction<Shipment[]>) {
      state.shipments = action.payload;
      state.isLoading = false;
    },
    getShipment(state, action: PayloadAction<Shipment>) {
      state.currentShipment = action.payload;
      state.isLoading = false;
    },
    loading(state) {
      state.isLoading = true;
    },
  },
});

export const getShipments =
  (): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch) => {
    try {
      dispatch(shipmentsSlice.actions.loading());
      const res = await axios.get<Shipment[]>(
        `https://practice-api-beryl.vercel.app/shipments`
      );
      const data: Shipment[] = res.data || [];
      dispatch(shipmentsSlice.actions.getShipments(data));
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };

export const getShipment =
  (id: string): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch) => {
    try {
      dispatch(shipmentsSlice.actions.loading());
      const res = await axios.get<Shipment>(
        `https://practice-api-beryl.vercel.app/shipments/${id}`
      );
      const data: Shipment = res.data || {};
      dispatch(shipmentsSlice.actions.getShipment(data));
    } catch (error) {
      console.error("Error fetching shipment:", error);
    }
  };

export const getAllShipments = (state: RootState) => state.shipments.shipments;
export const getCurrentShipment = (state: RootState) =>
  state.shipments.currentShipment;
export const getLoadingState = (state: RootState) => state.shipments.isLoading;

export default shipmentsSlice.reducer;

import { RootState } from "@/store";
import { Shipment } from "@/types";
import {
  createSlice,
  PayloadAction,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

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
    updateShipment(state) {
      state.isLoading = false;
    },
    deleteShipment(state) {
      state.isLoading = false;
    },
    loading(state) {
      state.isLoading = true;
    },
    error(state) {
      state.currentShipment = {
        id: "",
        orderNo: "",
        date: "",
        customer: "",
        trackingNo: "",
        status: "",
        consignee: "",
      };
      state.isLoading = false;
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
      toast.error("Shipments could not be loaded");
      throw new Error("Shipments could not be loaded");
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
      dispatch(shipmentsSlice.actions.error());
      console.error("Error fetching shipment:", error);
      toast.error("Shipment could not be loaded");
      throw new Error("Shipment could not be loaded");
    }
  };

export const updateShipment =
  (
    updateObj: Shipment,
    id: string
  ): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch) => {
    try {
      dispatch(shipmentsSlice.actions.loading());

      await axios.put<Shipment>(
        `https://practice-api-beryl.vercel.app/shipments/${id}`,
        updateObj
      );

      dispatch(shipmentsSlice.actions.updateShipment());
      dispatch(getShipment(id));

      toast.success("Shipment successfully updated");
    } catch (error) {
      console.error("Error updating shipment:", error);
      dispatch(getShipment(id));
      toast.error("Shipment could not be updated");
      throw new Error("Shipment could not be updated");
    }
  };

export const deleteShipment =
  (id: string): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch) => {
    try {
      dispatch(shipmentsSlice.actions.loading());

      await axios.delete<Shipment>(
        `https://practice-api-beryl.vercel.app/shipments/${id}`
      );

      dispatch(shipmentsSlice.actions.deleteShipment());
      toast.success("Shipment successfully deleted");
      dispatch(getShipments());
    } catch (error) {
      console.error("Error deleting shipment:", error);
      dispatch(getShipments());
      toast.error("Shipment could not be deleted");
      throw new Error("Failed deleting your shipment");
    }
  };

export const getAllShipments = (state: RootState) => state.shipments.shipments;
export const getCurrentShipment = (state: RootState) =>
  state.shipments.currentShipment;
export const getLoadingState = (state: RootState) => state.shipments.isLoading;

export default shipmentsSlice.reducer;

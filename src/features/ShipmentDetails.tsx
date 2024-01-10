import { useEffect } from "react";
import ShipmentForm from "./ShipmentForm";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useParams } from "react-router-dom";
import {
  getCurrentShipment,
  getLoadingState,
  getShipment,
} from "./shipmentsSlice";
import Loader from "@/ui/Loader";

function ShipmentDetails(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const shipment = useAppSelector(getCurrentShipment);
  const isLoading = useAppSelector(getLoadingState);

  useEffect(
    function () {
      if (typeof id === "string") dispatch(getShipment(id));
    },
    [dispatch, id]
  );

  if (isLoading) return <Loader />;

  return (
    <div className="px-10 md:px-20 lg:px-40 flex justify-center items-center h-screen">
      <ShipmentForm shipment={shipment} />
    </div>
  );
}

export default ShipmentDetails;

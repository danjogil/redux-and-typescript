import { useEffect } from "react";
import ShipmentForm from "./ShipmentForm";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useNavigate, useParams } from "react-router-dom";
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
  // const navigate = useNavigate();

  useEffect(
    function () {
      if (typeof id === "string") dispatch(getShipment(id));
    },
    [dispatch, id]
  );

  // useEffect(
  //   function () {
  //     if (!shipment.id) navigate("/shipments");
  //   },
  //   [navigate, shipment.id]
  // );

  if (isLoading) return <Loader />;

  return (
    <div className="px-10 md:px-20 lg:px-40 flex justify-center items-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <ShipmentForm shipment={shipment} />
    </div>
  );
}

export default ShipmentDetails;

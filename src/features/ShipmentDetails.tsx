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
import { Button } from "@/ui/button";

function ShipmentDetails(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const shipment = useAppSelector(getCurrentShipment);
  const isLoading = useAppSelector(getLoadingState);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (typeof id === "string") dispatch(getShipment(id));
    },
    [dispatch, id]
  );

  console.log(shipment.id === "" && !isLoading ? "empty" : "full");

  if (isLoading) return <Loader />;

  return (
    <div className="px-10 md:px-20 lg:px-40 flex justify-center items-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      {shipment.id === "" && !isLoading ? (
        <div className="bg-white p-10 gap-2 rounded-md space-y-4 border shadow-2xl flex flex-col justify-center items-center font-semibold">
          <p>Shipment with the ID of #{id} could not be found</p>
          <Button onClick={() => navigate("/shipments")}>&larr; Go back</Button>
        </div>
      ) : (
        <ShipmentForm shipment={shipment} />
      )}
    </div>
  );
}

export default ShipmentDetails;

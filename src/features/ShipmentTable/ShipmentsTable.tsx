import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  getAllShipments,
  getLoadingState,
  getShipments,
} from "../shipmentsSlice";
import Loader from "@/ui/Loader";

export default function ShipmentsTable(): JSX.Element {
  const dispatch = useAppDispatch();

  const shipments = useAppSelector(getAllShipments);
  const isLoading = useAppSelector(getLoadingState);

  useEffect(
    function () {
      dispatch(getShipments());
    },
    [dispatch]
  );

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto p-10 bg-gradient-to-r from-cyan-500 to-blue-500">
      <DataTable columns={columns} data={shipments} />
    </div>
  );
}

"use client";

import { Shipment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/ui/button";

import ActionMenu from "@/ui/ActionMenu";

export const columns: ColumnDef<Shipment>[] = [
  {
    accessorKey: "orderNo",
    header: "ORDERNO",
  },
  {
    accessorKey: "date",
    header: "DATE",
  },
  {
    accessorKey: "customer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CUSTOMER
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "trackingNo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TRACKINGNO
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          STATUS
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "consignee",
    header: "CONSIGNEE",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const shipment = row.original;

      return <ActionMenu shipment={shipment} />;
    },
  },
];

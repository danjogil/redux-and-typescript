import { Button } from "@/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/alert-dialog";

import { MoreHorizontal } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { deleteShipment } from "@/features/shipmentsSlice";

export interface ActionMenuProps {
  shipment: {
    id: string;
    orderNo: string;
    date: string;
    customer: string;
    trackingNo: string;
    status: string;
    consignee: string;
  };
}

function ActionMenu({ shipment }: ActionMenuProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50"
          onClick={() => navigate(`/shipments/${shipment.id}`)}
        >
          Open shipment
        </DropdownMenuItem>

        <AlertDialog>
          <AlertDialogTrigger className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50 hover:bg-slate-100 hover:text-slate-900">
            Delete shipment
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                shipment.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <DropdownMenuItem>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AlertDialogAction
                  onClick={() => dispatch(deleteShipment(shipment.id))}
                >
                  Continue
                </AlertDialogAction>
              </DropdownMenuItem>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionMenu;

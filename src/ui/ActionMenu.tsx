import { Button } from "@/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";

import { useNavigate } from "react-router-dom";

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate(`/shipments/${shipment.id}`)}>
          Open shipment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionMenu;

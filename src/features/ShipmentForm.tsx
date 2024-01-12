import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { Shipment } from "@/types";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { updateShipment } from "./shipmentsSlice";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  id: z.string(),
  orderNo: z.string(),
  date: z.string(),
  customer: z.string(),
  trackingNo: z.string(),
  status: z.string(),
  consignee: z.string(),
});

export interface ShipmentFormProps {
  shipment: Shipment;
}

function ShipmentForm({ shipment }: ShipmentFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: shipment?.id,
      orderNo: shipment?.orderNo,
      date: shipment?.date,
      customer: shipment?.customer,
      trackingNo: shipment?.trackingNo,
      status: shipment?.status,
      consignee: shipment?.consignee,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    dispatch(updateShipment(values, shipment?.id));
  }

  return (
    <div className="w-full bg-white p-16 rounded-md space-y-4 border shadow-2xl">
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => navigate("/shipments")}>
          &larr; Back
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-6 flex-col sm:flex-row">
            <div className="grow">
              <FormField
                control={form.control}
                name="orderNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ORDERNO</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grow">
              <FormField
                control={form.control}
                name="trackingNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TRACKINGNO</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-6 flex-col sm:flex-row">
            <div className="grow">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DATE</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grow">
              <FormField
                control={form.control}
                name="consignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CONSIGNEE</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-6 flex-col sm:flex-row">
            <div className="grow">
              <FormField
                control={form.control}
                name="customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CUSTOMER</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grow">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>STATUS</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ShipmentForm;

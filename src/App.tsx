import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ShipmentsTable from "./features/ShipmentTable/ShipmentsTable";
import ShipmentDetails from "./features/ShipmentDetails";
import { Toaster } from "react-hot-toast";
import PageNotFound from "./ui/PageNotFound";

function App(): JSX.Element {
  return (
    <div className="p-4">
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="shipments" />} />
          <Route path="shipments" element={<ShipmentsTable />} />
          <Route path="shipments/:id" element={<ShipmentDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#ffffff",
            color: "#000000",
          },
        }}
      />
    </div>
  );
}

export default App;

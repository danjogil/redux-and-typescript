import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ShipmentsTable from "./features/ShipmentTable/ShipmentsTable";
import ShipmentDetails from "./features/ShipmentDetails";

function App(): JSX.Element {
  return (
    <div className="p-4">
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="shipments" />} />
          <Route path="shipments" element={<ShipmentsTable />} />
          <Route path="shipments/:id" element={<ShipmentDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

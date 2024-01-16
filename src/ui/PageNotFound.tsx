import { useNavigate } from "react-router-dom";
import { Button } from "./button";

function PageNotFound(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen flex justify-center items-center">
      <div className="bg-white p-10 rounded-md flex flex-col gap-4 font-semibold">
        <p className="uppercase">This page does not exist</p>
        <Button onClick={() => navigate("/shipments")}>&larr; Go back</Button>
      </div>
    </div>
  );
}

export default PageNotFound;

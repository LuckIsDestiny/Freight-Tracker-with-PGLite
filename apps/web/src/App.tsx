import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { LoadsPage } from "./pages/loads/LoadsPage";
import { ShippersPage } from "./pages/shipper/ShippersPage";
import { CarriersPage } from "./pages/carrier/CarriersPage";
import { HomePage } from "./pages/home/HomePage";
import { SessionHandler } from "./components/SessionHandler/SessionHandler";
import { NavBar } from "./components/NavBar/NavBar";
import { useAuth } from "./hooks/useAuth";
import { UpdateLoadPage } from "./pages/loads/UpdateLoadPage";
import { UpdateShipperPage } from "./pages/shipper/UpdateShipperPage";
import { UpdateCarrierPage } from "./pages/carrier/UpdateCarrierPage";
import { CreateLoadPage } from "./pages/loads/CreateLoadPage";
import { CreateShipperPage } from "./pages/shipper/CreateShipperPage";
import { CreateCarrierPage } from "./pages/carrier/CreateCarrierPage";

export const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <SessionHandler>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {isAuthenticated && (
            <>
              <Route path="/loads" element={<LoadsPage />} />
              <Route path="/loads/new" element={<CreateLoadPage />} />
              <Route path="/loads/update/:id" element={<UpdateLoadPage />} />
              <Route path="/shipper" element={<ShippersPage />} />
              <Route path="/shipper/new" element={<CreateShipperPage />} />
              <Route
                path="/shipper/update/:id"
                element={<UpdateShipperPage />}
              />
              <Route path="/carrier" element={<CarriersPage />} />
              <Route path="/carrier/new" element={<CreateCarrierPage />} />
              <Route
                path="/carrier/update/:id"
                element={<UpdateCarrierPage />}
              />
            </>
          )}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
          />
        </Routes>
      </SessionHandler>
    </Router>
  );
};

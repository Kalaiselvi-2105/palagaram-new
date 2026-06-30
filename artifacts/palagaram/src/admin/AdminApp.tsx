import { Switch, Route, Redirect } from "wouter";
import { useState, useEffect, createContext, useContext } from "react";
import AdminLogin from "./AdminLogin";
import AdminLayout from "./AdminLayout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Orders from "./pages/Orders";
import Kitchen from "./pages/Kitchen";
import Reservations from "./pages/Reservations";
import CateringManagement from "./pages/CateringManagement";
import MenuManagement from "./pages/MenuManagement";
import GalleryManagement from "./pages/GalleryManagement";
import Customers from "./pages/Customers";
import Reviews from "./pages/Reviews";
import AdminNotifications from "./pages/AdminNotifications";
import Offers from "./pages/Offers";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  adminName: string;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
  adminName: "",
});

export const useAuth = () => useContext(AuthContext);

const ADMIN_CREDENTIALS = { username: "admin", password: "palagaram@2024" };

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("palagaram_admin_auth") === "true";
  });

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem("palagaram_admin_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("palagaram_admin_auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, adminName: "Palagaram Admin" }}>
      <div className="admin-root">
        <Switch>
          <Route path="/admin/login">
            {isAuthenticated ? <Redirect to="/admin/dashboard" /> : <AdminLogin />}
          </Route>
          <Route path="/admin/:rest*">
            {isAuthenticated ? (
              <AdminLayout>
                <Switch>
                  <Route path="/admin/dashboard" component={Dashboard} />
                  <Route path="/admin/analytics" component={Analytics} />
                  <Route path="/admin/orders" component={Orders} />
                  <Route path="/admin/kitchen" component={Kitchen} />
                  <Route path="/admin/reservations" component={Reservations} />
                  <Route path="/admin/catering" component={CateringManagement} />
                  <Route path="/admin/menu" component={MenuManagement} />
                  <Route path="/admin/gallery" component={GalleryManagement} />
                  <Route path="/admin/customers" component={Customers} />
                  <Route path="/admin/reviews" component={Reviews} />
                  <Route path="/admin/notifications" component={AdminNotifications} />
                  <Route path="/admin/offers" component={Offers} />
                  <Route path="/admin/settings" component={Settings} />
                  <Route path="/admin/reports" component={Reports} />
                  <Route><Redirect to="/admin/dashboard" /></Route>
                </Switch>
              </AdminLayout>
            ) : (
              <Redirect to="/admin/login" />
            )}
          </Route>
          <Route path="/admin">
            <Redirect to={isAuthenticated ? "/admin/dashboard" : "/admin/login"} />
          </Route>
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

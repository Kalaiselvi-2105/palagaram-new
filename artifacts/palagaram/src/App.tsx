import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/Cart/CartDrawer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import MenuPage from "@/pages/Menu";
import MenuCategoryPage from "@/pages/MenuCategory";
import GalleryPage from "@/pages/Gallery";
import ReservationPage from "@/pages/ReservationPage";
import Checkout from "@/pages/Checkout";
import OrderConfirmation from "@/pages/OrderConfirmation";
import CateringPage from "@/pages/CateringPage";
import MyOrders from "@/pages/MyOrders";
import MyProfile from "@/pages/MyProfile";
import Notifications from "@/pages/Notifications";
import Wishlist from "@/pages/Wishlist";
import SavedAddresses from "@/pages/SavedAddresses";
import TrackOrderPage from "@/pages/TrackOrderPage";
import AdminApp from "@/admin/AdminApp";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Admin routes — completely separate system */}
      <Route path="/admin" component={AdminApp} />
      <Route path="/admin/:rest*" component={AdminApp} />

      {/* Customer-facing routes */}
      <Route path="/" component={Home} />
      <Route path="/menu" component={MenuPage} />
      <Route path="/menu/:slug" component={MenuCategoryPage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/reservation" component={ReservationPage} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/order-confirmation" component={OrderConfirmation} />
      <Route path="/catering" component={CateringPage} />
      <Route path="/my-orders" component={MyOrders} />
      <Route path="/my-profile" component={MyProfile} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/wishlist" component={Wishlist} />
      <Route path="/saved-addresses" component={SavedAddresses} />
      <Route path="/track-order" component={TrackOrderPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
            <CartDrawer />
          </WouterRouter>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

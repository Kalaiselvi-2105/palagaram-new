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

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/menu" component={MenuPage} />
      <Route path="/menu/:slug" component={MenuCategoryPage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/reservation" component={ReservationPage} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/order-confirmation" component={OrderConfirmation} />
      <Route path="/catering" component={CateringPage} />
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

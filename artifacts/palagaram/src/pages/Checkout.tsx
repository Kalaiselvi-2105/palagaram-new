import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { ArrowLeft, CheckCircle2, Loader2, MapPin, Package, Truck } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { Link, useLocation } from "wouter";

type DeliveryType = "delivery" | "pickup";

type FormData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  landmark: string;
  notes: string;
};

function generateOrderId() {
  return "ORD" + Date.now().toString(36).toUpperCase().slice(-7);
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("delivery");
  const [placed, setPlaced] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [orderId] = useState(generateOrderId);
  const [, navigate] = useLocation();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const DELIVERY_FEE = deliveryType === "delivery" && total < 500 ? 40 : 0;
  const grandTotal = total + DELIVERY_FEE;

  const onSubmit = async (data: FormData) => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    setProcessing(false);
    clearCart();
    navigate(`/order-confirmation?id=${orderId}&total=${grandTotal}&type=${deliveryType}`);
  };

  if (items.length === 0 && !placed) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-5 text-center px-6">
          <Package className="w-16 h-16 text-[#C89B5A]/40" />
          <h2 className="font-serif font-bold text-2xl text-[#4B352A]">Your cart is empty</h2>
          <p className="text-[#4B352A]/50">Add some dishes before proceeding to checkout.</p>
          <Link href="/menu">
            <Button className="bg-[#C89B5A] hover:bg-[#B88A4A] text-white rounded-full px-8">Browse Menu</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F0E8]">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/menu">
              <button className="text-[#4B352A]/50 hover:text-[#C89B5A] transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <h1 className="font-serif font-bold text-3xl text-[#4B352A]">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Left: Form */}
              <div className="lg:col-span-3 space-y-5">
                {/* Delivery type */}
                <div className="bg-white rounded-3xl border border-[#EADBC8] p-6">
                  <h3 className="font-semibold text-[#4B352A] mb-4">Order Type</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "delivery" as const, icon: Truck, label: "Home Delivery", sub: "30-45 mins" },
                      { value: "pickup" as const, icon: Package, label: "Pickup", sub: "Ready in 20 mins" },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setDeliveryType(opt.value)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${deliveryType === opt.value ? "border-[#C89B5A] bg-[#C89B5A]/8" : "border-[#EADBC8]"}`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${deliveryType === opt.value ? "bg-[#C89B5A] text-white" : "bg-[#F6F0E8] text-[#4B352A]"}`}>
                          <opt.icon className="w-4.5 h-4.5" />
                        </div>
                        <p className={`font-semibold text-sm ${deliveryType === opt.value ? "text-[#C89B5A]" : "text-[#4B352A]"}`}>{opt.label}</p>
                        <p className="text-[#4B352A]/50 text-xs">{opt.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact details */}
                <div className="bg-white rounded-3xl border border-[#EADBC8] p-6">
                  <h3 className="font-semibold text-[#4B352A] mb-4">Contact Details</h3>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-[#4B352A] text-sm font-medium mb-1.5 block">Full Name *</Label>
                        <Input {...register("name", { required: true })} placeholder="Priya Rajagopal" className={`border-[#EADBC8] focus:border-[#C89B5A] rounded-xl ${errors.name ? "border-red-400" : ""}`} />
                      </div>
                      <div>
                        <Label className="text-[#4B352A] text-sm font-medium mb-1.5 block">Phone *</Label>
                        <Input {...register("phone", { required: true })} placeholder="+91 98765 43210" className={`border-[#EADBC8] focus:border-[#C89B5A] rounded-xl ${errors.phone ? "border-red-400" : ""}`} />
                      </div>
                    </div>
                    <div>
                      <Label className="text-[#4B352A] text-sm font-medium mb-1.5 block">Email <span className="text-[#4B352A]/40 font-normal">(Optional)</span></Label>
                      <Input {...register("email")} type="email" placeholder="priya@email.com" className="border-[#EADBC8] focus:border-[#C89B5A] rounded-xl" />
                    </div>
                  </div>
                </div>

                {/* Address (delivery only) */}
                <AnimatePresence>
                  {deliveryType === "delivery" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="bg-white rounded-3xl border border-[#EADBC8] p-6">
                        <h3 className="font-semibold text-[#4B352A] mb-4 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#C89B5A]" /> Delivery Address
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-[#4B352A] text-sm font-medium mb-1.5 block">Full Address *</Label>
                            <Textarea {...register("address", { required: deliveryType === "delivery" })} placeholder="House No., Street, Area, City, Pincode" className={`border-[#EADBC8] focus:border-[#C89B5A] rounded-xl resize-none ${errors.address ? "border-red-400" : ""}`} rows={3} />
                          </div>
                          <div>
                            <Label className="text-[#4B352A] text-sm font-medium mb-1.5 block">Landmark <span className="text-[#4B352A]/40 font-normal">(Optional)</span></Label>
                            <Input {...register("landmark")} placeholder="Near temple, hospital gate, school..." className="border-[#EADBC8] focus:border-[#C89B5A] rounded-xl" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Notes */}
                <div className="bg-white rounded-3xl border border-[#EADBC8] p-6">
                  <h3 className="font-semibold text-[#4B352A] mb-4">Order Notes <span className="text-[#4B352A]/40 font-normal">(Optional)</span></h3>
                  <Textarea {...register("notes")} placeholder="Less spice, extra sauce, no onion..." className="border-[#EADBC8] focus:border-[#C89B5A] rounded-xl resize-none" rows={2} />
                </div>
              </div>

              {/* Right: Order summary */}
              <div className="lg:col-span-2">
                <div className="sticky top-24 bg-white rounded-3xl border border-[#EADBC8] overflow-hidden">
                  <div className="px-6 py-5 border-b border-[#EADBC8] bg-[#4B352A]">
                    <h3 className="font-serif font-bold text-[#FAF8F5]">Order Summary</h3>
                    <p className="text-[#EADBC8]/60 text-xs">{items.length} {items.length === 1 ? "item" : "items"}</p>
                  </div>

                  <div className="p-4 space-y-3 max-h-72 overflow-y-auto">
                    {items.map(item => (
                      <div key={item.id} className="flex gap-3 items-center">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#EADBC8] flex-shrink-0">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#4B352A] text-sm line-clamp-1">{item.name}</p>
                          <p className="text-[#4B352A]/40 text-xs">× {item.quantity}</p>
                        </div>
                        <span className="text-[#C89B5A] font-bold text-sm">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="px-5 pb-6 space-y-3 border-t border-[#EADBC8] pt-4">
                    {[
                      { label: "Subtotal", value: `₹${total.toLocaleString()}` },
                      { label: deliveryType === "delivery" ? "Delivery Fee" : "Pickup Discount", value: DELIVERY_FEE === 0 ? "FREE" : `₹${DELIVERY_FEE}`, green: DELIVERY_FEE === 0 },
                    ].map((r, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-[#4B352A]/60">{r.label}</span>
                        <span className={r.green ? "text-green-600 font-medium" : "text-[#4B352A]"}>{r.value}</span>
                      </div>
                    ))}
                    <div className="h-px bg-[#EADBC8]" />
                    <div className="flex justify-between font-bold text-[#4B352A]">
                      <span>Grand Total</span>
                      <span className="text-xl text-[#C89B5A]">₹{grandTotal.toLocaleString()}</span>
                    </div>

                    <Button
                      type="submit"
                      disabled={processing}
                      className="w-full bg-[#C89B5A] hover:bg-[#B88A4A] text-white rounded-full py-3 font-semibold flex items-center justify-center gap-2 mt-2 shadow-lg"
                    >
                      {processing ? <><Loader2 className="w-4 h-4 animate-spin" /> Placing Order…</> : <>Place Order <CheckCircle2 className="w-4 h-4" /></>}
                    </Button>
                    <p className="text-center text-[#4B352A]/40 text-xs">Payment collected {deliveryType === "delivery" ? "on delivery" : "at pickup"}</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

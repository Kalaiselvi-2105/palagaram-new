import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total, itemCount } = useCart();

  const DELIVERY_FEE = 40;
  const FREE_DELIVERY_ABOVE = 500;
  const deliveryFee = total >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
            onClick={closeCart}
          />

          <motion.div
            key="cart-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-[201] w-full max-w-[420px] bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#EADBC8] bg-[#4B352A]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#C89B5A]" />
                <div>
                  <h2 className="text-[#FAF8F5] font-serif font-bold text-lg leading-tight">Your Order</h2>
                  <p className="text-[#EADBC8]/60 text-xs">{itemCount} {itemCount === 1 ? "item" : "items"}</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#FAF8F5] hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 py-16 px-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-[#F6F0E8] flex items-center justify-center">
                    <Package className="w-9 h-9 text-[#C89B5A]/50" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#4B352A] text-xl mb-2">Your cart is empty</h3>
                    <p className="text-[#4B352A]/50 text-sm">Add delicious dishes from our menu to get started.</p>
                  </div>
                  <Link href="/menu">
                    <Button onClick={closeCart} className="bg-[#C89B5A] hover:bg-[#B88A4A] text-white rounded-full px-8">
                      Browse Menu
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {/* Free delivery progress */}
                  {total < FREE_DELIVERY_ABOVE && (
                    <div className="bg-[#F6F0E8] rounded-2xl p-4 mb-2">
                      <div className="flex justify-between text-xs font-medium text-[#4B352A]/70 mb-2">
                        <span>Add ₹{FREE_DELIVERY_ABOVE - total} more for free delivery</span>
                        <span className="text-[#C89B5A]">₹{FREE_DELIVERY_ABOVE}</span>
                      </div>
                      <div className="h-1.5 bg-[#EADBC8] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#C89B5A] rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((total / FREE_DELIVERY_ABOVE) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <AnimatePresence>
                    {items.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-3 bg-[#FAF8F5] rounded-2xl p-3 border border-[#EADBC8]"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#EADBC8]">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="font-semibold text-[#4B352A] text-sm leading-snug line-clamp-1">{item.name}</p>
                              <p className="text-[#4B352A]/40 text-xs mt-0.5">{item.category}</p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-[#4B352A]/30 hover:text-red-400 hover:bg-red-50 transition-colors flex-shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[#C89B5A] font-bold text-sm">₹{(item.price * item.quantity).toLocaleString()}</span>

                            {/* Qty controls */}
                            <div className="flex items-center gap-1.5 bg-white border border-[#EADBC8] rounded-full px-1 py-0.5">
                              <button
                                onClick={() => updateQty(item.id, item.quantity - 1)}
                                className="w-6 h-6 rounded-full flex items-center justify-center text-[#4B352A] hover:bg-[#F6F0E8] transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-[#4B352A] font-bold text-sm w-5 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQty(item.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-full bg-[#C89B5A] flex items-center justify-center text-white hover:bg-[#B88A4A] transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer with order summary */}
            {items.length > 0 && (
              <div className="border-t border-[#EADBC8] p-5 space-y-4 bg-white">
                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm text-[#4B352A]/70">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#4B352A]/70">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="h-px bg-[#EADBC8]" />
                  <div className="flex justify-between font-bold text-[#4B352A]">
                    <span>Total</span>
                    <span className="text-lg">₹{(total + deliveryFee).toLocaleString()}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button
                    onClick={closeCart}
                    className="w-full bg-[#C89B5A] hover:bg-[#B88A4A] text-white rounded-full py-6 text-base font-semibold shadow-lg flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full text-center text-[#4B352A]/50 text-sm hover:text-[#4B352A] transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

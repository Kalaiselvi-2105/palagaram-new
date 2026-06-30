import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Images, ShoppingBag, CalendarCheck, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { AccountDropdown } from "@/components/account/AccountDropdown";
import logoImg from "@assets/image_1782825319906.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [location] = useLocation();
  const { itemCount, openCart } = useCart();

  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHome && !scrolled;

  const navLinks = [
    { label: "Home", href: isHome ? "#home" : "/" },
    { label: "About", href: isHome ? "#about" : "/#about" },
    { label: "Menu", href: "/menu" },
    { label: "Gallery", href: "/gallery" },
    { label: "Specials", href: isHome ? "#specials" : "/#specials" },
    { label: "Reviews", href: isHome ? "#reviews" : "/#reviews" },
    { label: "Contact", href: isHome ? "#contact" : "/#contact" },
    { label: "Catering", href: "/catering" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        !isTransparent
          ? "bg-[#FAF8F5]/96 backdrop-blur-xl shadow-sm"
          : "bg-gradient-to-b from-black/60 via-black/30 to-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Row 1: Logo | Nav Links | CTAs ── */}
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between py-3 gap-8 md:gap-10">

          {/* Logo — fixed left, generous right margin */}
          <Link href="/">
            <div className="flex-shrink-0 cursor-pointer">
              <img
                src={logoImg}
                alt="Palagaram Restaurant"
                className={`h-12 w-auto object-contain transition-all duration-300 ${
                  isTransparent ? "brightness-[1.15]" : ""
                }`}
              />
            </div>
          </Link>

          {/* Desktop Nav — centered with 32px+ gap from logo */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 flex-1 justify-center">
            {navLinks.map((link) => {
              const active = link.href === location;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative group whitespace-nowrap ${
                    !isTransparent
                      ? `${active ? "text-[#C89B5A]" : "text-[#4B352A] hover:text-[#C89B5A]"}`
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label === "Gallery" && (
                    <Images className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
                  )}
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-[#C89B5A] transition-all duration-200 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop CTAs — fixed right */}
          <div
            className={`hidden md:flex items-center gap-3 flex-shrink-0 pl-4 ${
              !isTransparent ? "border-l border-[#EADBC8]" : "border-l border-white/20"
            }`}
          >
            <Link href="/reservation">
              <Button
                variant="outline"
                size="sm"
                className={`rounded-full font-medium text-sm transition-all gap-1.5 whitespace-nowrap ${
                  !isTransparent
                    ? "border-[#C89B5A] text-[#C89B5A] hover:bg-[#C89B5A] hover:text-white"
                    : "border-white/60 text-white hover:bg-white/15 hover:border-white bg-transparent"
                }`}
              >
                <CalendarCheck className="w-3.5 h-3.5" /> Reserve
              </Button>
            </Link>

            <Button
              size="sm"
              onClick={openCart}
              className="bg-[#C89B5A] text-white hover:bg-[#B88A4A] rounded-full font-medium text-sm shadow-md gap-1.5 relative whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Order Online
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1"
                >
                  {itemCount}
                </motion.span>
              )}
            </Button>

            {/* Profile icon */}
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setAccountOpen((v) => !v)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border-2 ${
                  accountOpen
                    ? "border-[#C89B5A] bg-[#C89B5A] text-white"
                    : !isTransparent
                      ? "border-[#EADBC8] text-[#4B352A] hover:border-[#C89B5A] hover:text-[#C89B5A]"
                      : "border-white/30 text-white/80 hover:text-white hover:border-white"
                }`}
              >
                <UserCircle2 className="w-5 h-5" />
              </motion.button>
              <AccountDropdown open={accountOpen} onClose={() => setAccountOpen(false)} />
            </div>
          </div>

          {/* Mobile: cart icon + hamburger */}
          <div className="md:hidden flex items-center gap-2 flex-shrink-0">
            {itemCount > 0 && (
              <button
                onClick={openCart}
                className="relative w-9 h-9 flex items-center justify-center"
              >
                <ShoppingBag
                  className={`w-5 h-5 ${!isTransparent ? "text-[#4B352A]" : "text-white"}`}
                />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              </button>
            )}
            <button
              className={`p-2 rounded-lg transition-colors ${
                !isTransparent ? "text-[#4B352A]" : "text-white"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Row 2: Centered Tagline Strip ── */}
      <div
        className={`hidden md:flex items-center justify-center py-2 transition-all duration-400 ${
          !isTransparent
            ? "border-t border-[#EADBC8]/70"
            : "border-t border-white/10"
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Left decorative line */}
          <div
            className={`flex items-center gap-1.5 ${
              !isTransparent ? "opacity-60" : "opacity-50"
            }`}
          >
            <span
              className={`block h-px w-8 ${
                !isTransparent ? "bg-[#C89B5A]" : "bg-[#C89B5A]"
              }`}
            />
            <span className="text-[#C89B5A] text-[8px]">✦</span>
            <span
              className={`block h-px w-4 ${
                !isTransparent ? "bg-[#C89B5A]" : "bg-[#C89B5A]"
              }`}
            />
          </div>

          {/* Tagline text */}
          <span
            className={`text-[10px] font-semibold uppercase tracking-[0.35em] ${
              !isTransparent ? "text-[#C89B5A]" : "text-[#C89B5A]"
            }`}
          >
            Chidambaram's Finest Vegetarian
          </span>

          {/* Right decorative line */}
          <div
            className={`flex items-center gap-1.5 ${
              !isTransparent ? "opacity-60" : "opacity-50"
            }`}
          >
            <span
              className={`block h-px w-4 ${
                !isTransparent ? "bg-[#C89B5A]" : "bg-[#C89B5A]"
              }`}
            />
            <span className="text-[#C89B5A] text-[8px]">✦</span>
            <span
              className={`block h-px w-8 ${
                !isTransparent ? "bg-[#C89B5A]" : "bg-[#C89B5A]"
              }`}
            />
          </div>
        </div>
      </div>

      {/* ── Mobile Nav Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#FAF8F5]/98 backdrop-blur-xl border-t border-[#EADBC8] overflow-hidden"
          >
            {/* Mobile tagline */}
            <div className="flex items-center justify-center py-2.5 border-b border-[#EADBC8]/60 bg-[#FAF8F5]">
              <span className="text-[#C89B5A] text-[9px] font-semibold uppercase tracking-[0.3em]">
                ✦ Chidambaram's Finest Vegetarian ✦
              </span>
            </div>

            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-base font-medium py-3 px-3 text-[#4B352A] hover:text-[#C89B5A] hover:bg-[#F6F0E8] rounded-lg transition-colors flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label === "Gallery" && (
                    <Images className="w-4 h-4 text-[#C89B5A]" />
                  )}
                  {link.label}
                </a>
              ))}

              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[#EADBC8]">
                <Link href="/reservation" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-[#C89B5A] text-[#C89B5A] hover:bg-[#C89B5A] hover:text-white rounded-full gap-1.5"
                  >
                    <CalendarCheck className="w-4 h-4" /> Reserve Table
                  </Button>
                </Link>
                <Button
                  className="w-full bg-[#C89B5A] text-white hover:bg-[#B88A4A] rounded-full gap-1.5"
                  onClick={() => {
                    openCart();
                    setMobileMenuOpen(false);
                  }}
                >
                  <ShoppingBag className="w-4 h-4" /> Order Online{" "}
                  {itemCount > 0 && `(${itemCount})`}
                </Button>

                <div className="border-t border-[#EADBC8] pt-3 mt-1 space-y-1">
                  {[
                    { label: "👤 My Profile", href: "/my-profile" },
                    { label: "📦 My Orders", href: "/my-orders" },
                    { label: "🚚 Track Orders", href: "/track-order" },
                    { label: "❤️ Wishlist", href: "/wishlist" },
                    { label: "🔔 Notifications", href: "/notifications" },
                    { label: "📍 Saved Addresses", href: "/saved-addresses" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="text-sm font-medium py-2.5 px-3 text-[#4B352A] hover:text-[#C89B5A] hover:bg-[#F6F0E8] rounded-lg transition-colors cursor-pointer">
                        {item.label}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

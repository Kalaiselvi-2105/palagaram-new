import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Images, ShoppingBag, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import logoImg from "@assets/image_1782825319906.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          ? "bg-[#FAF8F5]/96 backdrop-blur-xl shadow-sm py-2"
          : "bg-gradient-to-b from-black/55 via-black/25 to-transparent py-4"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center cursor-pointer group">
            <img
              src={logoImg}
              alt="Palagaram Restaurant"
              className={`h-12 w-auto object-contain transition-all duration-300 ${
                isTransparent ? "brightness-[1.15]" : ""
              }`}
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const active = link.href === location;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors relative group ${
                  !isTransparent
                    ? `${active ? "text-[#C89B5A]" : "text-[#4B352A] hover:text-[#C89B5A]"}`
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label === "Gallery" && <Images className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />}
                {link.label}
                <span className={`absolute -bottom-0.5 left-0 h-px bg-[#C89B5A] transition-all duration-200 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
              </a>
            );
          })}
        </nav>

        {/* CTA buttons */}
        <div className={`hidden md:flex items-center gap-3 pl-5 ${!isTransparent ? "border-l border-[#EADBC8]" : "border-l border-white/20"}`}>
          <Link href="/reservation">
            <Button
              variant="outline"
              size="sm"
              className={`rounded-full font-medium text-sm transition-all gap-1.5 ${
                !isTransparent
                  ? "border-[#C89B5A] text-[#C89B5A] hover:bg-[#C89B5A] hover:text-white"
                  : "border-white/60 text-white hover:bg-white/15 hover:border-white bg-transparent"
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" /> Reserve Table
            </Button>
          </Link>

          <Button
            size="sm"
            onClick={openCart}
            className="bg-[#C89B5A] text-white hover:bg-[#B88A4A] rounded-full font-medium text-sm shadow-md gap-1.5 relative"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Order Online
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 min-w-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5"
              >
                {itemCount}
              </motion.span>
            )}
          </Button>

          {itemCount > 0 && (
            <button
              onClick={openCart}
              className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-colors ${!isTransparent ? "text-[#4B352A] hover:text-[#C89B5A]" : "text-white/80 hover:text-white"}`}
            >
              <ShoppingBag className="w-5 h-5" />
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 min-w-[16px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
              >
                {itemCount}
              </motion.span>
            </button>
          )}
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          {itemCount > 0 && (
            <button onClick={openCart} className="relative w-9 h-9 flex items-center justify-center">
              <ShoppingBag className={`w-5 h-5 ${!isTransparent ? "text-[#4B352A]" : "text-white"}`} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{itemCount}</span>
            </button>
          )}
          <button
            className={`p-2 rounded-lg transition-colors ${!isTransparent ? "text-[#4B352A]" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#FAF8F5]/98 backdrop-blur-xl border-t border-[#EADBC8] overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-base font-medium py-3 px-3 text-[#4B352A] hover:text-[#C89B5A] hover:bg-[#F6F0E8] rounded-lg transition-colors flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label === "Gallery" && <Images className="w-4 h-4 text-[#C89B5A]" />}
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[#EADBC8]">
                <Link href="/reservation" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-[#C89B5A] text-[#C89B5A] hover:bg-[#C89B5A] hover:text-white rounded-full gap-1.5">
                    <CalendarCheck className="w-4 h-4" /> Reserve Table
                  </Button>
                </Link>
                <Button
                  className="w-full bg-[#C89B5A] text-white hover:bg-[#B88A4A] rounded-full gap-1.5"
                  onClick={() => { openCart(); setMobileMenuOpen(false); }}
                >
                  <ShoppingBag className="w-4 h-4" /> Order Online {itemCount > 0 && `(${itemCount})`}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

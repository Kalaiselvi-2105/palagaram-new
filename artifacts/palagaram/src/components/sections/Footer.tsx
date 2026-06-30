import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram, Facebook, Youtube, Map, ExternalLink } from "lucide-react";
import logoImg from "@assets/image_1782825319906.png";

const REAL_LINKS = {
  "Quick Links": [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Menu", href: "/menu" },
    { label: "Gallery", href: "/gallery" },
    { label: "Specials", href: "/#specials" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Contact", href: "/#contact" },
  ],
  "Services": [
    { label: "Dine In", href: "/reservation" },
    { label: "Takeaway", href: "/menu" },
    { label: "Home Delivery", href: "/menu" },
    { label: "Catering", href: "/#contact" },
    { label: "Bulk Orders", href: "/#contact" },
    { label: "Table Reservation", href: "/reservation" },
  ],
  "Connect": [
    { label: "Instagram", href: "https://www.instagram.com/palagaram.com_/", external: true },
    { label: "Facebook", href: "#", external: false },
    { label: "YouTube", href: "#", external: false },
    { label: "Google Maps", href: "https://www.google.com/maps/dir/?api=1&destination=156+West+Car+Street+Chidambaram+Tamil+Nadu+608001", external: true },
    { label: "Contact Us", href: "/#contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#2D1A10] text-[#EADBC8]">
      <div className="h-px bg-gradient-to-r from-transparent via-[#C89B5A]/50 to-transparent" />

      {/* Google Map + Contact Strip */}
      <div className="border-b border-[#EADBC8]/10">
        <div className="container mx-auto px-4 md:px-6 py-10">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Map embed */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Map className="w-4 h-4 text-[#C89B5A]" />
                <span className="text-[#C89B5A] uppercase tracking-widest text-xs font-semibold">Find Us</span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#EADBC8]/15 shadow-lg">
                <iframe
                  title="Palagaram Restaurant Location"
                  src="https://maps.google.com/maps?q=Palagaram+156+West+Car+Street+Chidambaram+Tamil+Nadu+608001&output=embed&z=16"
                  width="100%"
                  height="240"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=156+West+Car+Street+Chidambaram+Tamil+Nadu+608001"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#C89B5A] border border-[#C89B5A]/40 px-4 py-2 rounded-full hover:bg-[#C89B5A]/10 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Get Directions
              </a>
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-4 h-4 text-[#C89B5A]" />
                <span className="text-[#C89B5A] uppercase tracking-widest text-xs font-semibold">Contact Us</span>
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C89B5A] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#FAF8F5] font-medium text-sm mb-0.5">Address</p>
                    <p className="text-[#EADBC8]/65 text-sm leading-relaxed">
                      156 West Car Street,<br />
                      Chidambaram,<br />
                      Tamil Nadu – 608001, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#C89B5A] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#FAF8F5] font-medium text-sm mb-0.5">Phone</p>
                    <a
                      href="tel:+914144224228"
                      className="text-[#EADBC8]/65 text-sm hover:text-[#C89B5A] transition-colors"
                    >
                      +91 4144 224 228
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#C89B5A] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#FAF8F5] font-medium text-sm mb-0.5">Business Hours</p>
                    <p className="text-[#EADBC8]/65 text-sm">Open Daily</p>
                    <p className="text-[#EADBC8]/65 text-sm">7:00 AM – 10:45 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="h-[1px] w-6 bg-[#C89B5A]" />
                <span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">Est. 1985</span>
              </div>
              <div className="mb-3">
                <img
                  src={logoImg}
                  alt="Palagaram Restaurant"
                  className="h-14 w-auto object-contain brightness-110"
                />
              </div>
              <p className="text-[#C89B5A]/80 text-xs uppercase tracking-widest font-semibold mb-4">
                High Class Pure Veg Restaurant
              </p>
              <p className="text-[#EADBC8]/60 leading-relaxed mb-6 max-w-xs text-sm">
                Authentic South Indian vegetarian cuisine, served with tradition and pride in the temple town of Chidambaram since 1985.
              </p>

              {/* Social icons */}
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/palagaram.com_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#EADBC8]/20 flex items-center justify-center text-[#EADBC8]/60 hover:border-[#C89B5A] hover:text-[#C89B5A] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-[#EADBC8]/20 flex items-center justify-center text-[#EADBC8]/60 hover:border-[#C89B5A] hover:text-[#C89B5A] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-[#EADBC8]/20 flex items-center justify-center text-[#EADBC8]/60 hover:border-[#C89B5A] hover:text-[#C89B5A] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries(REAL_LINKS).map(([section, items], i) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <h3 className="text-[#FAF8F5] font-semibold mb-5 uppercase tracking-widest text-xs">
                {section}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={"external" in item && item.external ? "_blank" : undefined}
                      rel={"external" in item && item.external ? "noopener noreferrer" : undefined}
                      className="text-[#EADBC8]/55 hover:text-[#C89B5A] transition-colors text-sm flex items-center gap-1.5 group"
                    >
                      {item.label}
                      {"external" in item && item.external && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-70 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom info strip */}
        <div className="mt-14 pt-8 border-t border-[#EADBC8]/10 grid md:grid-cols-3 gap-5">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#C89B5A] flex-shrink-0 mt-0.5" />
            <span className="text-[#EADBC8]/50 text-sm">
              156 West Car Street, Chidambaram, Tamil Nadu – 608001
            </span>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-[#C89B5A] flex-shrink-0 mt-0.5" />
            <a href="tel:+914144224228" className="text-[#EADBC8]/50 text-sm hover:text-[#C89B5A] transition-colors">
              +91 4144 224 228
            </a>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#C89B5A] flex-shrink-0 mt-0.5" />
            <span className="text-[#EADBC8]/50 text-sm">Open Daily: 7:00 AM – 10:45 PM</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[#EADBC8]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#EADBC8]/35 text-sm">
            © 2026 Palagaram.com. All Rights Reserved.
          </p>
          <p className="text-[#EADBC8]/25 text-xs">
            Designed with ❤️ for Palagaram
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[#EADBC8]/35 text-xs hover:text-[#C89B5A]/70 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

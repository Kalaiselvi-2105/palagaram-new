import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, Utensils, Users, Award } from "lucide-react";
import restaurantPhoto from "@assets/image_1782825302920.png";

export function Hero() {
  const title = "Every Meal Tells A Story.";
  const words = title.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.2 * i },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 14, stiffness: 120 } },
    hidden: { opacity: 0, y: 40 },
  };

  const particles = Array.from({ length: 25 });

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Real restaurant photo background with slow zoom */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        <img
          src={restaurantPhoto}
          alt="Palagaram Restaurant"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Premium dark overlay — extra dark at top for navbar, fades to cream */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0D0603]/85 via-[#1A0E08]/65 to-[#1A0E08]/80" />

      {/* Warm light rays */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-screen bg-gradient-to-b from-[#C89B5A]/15 via-[#C89B5A]/5 to-transparent blur-3xl transform -rotate-12 origin-top" />
        <div className="absolute top-0 left-1/2 w-64 h-screen bg-gradient-to-b from-[#C89B5A]/8 via-transparent to-transparent blur-2xl transform rotate-6 origin-top" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#C89B5A]"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -(80 + Math.random() * 120)],
              opacity: [0, 0.7, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 6,
            }}
          />
        ))}
      </div>

      <div className="container relative z-20 mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between h-full pt-36 pb-12">
        <div className="max-w-3xl flex flex-col items-center md:items-start">
          {/* Headline word-by-word */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center md:justify-start mb-5"
          >
            {words.map((word, index) => (
              <motion.span
                variants={child}
                key={index}
                className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-bold text-white mr-4 mb-2 drop-shadow-2xl leading-tight"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Tamil tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="font-serif italic text-xl md:text-2xl text-[#EADBC8]/90 mb-3 drop-shadow-lg"
          >
            "நம்பி வாங்க... திருப்தியா சாப்பிட்டு போங்க."
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="text-base md:text-lg text-[#EADBC8]/70 mb-10 max-w-xl font-light leading-relaxed"
          >
            Authentic vegetarian cuisine crafted with tradition, love, and premium ingredients.
            A dining experience your family will remember for years.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4"
          >
            <a href="/menu">
              <Button size="lg" className="bg-[#C89B5A] text-[#1A0E08] hover:bg-[#C89B5A]/90 text-base px-8 py-6 rounded-full font-semibold shadow-lg shadow-[#C89B5A]/30">
                Explore Menu
              </Button>
            </a>
            <a href="#contact">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/15 hover:border-white/60 text-base px-8 py-6 rounded-full font-medium backdrop-blur-sm bg-white/8">
                Reserve a Table
              </Button>
            </a>
            <a href="#about">
              <Button size="lg" variant="ghost" className="text-[#EADBC8]/80 hover:text-[#C89B5A] hover:bg-transparent text-base px-4 py-6 font-medium underline-offset-4 hover:underline">
                Our Story
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Floating Glass Cards */}
        <div className="hidden lg:grid grid-cols-2 gap-4 mt-8 lg:mt-0">
          {[
            { icon: Star, text: "4.8 Google Rating", sub: "1,200+ reviews", delay: 1.7 },
            { icon: Utensils, text: "Premium Vegetarian", sub: "100% pure", delay: 1.9 },
            { icon: Users, text: "Family Dining", sub: "Since 1985", delay: 2.1 },
            { icon: Award, text: "100+ Dishes", sub: "Signature recipes", delay: 2.3 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: item.delay, duration: 0.7 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex flex-col items-center justify-center text-center w-38 h-38 shadow-xl hover:bg-white/15 transition-colors"
            >
              <item.icon className="text-[#C89B5A] w-7 h-7 mb-2" />
              <span className="text-white font-semibold text-sm mb-0.5">{item.text}</span>
              <span className="text-[#EADBC8]/60 text-xs">{item.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom fade to cream */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#FAF8F5] to-transparent z-20 pointer-events-none" />
    </section>
  );
}

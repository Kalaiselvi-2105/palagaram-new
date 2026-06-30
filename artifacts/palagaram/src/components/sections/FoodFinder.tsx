import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Flame, Sparkles, ArrowRight, Clock, Star, ChefHat } from "lucide-react";
import { MENU, type Dish } from "@/data/menu";
import { Button } from "@/components/ui/button";

type Step = 1 | 2 | 3 | 4;

type FinderStepState = {
  lookingFor: "Breakfast" | "Lunch" | "Dinner" | "Snacks" | "Beverages" | "Desserts" | null;
  taste: "Traditional" | "Spicy" | "Healthy" | "Kids" | "Festival" | "Rich" | null;
  cuisine: "South Indian" | "North Indian" | "Chinese" | "Meals" | null;
};

const STEPS: { step: Step; label: string }[] = [
  { step: 1, label: "Looking For" },
  { step: 2, label: "Taste" },
  { step: 3, label: "Cuisine" },
  { step: 4, label: "Recommendations" },
];

const LOOKING_FOR_OPTIONS: FinderStepState["lookingFor"][] = [
  "Breakfast", "Lunch", "Dinner", "Snacks", "Beverages", "Desserts",
];

const TASTE_OPTIONS: FinderStepState["taste"][] = [
  "Traditional", "Spicy", "Healthy", "Kids", "Festival", "Rich",
];

const CUISINE_OPTIONS: FinderStepState["cuisine"][] = [
  "South Indian", "North Indian", "Chinese", "Meals",
];

function spiceMaxFromTaste(taste: FinderStepState["taste"]): number {
  if (!taste) return 3;
  if (taste === "Spicy") return 3;
  if (taste === "Kids") return 1;
  if (taste === "Healthy") return 1;
  return 3;
}

function filterByLookingFor(lookingFor: FinderStepState["lookingFor"], dish: Dish, categoryName: string) {
  if (!lookingFor) return true;
  const c = categoryName.toLowerCase();
  const n = dish.name.toLowerCase();

  const isBreakfast = c.includes("starters") || n.includes("dosa") || n.includes("idli") || n.includes("tiffin");
  const isLunch = c.includes("meals") || n.includes("thali") || c.includes("rice") || c.includes("biryani");
  const isDinner = isLunch;
  const isSnacks = c.includes("starters") || n.includes("roll") || n.includes("fry") || n.includes("cutlet");
  const isBeverages = c.includes("beverages") || n.includes("juice") || n.includes("coffee") || n.includes("lassi");
  const isDesserts = c.includes("desserts") || n.includes("jamun") || n.includes("ice cream") || n.includes("brownie");

  const map: Record<NonNullable<FinderStepState["lookingFor"]>, boolean> = {
    Breakfast: isBreakfast, Lunch: isLunch, Dinner: isDinner,
    Snacks: isSnacks, Beverages: isBeverages, Desserts: isDesserts,
  };

  return map[lookingFor];
}

function filterByCuisine(cuisine: FinderStepState["cuisine"], _dish: Dish, categoryName: string) {
  if (!cuisine) return true;
  const c = categoryName.toLowerCase();

  if (cuisine === "South Indian") return c.includes("starters") || c.includes("meals") || c.includes("raita") || c.includes("breads");
  if (cuisine === "North Indian") return c.includes("north") || c.includes("dal") || c.includes("rice") || c.includes("breads");
  if (cuisine === "Chinese") return c.includes("chinese");
  if (cuisine === "Meals") return c.includes("meals") || c.includes("rice") || c.includes("biryani");

  return true;
}

function filterByTaste(taste: FinderStepState["taste"], dish: Dish) {
  if (!taste) return true;
  const tags = (dish.tags ?? []).join(" ").toLowerCase();
  const name = dish.name.toLowerCase();

  if (taste === "Traditional") return tags.includes("classic") || tags.includes("traditional") || name.includes("dal");
  if (taste === "Spicy") return dish.spice >= 2;
  if (taste === "Healthy") return tags.includes("healthy") || tags.includes("greens") || dish.spice <= 1;
  if (taste === "Kids") return dish.spice <= 1;
  if (taste === "Festival") return tags.includes("festive") || tags.includes("festival") || tags.includes("aromatic");
  if (taste === "Rich") return tags.includes("rich") || tags.includes("creamy") || dish.spice >= 1;

  return true;
}

function SpiceDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((n) => (
        <span key={n} className={`w-2 h-2 rounded-full ${n <= level ? "bg-red-500" : "bg-[#EADBC8]"}`} />
      ))}
    </div>
  );
}

export function FoodFinder() {
  const [step, setStep] = useState<Step>(1);
  const [state, setState] = useState<FinderStepState>({ lookingFor: null, taste: null, cuisine: null });

  const allDishes = useMemo(() => {
    return MENU.flatMap((cat) =>
      cat.dishes.map((d) => ({ dish: d, category: cat.name, categorySlug: cat.slug }))
    );
  }, []);

  const recommendations = useMemo(() => {
    const spiceMax = spiceMaxFromTaste(state.taste);

    const filtered = allDishes
      .filter(({ dish, category }) => filterByLookingFor(state.lookingFor, dish, category))
      .filter(({ dish }) => filterByTaste(state.taste, dish))
      .filter(({ dish, category }) => filterByCuisine(state.cuisine, dish, category))
      .filter(({ dish }) => dish.spice <= spiceMax);

    filtered.sort((a, b) => {
      const score = (x: typeof a) => (x.dish.isBestSeller ? 20 : 0) + (x.dish.isChefPick ? 12 : 0) + x.dish.spice;
      return score(b) - score(a);
    });

    return filtered.slice(0, 8);
  }, [allDishes, state.cuisine, state.lookingFor, state.taste]);

  const canNext = useMemo(() => {
    if (step === 1) return !!state.lookingFor;
    if (step === 2) return !!state.taste;
    if (step === 3) return !!state.cuisine;
    return true;
  }, [step, state]);

  const primaryTitle =
    step === 1 ? "What are you looking for?"
    : step === 2 ? "Preferred Taste Profile"
    : step === 3 ? "Choose Cuisine"
    : "Recommended for You";

  const currentOptions =
    step === 1 ? LOOKING_FOR_OPTIONS
    : step === 2 ? TASTE_OPTIONS
    : CUISINE_OPTIONS;

  const currentValue =
    step === 1 ? state.lookingFor
    : step === 2 ? state.taste
    : state.cuisine;

  const handleSelect = (val: string) => {
    if (step === 1) setState(s => ({ ...s, lookingFor: val as FinderStepState["lookingFor"] }));
    else if (step === 2) setState(s => ({ ...s, taste: val as FinderStepState["taste"] }));
    else if (step === 3) setState(s => ({ ...s, cuisine: val as FinderStepState["cuisine"] }));
  };

  const handleNext = () => {
    if (step < 4) setStep((s) => (s + 1) as Step);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const handleReset = () => {
    setStep(1);
    setState({ lookingFor: null, taste: null, cuisine: null });
  };

  return (
    <section id="food-finder" className="py-28 bg-[#F6F0E8] relative overflow-hidden">
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,_#C89B5A22_0%,_transparent_60%)]" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-5"
          >
            <span className="h-px w-10 bg-[#C89B5A]" />
            <span className="text-[#C89B5A] uppercase tracking-[0.25em] text-xs font-semibold">Interactive Food Finder</span>
            <span className="h-px w-10 bg-[#C89B5A]" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#4B352A]">
            Discover your perfect bite
          </h2>
        </div>

        {/* Stepper */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center">
            {STEPS.map((s, i) => (
              <div key={s.step} className="flex items-center flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${
                      s.step === step
                        ? "bg-[#4B352A] text-white border-[#4B352A]"
                        : s.step < step
                        ? "bg-[#C89B5A] text-white border-[#C89B5A]"
                        : "bg-white border-[#EADBC8] text-[#4B352A]/40"
                    }`}
                  >
                    {s.step < step ? "✓" : s.step}
                  </div>
                  <span className={`hidden sm:block text-xs font-medium ${s.step === step ? "text-[#C89B5A]" : "text-[#4B352A]/40"}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px mx-3 transition-all ${step > s.step ? "bg-[#C89B5A]" : "bg-[#EADBC8]"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main card */}
        <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md border border-[#EADBC8] rounded-3xl overflow-hidden shadow-md">
          <div className="p-6 md:p-10">
            <div className="flex items-start justify-between gap-6 mb-6">
              <div>
                <p className="text-[#C89B5A] text-xs uppercase tracking-widest font-semibold mb-2">Step {step} of 4</p>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#4B352A]">{primaryTitle}</h3>
              </div>
              {step > 1 && (
                <Button variant="outline" size="sm" onClick={handleBack} className="border-[#EADBC8] text-[#4B352A] hover:border-[#C89B5A] rounded-full flex-shrink-0">
                  ← Back
                </Button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {step < 4 ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    {currentOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelect(opt!)}
                        className={`px-5 py-4 rounded-2xl border-2 text-sm font-semibold transition-all text-left ${
                          currentValue === opt
                            ? "border-[#C89B5A] bg-[#C89B5A]/10 text-[#4B352A]"
                            : "border-[#EADBC8] bg-white text-[#4B352A]/70 hover:border-[#C89B5A]/50"
                        }`}
                      >
                        {currentValue === opt && <span className="mr-1 text-[#C89B5A]">✓</span>}
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleNext}
                      disabled={!canNext}
                      className="bg-[#4B352A] hover:bg-[#3a2a1e] text-white rounded-full px-8 flex items-center gap-2 disabled:opacity-40"
                    >
                      {step === 3 ? "Find Dishes" : "Next"} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {recommendations.length === 0 ? (
                    <div className="text-center py-12">
                      <Sparkles className="w-12 h-12 text-[#C89B5A]/40 mx-auto mb-4" />
                      <p className="text-[#4B352A]/60 mb-6">No exact match — try different preferences.</p>
                      <Button onClick={handleReset} variant="outline" className="border-[#C89B5A] text-[#C89B5A] hover:bg-[#C89B5A] hover:text-white rounded-full">
                        Start Over
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-5">
                        <p className="text-[#4B352A]/60 text-sm">
                          Found <span className="font-semibold text-[#C89B5A]">{recommendations.length}</span> dishes for you
                        </p>
                        <Button onClick={handleReset} variant="outline" size="sm" className="border-[#EADBC8] text-[#4B352A] hover:border-[#C89B5A] rounded-full text-xs">
                          Start Over
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {recommendations.map(({ dish, categorySlug }, i) => (
                          <motion.div
                            key={`${dish.name}-${i}`}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="bg-white border border-[#EADBC8] rounded-2xl p-4 hover:border-[#C89B5A] hover:shadow-md transition-all group"
                          >
                            {(dish.isBestSeller || dish.isChefPick) && (
                              <div className="flex gap-1.5 mb-2">
                                {dish.isBestSeller && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider bg-[#C89B5A]/15 text-[#C89B5A] px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                    <Star className="w-2.5 h-2.5" /> Best Seller
                                  </span>
                                )}
                                {dish.isChefPick && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider bg-[#4B352A]/10 text-[#4B352A] px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                    <ChefHat className="w-2.5 h-2.5" /> Chef's Pick
                                  </span>
                                )}
                              </div>
                            )}
                            <h4 className="font-serif font-bold text-[#4B352A] text-sm leading-snug mb-1.5 group-hover:text-[#C89B5A] transition-colors">
                              {dish.name}
                            </h4>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[#C89B5A] font-bold">₹{dish.price}</span>
                              <SpiceDots level={dish.spice} />
                            </div>
                            {dish.prepTime && (
                              <p className="text-[#4B352A]/40 text-xs flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {dish.prepTime}
                              </p>
                            )}
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex justify-center">
                        <Link href="/menu">
                          <Button className="bg-[#C89B5A] hover:bg-[#B88A4A] text-white rounded-full px-8 flex items-center gap-2">
                            View Full Menu <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * PALAGARAM — Complete Menu Data
 *
 * Structure: Categories → Dishes
 * To update: edit this file. The UI automatically re-renders from this data.
 * To add images: replace imageUrl with any CDN/hosted food photo URL.
 * Images below are HD royalty-free photos from Unsplash.
 */

export type SpiceLevel = 0 | 1 | 2 | 3;

export interface Dish {
  id: string;
  name: string;
  desc: string;
  price: number;
  spice: SpiceLevel;
  prepTime: string;
  isBestSeller?: boolean;
  isChefPick?: boolean;
  isNew?: boolean;
  imageUrl: string;
  tags?: string[];
}

export interface MenuCategory {
  slug: string;
  name: string;
  shortDesc: string;
  bannerImage: string;
  dishes: Dish[];
}

// ---------------------------------------------------------------------------
// Helper: Unsplash image URLs
// ---------------------------------------------------------------------------
const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&q=80&auto=format&fit=crop`;

// Category banner images
const BANNERS = {
  southIndianBreakfast: img("1630409351241-e90e7f6a2f82", 1200, 600),
  starters:    img("1565557623262-b51c2513a641", 1200, 600),
  soups:       img("1547592166-23ac45744acd", 1200, 600),
  northIndian: img("1585937421612-70a008356c36", 1200, 600),
  dal:         img("1546833999-b9f581a1996d", 1200, 600),
  riceBiryani: img("1596797038530-2c107229654b", 1200, 600),
  meals:       img("1589301760014-d929f3979dbc", 1200, 600),
  breads:      img("1574894709920-11b28e7367e3", 1200, 600),
  raitaSalad:  img("1512621776951-a57141f2eefd", 1200, 600),
  chinese:     img("1563245372-f21724e3856d", 1200, 600),
  beverages:   img("1556679343-c7306c1976bc", 1200, 600),
  desserts:    img("1601050690597-df0568f70950", 1200, 600),
};

// ---------------------------------------------------------------------------
// Dish images — unique per dish type
// ---------------------------------------------------------------------------
const D = {
  // South Indian Breakfast
  idli:             img("1630409351241-e90e7f6a2f82"),  // soft white steamed idli
  masalaDosa:       img("1606491956689-2ea866880c84"),  // crispy dosa with potato masala
  plainDosa:        img("1548943487-a2e4e43b4853"),     // thin crispy plain dosa
  gheeRoastDosa:    img("1605197188-7b4c3dc97ef0"),     // golden ghee-roasted dosa
  ravaDosa:         img("1572802419509-9b7f7b4a7c90"),  // lacy rava dosa
  setDosa:          img("1524114664-f6e35c85f2ba"),     // thick soft mini dosas
  venPongal:        img("1723721891613-e6ce2c2c5219"),  // creamy rice-lentil pongal
  karaPongal:       img("1564671174-5567d50cf7d4"),     // spiced kara pongal
  meduVada:         img("1568901346729-59bf4e338612"),  // crispy golden vada
  poorMasala:       img("1558618666-fcd25c85cd64"),     // puffy poori with potato masala
  upma:             img("1582268611958-ebfd161ef9cf"),  // semolina upma
  ravaIdli:         img("1613844237701-8f3664fc2eff"),  // fluffy rava idli

  // Starters — cauliflower, paneer, rolls, cutlet
  gobi65:             img("1645177628172-a786cb92f1c7"),  // cauliflower crispy gold
  chilliGobi:         img("1565557623262-b51c2513a641"),  // mixed crispy starters
  crispyGobi:         img("1589302168068-964664d93dc0"),  // platter/crispy
  chilliPaneer:       img("1567188040759-fb8a883dc6d8"),  // paneer cubes
  paneer65:           img("1565299624946-b28f40a0ae38"),  // golden fried
  paneertikka:        img("1567188040759-fb8a883dc6d8"),  // paneer tikka charred
  paneerAchari:       img("1514933651103-005eec06c04b"),  // spiced paneer, darker
  paneerMalai:        img("1578604478063-1b5a7fb5a62d"),  // creamy/pale paneer
  springRoll:         img("1563805042-7684c019e1cb"),     // crispy rolls
  vegCutlet:          img("1529042410759-befb1204b468"),  // golden oval cutlets
  manchurian:         img("1585937421612-70a008356c36"),  // saucy tossed (deep orange)
  babyCornPepperFry:  img("1645177628172-a786cb92f1c7"),  // similar to gobi crispy
  babyCornChilli:     img("1565557623262-b51c2513a641"),  // stir-fried mixed
  babyCornCrispy:     img("1529042410759-befb1204b468"),  // golden battered
  mushroom:           img("1518977676765-c6e0d3f7e9e5"),  // mushroom dish
  mushroomPepperFry:  img("1518977676765-c6e0d3f7e9e5"),  // mushroom sautéed
  chilliMushroom:     img("1585937421612-70a008356c36"),  // mushroom tossed

  // Soups — five distinct images
  sweetCornSoup:      img("1547592166-23ac45744acd"),  // clear yellowish corn broth
  tomatoSoup:         img("1476718406775-a2e08c5e1d98"), // red tomato soup
  hotSour:            img("1546833999-b9f581a1996d"),  // warm dark broth
  manchowSoup:        img("1589302168068-964664d93dc0"), // topped with noodles, darker
  mushroomSoup:       img("1518977676765-c6e0d3f7e9e5"), // mushroom cream

  // North Indian curry — paneer varieties
  pbm:                img("1585937421612-70a008356c36"),  // orange butter masala
  kadaiPaneer:        img("1631452180519-a6e6a51b7b37"),  // reddish-green kadai
  palakPaneer:        img("1631452180519-a6e6a51b7b37"),  // green spinach
  paneerTikkaMasala:  img("1567188040759-fb8a883dc6d8"),  // smoky tikka
  paneerLababdar:     img("1514933651103-005eec06c04b"),  // royal cashew gravy
  paneerKolhapuri:    img("1565557623262-b51c2513a641"),  // dark fiery
  paneerJalfrezi:     img("1589302168068-964664d93dc0"),  // stir-fried bell pepper
  paneerDoPyaza:      img("1585937421612-70a008356c36"),  // onion-rich gravy
  paneerPunjabi:      img("1578604478063-1b5a7fb5a62d"),  // hearty punjabi
  paneerAngara:       img("1565557623262-b51c2513a641"),  // smoky dark
  paneerBhurji:       img("1546833999-b9f581a1996d"),     // crumbled, dry

  // Veg curries
  mixedVeg:           img("1512621776951-a57141f2eefd"),  // colourful vegetables
  navaratna:          img("1589301760014-d929f3979dbc"),  // rich royal korma
  vegJalfrezi:        img("1563245372-f21724e3856d"),     // stir-fried vegetables
  channamasala:       img("1546833999-b9f581a1996d"),     // chickpeas dark gravy
  kajuMasala:         img("1578604478063-1b5a7fb5a62d"),  // cashew cream
  bhindi:             img("1512621776951-a57141f2eefd"),  // okra dish
  stuffedTomato:      img("1514933651103-005eec06c04b"),  // stuffed tomato

  // Dal
  dalFry:             img("1546833999-b9f581a1996d"),     // yellow dal
  dalTadka:           img("1589302168068-964664d93dc0"),  // tempered dal
  dalMakhani:         img("1585937421612-70a008356c36"),  // dark, rich, creamy
  dalPalak:           img("1631452180519-a6e6a51b7b37"),  // green spinach dal
  dalPanchratna:      img("1565557623262-b51c2513a641"),  // five-lentil mix

  // Rice & Biryani
  biryani:            img("1596797038530-2c107229654b"),  // layered biryani
  hyderabadiBiryani:  img("1578604478063-1b5a7fb5a62d"),  // saffron biryani
  kashmiriPulao:      img("1589301760014-d929f3979dbc"),  // pale sweet pulao
  paneerPulao:        img("1567188040759-fb8a883dc6d8"),  // paneer in rice
  peasPulao:          img("1512621776951-a57141f2eefd"),  // green peas rice
  vegPulao:           img("1514933651103-005eec06c04b"),  // mixed veg pulao
  steamRice:          img("1565299624946-b28f40a0ae38"),  // plain white rice
  jeeraRice:          img("1589302168068-964664d93dc0"),  // cumin-tempered rice
  masalaRice:         img("1546833999-b9f581a1996d"),     // spiced rice

  // Meals
  vegMeals:           img("1589301760014-d929f3979dbc"),  // full thali spread
  miniMeals:          img("1514933651103-005eec06c04b"),  // smaller thali
  bombayMeals:        img("1578604478063-1b5a7fb5a62d"),  // fusion meals
  executiveMeals:     img("1565299624946-b28f40a0ae38"),  // premium thali

  // Breads
  butterNaan:         img("1574894709920-11b28e7367e3"),  // naan on tandoor
  garlicNaan:         img("1514933651103-005eec06c04b"),  // garlic-topped naan
  kulcha:             img("1565557623262-b51c2513a641"),  // kulcha bread
  parotta:            img("1589302168068-964664d93dc0"),  // flaky layered parotta
  chapati:            img("1512621776951-a57141f2eefd"),  // plain roti
  tandooriRoti:       img("1546833999-b9f581a1996d"),     // char-dotted roti

  // Raita & Salad
  raita:              img("1512621776951-a57141f2eefd"),  // yogurt bowl
  onionRaita:         img("1589301760014-d929f3979dbc"),  // onion raita
  boondiRaita:        img("1578604478063-1b5a7fb5a62d"),  // boondi raita
  pineappleRaita:     img("1556679343-c7306c1976bc"),     // yellow-sweet
  greenSalad:         img("1512621776951-a57141f2eefd"),  // fresh greens
  russianSalad:       img("1589302168068-964664d93dc0"),  // creamy mixed
  fruitSalad:         img("1556679343-c7306c1976bc"),     // colourful fruits

  // Chinese
  friedRice:          img("1563245372-f21724e3856d"),     // classic fried rice
  schezwan:           img("1565557623262-b51c2513a641"),  // red spicy schezwan
  noodles:            img("1514933651103-005eec06c04b"),  // noodles stir-fry
  hakka:              img("1546833999-b9f581a1996d"),     // hakka noodles
  chopsuey:           img("1512621776951-a57141f2eefd"),  // saucy vegetables
  szechuan:           img("1578604478063-1b5a7fb5a62d"),  // dark sauce

  // Beverages
  filterCoffee:       img("1511920170033-f8396924c348"),  // dark filter coffee
  masalaTea:          img("1547592166-23ac45744acd"),     // masala chai
  lassi:              img("1586201375761-83865001e31d"),  // mango lassi yellow
  buttermilk:         img("1512621776951-a57141f2eefd"),  // white buttermilk
  limeJuice:          img("1556679343-c7306c1976bc"),     // fresh lime
  milkshake:          img("1578604478063-1b5a7fb5a62d"),  // milkshake
  coconutWater:       img("1589301760014-d929f3979dbc"),  // coconut
  nannari:            img("1514933651103-005eec06c04b"),  // herbal drink

  // Desserts
  gulabJamun:         img("1601050690597-df0568f70950"),  // dark golden gulab jamun
  rasmalai:           img("1578604478063-1b5a7fb5a62d"),  // white milk dessert
  halwa:              img("1565299624946-b28f40a0ae38"),  // carrot/wheat halwa
  iceCream:           img("1556679343-c7306c1976bc"),     // ice cream scoop
  payasam:            img("1546833999-b9f581a1996d"),     // kheer/payasam
  brownie:            img("1589302168068-964664d93dc0"),  // dark chocolate
};

// ---------------------------------------------------------------------------
// MENU DATA
// ---------------------------------------------------------------------------

export const MENU: MenuCategory[] = [
  // ─── 0. SOUTH INDIAN BREAKFAST ──────────────────────────────────────────
  {
    slug: "south-indian-breakfast",
    name: "South Indian Breakfast",
    shortDesc: "Authentic Chettinad morning classics — steamed, fermented, and freshly made every day.",
    bannerImage: BANNERS.southIndianBreakfast,
    dishes: [
      { id: "sb01", name: "Idli",             desc: "Soft, pillowy steamed rice cakes served with sambar and three house chutneys.", price: 60,  spice: 0, prepTime: "5 min",  isBestSeller: true, imageUrl: D.idli,          tags: ["Mild","Steamed","Classic"] },
      { id: "sb02", name: "Masala Dosa",      desc: "Crispy golden crepe stuffed with spiced potato masala, served with sambar and chutneys.", price: 100, spice: 1, prepTime: "10 min", isBestSeller: true, isChefPick: true, imageUrl: D.masalaDosa,   tags: ["Crispy","Classic"] },
      { id: "sb03", name: "Plain Dosa",       desc: "Thin, lacy, perfectly crisped dosa — light and satisfying with sambar and coconut chutney.", price: 70,  spice: 0, prepTime: "8 min",  imageUrl: D.plainDosa,    tags: ["Crispy","Mild"] },
      { id: "sb04", name: "Ghee Roast Dosa",  desc: "A generous pour of pure ghee roasts this dosa to an irresistible, buttery crispness.", price: 120, spice: 0, prepTime: "10 min", isChefPick: true, imageUrl: D.gheeRoastDosa, tags: ["Crispy","Butter","Rich"] },
      { id: "sb05", name: "Rava Dosa",        desc: "Lacy, crunchy dosa made from semolina — light and netted with a golden finish.", price: 110, spice: 1, prepTime: "10 min", imageUrl: D.ravaDosa,     tags: ["Crispy","Unique"] },
      { id: "sb06", name: "Set Dosa",         desc: "Three thick, soft, spongy mini dosas served with coconut chutney and sambar.", price: 80,  spice: 0, prepTime: "10 min", imageUrl: D.setDosa,      tags: ["Soft","Mild"] },
      { id: "sb07", name: "Ven Pongal",       desc: "Comforting rice and lentil porridge tempered with black pepper, cumin, ginger, and cashews.", price: 70,  spice: 1, prepTime: "8 min",  isBestSeller: true, imageUrl: D.venPongal,    tags: ["Comfort","Classic"] },
      { id: "sb08", name: "Kara Pongal",      desc: "Spiced pongal tempered with red chillies, mustard, and fresh curry leaves — bold and warming.", price: 80,  spice: 2, prepTime: "8 min",  imageUrl: D.karaPongal,   tags: ["Spicy","Comfort"] },
      { id: "sb09", name: "Medu Vada",        desc: "Crispy, golden, donut-shaped lentil fritters with a fluffy interior. Served with sambar.", price: 70,  spice: 1, prepTime: "10 min", isBestSeller: true, imageUrl: D.meduVada,     tags: ["Crispy","Classic"] },
      { id: "sb10", name: "Poori Masala",     desc: "Puffy, deep-fried whole-wheat pooris served with a hearty, spiced potato masala.", price: 90,  spice: 1, prepTime: "12 min", imageUrl: D.poorMasala,   tags: ["Fried","Classic"] },
      { id: "sb11", name: "Upma",             desc: "Fluffy semolina porridge tempered with mustard seeds, curry leaves, ginger, and vegetables.", price: 60,  spice: 1, prepTime: "8 min",  imageUrl: D.upma,         tags: ["Comfort","Mild"] },
      { id: "sb12", name: "Rava Idli",        desc: "Soft, fluffy idli made from roasted semolina — lighter texture with a coconut chutney pairing.", price: 70,  spice: 0, prepTime: "8 min",  isNew: true, imageUrl: D.ravaIdli,     tags: ["Steamed","Mild","New"] },
    ],
  },

  // ─── 1. STARTERS ────────────────────────────────────────────────────────
  {
    slug: "starters",
    name: "Starters",
    shortDesc: "Crispy, golden, and boldly-spiced appetisers to begin your meal.",
    bannerImage: BANNERS.starters,
    dishes: [
      { id: "s01", name: "Gobi 65",              desc: "Deep-fried cauliflower in a fiery, tangy coating. Crispy with every bite.", price: 130, spice: 3, prepTime: "15 min", isBestSeller: true, isChefPick: true, imageUrl: D.gobi65, tags: ["Crispy","Spicy"] },
      { id: "s02", name: "Chilli Gobi",           desc: "Tossed cauliflower in a punchy Indo-Chinese chilli sauce with peppers and onion.", price: 140, spice: 3, prepTime: "15 min", imageUrl: D.chilliGobi, tags: ["Spicy"] },
      { id: "s03", name: "Crispy Gobi",           desc: "Lightly battered cauliflower florets, fried golden and served with mint chutney.", price: 120, spice: 1, prepTime: "12 min", imageUrl: D.crispyGobi, tags: ["Crispy","Mild"] },
      { id: "s04", name: "Chilli Paneer",         desc: "Fresh paneer cubes wok-tossed with capsicum, onion, and chilli sauce.", price: 180, spice: 3, prepTime: "15 min", isBestSeller: true, imageUrl: D.chilliPaneer, tags: ["Spicy"] },
      { id: "s05", name: "Paneer 65",             desc: "Fried cottage cheese marinated in yogurt, ginger-garlic, and spices.", price: 170, spice: 2, prepTime: "15 min", imageUrl: D.paneer65, tags: ["Crispy"] },
      { id: "s06", name: "Paneer Tikka",          desc: "Smoky, charred cottage cheese in yogurt and bold spices off the tandoor.", price: 200, spice: 2, prepTime: "20 min", isChefPick: true, imageUrl: D.paneertikka, tags: ["Tandoor"] },
      { id: "s07", name: "Paneer Achari Tikka",   desc: "Tangy pickled spice marinade gives this tikka its irresistible flavour.", price: 210, spice: 2, prepTime: "20 min", imageUrl: D.paneerAchari, tags: ["Tandoor","Tangy"] },
      { id: "s08", name: "Paneer Malai Tikka",    desc: "Delicate, creamy malai marinade with cardamom — melt-in-the-mouth richness.", price: 220, spice: 1, prepTime: "20 min", imageUrl: D.paneerMalai, tags: ["Tandoor","Mild"] },
      { id: "s09", name: "Veg Spring Roll",       desc: "Crispy rice rolls stuffed with julienned vegetables in sweet chilli sauce.", price: 130, spice: 1, prepTime: "15 min", imageUrl: D.springRoll, tags: ["Crispy"] },
      { id: "s10", name: "Veg Cutlet",            desc: "Spiced vegetable patties pan-fried to a golden crust, served with chutney.", price: 100, spice: 1, prepTime: "10 min", imageUrl: D.vegCutlet, tags: ["Mild"] },
      { id: "s11", name: "Veg Manchurian Dry",    desc: "Crunchy vegetable balls tossed in a tangy, garlicky Manchurian sauce.", price: 150, spice: 2, prepTime: "15 min", isBestSeller: true, imageUrl: D.manchurian, tags: ["Indo-Chinese"] },
      { id: "s12", name: "Baby Corn Pepper Fry",  desc: "Tender baby corn fried with cracked black pepper and curry leaves.", price: 150, spice: 2, prepTime: "12 min", imageUrl: D.babyCornPepperFry, tags: ["Crispy","Peppery"] },
      { id: "s13", name: "Chilli Baby Corn",      desc: "Baby corn stir-fried with capsicum, chilli, and Indo-Chinese sauces.", price: 150, spice: 3, prepTime: "12 min", imageUrl: D.babyCornChilli, tags: ["Spicy"] },
      { id: "s14", name: "Crispy Baby Corn",      desc: "Battered baby corn deep-fried to a perfect crunch, served with sauce.", price: 140, spice: 1, prepTime: "12 min", imageUrl: D.babyCornCrispy, tags: ["Crispy"] },
      { id: "s15", name: "Mushroom 65",           desc: "Button mushrooms fried in a spiced South Indian 65-style marinade.", price: 150, spice: 2, prepTime: "15 min", imageUrl: D.mushroom, tags: ["Crispy"] },
      { id: "s16", name: "Mushroom Pepper Fry",   desc: "Sautéed mushrooms with cracked pepper, garlic, and curry leaves.", price: 150, spice: 2, prepTime: "12 min", imageUrl: D.mushroomPepperFry, tags: ["Peppery"] },
      { id: "s17", name: "Chilli Mushroom",       desc: "Mushrooms tossed in a bold chilli and soy sauce with spring onions.", price: 160, spice: 3, prepTime: "15 min", imageUrl: D.chilliMushroom, tags: ["Spicy","Indo-Chinese"] },
    ],
  },

  // ─── 2. SOUPS ────────────────────────────────────────────────────────────
  {
    slug: "soups",
    name: "Soups",
    shortDesc: "Warm, nourishing broths and creamy blends crafted for every mood.",
    bannerImage: BANNERS.soups,
    dishes: [
      { id: "so01", name: "Veg Sweet Corn Soup", desc: "Light and comforting with whole corn kernels in a silky, flavoured broth.", price: 100, spice: 0, prepTime: "10 min", isBestSeller: true, imageUrl: D.sweetCornSoup, tags: ["Mild","Creamy"] },
      { id: "so02", name: "Tomato Soup",         desc: "Classic creamy tomato soup with a touch of cream and fresh herbs.", price: 90,  spice: 0, prepTime: "10 min", imageUrl: D.tomatoSoup, tags: ["Mild","Classic"] },
      { id: "so03", name: "Hot & Sour Soup",     desc: "Tangy, spicy Indo-Chinese broth with vegetables and a cornflour finish.", price: 110, spice: 2, prepTime: "10 min", imageUrl: D.hotSour, tags: ["Spicy","Indo-Chinese"] },
      { id: "so04", name: "Manchow Soup",        desc: "Rich, hearty Indo-Chinese soup topped with crispy fried noodles.", price: 120, spice: 2, prepTime: "12 min", imageUrl: D.manchowSoup, tags: ["Spicy","Indo-Chinese"] },
      { id: "so05", name: "Mushroom Soup",       desc: "Earthy button mushroom cream soup with herbs and a buttery finish.", price: 110, spice: 0, prepTime: "10 min", isChefPick: true, imageUrl: D.mushroomSoup, tags: ["Mild","Creamy"] },
    ],
  },

  // ─── 3. NORTH INDIAN CURRY ───────────────────────────────────────────────
  {
    slug: "north-indian",
    name: "North Indian Curry",
    shortDesc: "Rich, aromatic gravies crafted from the tandoor-lit heart of India.",
    bannerImage: BANNERS.northIndian,
    dishes: [
      { id: "ni01", name: "Paneer Butter Masala",  desc: "Silky tomato-butter gravy with fresh cottage cheese, slow-simmered to perfection.", price: 220, spice: 2, prepTime: "20 min", isBestSeller: true, isChefPick: true, imageUrl: D.pbm, tags: ["Rich","Creamy"] },
      { id: "ni02", name: "Kadai Paneer",           desc: "Cottage cheese and capsicum in a robust, freshly ground kadai masala.", price: 220, spice: 2, prepTime: "20 min", imageUrl: D.kadaiPaneer, tags: ["Robust"] },
      { id: "ni03", name: "Palak Paneer",           desc: "Cottage cheese cubes in a smooth, lightly spiced spinach gravy.", price: 210, spice: 1, prepTime: "20 min", isChefPick: true, imageUrl: D.palakPaneer, tags: ["Healthy","Greens"] },
      { id: "ni04", name: "Paneer Tikka Masala",    desc: "Tandoor-kissed paneer in a rich tomato-onion masala with cream.", price: 240, spice: 2, prepTime: "25 min", isBestSeller: true, imageUrl: D.paneerTikkaMasala, tags: ["Smoky","Rich"] },
      { id: "ni05", name: "Paneer Lababdar",        desc: "Royal cottage cheese in a creamy, buttery onion-tomato cashew gravy.", price: 250, spice: 1, prepTime: "25 min", imageUrl: D.paneerLababdar, tags: ["Rich","Mild"] },
      { id: "ni06", name: "Paneer Kolhapuri",       desc: "Fiery Kolhapuri spices make this one of the boldest paneer dishes on the menu.", price: 230, spice: 3, prepTime: "20 min", imageUrl: D.paneerKolhapuri, tags: ["Very Spicy"] },
      { id: "ni07", name: "Paneer Jalfrezi",        desc: "Stir-fried paneer with bell peppers and tomatoes in a semi-dry masala.", price: 220, spice: 2, prepTime: "20 min", imageUrl: D.paneerJalfrezi, tags: ["Semi-dry"] },
      { id: "ni08", name: "Paneer Do Pyaza",        desc: "Double-onion paneer preparation — a rich, slightly sweet North Indian classic.", price: 220, spice: 2, prepTime: "20 min", imageUrl: D.paneerDoPyaza, tags: ["Classic"] },
      { id: "ni09", name: "Paneer Punjabi",         desc: "Hearty Punjabi-style paneer in a thick, spiced onion-tomato gravy.", price: 220, spice: 2, prepTime: "20 min", imageUrl: D.paneerPunjabi, tags: ["Hearty"] },
      { id: "ni10", name: "Paneer Angara",          desc: "Smoked paneer in a bold, dark masala with charcoal-fired depth.", price: 250, spice: 3, prepTime: "25 min", imageUrl: D.paneerAngara, tags: ["Smoky","Spicy"] },
      { id: "ni11", name: "Paneer Bhurji",          desc: "Scrambled crumbled paneer tossed with onions, tomatoes, and spices.", price: 190, spice: 2, prepTime: "15 min", imageUrl: D.paneerBhurji, tags: ["Dry"] },
      { id: "ni12", name: "Mixed Vegetable Curry",  desc: "Seasonal vegetables slow-cooked in a mildly spiced north Indian masala.", price: 180, spice: 1, prepTime: "20 min", imageUrl: D.mixedVeg, tags: ["Mild"] },
      { id: "ni13", name: "Navarathna Kuruma",      desc: "Nine-vegetable korma cooked in a sweet, nutty cream gravy — festival favourite.", price: 210, spice: 1, prepTime: "25 min", isChefPick: true, imageUrl: D.navaratna, tags: ["Mild","Rich"] },
      { id: "ni14", name: "Veg Jalfrezi",           desc: "Crisp vegetables stir-fried with capsicum, tomatoes, and spices.", price: 180, spice: 2, prepTime: "15 min", imageUrl: D.vegJalfrezi, tags: ["Semi-dry"] },
      { id: "ni15", name: "Veg Kolhapuri",          desc: "Fiery, dark Kolhapuri masala with mixed vegetables — for the brave.", price: 180, spice: 3, prepTime: "20 min", imageUrl: D.paneerKolhapuri, tags: ["Very Spicy"] },
      { id: "ni16", name: "Veg Safed",              desc: "White gravy — mild, creamy, and delicately spiced. A unique offering.", price: 190, spice: 0, prepTime: "20 min", imageUrl: D.kajuMasala, tags: ["Mild","Unique"] },
      { id: "ni17", name: "Baby Corn Masala",       desc: "Tender baby corn in a richly spiced onion-tomato masala.", price: 190, spice: 2, prepTime: "15 min", imageUrl: D.babyCornPepperFry, tags: ["Crunchy"] },
      { id: "ni18", name: "Corn Masala",            desc: "Whole sweet corn kernels cooked in a tangy, spiced gravy.", price: 180, spice: 2, prepTime: "15 min", imageUrl: D.mixedVeg, tags: ["Sweet"] },
      { id: "ni19", name: "Green Peas Masala",      desc: "Fresh green peas in a thick, aromatic north Indian masala.", price: 170, spice: 2, prepTime: "15 min", imageUrl: D.vegJalfrezi, tags: ["Classic"] },
      { id: "ni20", name: "Channa Masala",          desc: "Bold, tangy chickpea curry cooked with whole spices and amchur.", price: 180, spice: 2, prepTime: "20 min", isBestSeller: true, imageUrl: D.channamasala, tags: ["Hearty","Classic"] },
      { id: "ni21", name: "Kaju Masala",            desc: "Whole cashews in a rich, golden cream and saffron gravy.", price: 270, spice: 1, prepTime: "20 min", imageUrl: D.kajuMasala, tags: ["Rich","Mild"] },
      { id: "ni22", name: "Bhindi Masala",          desc: "Okra cooked with onions, tomatoes, and a dry spice blend.", price: 170, spice: 2, prepTime: "15 min", imageUrl: D.bhindi, tags: ["Classic"] },
      { id: "ni23", name: "Bhindi Fry",             desc: "Okra shallow-fried with turmeric, coriander, and caramelised onion.", price: 160, spice: 1, prepTime: "12 min", imageUrl: D.gobi65, tags: ["Dry","Crispy"] },
      { id: "ni24", name: "Stuffed Tomato Gravy",   desc: "Whole tomatoes stuffed with a fragrant paneer mixture in a tomato sauce.", price: 220, spice: 2, prepTime: "25 min", isChefPick: true, imageUrl: D.stuffedTomato, tags: ["Unique","Chef's Pick"] },
    ],
  },

  // ─── 4. DAL SPECIAL ─────────────────────────────────────────────────────
  {
    slug: "dal",
    name: "Dal Special",
    shortDesc: "Traditional lentil preparations — humble, hearty, and irresistible.",
    bannerImage: BANNERS.dal,
    dishes: [
      { id: "d01", name: "Dal Fry",         desc: "Yellow lentils fried with onion, garlic, and whole spices — a comforting classic.", price: 140, spice: 2, prepTime: "15 min", imageUrl: D.dalFry, tags: ["Classic","Comfort"] },
      { id: "d02", name: "Dal Tadka",        desc: "Yellow lentils tempered with cumin, garlic, and a finishing drizzle of desi ghee.", price: 150, spice: 1, prepTime: "15 min", isBestSeller: true, isChefPick: true, imageUrl: D.dalTadka, tags: ["Comfort","Mild"] },
      { id: "d03", name: "Dal Makhani",      desc: "Slow-cooked black lentils in a rich, buttery tomato gravy. Restaurant favourite.", price: 180, spice: 1, prepTime: "25 min", isBestSeller: true, imageUrl: D.dalMakhani, tags: ["Rich","Creamy"] },
      { id: "d04", name: "Dal Palak",        desc: "Earthy lentils blended with fresh spinach and seasoned with South Indian spices.", price: 160, spice: 1, prepTime: "15 min", imageUrl: D.dalPalak, tags: ["Healthy","Greens"] },
      { id: "d05", name: "Dal Panchratna",   desc: "Five lentils cooked together — the richest, most flavourful dal on the menu.", price: 190, spice: 2, prepTime: "25 min", isChefPick: true, imageUrl: D.dalPanchratna, tags: ["Rich","Unique"] },
    ],
  },

  // ─── 5. RICE & BIRYANI ──────────────────────────────────────────────────
  {
    slug: "rice-biryani",
    name: "Rice & Biryani",
    shortDesc: "Fragrant biryanis, pulao, and rice preparations that define a celebration.",
    bannerImage: BANNERS.riceBiryani,
    dishes: [
      { id: "rb01", name: "Veg Dum Biryani",     desc: "Fragrant basmati layered with seasonal vegetables and aromatic whole spices, sealed and slow-cooked.", price: 230, spice: 2, prepTime: "35 min", isBestSeller: true, isChefPick: true, imageUrl: D.biryani, tags: ["Aromatic","Festive"] },
      { id: "rb02", name: "Hyderabadi Biryani",  desc: "Fragrant Hyderabadi-style dum biryani with fried onions, mint, and saffron.", price: 250, spice: 2, prepTime: "35 min", isBestSeller: true, imageUrl: D.hyderabadiBiryani, tags: ["Aromatic","Rich"] },
      { id: "rb03", name: "Kashmiri Pulao",       desc: "Sweet-savoury pulao with dry fruits, saffron, and rose water — festive and unique.", price: 200, spice: 0, prepTime: "25 min", isChefPick: true, imageUrl: D.kashmiriPulao, tags: ["Mild","Unique"] },
      { id: "rb04", name: "Paneer Pulao",         desc: "Lightly spiced basmati rice cooked with paneer cubes and whole spices.", price: 180, spice: 1, prepTime: "20 min", imageUrl: D.paneerPulao, tags: ["Light"] },
      { id: "rb05", name: "Peas Pulao",           desc: "Simple, fragrant rice with fresh green peas and cumin. Perfect with any curry.", price: 150, spice: 0, prepTime: "20 min", imageUrl: D.peasPulao, tags: ["Mild"] },
      { id: "rb06", name: "Veg Pulao",            desc: "Mixed vegetable pulao with cinnamon, cardamom, and bay leaf.", price: 160, spice: 1, prepTime: "20 min", imageUrl: D.vegPulao, tags: ["Light"] },
      { id: "rb07", name: "Steam Rice",           desc: "Plain steamed basmati — the perfect companion for any curry or dal.", price: 80,  spice: 0, prepTime: "15 min", imageUrl: D.steamRice, tags: ["Mild","Plain"] },
      { id: "rb08", name: "Jeera Rice",           desc: "Fluffy basmati tempered with cumin seeds, ghee, and fresh coriander.", price: 120, spice: 0, prepTime: "15 min", isBestSeller: true, imageUrl: D.jeeraRice, tags: ["Mild","Classic"] },
      { id: "rb09", name: "Masala Rice",          desc: "Spiced rice with mixed vegetables, tomatoes, and whole spice tempering.", price: 140, spice: 2, prepTime: "20 min", imageUrl: D.masalaRice, tags: ["Spiced"] },
    ],
  },

  // ─── 6. MEALS ────────────────────────────────────────────────────────────
  {
    slug: "meals",
    name: "Meals",
    shortDesc: "Complete South Indian thalis served on banana leaf — the full experience.",
    bannerImage: BANNERS.meals,
    dishes: [
      { id: "m01", name: "Veg Meals",        desc: "Full South Indian vegetarian thali — rice, sambar, rasam, kootu, poriyal, appalam, pickle, and payasam.", price: 180, spice: 1, prepTime: "10 min", isBestSeller: true, imageUrl: D.vegMeals, tags: ["Complete","Traditional"] },
      { id: "m02", name: "Mini Meals",        desc: "A lighter thali with rice, sambar, rasam, one side, appalam, and sweet.", price: 120, spice: 1, prepTime: "10 min", isBestSeller: true, imageUrl: D.miniMeals, tags: ["Value","Light"] },
      { id: "m03", name: "Bombay Meals",      desc: "North meets South — includes veg curry, dal, rice, bread, raita, and dessert.", price: 200, spice: 2, prepTime: "10 min", imageUrl: D.bombayMeals, tags: ["Fusion"] },
      { id: "m04", name: "Executive Meals",   desc: "Premium full thali with extra curries, choice of paneer dish, sweet, papad, and pickle.", price: 280, spice: 1, prepTime: "10 min", isChefPick: true, imageUrl: D.executiveMeals, tags: ["Premium","Unlimited"] },
    ],
  },

  // ─── 7. INDIAN BREADS ───────────────────────────────────────────────────
  {
    slug: "breads",
    name: "Indian Breads",
    shortDesc: "Soft naans, flaky parathas, and puffy pooris straight from the tandoor.",
    bannerImage: BANNERS.breads,
    dishes: [
      { id: "br01", name: "Butter Naan",     desc: "Pillowy soft leavened bread brushed with butter and straight from the tandoor.", price: 60, spice: 0, prepTime: "10 min", isBestSeller: true, imageUrl: D.butterNaan, tags: ["Soft","Butter"] },
      { id: "br02", name: "Plain Naan",      desc: "Classic leavened tandoor bread — light, chewy, and perfect with any gravy.", price: 50, spice: 0, prepTime: "10 min", imageUrl: D.chapati, tags: ["Classic"] },
      { id: "br03", name: "Garlic Naan",     desc: "Naan generously brushed with garlic butter and fresh coriander leaves.", price: 70, spice: 0, prepTime: "10 min", isChefPick: true, imageUrl: D.garlicNaan, tags: ["Garlic","Aromatic"] },
      { id: "br04", name: "Kulcha",          desc: "Soft leavened bread with a slightly crispy base — great with chole.", price: 55, spice: 0, prepTime: "10 min", imageUrl: D.kulcha, tags: ["Classic"] },
      { id: "br05", name: "Butter Kulcha",   desc: "Kulcha finished with a generous butter glaze from the tandoor.", price: 65, spice: 0, prepTime: "10 min", imageUrl: D.butterNaan, tags: ["Butter"] },
      { id: "br06", name: "Parotta",         desc: "Multi-layered flaky South Indian parotta — best with salna or kurma.", price: 40, spice: 0, prepTime: "10 min", isBestSeller: true, imageUrl: D.parotta, tags: ["Flaky","South Indian"] },
      { id: "br07", name: "Chapati",         desc: "Thin whole-wheat flatbread, soft and light — a daily staple.", price: 30, spice: 0, prepTime: "8 min", imageUrl: D.chapati, tags: ["Healthy","Whole Wheat"] },
      { id: "br08", name: "Tandoori Roti",   desc: "Whole-wheat roti baked in the tandoor for a slight char and smokiness.", price: 40, spice: 0, prepTime: "10 min", imageUrl: D.tandooriRoti, tags: ["Smoky","Whole Wheat"] },
      { id: "br09", name: "Butter Roti",     desc: "Soft whole-wheat roti finished with a generous knob of butter.", price: 45, spice: 0, prepTime: "10 min", imageUrl: D.garlicNaan, tags: ["Butter"] },
    ],
  },

  // ─── 8. RAITA & SALAD ───────────────────────────────────────────────────
  {
    slug: "raita-salad",
    name: "Raita & Salad",
    shortDesc: "Cool, refreshing accompaniments to balance every rich meal.",
    bannerImage: BANNERS.raitaSalad,
    dishes: [
      { id: "rs01", name: "Onion Raita",       desc: "Fresh onion in thick chilled yogurt, seasoned with cumin and chilli.", price: 60, spice: 1, prepTime: "5 min", imageUrl: D.onionRaita, tags: ["Cooling"] },
      { id: "rs02", name: "Cucumber Raita",    desc: "Grated cucumber in mint-flavoured yogurt — the coolest side on the menu.", price: 60, spice: 0, prepTime: "5 min", isBestSeller: true, imageUrl: D.raita, tags: ["Cooling","Refreshing"] },
      { id: "rs03", name: "Mix Veg Raita",     desc: "Diced seasonal vegetables in thick chilled yogurt with cumin and coriander.", price: 70, spice: 0, prepTime: "5 min", imageUrl: D.boondiRaita, tags: ["Fresh"] },
      { id: "rs04", name: "Boondi Raita",      desc: "Crispy boondi in yogurt with cumin and a hint of red chilli powder.", price: 65, spice: 1, prepTime: "5 min", imageUrl: D.raita, tags: ["Crispy"] },
      { id: "rs05", name: "Pineapple Raita",   desc: "Sweet pineapple chunks in cool yogurt — a surprising, delightful pairing.", price: 75, spice: 0, prepTime: "5 min", isChefPick: true, imageUrl: D.pineappleRaita, tags: ["Sweet","Unique"] },
      { id: "rs06", name: "Green Salad",       desc: "Crisp fresh vegetables with lemon juice, rock salt, and chaat masala.", price: 70, spice: 0, prepTime: "5 min", imageUrl: D.greenSalad, tags: ["Healthy","Fresh"] },
      { id: "rs07", name: "Veg Salad",         desc: "Mixed raw vegetables with a mint-lemon dressing.", price: 70, spice: 0, prepTime: "5 min", imageUrl: D.mixedVeg, tags: ["Healthy"] },
      { id: "rs08", name: "Russian Salad",     desc: "Classic creamy vegetable salad with mixed vegetables and mayo.", price: 100, spice: 0, prepTime: "8 min", imageUrl: D.russianSalad, tags: ["Creamy"] },
      { id: "rs09", name: "Fruit Salad",       desc: "Seasonal fresh fruits tossed with honey and a squeeze of lime.", price: 110, spice: 0, prepTime: "5 min", isBestSeller: true, imageUrl: D.fruitSalad, tags: ["Fresh","Sweet"] },
      { id: "rs10", name: "Paneer Salad",      desc: "Fresh paneer cubes with vegetables, lemon, and house spice dressing.", price: 130, spice: 1, prepTime: "8 min", imageUrl: D.raita, tags: ["Protein"] },
    ],
  },

  // ─── 9. CHINESE ─────────────────────────────────────────────────────────
  {
    slug: "chinese",
    name: "Chinese",
    shortDesc: "Indo-Chinese favourites — fried rice, noodles, and saucy wonders.",
    bannerImage: BANNERS.chinese,
    dishes: [
      { id: "ch01", name: "Veg Fried Rice",         desc: "Wok-tossed basmati with crunchy vegetables, soy sauce, and sesame oil.", price: 160, spice: 1, prepTime: "15 min", isBestSeller: true, imageUrl: D.friedRice, tags: ["Wok","Classic"] },
      { id: "ch02", name: "Schezwan Fried Rice",     desc: "Spicy Schezwan sauce-tossed rice with vegetables and a fiery finish.", price: 180, spice: 3, prepTime: "15 min", isBestSeller: true, imageUrl: D.schezwan, tags: ["Spicy","Wok"] },
      { id: "ch03", name: "Veg Noodles",             desc: "Stir-fried noodles with fresh vegetables in a light savoury sauce.", price: 150, spice: 1, prepTime: "15 min", imageUrl: D.noodles, tags: ["Noodles"] },
      { id: "ch04", name: "Hakka Noodles",           desc: "Classic Hakka-style noodles with vegetables and a blend of Indo-Chinese sauces.", price: 160, spice: 1, prepTime: "15 min", isChefPick: true, imageUrl: D.hakka, tags: ["Classic","Noodles"] },
      { id: "ch05", name: "Schezwan Noodles",        desc: "Spicy Schezwan sauce coating stir-fried noodles with capsicum and carrots.", price: 170, spice: 3, prepTime: "15 min", imageUrl: D.schezwan, tags: ["Spicy","Noodles"] },
      { id: "ch06", name: "Veg Chop Suey",           desc: "Crispy noodle base topped with a thick, saucy stir-fried vegetable medley.", price: 170, spice: 1, prepTime: "18 min", isChefPick: true, imageUrl: D.chopsuey, tags: ["Crispy"] },
      { id: "ch07", name: "Szechuan Chilli Tofu",    desc: "Silken tofu with Szechuan peppercorn sauce and garden-fresh vegetables.", price: 180, spice: 3, prepTime: "15 min", isNew: true, imageUrl: D.szechuan, tags: ["Spicy","New"] },
      { id: "ch08", name: "Veg Manchurian Gravy",    desc: "Crispy veg balls in a rich, glossy, garlicky Manchurian gravy sauce.", price: 160, spice: 2, prepTime: "15 min", isBestSeller: true, imageUrl: D.manchurian, tags: ["Gravy","Indo-Chinese"] },
    ],
  },

  // ─── 10. BEVERAGES ───────────────────────────────────────────────────────
  {
    slug: "beverages",
    name: "Beverages",
    shortDesc: "Refreshing drinks — from heritage filter coffee to tropical coolers.",
    bannerImage: BANNERS.beverages,
    dishes: [
      { id: "bv01", name: "Filter Coffee",      desc: "South India's beloved devanagari — dark decoction with milk, served in a traditional tumbler and davara.", price: 60,  spice: 0, prepTime: "5 min", isBestSeller: true, isChefPick: true, imageUrl: D.filterCoffee, tags: ["Hot","Heritage"] },
      { id: "bv02", name: "Masala Tea",          desc: "Boldly spiced Indian chai with ginger, cardamom, and a hint of pepper.", price: 50, spice: 1, prepTime: "5 min", isBestSeller: true, imageUrl: D.masalaTea, tags: ["Hot","Spiced"] },
      { id: "bv03", name: "Mango Lassi",         desc: "Thick, creamy yogurt blended with ripe Alphonso mangoes and cardamom.", price: 100, spice: 0, prepTime: "5 min", isBestSeller: true, imageUrl: D.lassi, tags: ["Cold","Mango"] },
      { id: "bv04", name: "Sweet Lassi",         desc: "Classic chilled yogurt drink blended with sugar and rose water.", price: 80, spice: 0, prepTime: "5 min", imageUrl: D.raita, tags: ["Cold","Sweet"] },
      { id: "bv05", name: "Salted Buttermilk",   desc: "Thin, spiced buttermilk with curry leaf and ginger — the South Indian staple.", price: 50, spice: 0, prepTime: "5 min", imageUrl: D.buttermilk, tags: ["Digestive","Cold"] },
      { id: "bv06", name: "Fresh Lime Soda",     desc: "Freshly squeezed lime with soda — sweet, salted, or mixed to your taste.", price: 70, spice: 0, prepTime: "5 min", imageUrl: D.limeJuice, tags: ["Cold","Refreshing"] },
      { id: "bv07", name: "Badam Milk",          desc: "Warm sweetened milk with almond paste, saffron, and a pinch of cardamom.", price: 100, spice: 0, prepTime: "8 min", isChefPick: true, imageUrl: D.milkshake, tags: ["Warm","Rich"] },
      { id: "bv08", name: "Coconut Water",       desc: "Fresh, chilled tender coconut water — the ultimate natural cooler.", price: 80, spice: 0, prepTime: "2 min", imageUrl: D.coconutWater, tags: ["Cold","Natural"] },
      { id: "bv09", name: "Nannari Sherbet",     desc: "Traditional herb sherbet from nannari root — cooling, sweet, and utterly unique.", price: 90, spice: 0, prepTime: "5 min", isNew: true, imageUrl: D.nannari, tags: ["Cold","Heritage","New"] },
    ],
  },

  // ─── 11. DESSERTS ────────────────────────────────────────────────────────
  {
    slug: "desserts",
    name: "Desserts",
    shortDesc: "Sweet endings to your meal — from traditional payasam to decadent halwa.",
    bannerImage: BANNERS.desserts,
    dishes: [
      { id: "ds01", name: "Gulab Jamun",       desc: "Soft cottage cheese dumplings soaked in rose-saffron sugar syrup.", price: 80, spice: 0, prepTime: "5 min", isBestSeller: true, imageUrl: D.gulabJamun, tags: ["Sweet","Classic"] },
      { id: "ds02", name: "Rasmalai",           desc: "Delicate cottage cheese patties in chilled, saffron-infused cream milk.", price: 100, spice: 0, prepTime: "5 min", isChefPick: true, imageUrl: D.rasmalai, tags: ["Sweet","Creamy"] },
      { id: "ds03", name: "Carrot Halwa",       desc: "Slow-cooked grated carrot halwa with ghee, milk, nuts, and cardamom.", price: 90, spice: 0, prepTime: "15 min", isBestSeller: true, imageUrl: D.halwa, tags: ["Warm","Classic"] },
      { id: "ds04", name: "Kheer / Payasam",    desc: "Creamy rice kheer slow-cooked with milk, sugar, cardamom, and dry fruits.", price: 80, spice: 0, prepTime: "5 min", imageUrl: D.payasam, tags: ["Classic","Heritage"] },
      { id: "ds05", name: "Vanilla Ice Cream",  desc: "Chilled, classic vanilla ice cream — the perfect palate cleanser.", price: 70, spice: 0, prepTime: "2 min", imageUrl: D.iceCream, tags: ["Cold","Sweet"] },
      { id: "ds06", name: "Chocolate Brownie",  desc: "Rich, dense chocolate brownie served warm with vanilla ice cream.", price: 130, spice: 0, prepTime: "8 min", isNew: true, imageUrl: D.brownie, tags: ["Rich","New"] },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export function getCategoryBySlug(slug: string): MenuCategory | undefined {
  return MENU.find(c => c.slug === slug);
}

export function getAllDishes(): Dish[] {
  return MENU.flatMap(c => c.dishes);
}

export function searchDishes(query: string): Dish[] {
  const q = query.toLowerCase();
  return MENU.flatMap(c => c.dishes).filter(
    d => d.name.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q) ||
      (d.tags ?? []).some(t => t.toLowerCase().includes(q))
  );
}

export const FEATURED_DISHES: Dish[] = [
  { id: "f01", name: "Paneer Butter Masala",  desc: "Silky tomato-butter gravy with fresh cottage cheese, slow-simmered to perfection.", price: 220, spice: 2, prepTime: "20 min", isBestSeller: true, isChefPick: true, imageUrl: img("1585937421612-70a008356c36"), tags: ["Rich","Creamy"] },
  { id: "f02", name: "Veg Dum Biryani",        desc: "Fragrant basmati layered with seasonal vegetables and aromatic whole spices, sealed and slow-cooked.", price: 230, spice: 2, prepTime: "35 min", isBestSeller: true, isChefPick: true, imageUrl: img("1596797038530-2c107229654b"), tags: ["Aromatic","Festive"] },
  { id: "f03", name: "Palak Paneer",            desc: "Cottage cheese cubes in a smooth, lightly spiced spinach gravy.", price: 210, spice: 1, prepTime: "20 min", isChefPick: true, imageUrl: img("1631452180519-a6e6a51b7b37"), tags: ["Healthy","Greens"] },
  { id: "f04", name: "Gobi 65",                 desc: "Deep-fried cauliflower in a fiery, tangy coating. Crispy with every bite.", price: 130, spice: 3, prepTime: "15 min", isBestSeller: true, imageUrl: img("1645177628172-a786cb92f1c7"), tags: ["Crispy","Spicy"] },
  { id: "f05", name: "Dal Makhani",             desc: "Slow-cooked black lentils in a rich, buttery tomato gravy. Restaurant favourite.", price: 180, spice: 1, prepTime: "25 min", isBestSeller: true, imageUrl: img("1546833999-b9f581a1996d"), tags: ["Rich","Creamy"] },
  { id: "f06", name: "Filter Coffee",           desc: "South India's beloved devanagari — dark decoction with milk, served in a traditional tumbler and davara.", price: 60, spice: 0, prepTime: "5 min", isBestSeller: true, isChefPick: true, imageUrl: img("1511920170033-f8396924c348"), tags: ["Hot","Heritage"] },
];

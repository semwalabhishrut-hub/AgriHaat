// ─── Farm2Market AI — Centralized Demo Data ───
// All data below is illustrative/prototype data for the marketing website.
// No real users, transactions, or market data are represented.

export const produceListings = [
  {
    id: "tomato",
    name: "Tomatoes",
    nameHi: "टमाटर",
    grade: "A",
    quantity: 500,
    unit: "kg",
    price: 32,
    location: "Kanchipuram, TN",
    seller: "ABC FPO",
    verified: true,
    harvest: "28 Aug 2026",
    image: "/tomatoes-market.png",
  },
  {
    id: "onion",
    name: "Onions",
    nameHi: "प्याज",
    grade: "A",
    quantity: 1000,
    unit: "kg",
    price: 28,
    location: "Nellore, AP",
    seller: "GreenFields FPO",
    verified: true,
    harvest: "01 Sep 2026",
    image: "/onion.jpg",
  },
  {
    id: "potato",
    name: "Potatoes",
    nameHi: "आलू",
    grade: "A",
    quantity: 800,
    unit: "kg",
    price: 26,
    location: "Chittoor, AP",
    seller: "Rayalaseema FPO",
    verified: true,
    harvest: "30 Aug 2026",
    image: "/potato.jpg",
  },
  {
    id: "rice",
    name: "Basmati Rice",
    nameHi: "बासमती चावल",
    grade: "A",
    quantity: 2000,
    unit: "kg",
    price: 62,
    location: "Karnal, HR",
    seller: "Punjab Agri FPO",
    verified: true,
    harvest: "15 Sep 2026",
    image: "/potato.jpg",
  },
] as const;

export const demandForecast = {
  product: "Tomato",
  productHi: "टमाटर",
  region: "Chennai",
  expectedDemand: 18400,
  unit: "kg",
  period: "next 7 days",
  periodHi: "अगले 7 दिन",
  trend: 12,
  confidence: 87,
  recommendation: "Increase tomato aggregation from nearby FPOs.",
  recommendationHi: "नजदीकी FPOs से टमाटर संग्रह बढ़ाएं।",
  label: "Prototype forecast · demo data",
  labelHi: "प्रोटोटाइप पूर्वानुमान · डेमो डेटा",
};

export const farmerRealization = {
  buyerPrice: 40,
  logistics: 3,
  platformFee: 1,
  realization: 36,
  quantity: 500,
  expectedPayout: 18000,
  unit: "kg",
  label: "Illustrative demo calculation",
  labelHi: "सांकेतिक डेमो गणना",
};

export const routeData = {
  origin: "Kanchipuram",
  destination: "Chennai Buyer",
  totalDistance: 124,
  totalTime: "4h 20m",
  totalWeight: 430,
  stops: [
    { name: "Farmer A", type: "pickup" as const, weight: 250, grade: "A", price: 31 },
    { name: "Farmer B", type: "pickup" as const, weight: 180, grade: "A", price: 33 },
    { name: "Collection Centre", type: "hub" as const, weight: 430, grade: "A", price: 0 },
    { name: "Chennai Buyer", type: "delivery" as const, weight: 430, grade: "A", price: 0 },
  ],
  label: "Optimized route · demo",
  labelHi: "अनुकूलित मार्ग · डेमो",
};

export const buyerOrder = {
  buyer: "ABC Restaurant",
  requirement: 2000,
  product: "Tomatoes",
  productHi: "टमाटर",
  grade: "A",
  deliveryCity: "Chennai",
  availableNearby: 2450,
  matched: 2000,
  estimatedDelivery: "Tomorrow",
  estimatedDeliveryHi: "कल",
};

export const faqItems = [
  {
    q: "How does Farm2Market help farmers get a better price?",
    qHi: "Farm2Market किसानों को बेहतर कीमत कैसे दिलाता है?",
    a: "By connecting farmers directly with buyers, the platform reduces the number of intermediaries. The transparent pricing breakdown shows exactly what the farmer receives after logistics and platform fees.",
    aHi: "किसानों को सीधे खरीदारों से जोड़कर, प्लेटफ़ॉर्म बिचौलियों की संख्या कम करता है। पारदर्शी मूल्य विवरण बताता है कि लॉजिस्टिक्स और प्लेटफ़ॉर्म शुल्क के बाद किसान को कितना मिलता है।",
  },
  {
    q: "How does the farmer know what they will receive?",
    qHi: "किसान को कैसे पता चलता है कि उसे कितना मिलेगा?",
    a: "Before confirming a sale, farmers can see an estimated realization breakdown — buyer price minus logistics and platform fee — so they can make informed decisions.",
    aHi: "बिक्री की पुष्टि से पहले, किसान अनुमानित प्राप्ति विवरण देख सकते हैं — खरीदार मूल्य में से लॉजिस्टिक्स और प्लेटफ़ॉर्म शुल्क घटाकर।",
  },
  {
    q: "Can multiple farmers fulfill one buyer order?",
    qHi: "क्या एक खरीदार के ऑर्डर को कई किसान पूरा कर सकते हैं?",
    a: "Yes. Farm2Market can aggregate supply from nearby farmers and FPOs to fulfill larger buyer orders, coordinating pickup into a single logistics run.",
    aHi: "हाँ। Farm2Market नजदीकी किसानों और FPOs से आपूर्ति जोड़कर बड़े ऑर्डर पूरे कर सकता है।",
  },
  {
    q: "Who handles pickup and delivery?",
    qHi: "पिकअप और डिलीवरी कौन करता है?",
    a: "Farm2Market coordinates logistics partners and optimizes routes for efficient pickup from farms and delivery to buyers. The platform handles the coordination, not the physical transport.",
    aHi: "Farm2Market लॉजिस्टिक्स पार्टनरों का समन्वय करता है और कुशल पिकअप और डिलीवरी के लिए मार्ग अनुकूलित करता है।",
  },
  {
    q: "Can buyers order large quantities?",
    qHi: "क्या खरीदार बड़ी मात्रा में ऑर्डर कर सकते हैं?",
    a: "Absolutely. The platform is designed for bulk ordering — restaurants, retailers, and institutional buyers can source large quantities matched from multiple nearby sellers.",
    aHi: "बिल्कुल। प्लेटफ़ॉर्म थोक ऑर्डर के लिए बनाया गया है — रेस्तरां, खुदरा विक्रेता और संस्थागत खरीदार बड़ी मात्रा में खरीद सकते हैं।",
  },
  {
    q: "How are AI forecasts generated?",
    qHi: "AI पूर्वानुमान कैसे बनाए जाते हैं?",
    a: "Forecasts use historical demand patterns, seasonal trends, and regional supply data. These are prototype estimates and should not be treated as official market predictions.",
    aHi: "पूर्वानुमान ऐतिहासिक मांग पैटर्न, मौसमी रुझानों और क्षेत्रीय आपूर्ति डेटा का उपयोग करते हैं। ये प्रोटोटाइप अनुमान हैं।",
  },
  {
    q: "Is the forecast official market data?",
    qHi: "क्या पूर्वानुमान आधिकारिक बाज़ार डेटा है?",
    a: "No. All forecasts shown are prototype estimates based on simulated data. They are clearly labeled as demo data and should not be used for financial decisions.",
    aHi: "नहीं। दिखाए गए सभी पूर्वानुमान सिम्युलेटेड डेटा पर आधारित प्रोटोटाइप अनुमान हैं।",
  },
  {
    q: "What happens if a farmer cannot fulfill an order?",
    qHi: "अगर किसान ऑर्डर पूरा नहीं कर पाता तो क्या होता है?",
    a: "The platform can reassign the order to nearby sellers with available supply. Buyers are notified of any changes, and aggregation helps ensure continuity.",
    aHi: "प्लेटफ़ॉर्म ऑर्डर को उपलब्ध आपूर्ति वाले नजदीकी विक्रेताओं को पुनः सौंप सकता है।",
  },
];

export const testimonials = [
  {
    stars: 5,
    quote: "We had 500 kg of tomatoes ready and found a bulk buyer without going through multiple local intermediaries.",
    quoteHi: "हमारे पास 500 किलो टमाटर तैयार थे और बिचौलियों के बिना ही बल्क बायर मिल गया।",
    name: "Ramesh Kumar",
    role: "Farmer · Kanchipuram",
    roleHi: "किसान · कांचीपुरम",
    label: "Illustrative scenario",
    labelHi: "सांकेतिक परिदृश्य",
  },
  {
    stars: 5,
    quote: "We could compare available supply from nearby FPOs before placing a larger order.",
    quoteHi: "बड़ा ऑर्डर देने से पहले हम नजदीकी FPOs की उपलब्ध आपूर्ति की तुलना कर सके।",
    name: "Anita Rao",
    role: "Bulk buyer · Chennai",
    roleHi: "बल्क खरीदार · चेन्नई",
    label: "Illustrative scenario",
    labelHi: "सांकेतिक परिदृश्य",
  },
  {
    stars: 5,
    quote: "Aggregating nearby orders made pickup planning much easier.",
    quoteHi: "नजदीकी ऑर्डर्स को जोड़ने से पिकअप की योजना बहुत आसान हो गई।",
    name: "FPO Operations Team",
    role: "Tamil Nadu",
    roleHi: "तमिलनाडु",
    label: "Illustrative scenario",
    labelHi: "सांकेतिक परिदृश्य",
  },
];

export const aiChatMessages = [
  {
    role: "user" as const,
    text: "Chennai mein agle 7 din mein tomato demand kaisi hai?",
    textHi: "चेन्नई में अगले 7 दिन में टमाटर की डिमांड कैसी है?",
  },
  {
    role: "ai" as const,
    text: "Prototype forecast ke according, expected demand approximately 18,400 kg hai — around 12% higher than the previous period.",
    textHi: "प्रोटोटाइप पूर्वानुमान के अनुसार, अपेक्षित मांग लगभग 18,400 किलो है — पिछली अवधि से लगभग 12% अधिक।",
  },
  {
    role: "user" as const,
    text: "Nearby FPO supply kitni available hai?",
    textHi: "नजदीकी FPO सप्लाई कितनी उपलब्ध है?",
  },
  {
    role: "ai" as const,
    text: "Current demo inventory shows approximately 21,600 kg across nearby listings.",
    textHi: "वर्तमान डेमो इन्वेंटरी में नजदीकी लिस्टिंग में लगभग 21,600 किलो दिख रहा है।",
  },
];

export const orderSteps = [
  { label: "Placed", labelHi: "ऑर्डर किया", completed: true },
  { label: "Confirmed", labelHi: "पुष्टि हुई", completed: true },
  { label: "Picked Up", labelHi: "पिक अप हुआ", completed: true },
  { label: "In Transit", labelHi: "रास्ते में", completed: false },
  { label: "Delivered", labelHi: "डिलीवर हुआ", completed: false },
];

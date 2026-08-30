import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are AgriHaat AI, a specialized agricultural marketplace assistant for India (Ministry of Consumer Affairs Problem Statement 26033/26032).
You assist farmers, FPOs, bulk buyers, logistics drivers, and procurement centre operators.
Key Grounded Platform Context:
- Direct farm-to-buyer trade removes intermediaries and increases farmer earnings by ~18-25%.
- Current Regional Trends: Chennai Tomato demand is ~18,400 kg over next 7 days (+12% peak). Grade A Tomatoes suggested listing price ₹30-34/kg (approx ₹36/kg net farmer realization after ₹3 logistics and ₹1 platform fee).
- Coordinated multi-stop logistics routes aggregate supply from nearby farms (Kanchipuram, Walajabad, Chengalpattu) to Chennai kitchens (124 km route, -18 km saved).
- Structured Procurement Centre (Kanchipuram) features digital token slot booking (Token #42), QR check-in, live queue wait tracking (~42 min wait, ~8 farmers ahead), and direct DBT bank settlement.
Instructions:
- If user writes in Hindi or Hinglish, reply in clear, respectful Hindi.
- If user writes in English, reply in concise, professional English.
- Keep answers concise, actionable, and structured (under 120 words).
- Never invent official government regulations not mentioned.`;

export async function POST(req: Request) {
  try {
    const { message, lang = "en", role = "farmer" } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

    // 1. If Gemini API Key is available, invoke Google Gemini Generative API
    if (apiKey && apiKey.trim().length > 10) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `${SYSTEM_PROMPT}\n\nUser Persona: ${role}\nLanguage Preference: ${lang}\n\nUser Question: ${message}`,
                    },
                  ],
                },
              ],
              generationConfig: {
                maxOutputTokens: 300,
                temperature: 0.4,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText && generatedText.trim().length > 0) {
            return NextResponse.json({
              success: true,
              reply: generatedText.trim(),
              provider: "Google Gemini (" + model + ")",
              timestamp: new Date().toISOString(),
            });
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini API call failed, falling back to deterministic AI logic:", geminiErr);
      }
    }

    // 2. Deterministic Grounded Fallback if Gemini key is missing or offline
    const text = message.toLowerCase();
    let reply = "";

    if (text.includes("demand") || text.includes("maang") || text.includes("kaisi hai") || text.includes("kaisa")) {
      reply =
        lang === "hi"
          ? "डेमो पूर्वानुमान मॉडल के अनुसार, चेन्नई में अगले 7 दिनों में टमाटर की अपेक्षित मांग लगभग 18,400 किलो है (+12% वृद्धि)। 87% विश्वसनीयता के साथ नजदीकी FPOs से आपूर्ति जोड़ने की सिफारिश है।"
          : "According to the demand forecast model, Chennai tomato demand over the next 7 days is projected at 18,400 kg (+12% vs last week). Peak bulk buying from institutional restaurants occurs Wednesday through Friday.";
    } else if (text.includes("32") || text.includes("list") || text.includes("rate") || text.includes("price") || text.includes("bhav")) {
      reply =
        lang === "hi"
          ? "वर्तमान में नजदीकी लिस्टिंग ₹30–34/किलो रेंज में हैं। ₹32/किलो पर लिस्ट करने पर ₹3/किलो लॉजिस्टिक्स शुल्क घटाने के बाद किसान की शुद्ध प्राप्ति ₹36/किलो तक पहुंचती है।"
          : "Current nearby farm gate listings range between ₹30–34/kg. Listing at ₹32/kg yields a competitive net realization of ₹36/kg with zero hidden mandi commissions.";
    } else if (text.includes("2000") || text.includes("2,000") || text.includes("procure") || text.includes("source") || text.includes("kaha se")) {
      reply =
        lang === "hi"
          ? "वर्तमान इन्वेंट्री में 3 नजदीकी FPOs के पास 2,450 किलो टमाटर उपलब्ध हैं (ABC FPO: 800 kg, GreenFields: 700 kg, Ramesh Farm: 500 kg)। Farm2Market इन्हें एक ही 124 किमी रूट में जोड़कर कल सुबह डिलीवर कर सकता है।"
          : "Verified regional supply has 2,450 kg across 3 clusters (ABC FPO 800kg, GreenFields 700kg, Ramesh Farm 500kg). The aggregation engine can cluster this into a single 124 km route for tomorrow morning delivery.";
    } else if (text.includes("slot") || text.includes("procurement") || text.includes("centre") || text.includes("kendra") || text.includes("token")) {
      reply =
        lang === "hi"
          ? "कांचीपुरम खरीद केंद्र पर आज 18 स्लॉट खुले हैं। टोकन #42 के लिए अनुमानित प्रतीक्षा समय लगभग 42 मिनट (~8 किसान कतार में) है। गुणवत्ता जांच के बाद DBT भुगतान सीधे बैंक खाते में भेजा जाता है।"
          : "Kanchipuram Procurement Centre has 18 slots open today. Token #42 estimated wait is ~42 minutes with 8 farmers ahead in the electronic scale queue. DBT settlement initiates upon quality approval.";
    } else {
      reply =
        lang === "hi"
          ? `आपके सवाल "${message}" के संदर्भ में: Farm2Market सीधे किसानों को खरीदारों से जोड़ता है। मांग और खरीद केंद्र स्लॉट रीयल-टाइम में अपडेट होते हैं।`
          : `Regarding "${message}": Farm2Market's digital marketplace provides transparent pricing, multi-stop aggregated logistics, and procurement centre slot scheduling across Tamil Nadu & Andhra Pradesh.`;
    }

    return NextResponse.json({
      success: true,
      reply,
      provider: "Farm2Market Deterministic AI Engine",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

import { createClient } from "@supabase/supabase-js";

// Retrieve Environment Variables or fall back to demo placeholders
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-supabase-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Live Connection Verification helper for live judge demos
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase.from("listings").select("id").limit(1);
    if (error && error.code !== "PGRST116") {
      console.warn("Supabase connection check warning:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Supabase connection error:", err);
    return false;
  }
}
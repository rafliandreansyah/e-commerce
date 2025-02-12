import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabaseBucket = process.env.NEXT_SUPABASE_BUCKET ?? "";
const supabase = createClient(supabaseUrl, supabaseKey);

export function getImageUrl(name: string) {
  const { data } = supabase.storage
    .from(supabaseBucket)
    .getPublicUrl(`public/brands/${name}`);

  return data.publicUrl;
}

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabaseBucket = process.env.NEXT_SUPABASE_BUCKET ?? "";
const supabase = createClient(supabaseUrl, supabaseKey);

export function getImageUrl(name: string, path: string) {
  const { data } = supabase.storage
    .from(supabaseBucket)
    .getPublicUrl(`public/${path}/${name}`);

  return data.publicUrl;
}

export async function uploadImage(
  file: File,
  path: "brands" | "products" = "brands"
) {
  const fileMime = file.type.split("/")[1];
  const fileName = `${path}-${Date.now()}.${fileMime}`;

  await supabase.storage
    .from(supabaseBucket)
    .upload(`public/${path}/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  return fileName;
}

export async function deleteImage(fileName: string, path: string) {
  await supabase.storage
    .from(supabaseBucket)
    .remove([`public/${path}/${fileName}`]);
}

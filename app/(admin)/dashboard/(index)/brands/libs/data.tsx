import prisma from "@/lib/prisma";

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany();
    return brands;
  } catch (e) {
    console.error(e);
    return [];
  }
}

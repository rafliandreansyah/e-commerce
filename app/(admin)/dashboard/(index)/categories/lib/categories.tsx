"use server";

import prisma from "@/lib/prisma";
import { ActionResult } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function createCategory(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  try {
    const categoryName = formData.get("name");
    if (categoryName) {
      await prisma.category.create({
        data: {
          name: categoryName.toString(),
        },
      });
    } else {
      return {
        error: "Failed to create category",
      };
    }
  } catch (err) {
    console.error(err);
    return {
      error: "Failed to create category",
    };
  }

  revalidatePath("/dashboard/category");
  return redirect("/dashboard/categories", RedirectType.replace);
}

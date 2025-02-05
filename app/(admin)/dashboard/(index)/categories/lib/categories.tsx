"use server";

import prisma from "@/lib/prisma";
import { schemaCategory } from "@/lib/schema";
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
    const validate = schemaCategory.safeParse({
      name: categoryName,
    });

    if (!validate.success) {
      return {
        error: validate.error.errors[0].message,
      };
    }
    if (validate.data.name) {
      await prisma.category.create({
        data: {
          name: validate.data.name,
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

"use server";

import prisma from "@/lib/prisma";
import { schemaCategory } from "@/lib/schema";
import { ActionResult, Category } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
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

  return redirect("/dashboard/categories", RedirectType.replace);
}

export async function getCategoryById(
  categoryId: string
): Promise<Category | null> {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  return category
    ? {
        ...category,
        createdAt: category.createdAt.toISOString(),
        updatedAt: category.updatedAt.toISOString(),
      }
    : null;
}

export async function editCategoryById(
  _: unknown,
  formData: FormData,
  categoryId: string | undefined
): Promise<ActionResult> {
  try {
    if (categoryId) {
      return redirect("/dashboard/categories", RedirectType.replace);
    }

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
      const data = await prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          name: validate.data.name,
        },
      });
      if (!data) {
        return {
          error: "Failed to edit category",
        };
      }
    } else {
      return {
        error: "Failed to edit category",
      };
    }
  } catch (err) {
    console.error(err);
    return {
      error: "Failed to edit category",
    };
  }

  return redirect("/dashboard/categories", RedirectType.replace);
}

export async function deleteCategoryById(
  _: unknown,
  formData: FormData,
  categoryId: string | undefined
) {
  if (!categoryId) {
    return redirect("/dashboard/categories", RedirectType.replace);
  }
  try {
    const dataDelete = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    if (!dataDelete) {
      return {
        error: "Category not found",
      };
    }
    return revalidatePath("/dashboard/categories");
  } catch (err) {
    console.error(err);
    return {
      error: "Failed delete category",
    };
  }
}

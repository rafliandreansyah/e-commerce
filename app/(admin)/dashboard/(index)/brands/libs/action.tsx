"use server";

import prisma from "@/lib/prisma";
import { schemaBrand } from "@/lib/schema";
import { deleteImage, uploadImage } from "@/lib/supabase";
import { ActionResult } from "@/types";
import { redirect, RedirectType } from "next/navigation";

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({});
    return brands;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getBrandById(id: string) {
  try {
    const brand = await prisma.brand.findUnique({
      where: { id: id },
    });
    if (!brand) {
      return null;
    }
    return brand;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function createBrand(_: unknown, form: FormData) {
  const validate = schemaBrand.safeParse({
    name: form.get("name"),
    image: form.get("image"),
  });
  console.log("create brand");
  if (!validate.success) {
    console.log("create brand failed");
    return {
      error: validate.error.errors[0].message,
    };
  }
  console.log(validate.data.image.type);
  try {
    const filePath = await uploadImage(validate.data.image, "brands");
    await prisma.brand.create({
      data: {
        name: validate.data.name,
        logo: filePath,
      },
    });
    console.log("create brand success");
  } catch (e) {
    console.error(e);
    console.log("create brand failed catch");
    return {
      error: "Failed create brand",
    };
  }

  return redirect("/dashboard/brands", RedirectType.replace);
}

export async function editBrandById(
  _: unknown,
  formData: FormData,
  brandId: string | undefined
): Promise<ActionResult> {
  const validate = schemaBrand.pick({ name: true }).safeParse({
    name: formData.get("name"),
  });

  const fileUpload = formData.get("image") as File;

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  try {
    const brand = await prisma.brand.findUnique({
      where: {
        id: brandId,
      },
    });
    if (!brand) {
      return {
        error: "Brand not found",
      };
    }

    let fileName = brand.logo;

    if (fileUpload.size > 0) {
      fileName = await uploadImage(fileUpload);
    }

    await prisma.brand.update({
      where: {
        id: brandId,
      },
      data: {
        name: validate.data.name,
        logo: fileName,
      },
    });
  } catch (e) {
    console.error(e);
    return {
      error: "Failed to edit brand",
    };
  }

  return redirect("/dashboard/brands", RedirectType.replace);
}

export async function deleteBrand(
  _: unknown,
  formData: FormData,
  brandId: string | undefined
): Promise<ActionResult> {
  const brand = await prisma.brand.findUnique({
    where: {
      id: brandId,
    },
    select: {
      logo: true,
    },
  });

  if (!brand) {
    return {
      error: "brand not found",
    };
  }

  try {
    await deleteImage(brand.logo, "brands");
    await prisma.brand.delete({
      where: {
        id: brandId,
      },
    });
  } catch (err) {
    console.error(err);
    return { error: "failed to delete brand" };
  }
  return redirect("/dashboard/brands", RedirectType.replace);
}

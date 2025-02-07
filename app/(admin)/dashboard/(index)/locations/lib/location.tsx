"use server";

import prisma from "@/lib/prisma";
import { schemaLocation } from "@/lib/schema";
import { ActionResult, Location } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export async function getLocations() {
  try {
    const locations = await prisma.location.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return locations;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function createLocation(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  try {
    const locationName = formData.get("name");
    const validate = schemaLocation.safeParse({
      name: locationName,
    });

    if (!validate.success) {
      return {
        error: validate.error.errors[0].message,
      };
    }
    if (validate.data.name) {
      await prisma.location.create({
        data: {
          name: validate.data.name,
        },
      });
    } else {
      return {
        error: "Failed to create location",
      };
    }
  } catch (err) {
    console.error(err);
    return {
      error: "Failed to create location",
    };
  }

  return redirect("/dashboard/locations", RedirectType.replace);
}

export async function getLocationById(
  locationId: string
): Promise<Location | null> {
  const location = await prisma.location.findUnique({
    where: {
      id: locationId,
    },
  });

  return location
    ? {
        ...location,
        createdAt: location.createdAt.toISOString(),
        updatedAt: location.updatedAt.toISOString(),
      }
    : null;
}

export async function editLocationById(
  _: unknown,
  formData: FormData,
  locationId: string | undefined
): Promise<ActionResult> {
  try {
    if (locationId) {
      return redirect("/dashboard/locations", RedirectType.replace);
    }

    const locationName = formData.get("name");
    const validate = schemaLocation.safeParse({
      name: locationName,
    });
    if (!validate.success) {
      return {
        error: validate.error.errors[0].message,
      };
    }
    if (validate.data.name) {
      const data = await prisma.location.update({
        where: {
          id: locationId,
        },
        data: {
          name: validate.data.name,
        },
      });
      if (!data) {
        return {
          error: "Failed to edit location",
        };
      }
    } else {
      return {
        error: "Failed to edit location",
      };
    }
  } catch (err) {
    console.error(err);
    return {
      error: "Failed to edit location",
    };
  }

  return redirect("/dashboard/locations", RedirectType.replace);
}

export async function deleteLocationById(
  _: unknown,
  formData: FormData,
  locationId: string | undefined
) {
  if (!locationId) {
    return redirect("/dashboard/locations", RedirectType.replace);
  }
  try {
    const dataDelete = await prisma.location.delete({
      where: {
        id: locationId,
      },
    });
    if (!dataDelete) {
      return {
        error: "Location not found",
      };
    }
    return revalidatePath("/dashboard/locations");
  } catch (err) {
    console.error(err);
    return {
      error: "Failed delete location",
    };
  }
}

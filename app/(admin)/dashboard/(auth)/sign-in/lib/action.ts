"use server";

import prisma from "@/lib/prisma";
import { schemaSignIn } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
export async function signIn(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  console.log(formData.get("email"));
  const validate = schemaSignIn.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  console.log(validate.data.email);
  const existingUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
      role: "SUPERADMIN",
    },
  });
  if (!existingUser) {
    return {
      error: "Email not found",
    };
  }

  const comparePassword = bcrypt.compareSync(
    validate.data.password,
    existingUser?.password
  );
  if (!comparePassword) {
    return {
      error: "Email/password incorrect",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/dashboard");
}

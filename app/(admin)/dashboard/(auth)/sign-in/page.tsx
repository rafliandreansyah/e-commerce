import { LoginForm } from "@/app/(admin)/dashboard/(auth)/sign-in/_components/login-form";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const { session, user } = await getUser();
  if (session && user.role === "SUPERADMIN") {
    return redirect("/dashboard");
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

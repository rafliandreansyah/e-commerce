import { redirect, RedirectType } from "next/navigation";
import ButtonBack from "../../../_components/button-back";
import FormCategory from "../../_components/form-category";
import { getCategoryById } from "../../lib/categories";
import { revalidatePath } from "next/cache";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug);
  const category = await getCategoryById(slug);
  if (!category) {
    revalidatePath("/dashboard/category");
    return redirect("/dashboard/category", RedirectType.replace);
  }
  return (
    <>
      <ButtonBack title="Categories" />
      <FormCategory isEdit category={category} />
    </>
  );
}

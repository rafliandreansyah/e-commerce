import { revalidatePath } from "next/cache";
import ButtonBack from "../../../_components/button-back";
import FormBrand from "../../_components/form-brand";
import { getBrandById } from "../../libs/action";
import { redirect, RedirectType } from "next/navigation";

export default async function EditBrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = await getBrandById(slug);
  if (!brand) {
    revalidatePath("/dashboard/brands");
    return redirect("/dashboard/brands", RedirectType.replace);
  }
  return (
    <>
      <ButtonBack title="Brands" />
      <FormBrand isEdit={true} brand={brand} />
    </>
  );
}

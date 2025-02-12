import { redirect, RedirectType } from "next/navigation";
import ButtonBack from "../../../_components/button-back";
import FormCategory from "../../_components/form-location";
import { getLocationById } from "../../lib/data";
import { revalidatePath } from "next/cache";
import FormLocation from "../../_components/form-location";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug);
  const location = await getLocationById(slug);
  if (!location) {
    return redirect("/dashboard/locations", RedirectType.replace);
  }
  return (
    <>
      <ButtonBack title="Locations" />
      <FormLocation isEdit location={location} />
    </>
  );
}

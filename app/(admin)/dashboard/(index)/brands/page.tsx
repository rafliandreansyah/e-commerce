import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";
import { getBrands } from "./libs/action";
import { getImageUrl } from "@/lib/supabase";

export default async function BrandsPage() {
  const brands = await getBrands();
  const brandsMap = brands.map((brand) => {
    return {
      ...brand,
      logo: getImageUrl(brand.logo, "brands"),
    };
  });
  return (
    <>
      <div className="text-right">
        <Link href="/dashboard/brands/create">
          <Button>
            <CirclePlus /> Add Brands
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Brands</CardTitle>
          <CardDescription>Manage your brands of products</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={brandsMap ?? []} columns={columns} />
        </CardContent>
      </Card>
    </>
  );
}

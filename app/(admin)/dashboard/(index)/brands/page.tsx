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
import { getBrands } from "./libs/data";

export default async function BrandsPage() {
  const brands = await getBrands();
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
          <DataTable data={brands ?? []} columns={columns} />
        </CardContent>
      </Card>
    </>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CirclePlus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getCategories } from "./lib/categories";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <>
      <div className="text-right">
        <Link href="/dashboard/categories/create">
          <Button>
            <CirclePlus /> Add Category
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>List of your categories of products</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={categories ? categories : []} columns={columns} />
        </CardContent>
      </Card>
    </>
  );
}

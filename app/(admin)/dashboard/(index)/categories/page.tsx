import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CirclePlus } from "lucide-react";
import { Category } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getCategories } from "./lib/categories";

const datetime = new Date().toISOString();
export const data: Category[] = [
  {
    id: "m5gr84i9",
    name: "Electronic",
    createdAt: datetime,
    updatedAt: datetime,
  },
  {
    id: "3u1reuv4",
    name: "Electronic",
    createdAt: datetime,
    updatedAt: datetime,
  },
  {
    id: "derv1ws0",
    name: "Electronic",
    createdAt: datetime,
    updatedAt: datetime,
  },
  {
    id: "5kma53ae",
    name: "Electronic",
    createdAt: datetime,
    updatedAt: datetime,
  },
  {
    id: "bhqecj4p",
    name: "Electronic",
    createdAt: datetime,
    updatedAt: datetime,
  },
];

export default async function CategoriesPage() {
  const categories = await getCategories();

  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(categories);
  return (
    <>
      <div className="text-right">
        <Button>
          <CirclePlus /> Add Category
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>List of your categories of products</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={categories} columns={columns} />
        </CardContent>
      </Card>
    </>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/supabase";
import { Brand } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
// import FormDelete from "./_components/form-delete";

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => {
      const brand = row.original;
      return (
        <div className="flex gap-4 items-center justify-center">
          <Image
            src={getImageUrl(brand.logo)}
            alt="Logo brand"
            width={80}
            height={80}
          />
          <p>{brand.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      const dateFormat = moment(date).format("ddd, DD MMM YYYY");

      return <div>{dateFormat}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as string;
      const dateFormat = moment(date).format("ddd, DD MMM YYYY");

      return <div>{dateFormat}</div>;
    },
  },
  {
    accessorKey: "action",
    header: () => <div>Action</div>,
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="flex gap-2">
          <Button
            className="text-white bg-orange-400 hover:bg-orange-200"
            size={"sm"}
            asChild
          >
            <Link href={`/dashboard/brands/edit/${id}`}>
              <EditIcon /> Edit
            </Link>
          </Button>
          {/* <FormDelete id={id} /> */}
        </div>
      );
    },
  },
];

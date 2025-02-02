"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      const dateFormat = moment(date).format("ddd, DD MMM YYYY");

      return <div>{dateFormat}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt");
      const dateFormat = moment(date).format("ddd, DD MMM YYYY");

      return <div>{dateFormat}</div>;
    },
  },
  {
    accessorKey: "action",
    header: () => <div>Action</div>,
    cell: () => {
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-orange-500 hover:bg-orange-200 hover:text-orange-500"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            className="text-red-500 hover:bg-red-200 hover:text-red-500"
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];

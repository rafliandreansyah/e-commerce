"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionResult } from "@/types";
import Form from "next/form";
import { useActionState, useEffect } from "react";
import { MoonLoader } from "react-spinners";
import { createBrand, editBrandById } from "../libs/action";
import { useToast } from "@/hooks/use-toast";
import { Brand } from "@prisma/client";
import { unknown } from "zod";

const initialState: ActionResult = {
  error: "",
};

export default function FormBrand({
  isEdit = false,
  brand,
}: {
  isEdit?: boolean;
  brand?: Brand;
}) {
  const editBrand = (_: unknown, formData: FormData) =>
    editBrandById(unknown, formData, brand?.id);
  const [state, action, isPending] = useActionState(
    !isEdit ? createBrand : editBrand,
    initialState
  );
  const { toast } = useToast();
  useEffect(() => {
    if (state && state.error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: state.error,
      });
    }
  }, [state, toast]);
  console.log(state);
  return (
    <Form action={action}>
      <Card>
        <CardHeader>
          <CardTitle>Create Brand</CardTitle>
          <CardDescription>Brand of your products</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Brand Name</Label>
            <Input
              type="text"
              placeholder="Enter brand..."
              className="mt-2"
              name="name"
              defaultValue={isEdit ? brand?.name : undefined}
            />
          </div>
          <div>
            <Label htmlFor="image">Logo</Label>
            <Input type="file" className="mt-2" name="image" />
          </div>
          {isEdit && <input name="brandId" defaultValue={brand?.id} hidden />}
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button
            variant="outline"
            type="button"
            onClick={undefined}
            disabled={false}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <MoonLoader size={20} color="#ffffff" />
            ) : isEdit ? (
              "Edit"
            ) : (
              "Create"
            )}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}

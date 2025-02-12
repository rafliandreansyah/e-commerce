"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { createCategory, editCategoryById } from "../lib/data";
import { ActionResult, Category } from "@/types";
import { MoonLoader } from "react-spinners";
import { useToast } from "@/hooks/use-toast";
import { unknown } from "zod";

const initialState: ActionResult = {
  error: "",
};

export default function FormCategory({
  isEdit = false,
  category,
}: {
  isEdit?: boolean;
  category?: Category;
}) {
  const router = useRouter();

  const editCategory = (_: unknown, formData: FormData) =>
    editCategoryById(unknown, formData, category?.id);
  const [state, action, isPending] = useActionState(
    isEdit ? editCategory : createCategory,
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
  return (
    <>
      <Form action={action}>
        <Card>
          <CardHeader>
            <CardTitle>Create Category</CardTitle>
            <CardDescription>Category of your products</CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Category Name</Label>
            <Input
              type="text"
              placeholder="Enter category..."
              className="mt-2"
              name="name"
              defaultValue={isEdit ? category?.name : undefined}
            />
            {isEdit && (
              <input name="categoryId" defaultValue={category?.id} hidden />
            )}
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={router.back}
              disabled={isPending}
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
    </>
  );
}

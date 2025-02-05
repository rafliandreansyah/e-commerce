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
import { createCategory } from "../categories/lib/categories";
import { ActionResult } from "@/types";
import { MoonLoader } from "react-spinners";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function FormCategory() {
  const initialState: ActionResult = {
    error: "",
  };
  const router = useRouter();
  const [state, action, isPending] = useActionState(
    createCategory,
    initialState
  );
  const { toast } = useToast();
  useEffect(() => {
    if (state && state.error) {
      toast({
        title: "Failed",
        description: state.error,
        action: (
          <ToastAction altText="Goto schedule to undo">Close</ToastAction>
        ),
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
            />
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button variant="outline" type="button" onClick={router.back}>
              Cancel
            </Button>
            <Button type="submit">
              {isPending ? <MoonLoader size={20} color="#ffffff" /> : "Create"}
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { deleteLocationById } from "../lib/location";
import { ActionResult } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { MoonLoader } from "react-spinners";
import { unknown } from "zod";

const initialState: ActionResult = {
  error: "",
};

export default function FormDelete({ id }: { id: string }) {
  const { toast } = useToast();
  const deleteLocation = (_: unknown, formData: FormData) => {
    console.log("submit");
    return deleteLocationById(unknown, formData, id);
  };
  const [state, action, isPending] = useActionState(
    deleteLocation,
    initialState
  );
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
    <form action={action}>
      <Button
        className="text-white bg-red-600 hover:bg-red-200"
        size={"sm"}
        disabled={isPending}
      >
        {isPending ? (
          <>
            <MoonLoader size={14} /> Delete
          </>
        ) : (
          <>
            <TrashIcon /> Delete
          </>
        )}
      </Button>
    </form>
  );
}

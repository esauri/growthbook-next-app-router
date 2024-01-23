"use client";
import { clsx } from "clsx";
import { type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { CheckIcon } from "lucide-react";

type Props = {
  children: ReactNode;
  isActive: boolean;
  value: string;
};

export default function SubmitButton({ children, isActive, value }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      className={clsx([
        "flex items-center gap-1.5 border px-4 py-2.5 rounded-md border-stone-900",
        isActive
          ? "bg-stone-900 text-white hover:opacity-90 active:opacity-80"
          : "hover:bg-stone-900/10 active:bg-stone-900/20",
      ])}
      disabled={isActive || pending}
      name="bucket"
      type="submit"
      value={value}
    >
      {children}
      {isActive && <CheckIcon className="h-4 w-4" />}
    </button>
  );
}

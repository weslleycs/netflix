import type { ComponentProps } from "react";
import { Input } from "@/shared/ui/input";

type Props = {
  label: string;
  error?: string;
} & ComponentProps<typeof Input>;

export function FormField({ label, error, id, ...props }: Props) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-1">
      <label htmlFor={inputId} className="text-sm font-medium text-white-60">
        {label}
      </label>

      <Input id={inputId} aria-invalid={!!error} {...props} />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
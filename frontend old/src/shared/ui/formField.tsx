import type { ComponentProps } from "react";
import { Input } from "@/shared/ui/input";

type Base = {
  label: string;
  error?: string;
  as?: "input" | "select";
};

type InputProps = Base & {
  as?: "input";
} & ComponentProps<typeof Input>;

type SelectProps = Base & {
  as: "select";
  options: { label: string; value: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

type Props = InputProps | SelectProps;

export function FormField({ label, error, id, ...props }: Props) {
  const fieldName = "name" in props ? props.name : undefined;
  const fieldId = id ?? fieldName;

  return (
    <div className="space-y-1">
      <label htmlFor={fieldId} className="text-sm font-medium text-white-60">
        {label}
      </label>

      {("as" in props && props.as === "select") ? (
        <select
          id={fieldId}
          aria-invalid={!!error}
          {...(props as SelectProps)}
          className={`
            w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 
            placeholder:text-zinc-500 placeholder:opacity-100
            outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20
            disabled:opacity-60 focus:outline-none 
            ${(props as SelectProps).className ?? ""}
          `}
        >
          {(props as SelectProps).options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <Input
          id={fieldId}
          aria-invalid={!!error}
          {...(props as InputProps)}
        />
      )}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
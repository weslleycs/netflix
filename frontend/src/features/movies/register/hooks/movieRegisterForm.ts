import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerSchema, type RegisterFormValues } from "../schema/registerSchema";
import { registerMovie } from "@/features/auth/api/movie";

export function movieRegisterForm() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const { ...payload } = values;

    try {
      await registerMovie(payload);

      setSuccessMessage("Movie created successfully! Redirecting...");

      setTimeout(() => {
        navigate("/movie");
      }, 1500);

    } catch (err: any) {
        console.log(err?.response);
        
      const status = err?.response?.status;

      if (status === 409) {
        setError("title", {
          type: "server",
          message: "Movie already in use",
        });
        return;
      }

      setError("root", {
        type: "server",
        message: "Something went wrong. Please try again.",
      });
    }
  });

  return {
    register,
    errors,
    isSubmitting,
    onSubmit,
    successMessage,
  };
}
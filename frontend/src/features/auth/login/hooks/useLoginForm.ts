import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginSchema, type LoginFormValues } from "../schemas/loginSchema";
import { loginUser } from "../../api/auth";


export function useLoginForm() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    login,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const { ...payload } = values;

    try {
      await loginUser(payload);

      setSuccessMessage("Conta criada com sucesso! Redirecionando...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err: any) {
        console.log(err?.response);
        
      const status = err?.response?.status;

      if (status === 409) {
        setError("email", {
          type: "server",
          message: "Email already in use",
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
    login,
    errors,
    isSubmitting,
    onSubmit,
    successMessage,
  };
}
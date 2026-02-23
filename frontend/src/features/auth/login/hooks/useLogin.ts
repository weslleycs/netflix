import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { login } from "../../api/auth";

export function useLogin() {
  const navigate = useNavigate();

  const token = useAuthStore((s) => s.token);
  const setAuth = useAuthStore((s) => s.setAuth);

  
  useEffect(() => {
    if (token) navigate("/app", { replace: true });
  }, [token, navigate]);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth({ token: data.token, user: data.user });
      navigate("/app", { replace: true });
    },
  });

  const onSubmit = form.handleSubmit((values) => mutation.mutate(values));

  return {
    register: form.register,
    errors: form.formState.errors,
    onSubmit,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
}
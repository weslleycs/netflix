import { Card } from "@/shared/ui/card";
import { LoginForm } from "../ components/loginForm";

export default function LoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Card>
        <h1 className="text-2xl font-semibold text-white">Entrar</h1>
        <p className="mt-1 text-zinc-400">Entre com suas credenciais.</p>

        <div className="mt-6">
          <LoginForm />
        </div>
      </Card>
    </div>
  );
}
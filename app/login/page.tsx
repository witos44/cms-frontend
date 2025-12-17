// app/login/page.tsx
"use client";
import { useState } from "react";
import { createAuthClient } from "@/lib/supabase/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const supabase = createAuthClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
    } else {
      // Supabase otomatis menyimpan sesi ke cookie (HTTP-only) dan localStorage
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="p-6 border rounded w-96">
        <h2 className="text-xl mb-4">Admin Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
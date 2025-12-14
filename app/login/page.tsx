// app/login/page.tsx
"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok && data.user) {
      // ✅ Simpan sesi ke localStorage agar dashboard bisa membacanya
      const now = new Date().getTime();
      const expiresAt = now + 1000 * 60 * 60 * 24 * 7; // 7 hari

      const session = {
        access_token: data.user.aud ? "dummy" : "", // Supabase JS client perlu ini agar tidak error
        token_type: "bearer",
        user: data.user,
        expires_at: Math.floor(expiresAt / 1000),
      };

      localStorage.setItem('supabase.auth.token', JSON.stringify({
        currentSession: session,
        lastSignInTime: new Date().toISOString(),
      }));

      window.location.href = "/dashboard";
    } else {
      setError(data.error || "Login gagal");
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
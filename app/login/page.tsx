// app/login/page.tsx
import { login } from './actions';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form action={login} className="p-6 border rounded w-96">
        <h2 className="text-xl mb-4">Admin Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
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
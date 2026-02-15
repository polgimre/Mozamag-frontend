import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

export default function Login({ onDone }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setMsg("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onDone?.();
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function register() {
    setMsg("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onDone?.();
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="opacity-40 min-h-[70vh] flex items-start justify-center pt-10 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-100 bg-zinc-950/60 p-6 shadow">
        <div className="flex items-center gap-3">
          <img
            src="/src/assets/gf_login.png"
            alt="Gateforge"
            className="h-10 w-auto"
          />
          <div>
            <p className="text-sm text-zinc-300">
              Use email and password to continue.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm text-zinc-300">Email</span>
            <input
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>

          <label className="block">
            <span className="text-sm text-zinc-300">Password</span>
            <input
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <p className="mt-2 text-xs text-zinc-300">
              Minimum 6 characters.
            </p>
          </label>

          {msg && (
            <div className="rounded-xl border border-red-900/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
              {msg}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={login}
              disabled={loading}
              className="flex-1 rounded-xl bg-orange-900 px-4 py-2 font-semibold text-white transition hover:bg-yellow-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Working..." : "Login"}
            </button>

            <button
              onClick={register}
              disabled={loading}
              className="flex-1 rounded-xl bg-orange-900 border border-zinc-700 bg-zinc-900/40 px-4 py-2 font-semibold text-zinc-100 transition hover:bg-yellow-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Working..." : "Register"}
            </button>
          </div>

          <p className="pt-2 text-center text-xs text-zinc-300">
            By continuing, you accept the Gateforge vibes.
          </p>
        </div>
      </div>
    </div>
  );
}

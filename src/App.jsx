import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { isAdmin } from "./auth";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("home");

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  const admin = isAdmin(user);

return (
  <div className="min-h-screen w-full bg-gradient-to-b from-zinc-900 via-stone-950 to-amber-950 text-zinc-500">
    <div className="max-w-4xl mx-auto px-6 py-10">
      <header className="flex items-center gap-3">
        <img
          src="/src/assets/gateforge_headlogo.png"
          alt="Gateforge logo"
          className="h-12 w-auto"
        />

        <div className="ml-auto flex items-center gap-2">
          <button
            className="rounded-xl border border-zinc-700 bg-zinc-900/40 px-4 py-2 text-sm font-semibold hover:bg-zinc-800"
            onClick={() => setView("home")}
          >
            Home
          </button>

          {admin && (
            <button
              className="rounded-xl border border-zinc-700 bg-zinc-900/40 px-4 py-2 text-sm font-semibold hover:bg-zinc-800"
              onClick={() => setView("admin")}
            >
              Workshop
            </button>
          )}

          {!user ? (
            <button
              className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
              onClick={() => setView("login")}
            >
              Login
            </button>
          ) : (
            <button
              className="rounded-xl border border-zinc-700 bg-zinc-900/40 px-4 py-2 text-sm font-semibold hover:bg-zinc-800"
              onClick={() => signOut(auth)}
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <hr className="my-6 border-zinc-800" />

      {view === "home" && <Home user={user} />}
      {view === "login" && <Login onDone={() => setView("home")} />}
      {view === "admin" && <Admin user={user} />}
    </div>
  </div>
);

}

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import { isAdmin } from "../auth";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const user = auth.currentUser;
  const admin = isAdmin(user);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("updatedAt", "desc"));

    return onSnapshot(q, (snap) => {
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  async function handleDelete(postId, title) {
    if (!admin) return;

    const ok = window.confirm(
      `Delete "${title || "Untitled"}"? This cannot be undone.`
    );
    if (!ok) return;

    await deleteDoc(doc(db, "posts", postId));
  }

  return (
    <div className="opacity-40 grid gap-4">
      {posts.map((p) => (
        <article
          key={p.id}
          className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4"
        >
          <div className="flex items-start gap-3">
            <h2 className="text-lg font-bold text-zinc-100">
              {p.title || "Untitled"}
            </h2>

            {admin && (
              <button
                onClick={() => handleDelete(p.id, p.title)}
                className="ml-auto rounded-xl border border-red-900/40 bg-red-950/40 px-3 py-1.5 text-sm font-semibold text-red-200 hover:bg-red-950/60"
              >
                Delete
              </button>
            )}
          </div>

          {/* HTML tartalom */}
          <div
            className="mt-3 text-zinc-200"
            dangerouslySetInnerHTML={{ __html: p.contentHtml }}
          />

          <div className="mt-3 text-xs text-zinc-500">
            Updated:{" "}
            {p.updatedAt?.toDate
              ? p.updatedAt.toDate().toLocaleString()
              : "—"}
          </div>
        </article>
      ))}

      {posts.length === 0 && (
        <p className="text-zinc-400">No posts yet.</p>
      )}
    </div>
  );
}

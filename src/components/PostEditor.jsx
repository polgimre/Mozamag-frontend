import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function PostEditor() {
  const [title, setTitle] = useState("");
  const [contentHtml, setContentHtml] = useState("<p>Hello Gateforge.</p>");
  const [msg, setMsg] = useState("");

  async function save() {
    setMsg("");
    try {
      await addDoc(collection(db, "posts"), {
        title: title.trim() || "Untitled",
        contentHtml,
        updatedAt: serverTimestamp(),
      });
      setTitle("");
      setContentHtml("<p></p>");
      setMsg("Saved.");
    } catch (e) {
      setMsg(e.message);
    }
  }

  return (
    <div className="opacity-40 rounded-2xl bg-zinc-950/40 backdrop-blur" style={{ display: "grid", gap: 10 }}>
      <input
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY || "no-api-key"}
        value={contentHtml}
        onEditorChange={(v) => setContentHtml(v)}
        init={{
    height: 500,
    menubar: false,

    skin: "oxide-dark",      // dark UI
    content_css: "dark",     // dark editor content

    plugins: "link lists code",
    toolbar: "undo redo | bold italic | bullist numlist | link | code",

        }}
      />

      <button onClick={save}>Save post</button>
      {msg && <small style={{ opacity: 0.8 }}>{msg}</small>}
    </div>
  );
}

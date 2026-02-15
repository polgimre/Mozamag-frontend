import { isAdmin } from "../auth";
import PostEditor from "../components/PostEditor";

export default function Admin({ user }) {
  if (!isAdmin(user)) return <p>Access denied.</p>;

  return (
    <div>
       <div className="items-start justify-start pt-10 px-8"></div>
          <img
          src="/src/assets/gf_workshop.png"
          alt="Gateforge logo"
          className="h-12 w-auto"
        />
      <PostEditor />
      </div>
    
  );
}

import PostList from "../components/PostList";

export default function Home() {
  return (
    <div className="items-start justify-start pt-10 px-8">
          <img
          src="/src/assets/gf_home.png"
          alt="Gateforge logo"
          className="h-12 w-auto"
        />
      <PostList />
    </div>
  );
}

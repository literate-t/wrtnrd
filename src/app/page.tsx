import PostForm from "@/components/posts/PostForm";
import PostBoxList from "@/components/posts/PostBoxList";

const Home = () => {
  return (
    <main className="main">
      <div className="main--container">
        <PostForm />
        <PostBoxList />
      </div>
    </main>
  );
};

export default Home;

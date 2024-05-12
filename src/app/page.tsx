import PostForm from "@/components/PostForm";
import PostBox from "@/components/PostBox";

const Home = () => {
  return (
    <main className="main">
      <div className="main--container">
        <PostForm />
        <PostBox />
      </div>
    </main>
  );
};

export default Home;

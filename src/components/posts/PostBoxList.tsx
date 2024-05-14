import PostBox from "@/components/posts/PostBox";
import { data } from "@/data/dummy";

const PostBoxList = () => {
  return (
    <div>
      {data.map((post) => (
        <PostBox post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostBoxList;

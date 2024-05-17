"use client";

import PostBox from "@/components/posts/PostBox";
import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { PostProps } from "@/interfaces/postInterface";

const fetchPosts = async () => {
  const res = await axios.get("/api/post/list");
  return res.data;
};

const PostBoxList = () => {
  const { isFetching, isError, data } = useQuery<PostProps[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>{data?.map((post) => <PostBox post={post} key={post.id} />)}</div>
  );
};

export default PostBoxList;

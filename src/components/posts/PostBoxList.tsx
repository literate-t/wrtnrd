"use client";

import PostBox from "@/components/posts/PostBox";
import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { PostProps } from "@/interfaces/postInterface";
import { useRecoilValue } from "recoil";
import { authAtoms } from "@/atoms/authAtoms";

const fetchPosts = async (userId: number | undefined) => {
  const res = await axios.post("/api/post/list", {
    userId,
  });

  return res.data;
};

const PostBoxList = () => {
  const authState = useRecoilValue(authAtoms);
  const { isFetching, isError, data } = useQuery<PostProps[]>({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(authState?.id),
  });

  // TODO position: fixed 속성의 컴포넌트를 만들어서 Loading 화면을 표현한다
  // if (isFetching) {
  //   return <div>Loading...</div>;
  // }
  // TODO error 화면은 후순위
  // if (isError) {
  //   return <div>Error</div>;
  // }

  return (
    <div>{data?.map((post) => <PostBox post={post} key={post.id} />)}</div>
  );
};

export default PostBoxList;

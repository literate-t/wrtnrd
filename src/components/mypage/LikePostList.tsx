"use client";

import { useRecoilValue } from "recoil";
import { authAtoms } from "@/atoms/authAtoms";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/utils/common";
import { PostProps } from "@/interfaces/postInterface";
import PostBox from "@/components/posts/PostBox";

const LikePostList = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const authState = useRecoilValue(authAtoms);
  const ref = useRef<HTMLDivElement>(null);
  const elementEntry = useIntersectionObserver(ref, {});
  const isPageEnd = !!elementEntry?.isIntersecting;

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["likePosts"],
    queryFn: ({ pageParam }) =>
      fetchPosts("/api/post/like-list", {
        page: pageParam,
        userId: authState?.id,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.error("fetchNextPage Error", res.error);
    }
  }, [fetchNextPage]);

  const handleLikeClick = (id: number | undefined) => {
    if (undefined === id) {
      return;
    }

    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(fetchNext, 100);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, hasNextPage, isPageEnd]);

  useEffect(() => {
    const postArr: PostProps[] = [];
    data?.pages?.map((item) => {
      item.data?.map((post: PostProps) => {
        postArr.push(post);
      });
    });

    setPosts(postArr);
  }, [data]);

  return (
    <div className="posts">
      {posts.map((post) => (
        <PostBox post={post} key={post.id} onLikeClick={handleLikeClick} />
      ))}
      <div className="posts__bar" ref={ref}></div>
    </div>
  );
};

export default LikePostList;

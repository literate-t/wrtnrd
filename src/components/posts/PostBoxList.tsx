"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { authAtoms } from "@/atoms/authAtoms";
import React, { useCallback, useEffect, useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { PostProps } from "@/interfaces/postInterface";
import PostBox from "@/components/posts/PostBox";
import { fetchPosts } from "@/utils/common";

const PostBoxList = () => {
  const authState = useRecoilValue(authAtoms);
  const ref = useRef<HTMLDivElement>(null);
  const elementEntry = useIntersectionObserver(ref, {});
  const isPageEnd = !!elementEntry?.isIntersecting;

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) =>
      fetchPosts("/api/post/list", { page: pageParam, userId: authState?.id }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.error("fetchNextPage Error", res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(fetchNext, 100);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, hasNextPage, isPageEnd]);

  // TODO position: fixed 속성의 컴포넌트를 만들어서 Loading 화면을 표현한다
  // if (isFetching) {
  //   return <div>Loading...</div>;
  // }
  // TODO error 화면은 후순위
  // if (isError) {
  //   return <div>Error</div>;
  // }
  return (
    <div className="posts">
      {data?.pages?.map((item, index) => (
        <React.Fragment key={index}>
          {item.data.map((post: PostProps) => (
            <PostBox post={post} key={post.id} />
          ))}
        </React.Fragment>
      ))}
      <div className="posts__bar" ref={ref}></div>
    </div>
  );
};

export default PostBoxList;

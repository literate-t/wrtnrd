"use client";

import "./index.scss";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { PostBoxProps } from "@/interfaces/postInterface";
import { useState } from "react";
import axios from "@/utils/axios";
import { useRecoilValue } from "recoil";
import { authAtoms } from "@/atoms/authAtoms";
import { useRouter } from "next/navigation";

const PostBox = ({ post }: PostBoxProps) => {
  const [like, setLike] = useState<boolean>(!!post?.like);
  const authState = useRecoilValue(authAtoms);
  const router = useRouter();

  const handlePostLike = async () => {
    if (null === authState) {
      router.push("/signin");
      return;
    }

    const result = await axios("/api/post/like", {
      method: "POST",
      data: {
        userId: authState?.id,
        postId: post?.id,
      },
    });

    setLike(result.data);
  };

  return (
    <div className="post">
      <div className="post__profile">
        <div className="post__name">{post?.author}</div>
        <div className="post__desc">{post?.description}</div>
      </div>
      <div className="divider" />
      <div className="post__content">
        <div className="post__header">{post?.title}</div>
        <div className="post__body">{post?.body}</div>
      </div>
      <div className="post__footer">
        <div onClick={handlePostLike} className="post__like">
          {like ? <AiFillLike size={18} /> : <AiOutlineLike size={18} />}
        </div>
      </div>
    </div>
  );
};

export default PostBox;

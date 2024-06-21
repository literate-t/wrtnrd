"use client";

import "./index.scss";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { PostBoxProps } from "@/interfaces/postInterface";
import { useState } from "react";
import axios from "@/utils/axios";
import { useRecoilValue } from "recoil";
import { authAtoms } from "@/atoms/authAtoms";
import { useRouter } from "next/navigation";
import { SIGN_URL } from "@/utils/urls";

const PostBox = ({ post, onLikeClick }: PostBoxProps) => {
  const [like, setLike] = useState<boolean>(!!post?.like);
  const authState = useRecoilValue(authAtoms);
  const router = useRouter();

  const handlePostLike = async (id: number | undefined) => {
    try {
      const result = await axios("/api/post/like", {
        method: "POST",
        data: {
          userId: authState?.id,
          postId: post?.id,
        },
      });

      onLikeClick && onLikeClick(id);
      setLike(result.data);
    } catch (error) {
      if (null == authState) {
        router.replace(SIGN_URL);
        return;
      }
      console.error("Post like error", error);
    }
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
        <div onClick={() => handlePostLike(post?.id)} className="post__like">
          {like ? <AiFillLike size={18} /> : <AiOutlineLike size={18} />}
        </div>
      </div>
    </div>
  );
};

export default PostBox;

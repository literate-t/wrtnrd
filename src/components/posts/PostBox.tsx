"use client";

import "./index.scss";
import { PostBoxProps } from "@/interfaces/postInterface";

const PostBox = ({ post }: PostBoxProps) => {
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
    </div>
  );
};

export default PostBox;

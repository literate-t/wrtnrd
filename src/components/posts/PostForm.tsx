"use client";

import "./index.scss";
import { useState } from "react";
import { notoSansKr } from "@/utils/font";

const PostForm = () => {
  const [content, setContent] = useState<string>();

  const handleFormTextarea = () => {};
  const handleSubmit = () => {};

  return (
    <div className="post-form">
      <textarea
        className={`post-form__textarea ${notoSansKr.className}`}
        required
        id="content"
        name="content"
        placeholder="What is in your mind?"
        onChange={handleFormTextarea}
        value={content}
      />
      <button
        className={`post-form__button ${notoSansKr.className}`}
        onClick={handleSubmit}
      >
        Write
      </button>
    </div>
  );
};

export default PostForm;

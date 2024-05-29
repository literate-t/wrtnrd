import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { ChangeEvent, useCallback, useState } from "react";
import { debounce, getDataFromError, notify } from "@/utils/common";
import axios from "@/utils/axios";
import { useRecoilValue } from "recoil";
import { authAtoms } from "@/atoms/authAtoms";

// useFormik 사용해보기

interface FormValue {
  author: string;
}

const validate = (values: FormValue): any => {
  const errors: any = {};
  if (!values.author) {
    errors.author = "Required";
  } else if (values.author.length <= 4) {
    errors.author = "Must be at least 4 characters";
  }

  return errors;
};

const Author = () => {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const authState = useRecoilValue(authAtoms);
  const formik = useFormik({
    initialValues: {
      author: "",
    },
    validate,
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });

  const handleSubmit = async (value: FormValue): Promise<void> => {
    try {
      const result = await axios("/api/user/change-author", {
        method: "POST",
        data: {
          userId: authState?.id,
          author: value.author,
        },
      });
      notify(result.data);
    } catch (e) {
      notify(getDataFromError(e));
    }

    await checkAuthorDuplicated(value.author);
  };

  const checkAuthorDuplicated = async (value: string) => {
    if (value.length <= 4) {
      return;
    }

    // TODO 중복 확인 요청
    try {
      const result = await axios("/api/user/check-author-duplicated", {
        method: "POST",
        data: {
          author: value,
        },
      });
      setIsAvailable(true);
    } catch (e) {
      setIsAvailable(false);
    }
  };

  const debounceCheckDuplicated = useCallback(
    debounce((value: string) => {
      checkAuthorDuplicated(value);
    }, 1200),
    []
  );

  const handleAuthor = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    debounceCheckDuplicated(value);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="mypage-home">
      <label htmlFor="author-name" className="mypage-home__label">
        New author name
      </label>
      <input
        id="author-name"
        name="author"
        className="mypage-home__input"
        onChange={handleAuthor}
        value={formik.values.author}
      />

      {formik.errors.author && (
        <div className="mypage-home__error">{formik.errors.author}</div>
      )}
      <button
        type="submit"
        className={`mypage-home__submit ${isAvailable ? null : "mypage-home__submit--disabled"}`}
        disabled={!isAvailable}
      >
        Submit
      </button>
    </form>
  );
};

export default Author;

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { KEY_SIGN_IN, TRUE } from "@/utils/constants";
import { locate } from "@/utils/common";

const NavBar = () => {
  const router = useRouter();
  const getInitialState = () => {
    return sessionStorage.getItem(KEY_SIGN_IN) === TRUE;
  };

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const pathName = usePathname();

  // TODO target url이 있을 경우에 session storage에 저장한다
  const saveCurrentPath = () => {
    console.log(pathName);
  };

  useEffect(saveCurrentPath, [pathName]);
  useEffect(() => {
    setIsAuthenticated(getInitialState());
  }, [isAuthenticated]);

  return (
    <div className="nav">
      <div className="nav__offset"></div>
      <div className="nav__home">
        <div className="nav__logo" onClick={() => locate("/")}>
          Wrtnrd
        </div>
        <input className="nav__search" />
        <div className="nav__items">
          <div onClick={() => router.push("/edit")}>Edit</div>
          {isAuthenticated && (
            <div onClick={() => router.push("/mypage")}>My page</div>
          )}
          {!isAuthenticated && (
            <div onClick={() => router.push("/signin")}>Sign in</div>
          )}
          <div
            onClick={() =>
              axios("/auth/test", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
            }
          >
            Test
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

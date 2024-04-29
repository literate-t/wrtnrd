"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const NavBar = () => {
  const router = useRouter();

  const pathName = usePathname();

  // TODO target url이 있을 경우에 session storage에 저장한다
  const saveCurrentPath = () => {
    console.log(pathName);
  };

  useEffect(saveCurrentPath, [pathName]);

  return (
    <div className="nav">
      <div className="nav__offset"></div>
      <div className="nav__home">
        <div className="nav__logo" onClick={() => router.push("/")}>
          Wrtnrd
        </div>
        <input className="nav__search" />
        <div className="nav__items">
          <div onClick={() => router.push("/edit")}>Edit</div>
          <div onClick={() => router.push("/signin")}>Sign in</div>
          <div onClick={() => router.push("/mypage")}>My page</div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

"use client";

import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();

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

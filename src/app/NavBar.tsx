"use client";

import Link from "next/link";
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
          <Link href="/edit">Edit</Link>
          <Link href="/signin">SignIn</Link>
          <Link href="/mypage">MyPage</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

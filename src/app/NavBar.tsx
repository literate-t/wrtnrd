"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { locate } from "@/utils/common";
import useAuthInterceptor from "@/hooks/useAuthInterceptor";
import { useAuth } from "@/providers/AuthProvider";

const NavBar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const authState = useAuthInterceptor();
  const { signOut } = useAuth();
  const pathName = usePathname();

  // TODO target url이 있을 경우에 session storage에 저장한다
  const saveCurrentPath = () => {
    console.log(pathName);
  };

  useEffect(() => {
    saveCurrentPath();
    setIsAuthenticated(!!authState);
  }, [pathName, isAuthenticated, setIsAuthenticated]);

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
          {isAuthenticated ? (
            <>
              <div onClick={() => signOut()}>Sign out</div>
              <div onClick={() => router.push("/mypage")}>My page</div>
            </>
          ) : (
            <div onClick={() => router.push("/signin")}>Sign in</div>
          )}
          {/*<div onClick={() => router.push("/signin")}>Sign in</div>*/}
          {/*<div onClick={() => router.push("/test")}>Test</div>*/}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

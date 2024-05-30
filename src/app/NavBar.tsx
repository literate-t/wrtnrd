"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import useAuthInterceptor from "@/hooks/useAuthInterceptor";

async function getData() {
  try {
    return await fetch("/api/auth", {
      method: "GET",
    });
  } catch (error) {
    throw error;
  }
}

const NavBar = () => {
  const authState = useAuthInterceptor();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(false);
  const { signOut } = useAuth();
  const router = useRouter();

  authState &&
    getData()
      .then((data) => {
        setIsAuthenticated(data.statusText === "OK");
      })
      .catch(() => {});

  useEffect(() => {
    setIsAuthenticated(!!authState);
  }, [setIsAuthenticated, authState]);

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
          {isAuthenticated ? (
            <>
              <div onClick={() => signOut()}>Sign out</div>
              <div onClick={() => router.push("/mypage")}>My page</div>
            </>
          ) : (
            <div onClick={() => router.push("/signin")}>Sign in</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

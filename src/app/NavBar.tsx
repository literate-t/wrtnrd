"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import useAuthInterceptor from "@/hooks/useAuthInterceptor";
import axios from "@/utils/axios";

async function getData() {
  try {
    return await axios("/api/auth/check", {
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
        setIsAuthenticated(data.status === 200);
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

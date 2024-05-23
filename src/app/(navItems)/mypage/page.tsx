"use client";

import SideNavigation from "@/components/mypage/SideNavigation";
import React, { ReactNode, useEffect, useState } from "react";
import Password from "@/components/mypage/Password";
import Author from "@/components/mypage/Author";

const componentMap: { [key: string]: ReactNode } = {
  password: <Password />,
  author: <Author />,
};

const MyPage = () => {
  const [activeComponent, setActiveComponent] = useState<string>("");

  const handleNavigation = (component: string) => {
    setActiveComponent(component);
  };

  useEffect(() => {}, [activeComponent]);

  return (
    <div>
      <SideNavigation onNavigate={handleNavigation} />
      <main className="main">
        <div className="main--container">{componentMap[activeComponent]}</div>
      </main>
    </div>
  );
};

export default MyPage;

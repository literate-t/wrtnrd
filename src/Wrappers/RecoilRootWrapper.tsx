"use client";

import { RecoilRoot } from "recoil";
import { ReactNode } from "react";

const RecoilRootWrapper = ({ children }: { children: ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilRootWrapper;

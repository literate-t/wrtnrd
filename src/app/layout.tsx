import type { Metadata } from "next";
import NavBar from "./NavBar";
import "@/app/index.scss";
import TanstackProvider from "@/providers/TanstackProvider";
import RecoilRootWrapper from "@/Wrappers/RecoilRootWrapper";
import { notoSansKr } from "@/utils/font";

export const metadata: Metadata = {
  title: "Wrtnrd",
  description: "Write and read",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={notoSansKr.className}>
        <RecoilRootWrapper>
          <TanstackProvider>
            <NavBar />
            <main>{children}</main>
          </TanstackProvider>
        </RecoilRootWrapper>
      </body>
    </html>
  );
};

export default RootLayout;

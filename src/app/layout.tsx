import type { Metadata } from "next";
import {Noto_Sans_KR} from "next/font/google";
import NavBar from "./NavBar";
import "@/app/index.scss";
import TanstackProvider from "@/providers/TanstackProvider";
import RecoilRootWrapper from "@/Wrappers/RecoilRootWrapper";

export const metadata: Metadata = {
  title: "Wrtnrd",
  description: "Write and read",
};

const notoSansKr = Noto_Sans_KR({
  weight: ['400'],
  subsets: ['latin'],
});

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

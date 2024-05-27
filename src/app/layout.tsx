import type { Metadata } from "next";
import NavBar from "./NavBar";
import "@/app/index.scss";
import TanstackProvider from "@/providers/TanstackProvider";
import RecoilRootWrapper from "@/Wrappers/RecoilRootWrapper";
import { notoSansKr } from "@/utils/font";
import { AuthProvider } from "@/providers/AuthProvider";
import { ToastContainer } from "react-toastify";

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
          <AuthProvider>
            <TanstackProvider>
              <NavBar />
              <main>{children}</main>
            </TanstackProvider>
          </AuthProvider>
        </RecoilRootWrapper>
        <ToastContainer autoClose={1500} position="top-right" />
      </body>
    </html>
  );
};

export default RootLayout;

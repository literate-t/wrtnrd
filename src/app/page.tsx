import RootLayout from "@/app/layout";
import App from "@/App";
import NavBar from "@/app/NavBar";
import "@/index.scss";

const Home = () => {
  return (
    <RootLayout>
      <NavBar />
      <App />
    </RootLayout>
  );
};

export default Home;

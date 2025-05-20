import { type ReactElement, useEffect } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./pages/home/home";
import Footer from "./components/footer/footer";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import About from "./pages/about/about";
// import About from "./pages/about/about";
// import Contacts from "./pages/contacts/contacts";
// import ServicePage from "./pages/service-page/service-page";
// import NewsPage from "./pages/news-page/news-page";

function App(): ReactElement {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <HeroUIProvider>
      <ToastProvider />
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        {/*<Route path="/services/:id" element={<ServicePage />}></Route>
        <Route path="/news/:id" element={<NewsPage />}></Route>
        <Route path="/contacts" element={<Contacts />}></Route> */}
      </Routes>
      <Footer />
    </HeroUIProvider>
  );
}

export default App;

import { type ReactElement, useEffect } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./pages/home/home";
import Footer from "./components/footer/footer";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import About from "./pages/about/about";
import Contacts from "./pages/contacts/contacts";
import Catalog from "./pages/catalog/catalog";
import CatalogPage from "./pages/catalog-page/catalog-page";
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
      <ToastProvider placement="bottom-left" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contacts" element={<Contacts />}></Route>
        <Route path="/catalog" element={<Catalog />}></Route>
        <Route path="/catalog/:id" element={<CatalogPage />}></Route>
      </Routes>
      <Footer />
    </HeroUIProvider>
  );
}

export default App;

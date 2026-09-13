import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SkipLink from "./components/SkipLink";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Statistics from "./pages/Statistics";
import FAQsPage from "./pages/FAQs";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <SkipLink />
      <ScrollToTop />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/the-team" element={<Team />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/:role" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

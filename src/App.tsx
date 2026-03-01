import "./App.css";
import { useEffect, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HobbyDetail from "./pages/HobbyDetail";

function App() {
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const updateHeaderOffset = () => {
      root.style.setProperty("--header-offset", `${headerEl.offsetHeight}px`);
    };

    updateHeaderOffset();

    const observer = new ResizeObserver(updateHeaderOffset);
    observer.observe(headerEl);
    window.addEventListener("resize", updateHeaderOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeaderOffset);
    };
  }, []);

  return (
    <>
      <header ref={headerRef} className="site-header">
        <div className="site-header__inner">
          <a className="site-brand" href="/">
            <span className="site-brand__badge" aria-hidden="true">
              CIP
            </span>
            <span>
              <strong>Chess Intelligence Platform</strong>
              <small>Analytics and coaching insights</small>
            </span>
          </a>
        </div>
      </header>
      <main id="top" className="app-main">
        <Routes>
          <Route path="/" element={<HobbyDetail />} />
          <Route path="/hobby/chess" element={<HobbyDetail />} />
          <Route path="/hobby/:slug" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;


import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Chatbot } from "./Chatbot";
import { ScrollToTop } from "./ScrollToTop";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

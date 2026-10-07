import React, { useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import gsap from "gsap";
import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import "./styles/global.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================
   PUBLIC PORTFOLIO
========================================= */

function Portfolio() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Reveal animation
      gsap.utils
        .toArray(".reveal")
        .forEach((element) => {
          gsap.fromTo(
            element,
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",

              scrollTrigger: {
                trigger: element,
                start: "top 84%",
                once: true,
              },
            }
          );
        });


      // Stagger animation
      gsap.utils
        .toArray(".stagger-grid")
        .forEach((grid) => {
          gsap.fromTo(
            grid.children,
            {
              y: 34,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.09,
              ease: "power3.out",

              scrollTrigger: {
                trigger: grid,
                start: "top 82%",
                once: true,
              },
            }
          );
        });

    });

    return () => ctx.revert();
  }, []);


  // Smooth scroll
  const scrollToId = (id) => {
    const element =
      document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };


  return (
    <div className="site">

      <Navbar
        scrollToId={scrollToId}
      />

      <main>

        <Hero
          scrollToId={scrollToId}
        />

        <About />

        <Skills />

        <Experience />

        <Projects />

        <Contact />

      </main>

      <Footer
        scrollToId={scrollToId}
      />

    </div>
  );
}


/* =========================================
   APP
========================================= */

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC WEBSITE */}

        <Route
          path="/"
          element={
            <Portfolio />
          }
        />


        {/* ADMIN LOGIN */}

        <Route
          path="/admin/login"
          element={
            <AdminLogin />
          }
        />


        {/* PROTECTED ADMIN */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />


        {/* FALLBACK */}

        <Route
          path="*"
          element={
            <Portfolio />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}
import { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/Welcome/style.scss";
import "aos/dist/aos.css";

const Header = () => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    function updatePosition() {
      let selectHeader = select("#header");

      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
      let backtotop = select(".back-to-top");
      if (backtotop) {
        if (window.scrollY > 100) {
          backtotop.classList.add("active");
        } else {
          backtotop.classList.remove("active");
        }
      }
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };
  return (
    <header id="header" className="fixed-top  header-transparent ">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="logo">
          <h1>
            <a href="/">Pellifix</a>
          </h1>
        </div>
        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <a className="nav-link scrollto active" href="#hero">
                Home
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="#features">
                App Features
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="#faq">
                F.A.Q
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="#contact">
                Contact
              </a>
            </li>
            <li>
              <span onClick={() => navigate("/login")} className="getstarted">
                Login
              </span>
            </li>
            <li>
              <span
                onClick={() => navigate("/register")}
                className="getstarted"
              >
                Register
              </span>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
};
export default Header;

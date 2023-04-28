import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import WorldNews from "./WorldNews";
import NationalNews from "./NationalNews";
import SportsNews from "./SportsNews";
import AllNews from "./AllNews";

const Homepage = () => {
  const dt = new Date();
  let currDate = dt.toDateString();

  return (
    <div className="container-fluid mt-2">
      <header className="text-center my-2">
        <div className="news-title">REACT EXPRESS</div>
        <div className="today-date">{currDate}</div>
      </header>
      <div className="row">
        <div className="col-10 mx-auto">
          <nav className="navbar navbar-expand-lg news-nav">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span>
                  <i className="fa-solid fa-bars"></i>
                </span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      <i className="fa-sharp fa-solid fa-house"></i> Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/world_news"
                    >
                      World News
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/national_news">
                      National News
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/sports_news">
                      Sports
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="container news-container my-3 mx-auto">
        <Routes>
          <Route path="/world_news" element={<WorldNews />} />
          <Route path="/national_news" element={<NationalNews />} />
          <Route path="/sports_news" element={<SportsNews />} />
          <Route path="/" element={<AllNews />} />
        </Routes>
      </div>
    </div>
  );
};

export default Homepage;

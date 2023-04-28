import React, { useState, useEffect } from "react";
import "./news.css";
import axios from "axios";
import NewsCard from "./NewsCard";
import { Puff } from "react-loader-spinner";
import { REACT_APP_API_KEY, pageSize } from "../config";

const AllNews = () => {
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState("latest");
  const [allNews, setAllNews] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const results = allNews.totalResults;
  const totalPages = Math.ceil(results / pageSize);

  // Fetch News data on render
  const getAllNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${
          searchInput === "" ? "latest" : keyword
        }&apiKey=${REACT_APP_API_KEY}&page=${pageNo}&pageSize=${pageSize}`
      );
      setAllNews(response.data);
      console.log(response);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch previous aricles
  const handlePrev = async () => {
    setPageNo(pageNo - 1);
    console.log(pageNo);
    getAllNews();
  };

  // Fetch next aricles
  const handleNext = async () => {
    setPageNo(pageNo + 1);
    console.log(pageNo);
    getAllNews();
  };

  useEffect(() => {
    setKeyword(searchInput);
    const timer = setTimeout(() => {
      getAllNews();
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, keyword]);

  // Displays a spinner while loading page
  if (isloading) {
    return (
      <div className="container-fluid d-flex justify-content-center">
        <Puff
          height="80"
          width="80"
          radius={1}
          color="rgba(43, 42, 42, 0.6)"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  } else {
    // Displays news articles
    return (
      <React.Fragment>
        <div className="news-search d-flex align-itmes-center justify-content-center my-3">
          <form className="p-1">
            <input
              type="text"
              name="news_search"
              id="nw_search"
              placeholder="Search news"
              className="p-1"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                console.log(searchInput);
              }}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </form>
        </div>
        <div className="container-fluid d-flex justify-content-center">
          <div className="news-list">
            {allNews.articles?.map((news) => {
              let id = allNews.articles.indexOf(news);
              if (!allNews.articles) {
                return null;
              } else {
                return <NewsCard key={id} newsArticles={news} />;
              }
            })}
          </div>
        </div>
        <div className="pagination d-flex justify-content-center my-2">
          <button onClick={handlePrev} disabled={pageNo <= 1 ? "true" : false}>
            &#171;prev
          </button>
          <button
            onClick={handleNext}
            disabled={pageNo >= totalPages ? "true" : false}
          >
            next&#187;
          </button>
        </div>
      </React.Fragment>
    );
  }
};

export default AllNews;

import React, { useEffect, useState } from "react";
import "./news.css";
import axios from "axios";
import NewsCard from "./NewsCard";
import { Puff } from "react-loader-spinner";
import { REACT_APP_API_KEY, pageSize } from "../config";

const WorldNews = () => {
  const [worldNews, setWorldNews] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const results = worldNews.totalResults;
  const totalPages = Math.ceil(results / pageSize);

  // Fetch News data on render
  const getWorldNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${REACT_APP_API_KEY}&page=${pageNo}&pageSize=${pageSize}`
      );
      setWorldNews(response.data);
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
    getWorldNews();
  };

  // Fetch next aricles
  const handleNext = async () => {
    setPageNo(pageNo + 1);
    console.log(pageNo);
    getWorldNews();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getWorldNews();
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className="container-fluid d-flex flex-column justify-content-center">
        <div className="news-list">
          {worldNews.articles?.map((news) => {
            let id = worldNews.articles.indexOf(news);
            if (!worldNews.articles) {
              return null;
            } else {
              return <NewsCard key={id} newsArticles={news} />;
            }
          })}
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
      </div>
    );
  }
};

export default WorldNews;

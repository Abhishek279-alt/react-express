import React, { useEffect, useState } from "react";
import axios from "axios";
import "./news.css";
import NewsCard from "./NewsCard";
import { Puff } from "react-loader-spinner";
import { REACT_APP_API_KEY, pageSize } from "../config";

const NationalNews = () => {
  const [actualData, setActualData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const results = actualData.totalResults;
  const totalPages = Math.ceil(results / pageSize);
  // console.log(totalPages);
  const getNationalNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=${REACT_APP_API_KEY}&page=${pageNo}&pageSize=${pageSize}`
      );
      console.log(response);
      setActualData(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePrev = async () => {
    setPageNo(pageNo - 1);
    console.log(pageNo);
    getNationalNews();
  };

  const handleNext = async () => {
    setPageNo(pageNo + 1);
    console.log(pageNo);
    getNationalNews();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getNationalNews();
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    return (
      <div className="container-fluid d-flex flex-column justify-content-center">
        <div className="news-list">
          {actualData.articles?.map((article) => {
            let index = actualData.articles.indexOf(article);
            return <NewsCard key={index} newsArticles={article} />;
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

export default NationalNews;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./news.css";
import NewsCard from "./NewsCard";
import { Puff } from "react-loader-spinner";

const NationalNews = () => {
  const [actualData, setActualData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const getNationalNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      console.log(response);
      setActualData(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNationalNews();
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
      <div className="container-fluid news-list">
        {actualData.articles?.map((article) => {
          let index = actualData.articles.indexOf(article);
          return <NewsCard key={index} newsArticles={article} />;
        })}
      </div>
    );
  }
};

export default NationalNews;

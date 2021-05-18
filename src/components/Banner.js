import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import "./Banner.css";
const baseUrl = "https://image.tmdb.org/t/p/original/";
const Banner = () => {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * (request.data.results.length - 1))
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${baseUrl}${movie?.backdrop_path}`,
        backgroundPosition: "center center",
      }}
    >
      {/* <img className="header_img" src={`${baseUrl}${movie.poster_path}`}></img> */}
      <div className="banner_content">
        <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h3 className="banner_description">{truncate(movie?.overview, 250)}</h3>
      </div>
      <div className="banner--fadeButton" />
    </header>
  );
};

export default Banner;

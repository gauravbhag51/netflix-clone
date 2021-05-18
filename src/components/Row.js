import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const baseUrl = "https://image.tmdb.org/t/p/original/";
const Row = ({ title, fetchUrl, isLarge }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [crrMovie, setCrrMovie] = useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts={
      height:"390",
      width:"100%",
      playerVars:{
          autoplay:1,
      },
  }
  const handleClick=(movie)=>{
    console.log(movie);
      if(trailerUrl)
      {
        const name=`${movie?.title}`||movie.name;
        if(crrMovie===name)
        {
          setTrailerUrl("");
          setCrrMovie("");
        }
        else
        {
          movieTrailer(`${movie?.title}`||movie.name||"")
          .then((url)=>{
            console.log(url,`${movie?.title}`||movie.name);
              if(url)
              {
              const urlParams=new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get("v"));
              setCrrMovie(`${movie?.title}`||movie.name);
              }
              else
              {
                alert("Trailer Not Available");
              }
          }).catch(error=>console.log(error));
        }
      }else
      {
          // console.log(movie?.name);
          
           movieTrailer(`${movie?.title}`||movie.name||"")
          .then((url)=>{
            console.log(url,`${movie?.title}`||movie.name);
              if(url)
              {
              const urlParams=new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get("v"));
              }
              else
              {
                alert("Trailer Not Available");
              }
          }).catch(error=>console.log(error));
      };
  }
  return (
    <div className="row">
      <h3>{title}</h3>
      <div className={`row_posters ${isLarge && "row_larger"}`}>
        {movies.map((movie) => (
          <img
          onClick={()=>handleClick(movie)}
            key={movie.id}
            className="poster"
            src={`${baseUrl}${
              isLarge ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          ></img>
        ))}
      </div>
      {trailerUrl &&<YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;

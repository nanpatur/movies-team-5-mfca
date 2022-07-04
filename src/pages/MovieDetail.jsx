import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
var search = require("youtube-search");

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState();
  const [videoId, setVideoId] = useState();
  const { location } = useHistory();

  useEffect(() => {
    const movieId = location.pathname.split("/")[1];
    const getMovieDetail = () => {
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=d98a38d9b77d57002f7b1b64a1872aad&language=id-ID`
      )
        .then((response) => response.json())
        .then((data) => {
          setMovieDetail(data);
        });
    };
    if (!location.state) {
      getMovieDetail();
    } else {
      setMovieDetail(location.state);
    }
  }, []);

  useEffect(() => {
    const getMovieVideos = () => {
      var opts = {
        maxResults: 1,
        key: "AIzaSyBZXio7Nb5pIOBp2-O-JdCdk_8H0oW_T4E",
      };

      search(movieDetail.title, opts, function (err, results) {
        if (err) return console.log(err);

        setVideoId(results[0].id);
      });
    };
    if (movieDetail) {
      getMovieVideos();
    }
  }, [movieDetail]);

  return (
    movieDetail && (
      <>
        <nav className="navbar navbar-expand-lg bg-secondary">
          <div className="container px-4">
            <Link className="navbar-brand text-light" to="/">
              MOVIES - TEAM 5
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
        <div className="container text-light p-4">
          <iframe
            className='mb-4'
            allowfullscreen
            style={{ width: "100%", height: "600px" }}
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
          <div class="row">
            <div class="col-sm-2">
              <img
                src={
                  `https://image.tmdb.org/t/p/w500` + movieDetail.poster_path
                }
                className="card-img-top"
                alt="..."
              />
            </div>
            <div class="col-sm-10">
              <h3>{movieDetail.title}</h3>
              <p>{movieDetail.overview}</p>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default MovieDetail;

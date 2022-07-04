import { useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Home = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [genresData, setGenresData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sorting, setSorting] = useState('')

  const history = useHistory();

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=d98a38d9b77d57002f7b1b64a1872aad&language=id-ID"
      )
        .then((response) => response.json())
        .then((data) => {
          setMoviesData(data.results);
          setIsLoading(false);
        });
    };
    const getGenres = async () => {
      fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=d98a38d9b77d57002f7b1b64a1872aad&language=id-ID"
      )
        .then((response) => response.json())
        .then((data) => setGenresData(data.genres));
    };
    getMovies();
    getGenres();
  }, []);

  const filteredMoviesData = useMemo(() => {
    let tempMoviesData = moviesData

    if (selectedGenreId) {
      if (selectedGenreId !== 'all') {
        tempMoviesData = tempMoviesData.filter((movie) => {
          return movie.genre_ids.includes(+selectedGenreId);
        })
      }
    }

    if (searchKeyword) {
      tempMoviesData = tempMoviesData.filter((movie) => {
        return movie.title.toLowerCase().includes(searchKeyword.toLowerCase());
      });
    }

    if (sorting === 'asc') {
      tempMoviesData = tempMoviesData.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
    } else if (sorting === 'desc') {
      tempMoviesData = tempMoviesData.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1)
    }
    return tempMoviesData
  }, [selectedGenreId, searchKeyword, sorting, moviesData]);

  const MovieList = () => {
    if (isLoading) {
      return null;
    }

    return filteredMoviesData?.length > 0 ? (
      <div class="d-flex flex-wrap">
        {filteredMoviesData?.map((movie, i) => (
          <div
            className="card border-0 text-bg-secondary p-3 bg-transparent"
            style={{ width: "25%" }}
            key={i}
            onClick={() => history.push(`/${movie.id}`, movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500` + movie.poster_path}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body bg-secondary">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">{movie.overview.slice(0, 100)}...</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center">
        <p>Film Tidak Ditemukan</p>
      </div>
    );
  };

  return (
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <select
              class="form-select ms-auto me-2"
              style={{ maxWidth: "200px" }}
              onChange={(e) => {
                setSelectedGenreId(e.target.value);
              }}
            >
              <option selected value="all">
                Semua Kategori
              </option>
              {genresData?.map((genre, i) => (
                <option value={genre.id}>{genre.name}</option>
              ))}
            </select>
            <select
              class="form-select me-2"
              style={{ maxWidth: "200px" }}
              onChange={(e) => {
                setSorting(e.target.value);
              }}
            >
              <option selected value="">
                Urutkan
              </option>
              <option value='asc'>A-Z</option>
              <option value='desc'>Z-A</option>
            </select>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Cari disini..."
                aria-label="Search"
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </form>
          </div>
        </div>
      </nav>

      <div className="container text-light py-4 text-center">
        {isLoading && <p>Memuat...</p>}
        <MovieList />
      </div>
    </>
  );
};

export default Home;

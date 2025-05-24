import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import css from "./HomePage.module.css";

export default function HomePage() {
  const location = useLocation();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getTrendingMovies() {
      const options = {
        params: { api_key: "bc2265aa30ecd1392b8b84679bff4db4" },

        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzIyNjVhYTMwZWNkMTM5MmI4Yjg0Njc5YmZmNGRiNCIsIm5iZiI6MTcwNTUxNDM0NC4zNzIsInN1YiI6IjY1YTgxNTY4YjUxM2E4MDBjZTU5YTc2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wc5QEYHrG8hEV_ebRtu-oVvPJ-OJA3Kpg9bwXtKsZBk",
        },
      };

      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/week",
          options
        );
        setMovies(response.data.results);
      } catch {
        console.log("catch error");
      } finally {
        console.log("finally");
      }
    }
    getTrendingMovies();
  }, []);

  return (
    <div className={css.wrapper}>
      <h1>Trending today</h1>
      <ul className={css.list}>
        {movies.map((movie) => (
          <Link
            to={`movies/${movie.id}`}
            key={movie.id}
            className={css.liItem}
            state={location}
          >
            <h3>{movie.title}</h3>
          </Link>
        ))}
      </ul>
    </div>
  );
}

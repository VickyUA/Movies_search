import { useState, useEffect } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  // const [query, setQuery] = useState(null);
  const [list, setList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");

  const location = useLocation();

  useEffect(() => {
    if (name === "") {
      return;
    }
    async function getSearchedMovies(query) {
      const options = {
        params: { api_key: "bc2265aa30ecd1392b8b84679bff4db4", query },

        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzIyNjVhYTMwZWNkMTM5MmI4Yjg0Njc5YmZmNGRiNCIsIm5iZiI6MTcwNTUxNDM0NC4zNzIsInN1YiI6IjY1YTgxNTY4YjUxM2E4MDBjZTU5YTc2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wc5QEYHrG8hEV_ebRtu-oVvPJ-OJA3Kpg9bwXtKsZBk",
        },
      };

      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          options
        );
        setList(response.data.results);
      } catch {
        console.log("catch error");
      } finally {
        console.log("finally");
      }
    }
    getSearchedMovies(name);
  }, [name]);

  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, value);
    setSearchParams(updatedParams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.movie.value;
    if (value.trim() === "") {
      alert("Please enter search term!");
      return;
    }
    updateSearchParams("name", value);
    e.target.reset();
  };

  return (
    <div className={css.wrapper}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input type="text" name="movie" placeholder="search a movie..." />
        <button>Go!</button>
      </form>
      <ul className={css.list}>
        {list.map((list) => (
          <Link
            to={`${list.id}`}
            key={list.id}
            className={css.liItem}
            state={location}
          >
            <h3>{list.title}</h3>
          </Link>
        ))}
      </ul>
    </div>
  );
}

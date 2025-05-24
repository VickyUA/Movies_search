import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  console.log(location.state);
  const backLinkHref = location.state ?? "/";

  useEffect(() => {
    async function getDetails(movie_id) {
      const options = {
        params: { api_key: "bc2265aa30ecd1392b8b84679bff4db4" },

        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzIyNjVhYTMwZWNkMTM5MmI4Yjg0Njc5YmZmNGRiNCIsIm5iZiI6MTcwNTUxNDM0NC4zNzIsInN1YiI6IjY1YTgxNTY4YjUxM2E4MDBjZTU5YTc2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wc5QEYHrG8hEV_ebRtu-oVvPJ-OJA3Kpg9bwXtKsZBk",
        },
      };

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie_id}`,
          options
        );
        setMovie(response.data);
      } catch {
        console.log("catch error");
      } finally {
        console.log("finally");
      }
    }
    getDetails(movieId);
  }, [movieId]);

  const year = String(movie.release_date).substring(0, 4);

  return (
    <div>
      <button className={css.btn} onClick={() => navigate(backLinkHref)}>
        Go back
      </button>
      {/* <Link to={backLinkHref}>Go back</Link> */}
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt="description"
      />
      <div className={css.wrapper}>
        <h1>
          {movie.title}, {year}
        </h1>
        <p>Vote average {movie.vote_average}</p>
        <h3>Overview</h3>
        <p>{movie.overview}</p>
        <h3>Main genre</h3>
        {/* <p>{movie.genres.name}</p> */}
        <p>Additional information</p>
        <ul>
          <li>
            <Link to="cast">See cast</Link>
          </li>
          <li>
            <Link to="reviews">See reviews</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function getCast(movie_id) {
      const options = {
        params: { api_key: "bc2265aa30ecd1392b8b84679bff4db4" },

        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzIyNjVhYTMwZWNkMTM5MmI4Yjg0Njc5YmZmNGRiNCIsIm5iZiI6MTcwNTUxNDM0NC4zNzIsInN1YiI6IjY1YTgxNTY4YjUxM2E4MDBjZTU5YTc2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wc5QEYHrG8hEV_ebRtu-oVvPJ-OJA3Kpg9bwXtKsZBk",
        },
      };

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie_id}/credits`,
          options
        );
        setCast(response.data.cast);
      } catch {
        console.log("catch error");
      } finally {
        console.log("finally");
      }
    }
    getCast(movieId);
  }, [movieId]);

  return (
    <div>
      <ul className={css.list}>
        {cast.map((cast) => (
          <li key={cast.id} className={css.liItem}>
            <img
              src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
              alt="description"
            />
            <h4>{cast.name}</h4>
            <p>Character: {cast.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

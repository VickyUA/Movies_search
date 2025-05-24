import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviews(movie_id) {
      const options = {
        params: { api_key: "bc2265aa30ecd1392b8b84679bff4db4" },

        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzIyNjVhYTMwZWNkMTM5MmI4Yjg0Njc5YmZmNGRiNCIsIm5iZiI6MTcwNTUxNDM0NC4zNzIsInN1YiI6IjY1YTgxNTY4YjUxM2E4MDBjZTU5YTc2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wc5QEYHrG8hEV_ebRtu-oVvPJ-OJA3Kpg9bwXtKsZBk",
        },
      };

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie_id}/reviews`,
          options
        );
        setReviews(response.data.results);
      } catch {
        console.log("catch error");
      } finally {
        console.log("finally");
      }
    }
    getReviews(movieId);
  }, [movieId]);

  return (
    <div>
      <ul className={css.list}>
        {reviews.length === 0 ? (
          <p>No reviews</p>
        ) : (
          reviews.map((review) => (
            <li key={review.id} className={css.liItem}>
              <h3>{review.author}</h3>
              <p>{review.content} </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

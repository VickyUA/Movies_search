import css from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className={css.wrapper}>
      <Link to="/">Go home </Link>
    </div>
  );
}

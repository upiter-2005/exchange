import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerLogo}>BITLEX</div>
        <div className={styles.headerDesc}>
          cryptocurrency exchange platform
        </div>
        <div className={styles.headerRight}>
          <button type="button" className={styles.headerLogIn}>
            Log In
          </button>
          <Link to="/orders" className={styles.headerLink}>
            My orders
          </Link>
        </div>
      </div>
    </div>
  );
}

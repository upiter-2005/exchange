import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Header.module.scss";

export default function Header() {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerLogo}>BITLEX</div>
        <div className={styles.headerDesc}>
          cryptocurrency exchange platform
        </div>
        <div className={styles.headerRight}>
          {isAuthenticated ? (
            <button
              type="button"
              className={styles.headerLogIn}
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log Out
            </button>
          ) : (
            <button
              type="button"
              className={styles.headerLogIn}
              onClick={() => loginWithRedirect()}
            >
              Log In
            </button>
          )}
          <Link to="/orders" className={styles.headerLink}>
            My orders
          </Link>
          {isAuthenticated && (
            <div className={styles.userBox}>
              <img
                src={user.picture}
                alt={user.name}
                className={styles.userBoxImg}
              />
              <div className={styles.userBoxData}>
                <h2 className={styles.userBoxName}>{user.name}</h2>
                <p className={styles.userBoxEmail}>{user.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

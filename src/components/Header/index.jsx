import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import {
  logOutUser,
  fetchUserData,
  createUserData,
} from "../../redux/slices/userSlice";
import styles from "./Header.module.scss";

export default function Header() {
  const dispatch = useDispatch();

  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const customLogOut = () => {
    dispatch(logOutUser());
    logout({ returnTo: window.location.origin });
  };

  const customLogIn = () => {
    loginWithRedirect();
  };

  const isUserExist = async (id) => {
    try {
      const data = await fetch(
        `https://627eb2bb271f386ceffc342c.mockapi.io/bitlex/?user=${id}`
      )
        .then((response) => response.json())
        .then((response) => response);

      if (data.length > 0) {
        dispatch(fetchUserData(id));
      } else {
        dispatch(createUserData(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const uid = user.sub.split("|");
      isUserExist(uid[1]);
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerLogo}>BITLEX</div>
        <div className={styles.headerDesc}>
          cryptocurrency exchange demo platform
        </div>
        <div className={styles.headerRight}>
          <Link to="/" className={styles.headerLink}>
            Trade
          </Link>
          {isAuthenticated && (
            <Link to="/orders" className={styles.headerLink}>
              My account
            </Link>
          )}

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
          {isAuthenticated ? (
            <button
              type="button"
              className={styles.headerLogIn}
              onClick={customLogOut}
            >
              Log Out
            </button>
          ) : (
            <button
              type="button"
              className={styles.headerLogIn}
              onClick={customLogIn}
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { getAuthorizeHref } from "../../oauthConfig";
import { getHashParams, removeHashParamsFromUrl } from "../../utils/hashUtils";
import { setUserProfileAsync } from "../spotifyExample/spotifyExampleSlice";
import { selectIsLoggedIn, selectTokenExpiryDate, setAccessToken, setLoggedIn, setTokenExpiryDate } from "./authorizationSlice";
import styles from '../counter/Counter.module.css'
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const hashParams = getHashParams();
const access_token = hashParams.access_token;
const expires_in = hashParams.expires_in;
removeHashParamsFromUrl();

export function Authorization() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const tokenExpiryDate = useAppSelector(selectTokenExpiryDate);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (access_token) {
      dispatch(setLoggedIn(true));
      dispatch(setAccessToken(access_token));
      dispatch(setTokenExpiryDate(Number(expires_in)));
      dispatch(setUserProfileAsync(access_token));
    }
  }, []);

  return (
    <div>
      <div className={styles.row}>
        {!isLoggedIn && 
          <button
          className={styles.button}
          aria-label="Log in using OAuth 2.0"
          onClick={() => window.open(getAuthorizeHref(), '_self')}
          >
            Log in with Spotify
          </button>}
        {isLoggedIn && <div className={styles.row}>Token expiry date: {tokenExpiryDate}</div>}
      </div>
    </div>
  )

}

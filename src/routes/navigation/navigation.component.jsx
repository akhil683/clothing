import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../../assets/logo";

import "./navigation.styles.scss";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../context/user.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? ( 
              <span onClick={signOutUser}>SIGN OUT</span>
            ) : (
              <Link className="nav-link" to='/auth'>
                SIGN IN
              </Link>)
          }
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default Navigation;

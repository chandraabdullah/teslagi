import React, { useContext } from "react";
import { Link ,useHistory } from "react-router-dom";
import { UserContext } from "../App";
export default function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory()
  const renderList = () => {
    if (state) {
      return [
        <li key="1">
          <Link  to="/profile">Profile</Link>
        </li>,
        <li key="2">
          <Link  to="/create">Create Post</Link>
        </li>,
        <li key="6">
        <Link  to="/myfollowingpost">My Following Post</Link>
       </li>,
        <li key="3">
          <button
            className="btn waves-effect waves-light #c62828 red darken-3"
            onClick={() => {
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/login')
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li key="4">
          <Link to="/login">Login</Link>
        </li>,
        <li key="5">
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/login"} className="brand-logo left">
          Logo
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
}

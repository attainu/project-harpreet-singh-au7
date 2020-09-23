import React from "react";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useStateValue } from "../../Redux/StateProvider";
import { auth } from "../../firebase/firebaseconfig";

function Header() {
  const [{ basket, user }] = useStateValue();

  const Signin = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <nav className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>
      <div className="header_nav">
        <Link to={!user && "/login"} className="header_link">
          <div onClick={Signin} className="header_option">
            <div className="header_optionLineOne">Hello {user?.email}</div>
            <div className="header_optionLineTwo">
              {user ? "Sign out" : "Sign in"}
            </div>
          </div>
        </Link>
        <Link to="/orders" className="header_link">
          <div className="header_option">
            <div className="header_optionLineOne">Returns</div>
            <div className="header_optionLineTwo">& Orders</div>
          </div>
        </Link>
        <Link to="/" className="header_link">
          <div className="header_option">
            <div className="header_optionLineOne">Your</div>
            <div className="header_optionLineTwo">Prime</div>
          </div>
        </Link>

        <Link to="/checkout" className="header_link">
          <div className="header_optionBasket">
            <ShoppingCartOutlinedIcon />
            <div className="header_optionLineTwo header_basketCount">
              {basket?.length}
            </div>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;

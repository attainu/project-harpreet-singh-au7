import React, { useEffect, useState } from "react";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useStateValue } from "../../Redux/StateProvider";
import { auth } from "../../firebase/firebaseconfig";

function Header({ items }) {
  const [{ basket, user }] = useStateValue();
  var [displayname, setDisplayame] = useState("");

  const Signin = () => {
    if (user) {
      auth.signOut();
    }
  };

  useEffect(() => {
    setDisplayame(user?.displayName);
  }, [user]);

  const products = items.map((item) => item.title);
  products.push("The lean Startup");
  products.push(
    "LG 6.5 Kg 5 Star Smart Inverter Fully-Automatic Top Loading Washing Machine (T65SKSF4Z, Middle Free Silver)"
  );
  products.push(
    "Whirlpool 7.5 Kg 5 Star Royal Plus Fully-Automatic Top Loading Washing Machine"
  );
  products.push(
    "Whirlpool 7.5 Kg 5 Star Royal Plus Fully-Automatic Top Loading Washing Machine"
  );
  products.push(
    "Noise Shots X5 PRO True Wireless Earbuds Powered by Qualcomm aptX with 150 Hours Total Playtime"
  );
  products.push("OnePlus 8 Pro (Onyx Black 8GB RAM+128GB Storage");
  products.push("OnePlus Buds (White)");
  products.push("Samsung Galaxy M31s (Mirage Blue, 6GB RAM, 128GB Storage)");
  products.push(
    "Noise Tune Active Wireless Bluetooth Earphones with Dynamic Drivers for Immersive Music Experience, IPX5 Sweat-Proof & Rain-Proof"
  );
  products.push(
    "Urban Tribe Plank 23 Liters Sports Gym Bag with Separate Shoe Compartment (Camo)"
  );

  var [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const results = products.filter((product) =>
      product.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  console.log(user);
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
        <input
          className="header_searchInput"
          type="text"
          value={searchTerm}
          onChange={handleChange}
        />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className={searchTerm ? "search_bar" : "c_searchbar"}>
        <ul className="ul">
          {searchResults.map((item) => (
            <li key={Math.random()}>
              <h5 className="searchword">{item}</h5>
              <br />
            </li>
          ))}
        </ul>
      </div>

      <div className="header_nav">
        <Link to={!user && "/login"} className="header_link">
          <div onClick={Signin} className="header_option">
            <div className="header_optionLineOne">
              Hello {user?.displayName}
            </div>
            <div className="header_optionLineTwo">
              {user ? "Sign out" : "Sign in"}
            </div>
          </div>
        </Link>
        <Link to="/orders" className="header_link">
          <div className="header_option">
            <div className="header_optionLineOne">Your</div>
            <div className="header_optionLineTwo">Orders</div>
          </div>
        </Link>
        <Link to="/" className="header_link">
          <div className="header_option">
            <div className="header_optionLineOne">Your</div>
            <div className="header_optionLineTwo">Prime</div>
          </div>
        </Link>

        <Link to="/additems" className="header_link">
          <div className="header_option">
            <div className="header_optionLineOne">Sell on</div>
            <div className="header_optionLineTwo">Amazon</div>
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

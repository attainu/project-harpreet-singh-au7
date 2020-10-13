import React from "react";
import { Fade } from "react-slideshow-image";
import "./home.css";
import "react-slideshow-image/dist/styles.css";
import Product from "../Products";
import { useStateValue } from "../../Redux/StateProvider";
import axios from "../../axios";

const fadeImages = [
  "https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Rajeshwari/September/GWBanners/Control/DesktopHero_1500x600._CB405007888_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/IN-hq/2020/img/Sports/XCM_Manual_ORIGIN_1261289_1333735_IN_in_fitness_days_event_sep_gw_in_en_3328889_1500x600_1X_en_IN._CB405086418_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2020/X-site/Multititle/Bollywood/1500x600_Hero-Tall_np_bolly._CB405289994_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img20/PC/Accessories/GW/PC-acc_june20_DesktopHero_1500x600._CB429195970_.jpg",
];

const Home = ({ items }) => {
  const [{ user }] = useStateValue();
  let content = [];

  return (
    <div className="slide-container">
      <Fade>
        <div className="each-fade">
          <div className="image-container">
            <img src={fadeImages[0]} alt="" />
          </div>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img src={fadeImages[1]} alt="" />
          </div>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img src={fadeImages[2]} alt="" />
          </div>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img src={fadeImages[3]} alt="" />
          </div>
        </div>
      </Fade>

      <div className="home_row1">
        <Product
          id="12321347"
          key={Math.random() * 1000}
          title="The lean Startup"
          price={11.96}
          rating={5}
          image="https://images-eu.ssl-images-amazon.com/images/G/31/img19/Home/LA/LATVFdesktopQC/Chimney_GW_CC_379x304._SY304_CB427965740_.jpg"
        />

        <Product
          id="12321346"
          key={Math.random() * 1000}
          title="The lean Startup"
          price={11.96}
          rating={3}
          image="https://m.media-amazon.com/images/I/31r5+bXhl0L.__AC_SY200_.jpg"
        />
      </div>
      <div className="home_row">
        <Product
          id="123216666889"
          key={Math.random() * 1000}
          title="Whirlpool 7.5 Kg 5 Star Royal Plus Fully-Automatic Top Loading Washing Machine (WHITEMAGIC ROYAL PLUS 7.5, Grey, Hard Water Wash)"
          price={111.96}
          rating={5}
          image="https://images-na.ssl-images-amazon.com/images/I/71pVSyDJD9L._SL1500_.jpg"
        />

        <Product
          id="12321341"
          key={Math.random() * 1000}
          title="LG 6.5 Kg 5 Star Smart Inverter Fully-Automatic Top Loading Washing Machine (T65SKSF4Z, Middle Free Silver)"
          price={100.96}
          rating={3}
          image="https://images-na.ssl-images-amazon.com/images/I/71sgMM9ZQ9L._SL1500_.jpg"
        />

        <Product
          id="12321340"
          key={Math.random() * 1000}
          title="Urban Tribe Plank 23 Liters Sports Gym Bag with Separate Shoe Compartment (Camo)"
          price={25.96}
          rating={2}
          image="https://images-na.ssl-images-amazon.com/images/I/71FOqcNGKRL._SL1500_.jpg"
        />
      </div>
      <div className="home_row">
        <Product
          id="123"
          key={Math.random() * 1000}
          title="Noise Shots X5 PRO True Wireless Earbuds Powered by Qualcomm aptX with 150 Hours Total Playtime (Charcoal Grey)"
          price={51.96}
          rating={4}
          image="https://images-na.ssl-images-amazon.com/images/I/610k9xzwpQL._SL1500_.jpg"
        />

        <Product
          id="123213"
          key={Math.random() * 1000}
          title="OnePlus 8 Pro (Onyx Black 8GB RAM+128GB Storage)"
          price={147.96}
          rating={4}
          image="https://images-na.ssl-images-amazon.com/images/I/61YSMhOd5EL._SL1500_.jpg"
        />

        <Product
          id="1232137485"
          title="OnePlus Buds (White)"
          price={45.96}
          rating={3}
          key={Math.random() * 1000}
          image="https://images-na.ssl-images-amazon.com/images/I/51jQScmCQuL._SL1500_.jpg"
        />
      </div>
      <div className="home_row">
        <Product
          id="12321314356"
          title="Samsung Galaxy M31s (Mirage Blue, 6GB RAM, 128GB Storage)"
          price={187.96}
          rating={5}
          key={Math.random() * 1000}
          image="https://images-na.ssl-images-amazon.com/images/I/61d-phh4GfL._SL1500_.jpg"
        />

        <Product
          id="12321365023"
          title=" Noise Tune Active Wireless Bluetooth Earphones with Dynamic Drivers for Immersive Music Experience, IPX5 Sweat-Proof & Rain-Proof, 10 Hours of Playtime (Hot Red)"
          price={18.96}
          rating={4}
          key={Math.random() * 1000}
          image="https://images-na.ssl-images-amazon.com/images/I/61jD3CYjwsL._SL1500_.jpg"
        />
        <Product
          id="1232137485"
          title="OnePlus Buds (White)"
          price={45.96}
          rating={3}
          key={Math.random() * 1000}
          image="https://images-na.ssl-images-amazon.com/images/I/51jQScmCQuL._SL1500_.jpg"
        />
      </div>
      <div className="home_row">
        {items?.forEach((item, i) => {
          if ((i + 1) % 4 == 0) {
            content.push(
              <div className="home_row">
                <Product
                  id={item.id}
                  key={Math.random() * 1000}
                  title={item.title}
                  price={item.price}
                  rating={item.rating}
                  image={`https://a-clone.herokuapp.com/products/retrive/image/single?name=${item.image}`}
                  category={item.category}
                />
              </div>
            );
          } else {
            content.push(
              <Product
                id={item.id}
                key={Math.random() * 1000}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={`https://a-clone.herokuapp.com/products/retrive/image/single?name=${item.image}`}
                category={item.category}
              />
            );
          }
        })}
      </div>
      <div className="each_row">{content}</div>
    </div>
  );
};

export default Home;

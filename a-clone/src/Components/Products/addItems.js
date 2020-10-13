import React, { useState } from "react";
import { useStateValue } from "../../Redux/StateProvider";
import "./Additems.css";
import axios from "../../axios";
import { Link, useHistory } from "react-router-dom";
import { Input, Button } from "@material-ui/core";
import DropdownCategory from "./CategoryDropdown";
import FormData from "form-data";
import StarRating, { ratings } from "./ratings";

function AddItems() {
  const [{ user, categoryt }] = useStateValue();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [imageURL, setImageUrl] = useState("");
  const [id, setID] = useState("");
  const [filename, setFilename] = useState("");

  const history = useHistory();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setFilename(e.target.files[0].name);
    }
  };

  const items = [
    {
      id: 1,
      value: "Mobile Phones",
    },
    {
      id: 2,
      value: "Home Electronics",
    },
    {
      id: 3,
      value: "Gadgets",
    },
  ];

  const imageupload = async (e) => {
    e.preventDefault();

    if (image) {
      const imgForm = new FormData();
      imgForm.append("file", image, filename);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      try {
        const res = axios
          .post("/products/upload/image", imgForm, config)
          .then((response) => {
            console.log(response.file);

            const imgdata = response.data.filename;

            console.log("IMG DATAAAA =>>>>", imgdata);
            setImageUrl(imgdata);
          });
      } catch (error) {
        console.log(error.response.data);
      }
    } else {
      alert("Please select an image to continue");
    }
  };

  let fdata = {
    title: title,
    price: price,
    rating: ratings,
    image: imageURL,
    category: categoryt?.item,
  };

  const createProduct = (event) => {
    event.preventDefault();

    async function fetchUserData() {
      const res = await axios
        .post("products/additems", fdata)
        .then((res) => {
          console.log("MONGOOOO" + res.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }

    fetchUserData();

    history.push("/");
  };

  // const handleUpload = (e) => {
  //   e.preventDefault();

  //   const imgForm = new FormData();
  //   imgForm.append("file", image, image.name);
  // };

  // const imgChange = (e) => {
  //   console.log("file to upload:", e.target.files[0]);
  //   let file = e.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reaer.onload = _handleReaderLoaded();
  //     reader.readAsBinaryString(file);
  //   }
  // };
  // _handleReaderLoaded = (readerEvt) => {
  //   let binaryString = readerEvt.target.value;
  //   setImage({ base64TextString: btoa(binaryString) });
  // };

  return (
    <div className="addItems">
      {!user ? (
        history.push("/login")
      ) : (
        <>
          <Link to="/">
            <img
              className="addItems_logo"
              src="https://images-na.ssl-images-amazon.com/images/I/41svkrLkvuL.png"
              alt=""
            />
          </Link>

          <div className="addItems_header">
            <h1>Hey,{user?.displayName}</h1>
            <h3>
              Welcome to Amazon Seller Central. Please fill in the below
              mentioned form to add your product and sell on Amazon
            </h3>
          </div>
          <div className="form_container">
            <form>
              <label for="title">
                <h5>Product Title</h5>
              </label>

              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                name="title"
                placeholder="Enter the product title here"
                type="text"
              />
              <br />
              <label for="id">
                <h5>Product ID or ASIN</h5>
              </label>

              <input
                value={id}
                onChange={(event) => setID(event.target.value)}
                name="id"
                placeholder="Enter the product id here"
                type="text"
              />
              <br />
              <label for="pice">
                <h5>Price of Product</h5>
              </label>

              <input
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                name="email"
                placeholder="Please enter the price of product here"
                type="number"
              />
              <br />
              <label for="rating">
                <h5>Ratings</h5>
              </label>

              <StarRating />
              <br />
              <label for="rating">
                <h5>Category</h5>
              </label>

              <DropdownCategory items={items} />
              <br />

              <div className="imageupload">
                <label for="image">Upload the product image</label>
                <div>
                  <Input
                    type="file"
                    onChange={handleChange}
                    accept=".jpeg,.jpg,.png,.img"
                  />
                  <button
                    type="submit"
                    className="imageupload__button"
                    // onChange={handleChange}
                    onClick={imageupload}
                  >
                    Upload
                  </button>
                </div>
              </div>
              <br />

              <button
                onClick={createProduct}
                type="submit"
                className="additems_submit"
              >
                Add Product
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default AddItems;

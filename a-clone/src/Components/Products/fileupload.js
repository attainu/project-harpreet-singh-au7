import React from "react";
import axios from "../../axios";
import FormData from "form-data";

class Fileuplaod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myfile", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    async function fetchUserData() {
      const res = await axios
        .post("products/upload/image", formData, config)
        .then((res) => {
          console.log("MONGOOOO" + res.data);
        })
        .catch((error) => {
          console.log(error.res);
        });
    }

    fetchUserData();
  }

  onChange(e) {
    this.setState({ file: e.target.files });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input
          type="file"
          className="custom-file-input"
          name="myImage"
          onChange={this.onChange}
        />
        {console.log(this.state.file)}
        <button className="upload-button" type="submit">
          Upload to DB
        </button>
      </form>
    );
  }
}

export default Fileuplaod;

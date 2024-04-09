import React from "react";
import axios from "axios";
import {useNavigate,Link} from 'react-router-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Swal from "sweetalert2";

export default function CreateUser() {
  var [name, setName] = useState();
  var [email, setEmai] = useState();
  var [age, setAge] = useState();
  var [language, setLanguage] = useState();
  var [city, setCity] = useState();
  var navigate = useNavigate()

  const data = {
    name,
    email,
    age,
    language,
    city,
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("https://mern-stack-backend-brf4.onrender.com/api/add-user", data)
      .then((result) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "User added successfully"
        });
        navigate("/")
      })
      .catch((err) => {
        alert(err.response.data.message)
        console.log(err.response);
      });
    // console.log("Button clicked")
  };

  return (
    <div className="d-flex bg-dark justify-content-center align-items-center p-4 vh-100 row" id="mainbody">
      <div className="bg-white b-1 rounded p-3 col-auto col-lg-6 row">
        <form className="">
          <h3>Fill in the form below</h3>

          <div className="row">
            <div className="form-group col-auto col-lg-auto mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Enter name"
              />
            </div>
            <div className="form-group col-auto col-lg-auto mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                onChange={(e) => setEmai(e.target.value)}
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            <div className="form-group col-auto col-lg-auto mb-3">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                onChange={(e) => setAge(e.target.value)}
                className="form-control"
                placeholder="Enter age"
              />
            </div>
            <div className="form-group col-auto col-lg-auto mb-3">
              <label htmlFor="language">Language</label>
              <input
                type="text"
                onChange={(e) => setLanguage(e.target.value)}
                className="form-control"
                placeholder="Enter language"
              />
            </div>
            <div className="form-group col-auto col-lg-auto mb-3">
              <label htmlFor="city">City</label>
              <input
                type="text"
                onChange={(e) => setCity(e.target.value)}
                className="form-control" placeholder="Enter city"
              />
            </div>
          </div>
          <input
            onClick={submit}
            type="button"
            value="submit"
            className="btn bg-primary col-auto col-lg-auto m-2"
          ></input>
          <Link to={'/'} className="btn bg-danger col-auto col-lg-auto m-2" >Cancel</Link>
        </form>
      </div>
    </div>
  );
}

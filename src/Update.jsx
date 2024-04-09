import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
export default function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [language, setLanguage] = useState("");
  const [city, setCity] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  const data = {
    name,
    email,
    age,
    language,
    city,
  };

  useEffect(() => {
    return () => {
      axios
        .get("https://mern-stack-backend-brf4.onrender.com/api/get-user/" + id)
        .then((result) => {
          let { name, email, age, city, language } = result.data;
          setName(name);
          setEmail(email);
          setAge(age);
          setCity(city);
          setLanguage(language);
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    let confirm = window.confirm("Please click okay to confirm");
    if (confirm) {
      axios
        .put("https://mern-stack-backend-brf4.onrender.com/api/update-user/" + id, data)
        .then((result) => {
          console.log(result)
          alert("success")
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
            title: "User has been updated successfully"
          });

        })
        .catch((error) => {
          alert(error.response.data.message);
          console.log(error.response);
        })
        .finally(()=>{
          navigate("/")
        })
        history.back()
       
    }
  };

  return (
    <div
      className="d-flex bg-dark justify-content-center align-items-center p-4 vh-100 row"
      id="mainbody"
    >
      <div className="bg-white b-1 rounded p-3 col-lg-7 col-md-8 row">
        <form className="" onSubmit={submit}>
          <h3>Update form</h3>

          <div className="row">
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="text"
                value={email}
                onChange={(e) => alert("email cannot be updated")}
              />
            </div>

            <div className="form-group col-md-6 mb-3">
              <label htmlFor="age">Age</label>
              <input
                className="form-control"
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="language">Language</label>
              <input
                className="form-control"
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="city">City</label>
              <input
                className="form-control"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <input
            className="btn btn-outline-primary m-2"
            type="submit"
            value="Submit"
          ></input>
          <Link to={"/"} className="btn btn-outline-danger">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

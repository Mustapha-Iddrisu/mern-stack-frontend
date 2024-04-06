import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { TiUserAdd } from "react-icons/ti";

import { Link, useNavigate } from "react-router-dom";

export default function AllUsers() {
  var navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState(0);

  useEffect(() => {
    return () => {
      axios
        .get("https://mern-stack-backend-brown.vercel.app/all-users")
        .then((result) => {
          // console.log(result);
          setUsers(result.data.Users);
          setNumberOfUsers(result.data.count);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }, []);

  const deleteUser = (id, name) => {
    // let confirm = window.confirm(
    //   `Are you sure you want to remove user "${name}"`
    // );
    Swal.fire({
      title: "Are you sure?",
      text: `User "${name}" will be deleted`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("https://mern-stack-backend-brown.vercel.app/delete-user/" + id)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: `${name} has been deleted successfully`,
              icon: "success",
            });
            setTimeout(function () {
              location.reload();
            }, 1600);
          });
      }
    });
  };

  
  return (
    <div
      className="d-flex  justify-content-center align-items-center p-4 vh-100 row"
      id="mainbody"
    >
      <div className="bg-white d-flex  rounded col-auto p-3 row">
        <div className="d-flex bg-dark text-white p-2  justify-content-between mb-2">
          <h3>All Users({numberOfUsers})</h3>

          <Link to={"/add-user"} className="btn btn-primary">
            <TiUserAdd />
          </Link>
        </div>

        {numberOfUsers != 0 ? (
          <table className="table table-striped">
            <thead className="thead accordion-header">
              <tr>
                <th>&#8470;</th>
                <th>Name </th>
                <th>Email </th>
                <th>Age </th>
                {/* <th>Language </th>
                <th>city</th> */}

                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <>
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      {/* <td>{user._id}</td> */}
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      {/* <td>{user.language}</td>
                      <td>{user.city}</td> */}
                      <td>
                        <button
                          className="btn btn-outline-danger m-1"
                          onClick={(e) => deleteUser(user._id, user.name)}
                        >
                          <FaTrash />
                        </button>
                      </td>

                      <td>
                        <Link
                          to={`/update-user/${user._id}`}
                          className="btn btn-primary"
                        >
                          <CiEdit />
                        </Link>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="d-flex justify-content-center">
            <h3>No users found</h3>
          </div>
        )}
      </div>
    </div>
  );
}

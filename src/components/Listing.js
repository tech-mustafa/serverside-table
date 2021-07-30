import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import action from "../store/Actions"
import { Header } from "./Header";

const Listing = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action.getUsers());
    dispatch(action.getItems());
  }, [dispatch])
  const users = useSelector(state => state.getUsers.users.users);// || JSON.parse(localStorage.getItem("userCreds"));
  const loading = useSelector(state => state.getUsers.loading);
  // console.log(users);
  const statusLog = JSON.parse(localStorage.getItem("statusLog"));
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  const logInFirst = () => {
    console.log("Please Login first!!!");
    history.push("/");
  };
  
  const editUser = (userInfo) => {
    // console.log("inside edUs func ");
    localStorage.setItem("editUser", JSON.stringify(userInfo));
    history.push("/list/edit");
  };
  
  const list = [];
  if (users) {
  for (let i = 1; i < users.length; i++) {
    list.push(
      <tr key={users[i].id}>
        <td>{users[i].id}</td>
        <td>{users[i].name}</td>
        <td>{users[i].contact}</td>
        <td>{users[i].email}</td>
        <td>
          {loggedUser === users[i].username || loggedUser === "admin" ? (
            <button
              onClick={() => {
                editUser(users[i]);
              }}
              className="ui positive icon button"
            >
              <i aria-hidden="true" className="edit outline icon"></i>
            </button>
          ) : (
            <div/>
          )}
          <button
            onClick={() => {
              dispatch(action.delUser(users[i].id));
              dispatch(action.getUsers());
            }}
            className="ui negative icon button"
          >
            <i aria-hidden="true" className="user delete icon"></i>
          </button>
        </td>
      </tr>
    );
  }
} 
  return (
    <div>
      <Header />
      {statusLog !== true ? (
        <div>{logInFirst()} </div>
      ) : (
        <div style={{ margin: 50, textAlign: "center" }}>
          <h4>Welcome {loggedUser}!</h4>
          <h3>List of Users</h3>
          {(!list || loading) && <div className="ui active inverted dimmer">
          <div className="ui large text loader"/>
        </div>} <br />
          <table
            className="ui celled table"
            style={{ width: 720, marginLeft: "auto", marginRight: "auto" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>{/*errors && <p className="ui red basic label">{errors}</p>*/}
          </table>
          <br />
        </div>
      )}
    </div>
  );
};

export default Listing;

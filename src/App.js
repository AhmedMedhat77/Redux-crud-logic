import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import useFetch from "./Helpers/useFetch";
import {
  addUser,
  user_actions,
  deleteUser,
  editUser,
} from "./Redux/Slices/UserSlice";

const USER_API = {
  url: "https://jsonplaceholder.typicode.com/users",
  headers: {},
};
function App() {
  const [homeState, setHomeState] = useState({
    userInput: "",
    userNameInput: "",
  });

  const handleUserInput = (e) => {
    let { value } = e.target;
    setHomeState({ ...homeState, userInput: value });
  };
  const handleUserNameInput = (e) => {
    let { value } = e.target;
    setHomeState({ ...homeState, userNameInput: value });
  };
  const { data } = useFetch(USER_API);

  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users.list);

  React.useEffect(() => {
    dispatch(user_actions.set({ list: data }));
  }, [data, dispatch]);
  console.log(data);
  return (
    <div className="App">
      <div className="add_user">
        <input
          type="text"
          placeholder="Name.."
          onChange={(e) => {
            handleUserInput(e);
          }}
        />
        <input
          type="text"
          placeholder="User Name"
          onChange={(e) => {
            handleUserNameInput(e);
          }}
        />
        <button
          onClick={() =>
            dispatch(
              addUser({
                id: Math.floor(Math.random() * 1000),
                name: homeState.userInput,
                username: homeState.userNameInput,
              })
            )
          }
        >
          Add User
        </button>
      </div>
      <div className="display_users">
        {usersData?.map((user) => {
          return (
            <div className="user_container" id={user.id} key={user.id}>
              <div className="user_ifno">
                <h5>
                  <span>Name: </span>
                  {user.name}
                </h5>
                <h5>
                  <span>User Name: </span>
                  {user.username}
                </h5>
              </div>
              <div className="user_container__actions">
                <button
                  className="edit"
                  onClick={() => dispatch(editUser(user.id))}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => {
                    dispatch(deleteUser(user.id));
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

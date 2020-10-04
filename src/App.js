import React, { useEffect, useState } from "react";
import "./App.css";
import Todo from "../src/components/Todo";
import AuthTheme from "../src/config/AuthTheme";
import { Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";

function App() {
  const [isLoggedIn, chnageLogin] = useState(false);

  const getCurrentUserstatus = async () => {
    let userStat = await Auth.currentAuthenticatedUser();
    // if(userStat.username){}
    return userStat.username;
    console.log(userStat.username);
  };

  const updateLoginStatus = async () => {};

  useEffect(() => {
    console.log("componentdo munt");
    getCurrentUserstatus();

    return () => {
      // cleanup
    };
  }, []);

  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default withAuthenticator(App, { AuthTheme, includeGreetings: true });

import React from "react";
import "./App.css";
import Todo from "../src/components/Todo";
import { withAuthenticator } from "@aws-amplify/ui-react";

function App() {
  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });

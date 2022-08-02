import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import PizzaForm from "./component/PizzaForm";

const App = () => {
  return (
    <>
      <header>
        <h1>Bloomtech Eats</h1>
      </header>
      <main>
        <Link to = "/">Home</Link>
        <Link to = "/pizza"><button>Pizza?</button></Link>
        
        <Switch>
          <Route exact path = "/pizza">
            <PizzaForm />
          </Route>
        </Switch>
      </main>
    </>
  );
};
export default App;

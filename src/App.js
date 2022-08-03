import React, { useState} from 'react';
import { Link, Route, Switch } from "react-router-dom";
import PizzaForm from "./component/PizzaForm";

const App = () => {

  const [orders, setOrders] = useState([])

  const newOrder = (order) => {
    setOrders([order, ...orders])
  }
console.log(orders)
  return (
    <>
      <header>
        <h1>Bloomtech Eats</h1>
      </header>
      <main>
        <Link to = "/">Home</Link>
        <Link to = "/pizza"><button id = "order-pizza">Pizza?</button></Link>

        <Switch>
          <Route exact path = "/pizza">
            <PizzaForm newOrder = {newOrder}/>
          </Route>
        </Switch>
      </main>
    </>
  );
};
export default App;

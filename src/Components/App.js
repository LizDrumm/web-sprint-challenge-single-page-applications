
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Route, Link, Switch} from 'react-router-dom';
import Pizza from './Pizza';
import {v4 as uuid} from 'uuid';
import * as yup from 'yup';
import formSchema from '../Validation/formSchema';
import Order from './Confirmation'
import Confirmation from "./Confirmation";

//Establish Initial States

const inititalFormValues = {
  name: '',
  size: '',
  toppings: {
    cheese: false,
    pepperoni: false,
    sausage: false,
    olives: false,
  },
  special: '',
}

const initialFormErrors = {
  name: '',
  size: '',
  toppings: '',
  special: '',
}

const initialOrders = []
const initialDisabled = true


export default function App() {
  const [orders, setOrders] = useState(initialOrders)
  const [formValues, setFormValues] = useState(inititalFormValues)
  const [errors, setErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)
 

//Helpers
const createOrder = (order) => {
  axios.post("https://reqres.in/api/order", order)
  .then(res => {
    updateOrders(res.data)
    //updateOrders([...orders, res.data])?????
    //setFormValues(initialFormValues)
  })
  .catch(err => {
    console.log("Error", err)
  })
}


  //Event Handlers- combined validate and inputchange
  const onInputChange =(name, value)=> {
   // evt.persist();
    const { name, value } = evt.target;

    yup
    .reach(formSchema, name)
    .validate(value)
    // if the validation is successful, we can clear the error message
    .then(() => {
      setErrors({...errors,
      [name]:""
      });
    })
  
    .catch(err => {
      setErrors({
        ...errors,
        [name]: err.errors[0]
      });
    });
    
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const onCheckboxChange = evt => {
    const { name, checked } = evt.target
    setFormValues({
      ...formValues,
      toppings: {
        ...formValues.toppings,
        [name]: checked,
      }
    })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    const newOrder = {
      name: formValues.name.trim(),
      size: formValues.size,
      // toppings: formValues.toppings,
      toppings: Object.keys(formValues.toppings)
        .filter(toppingName => (formValues.toppings[toppingName] === true)),
      special: formValues.special.trim(),
    }
    createOrder(newOrder)
  }

 //Side Effect
 useEffect(() => {
     /* We pass the entire state into the entire schema, no need to use reach here. 
    We want to make sure it is all valid before we allow a user to submit
    isValid comes from Yup directly */
  formSchema
  .isValid(formValues)
  .then(valid => {
    setDisabled(!valid)
  })
}, [formValues])

const updateOrders = order => {
  setOrders(orders => [...orders, order]);
}


 

  return (
    <div className="App">
      <nav className='store-header'>
        <h1>Lambda Eats</h1>
        <div className='nav-links'>
          <Link to='/'>Home</Link>
          <Link to='/pizza'>Pizza?</Link>
          <Switch>
            <Route path="/pizza" >
              <Pizza
                values={formValues}
                onInputChange={onInputChange}
                onCheckboxChange={onCheckboxChange}
                onSubmit={onSubmit}
                disabled={disabled}
                errors={errors} 
              />
              </Route>
            {/* <Route path="/">
              <App />
            </Route> */}
          </Switch>
        </div>
      </nav>
      <h1>Order some pizza!</h1>
     


      {orders.map(order => {
          return (
            <Confirmation key={order.name} details={order} />
          )
        }) 
      }

    </div>
  );
};
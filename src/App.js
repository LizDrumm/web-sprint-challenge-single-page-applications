
import React, { useEffect, useState } from "react"
import { Switch, Route, Link } from 'react-router-dom'
import axios from 'axios'
import * as yup from 'yup'
import Form from './Form'
import schema from './Validation/formSchema'


const initialFormValues = {
  name: '',
  size: '',
  pepperoni: false,
  sausage: false,
  olives: false,
  mushrooms: false,
  specialInstructions: '',
}


const initialErrorValues = {
  name: '',
  size: '',
 
}

//App component
export default function App() {
  //Initialize state
  const [pizza, setPizza] = useState([])
  const [post, setPost] = useState()
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialErrorValues)
  const [disabled, setDisabled] = useState(true)

  const updateForm = (name, value) => {
    validateInput(name, value)
    setFormValues({...formValues, [name]: value})
  }

  const validateInput = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        //cleans error state
        setFormErrors({...formErrors, [name]: ''})
      })
      .catch((error) => {
        
        setFormErrors({...formErrors, [name]: error.errors[0]})
      })
  }


  const submitForm = () => {
    const newPizza = {
      name: formValues.name.trim(),
      size: formValues.size.trim(),
      toppings: ['pepperoni', 'sausage', 'mushrooms', 'olives'].filter(top => formValues[top]),
      specialInstructions: formValues.specialInstructions.trim(),
    }
    postPizza(newPizza)
  }

  
  useEffect(() => {
    schema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
      })
      .catch(() => {
        debugger
      })
  }, [formValues])

  const postPizza = (newOrder) => {
    axios.post('https://reqres.in/api/users', newOrder)
      .then(response => {
        setPizza([...pizza, response.data])
        setPost(response.data)
        setFormValues(initialFormValues)
      })
      .catch(error => {
        console.log(error)
      })
      
  }

  //Return App
  return (
    <div>
      <nav>
        <h1>Lambda Eats</h1>
        <Link to='/'>Home</Link> <br/>
        <Link to='/pizza'>Order Your Pizza</Link>
      </nav>

      <Switch>
        <Route path='/pizza'>
          <Form 
            updateForm={updateForm}
            formValues={formValues}
            submitForm={submitForm}
            formErrors={formErrors}
            disabled={disabled}
          />
        </Route>

        <Route exact path='/'>
          <div className='home'>
          <h1>Home</h1>
          {
          post ?
          <div className='order-summary'>
            <h3>Thanks!!!</h3>
            <h3>Your Order:</h3>
        
           {JSON.stringify(post)}
          </div>
          : null
          }
          </div>
        </Route>
      </Switch>
    </div>
  )
}
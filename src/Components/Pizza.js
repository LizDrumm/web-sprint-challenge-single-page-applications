import React from 'react'
import {Link} from 'react-router-dom'
import Confirmation from './Confirmation'



export default function Form(props){
const {
    values,
    onInputChange,
    onCheckboxChange,
    onSubmit,
    disabled,
    errors,
        } = props

        const onSubmit = evt => {
            evt.preventDefault()
            submit()
          }
        
          const onChange = evt => {
            /* 🔥 FIX THIS SO IT ALSO WORKS WITH CHECKBOXES */
            const { name, value, type, checked } = evt.target
            const valueToUse = type === 'checkbox' ? checked : value
            change(name, valueToUse)

return (
    <form onSubmit={onSubmit}>
        <div>
            <h1>Build Your Pizza</h1>
            <div className='errors'>
                {/* render validation errors here */}
                <div>{errors.name}</div>
                <div>{errors.size}</div>
                <div>{errors.toppings}</div>
                <div>{errors.special}</div>
            </div>

            <div className='form-inputs'>
                <h2>Please fill out your order information below</h2>

                <label>Your Name:
                    <input
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={onInputChange}
                    />
                </label>
                {/* //dropdown */}
                <label>Choose a Pizza Size:
                    <select
                        name="size"
                        value={values.size}
                        onChange={onInputChange}         
                    >
                        <option value=''>- Select an option -</option>
                        <option value='Small'>Small</option>
                        <option value='Medium'>Medium</option>
                        <option value='Large'>Large</option>
                        <option value='X-Large'>Extra Large</option>
                    </select>
                </label>
            {/* checkbox */}
                <div className="form-checkboxes">
                    <h3>Select Your Toppings</h3>
                    <label>Extra Cheese
                        <input
                        name="cheese"
                        type="checkbox"
                        checked={values.toppings.cheese}
                        onChange={onCheckboxChange}
                        />
                    </label>
                    <label>Pepperoni
                        <input
                        name="pepperoni"
                        type="checkbox"
                        checked={values.toppings.pepperoni}
                        onChange={onCheckboxChange}
                        />
                    </label>
                    <label>Sausage
                        <input
                        name="sausage"
                        type="checkbox"
                        checked={values.toppings.sausage}
                        onChange={onCheckboxChange}
                        />
                    </label>
                    <label>Olives
                        <input
                        name="olives"
                        type="checkbox"
                        checked={values.toppings.olives}
                        onChange={onCheckboxChange}
                        />
                    </label>
                </div>

                    <label>Special Instructions
                        <textarea
                        name="special"
                        value={values.special}
                        onChange={onInputChange}
                        />
                    </label>
            </div>
            <button type="submit" disabled={disabled}>Add To Order</button>
        </div>
    </form>
)

}

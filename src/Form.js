//Import dependencies
import React from 'react'
import { useHistory } from 'react-router-dom'

//Form component
export default function Form(props) {
    //Deconstruct props
    const { updateForm, formValues, submitForm, formErrors, disabled } = props

    //onChange handler
    const onChange = (event) => {
        const { name, value, type, checked} = event.target
        const valueToUse = type === 'checkbox' ? checked : value
        updateForm(name, valueToUse)
    }

    //History helper called onSubmit
    const history = useHistory()

    //onSubmit handler
    const onSubmit = (event) => {
        event.preventDefault()
        submitForm()
        history.push('/')
    }

    //Return Form
    return (
        <div className='order-form'>
            <h2>Pizza Form</h2>

            <form onSubmit={onSubmit}>

                <div>
                    <label>
                        Name
                    <input
                            type='text'
                            name='name'
                            value={formValues.name}
                            placeholder='Name'
                            onChange={onChange}
                            id='name-input'
                        />
                    </label>
                </div>

                {formErrors.name ? <p id='name-error'>{formErrors.name}</p> : null}
                
                <div>
                    <label>
                        Size
                        <select
                            onChange={onChange}
                            value={formValues.size}
                            name='size'
                        >
                            <option value=''>---Choose a size---</option>
                            <option value='small'>Small</option>
                            <option value='medium'>Medium</option>
                            <option value='large'>Large</option>
                        </select>
                    </label>
                </div>

                {formErrors.size ?<p id='sauce-error'>{formErrors.size}</p> : null}
                
               
                
                <div>
                    Toppings
                    <div className='toppings'>
                        <label>
                            Pepperoni
                            <input
                                type="checkbox"
                                name='pepperoni'
                                checked={formValues.pepperoni}
                                onChange={onChange}
                                id='pepperoni-input'
                            />
                        </label>

                        <label>
                            Sausage
                            <input
                                type="checkbox"
                                name='sausage'
                                checked={formValues.sausage}
                                onChange={onChange}
                                id='sausage-input'
                            />
                        </label>

                        <label>
                            Olives
                            <input
                                type="checkbox"
                                name='olives'
                                checked={formValues.olives}
                                onChange={onChange}
                                id='olives-input'
                            />
                        </label>

                        <label>
                            Mushrooms
                            <input
                                type="checkbox"
                                name='mushrooms'
                                checked={formValues.mushrooms}
                                onChange={onChange}
                                id='mushrooms-input'
                            />
                        </label>
                    </div>
                    
                </div>

                <div>
                    <label>
                        Special Instructions
                        <input
                            type='text'
                            name='specialInstructions'
                            value={formValues.specialInstructions}
                            onChange={onChange}
                            id='special-instructions'
                        />
                    </label>
                </div>

                <button id='submit-button' disabled={disabled}>Place Order</button>
            </form>
        </div>
    )
}

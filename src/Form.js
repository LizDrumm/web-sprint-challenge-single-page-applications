//Import dependencies
import React from 'react'
import { useHistory } from 'react-router-dom'


export default function Form(props) {
   
    const { updateForm, formValues, submitForm, fromErrors, disabled } = props

    
    const onChange = (event) => {
        const { name, value, type, checked} = event.target
        const valueToUse = type === 'checkbox' ? checked : value
        updateForm(name, valueToUse)
    }

  
    const history = useHistory()

   
    const onSubmit = (event) => {
        event.preventDefault()
        submitForm()
        history.push('/')
    }

    //Return Form
    return (
        <div className='order-form'>
            <h2>Order your pizza here</h2>

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
                        <br/>

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
                        <br/>

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
                        <br/>

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
                        <br/>
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


import React from 'react'

export default function Confirmation(props) {
    const {details} = props
    if (!details){
        return <h3>Fetching your order details...</h3>
    }

    return(
        <div>
            <h2>Deliver to: {details.name}</h2>
            <h3>Size: {details.size}</h3>
            <h3>Special Instructions: {details.special}</h3>
            {/* how to space out toppings? */}
            <h3>Toppings: {details.toppings}</h3> 
        </div>
    )
}
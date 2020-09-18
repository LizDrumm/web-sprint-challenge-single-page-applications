//Import dependencies
import * as yup from 'yup'

//Schema object
export default yup.object().shape({
    name: yup
        .string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),
    size: yup
        .string()
        .oneOf(['small', 'medium', 'large'], 'Please select a size'),
    
    pepperoni: yup .boolean(),
    sausage: yup.boolean(),
    olives: yup.boolean(),
    mushrooms: yup.boolean(),
    specialInstructions: yup
        .string()
})


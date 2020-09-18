import * as yup from 'yup'

import * as Yup from "yup";

const formSchema = Yup.object().shape({
name: Yup
.string()
.min(2, "Name must be at least 2 characters long.")
.required("Name is required"),

size: Yup
.string()
.oneOf(['Small', 'Medium', 'Large', 'X-Large'], "Please select a size"),

special: Yup
 .string()


// toppings: Yup
// .boolean()
// .oneOf([true], "Please select at least 1 topping"),

})

export default formSchema;




// pepperoni: yup.boolean(),
//      mushrooms: yup.boolean(),
//      olives: yup.boolean(),
//      extra_cheese: yup.boolean(),
import styles from './Validations.module.css'

const required = (value) => {
    console.log("in required of " + value)
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    // return 'require';
    console.log("in required of " + value)
    let str= value + " is required"
    return str;
  }
};
 
const email = (value) => {
//   if (!validator.isEmail(value)) {
//     return `${value} is not a valid email.`
//   }
};
 
const lt = (value, props) => {
  // get the maxLength from component's props
  if (!value.toString().trim().length > props.maxLength) {
    // Return jsx
    return <span className="error">The value exceeded {props.maxLength} symbols.</span>
  }
};
export { required, email, lt }
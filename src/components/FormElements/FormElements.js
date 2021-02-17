import React from 'react';
import styles from './FormElements.module.css'

const FormElements =(props) => {
    let formElement= null;
    switch(props.elementType){
        case('input'):
            formElement= 
                <div>
                    <input 
                            // onBlur={props.checkValidity} 
                            // onFocusOut (this is not recognized)
                            className={styles.FormElements}  
                            type={props.elementConfig.type} 
                            onChange={props.changed} 
                            placeholder={props.elementConfig.placeholder} 
                            name={props.label} 
                            value={props.value} />

                    {props.touched ? (props.invalid ? <span style={{color: "red"}}>INVALID</span>  : null)  : null};


                    {/* <span style={{color: "red"}} hidden={!(props.invalid && props.touched)}>INVALID</span> */}
                    {console.log("invalid: " + props.invalid)};
                    {console.log("touched: " + props.touched)};
                </div>
            break;
        case('radio'):
            formElement= props.elementConfig.placeholder.map(label => {
                return (
                    <div  key={label}>
                        <input onBlur={props.checkValidity} type="radio" id={label} name="gender" onChange={props.changed} value={label} />
                        <label className={styles.InnerLabel} htmlFor={label}>{label}</label>
                        <br />
                    </div>

                )
            })
            break;
        case('checkbox'):
            formElement= props.elementConfig.placeholder.map(label =>{
                return(
                    <div key={label}>                          
                        <input  
                            onBlur={props.checkValidity}
                            type="checkbox" id={label} 
                            name="subjects" 
                            // checked={props.subjectsHandler}
                            onChange={props.changed} value={label} />
                        <label className={styles.InnerLabel} htmlFor={label}>{label}</label>
                        <br/>
                    </div>
                )
            })
            break;
        case('select'):
            formElement=(
                <select className={styles.FormElements} onBlur={props.checkValidity}  onChange={props.changed} value={props.value}>
                    {props.elementConfig.placeholder.map(option =>(
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;

        default:
            formElement= <input onBlur={props.checkValidity} className={styles.FormElements} type={props.elementConfig.type} onChange={props.changed} placeholder="enter here" value={props.value} />
            break;
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {formElement}
        </div>
    )
}

export default FormElements;
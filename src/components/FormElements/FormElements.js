import React from 'react';
import styles from './FormElements.module.css'

const FormElements =(props) => {
    let formElement= null;
    switch(props.elementType){
        case('input'):
            formElement= 
                <div>
                    <input  
                            className={styles.FormElements}  
                            type={props.elementConfig.type} 
                            onChange={props.changed} 
                            placeholder={props.elementConfig.placeholder} 
                            name={props.label} 
                            value={props.value} />
                    <span style={{color: "red"}}>{props.span}</span>
                </div>
            break;
        case('radio'):
            formElement= props.elementConfig.placeholder.map(label => {
                return (
                    <div  key={label}>
                        <input type="radio" id={label} name="gender" onChange={props.changed} value={label} />
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
                            type="checkbox" id={label} 
                            name="subjects" 
                            onChange={props.changed} value={label} />
                        <label className={styles.InnerLabel} htmlFor={label}>{label}</label>
                        <br/>
                    </div>
                )
            })
            break;
        case('select'):
            formElement=(
                <select className={styles.FormElements}  onChange={props.changed} value={props.value}>
                    {props.elementConfig.placeholder.map(option =>(
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;

        default:
            formElement= <input className={styles.FormElements} type={props.elementConfig.type} onChange={props.changed} placeholder="enter here" value={props.value} />
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
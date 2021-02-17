import React from 'react'
import styles from './Input.module.css'

const Input =(props) => {
        let styleClass= [];
        styleClass.push(styles.Input);
        styleClass.push(props.inputClass)
        return (
            <div>
                <label className={styles.Label} htmlFor={props.name}>{props.label}</label>
                <input className={styleClass.join(" ")}
                    onBlur={props.changed}
                    type={props.type} 
                    onChange={props.changed} 
                    placeholder={props.placeholder} 
                    name={props.name} 
                    id={props.name}
                    value={props.value}
                    style={props.error && {border: 'solid 1px red'}} />
                    <br />
                <span style={{color:"red", fontSize:"16px"}}>{props.error}</span>
            </div>
        )
    }

    export default Input
import React from 'react'
import styles from './Button.module.css'

const Button =(props) => {
    
        let styleClass= [];
        styleClass.push(styles.Button);
        styleClass.push(props.btnClass)
        return (
            <button type={props.type} className={styleClass.join(" ")} disabled={props.disabled} onClick={props.clicked}>{props.name}</button> 
        )
    }

    export default Button
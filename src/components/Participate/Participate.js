import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import styles from './Participate.module.css'


const Participate = (props) =>{
    return (
        <div className={styles.Participate}>
            <h1>
                General Knowledge Quiz
            </h1>
            <h2>
                Wanna Participate??<br />
            </h2>
            <NavLink to="/participation-form">
                <button className={styles.Button}>Participate</button>
            </NavLink>
            
        </div>
    );
}

export default Participate;
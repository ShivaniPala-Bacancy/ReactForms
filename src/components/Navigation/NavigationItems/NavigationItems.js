import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'
import styles from './NavigationItems.module.css'
import {Link} from 'react-router-dom';
const navigationItems =(props) =>(
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/"  >Home</NavigationItem>
        <NavigationItem link="/participation-form"  >Participate</NavigationItem>
        <NavigationItem link="/contestants"  >Contestants</NavigationItem>
        
        
    </ul>
);
export default navigationItems;
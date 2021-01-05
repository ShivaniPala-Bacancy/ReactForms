import React, { Component } from 'react';
import FormElements from '../../components/FormElements/FormElements'
import axios from 'axios';
import Spinner from '../../UI/spinner/spinner'
import styles from './ParticipationForm.module.css'
import {required, email, lt } from '../../Validations/Validations'
class ParticipationForm extends Component{
    state={
        loading: false,
        formElements: {
            Name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true,
                }, valid: false,
                touched: false
            },
            Email: {
                
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required: true,
                    email: true
                }, valid: false,
                touched: false
            },
            ContactNo: {
                
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Contact Number'
                },
                value: '',
                validation:{
                    required: true,
                    number: true,
                    length: 10
                }, valid: false,
                touched: false
            },
            Gender:{
                
                elementType: 'radio',
                elementConfig: {
                    type: 'radio',
                    placeholder: ["Male", "Female", "Transgender"]
                },
                value: '',
                validation:{
                    required: true,
                }, valid: false,
                touched: false
            },
            Subjects: {
                
                elementType: 'checkbox',
                elementConfig: {
                    type: 'checkbox',
                    placeholder: ["Maths", "Science", "English", "Social", "Gujarati"],
                },
                value: '',
                validation:{
                    required: true,
                }, valid: false,
                touched: false
            },
            CollegeName: {
                
                elementType: 'select',
                elementConfig: {
                    placeholder: [
                        {value: 'gecg', displayValue: 'GEC, Gandhinagar'},
                        {value: 'vgec', displayValue: 'Vishvakarma College'},
                        {value: 'ld', displayValue: 'L.D. College'},
                        {value: 'ldrp', displayValue: 'LDRP College'},
                        {value: 'indus', displayValue: 'Indus College'},
                    ]
                },
                value: 'gecg',
                validation:{
                    required: true,
                }, valid: false,
                touched: false
            }

        }
    }
    selectedSubjects= [];
    submitFormHandler =(event) =>{
        event.preventDefault();
        console.log(this.selectedSubjects);
        const formData={}
        for(let formElementIdentifier in this.state.formElements){
            formData[formElementIdentifier] = this.state.formElements[formElementIdentifier].value;
        };
        formData["subjects"] = this.selectedSubjects;
        this.setState({loading: true})
        axios.post('https://react-forms-practice-default-rtdb.firebaseio.com/personalFormDetails.json', formData)
        .then(response => {
            console.log(response);
            this.setState({loading: false})
            this.props.history.push('/contestants');
        }
        )
        .catch(error => {
            console.log(error);
        })
        console.log(formData);
        
    }
    checkValidity(value, rules){
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let phoneno = /^\d{10}$/;
        let isValid = true;
        if(rules){
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.length){
            isValid= value.length === rules.length && isValid;       
        }
        if(rules.email){
            isValid= value.match(mailformat) && isValid;        
        }
        if(rules.number){
            isValid = !isNaN(value) && isValid;
        }
    }
        return isValid;
    }
    inputChangedHandler =(event, id) => {
        if(id === "subjects"){
            this.selectedSubjects.push(event.target.value);
        }
        const updatedFormElements ={
            ...this.state.formElements
        }
        const updatedFormElement ={
            ...updatedFormElements[id]
        }
        
        console.log(event.target.value)
        updatedFormElement.value= event.target.value;
        updatedFormElement.touched= true
        updatedFormElement.valid= this.checkValidity(updatedFormElement.value, updatedFormElement.validation);    
        console.log(updatedFormElement.valid);   
        updatedFormElements[id] = updatedFormElement;
        this.setState({formElements: updatedFormElements});
    }
    render(){
        let formElementsArray =[];
        for(let key in this.state.formElements){
            formElementsArray.push({
                id: key,
                details: this.state.formElements[key]
            });
        }
        let form= formElementsArray.map(formElement => {
            return (
                <FormElements 
                    label={formElement.id}
                    validations={formElement.validations}
                    key={formElement.id}
                    elementType={formElement.details.elementType} 
                    elementConfig={formElement.details.elementConfig} 
                    value={formElement.details.value} 
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            )
        })
        if(this.state.loading){
            form= <Spinner />
        }

        return(
            <div className={styles.FormHeading}>
                <h1 className={styles.Header}>FORM</h1>
                <form className={styles.Form} onSubmit={this.submitFormHandler}>
                    {form}
                    <button type="submit" className={styles.Button}>SUBMIT</button>
                </form>
                
            </div>
        );
    }
}

export default ParticipationForm;
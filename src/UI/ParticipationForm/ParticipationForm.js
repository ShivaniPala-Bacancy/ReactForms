import React, { Component } from 'react';
import FormElements from '../../components/FormElements/FormElements'
import axios from 'axios';
import Spinner from '../spinner/spinner'
import styles from './ParticipationForm.module.css'
class ParticipationForm extends Component{
    state={
        loading: false,
        formIsValid: false,
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
                }, valid: true,
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
                }, valid: true,
                touched: false
            }

        }
    }
    selectedSubjects= [];
    submitFormHandler =(event) =>{
        event.preventDefault();
        console.log(this.selectedSubjects);
        const formData={}
        let formIsValidTemp= true;
        for(let formElementIdentifier in this.state.formElements){
            formData[formElementIdentifier] = this.state.formElements[formElementIdentifier].value;
            formIsValidTemp= formIsValidTemp && this.state.formElements[formElementIdentifier].valid;
            console.log("temp is : " + formIsValidTemp)
            console.log(this.state.formElements[formElementIdentifier].valid)
        };
        console.log(formIsValidTemp + " finally")
        let selectedSubjects= [];
        for(let i in this.selectedSubjects){
            let l=(this.selectedSubjects.filter(x => x === this.selectedSubjects[i]).length);
            console.log("is is: " + i + " l is: " + l);
            if((l %2 !== 0) && (!selectedSubjects.includes(this.selectedSubjects[i]))) {
                selectedSubjects.push(this.selectedSubjects[i]);
            }       
        }
        console.log(selectedSubjects);
        // if(formIsValidTemp === true){
        //     console.log("in true")
        //     this.setState({formIsValid: true});
        // }
        // else{
        //     this.setState({formIsValid: false});
        // }
        console.log(this.state.formIsValid)
        formData["Subjects"] = selectedSubjects;
        console.log(formData)
        if(!this.state.formIsValid){
            alert(this.state.formIsValid);
            return;
        }
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
        
        let isValid = true;
        if(rules){
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.length){
            isValid= value.length === rules.length && isValid; 
            console.log("lenght : " + isValid)      
        }
        if(rules.number){
            isValid = !isNaN(value) && isValid;
            console.log("number : " + isValid)
        }
    }
        return isValid;
    }
  

    inputChangedHandler =(event, id) => {
        if(id === "Subjects"){
            console.log(event.checked)
            this.selectedSubjects.push(event.target.value);
            console.log(this.selectedSubjects);
            console.log(event.target.value)
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
        // console.log(updatedFormElement.valid);   
        updatedFormElements[id] = updatedFormElement;
        let formIsValid= true;
        for(let id in updatedFormElements){
            formIsValid = formIsValid && updatedFormElements[id].valid;
        }
        
        this.setState({formElements: updatedFormElements, formIsValid: formIsValid});
    }
    subjectsHandler= (event, id) => {
        // if(id ==="Subjects"){
        //     console.log(event.checked)
        // }
        return ;
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
                    // checkValidity={(event) => this.checkValidity(event, formElement.id, formElement.details.value, formElement.details.validation)}
                    key={formElement.id}
                    touched={formElement.details.touched}
                    invalid={!formElement.details.valid}
                    elementType={formElement.details.elementType} 
                    elementConfig={formElement.details.elementConfig} 
                    value={formElement.details.value} 
                    subjectsHandler={(event) => this.subjectsHandler(event, formElement.id)}
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
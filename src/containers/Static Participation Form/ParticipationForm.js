import React, { Component } from 'react';
import FormElements from '../../components/FormElements/FormElements'
import axios from 'axios';
import Spinner from '../../UI/spinner/spinner'
import styles from './ParticipationForm.module.css'
import Input from "../../UI/Common Components/Input/Input"
import Button from '../../UI/Common Components/Button/Button'
import Select from 'react-select';
import Dropzone from 'react-dropzone';

const SUBJECTS =[
    {value: 'maths', label: 'Maths'},
    {value: 'science', label: 'Science'},
    {value: 'english', label: 'English'},
    {value: 'social', label: 'Social'},
    {value: 'gk', label: 'G.K'},
]

class ParticipationForm extends Component{
    state= {
          
        files: [],
        loading: false,
        formIsValid: false,
        formElements: {
            name: "",
            email: "",
            contactNo: "",
            gender: "",
            subjects: "",
            collegeName: "",
            selectedSubject: '',
        }, 
        errors: {},
    }
    
    onDrop = (files) => {
        this.setState({files})
      };
    selectChangeHandler = (value) => {
        console.log(value)
        const { errors} = this.state;
        const { formElements } = this.state;
        if(!value){
            errors.subjects = "Please Select a Subject"
        }
        formElements['selectedSubject'] = value;
        this.setState({formElements})
    }
    inputChangedHandler = (event, id) => {
        
        let emailRegex = /\S+@\S+\.\S+/;
        const { formElements } = this.state;
        const { errors} = this.state;
        formElements[event.target.name] = event.target.value;
        this.setState({ formElements });
        
        if(id == 'name'){   
            if(!this.state.formElements.name){
                errors.name = "Name Required"    
            }
            else{                            
                errors.name = null;
            }
            this.setState({errors: errors})
        }
        if(id == 'email'){ 
            if(!this.state.formElements.email){
                errors.email = "Email Required"    
            }
            else if(this.state.formElements.email && !emailRegex.test(this.state.formElements.email)){
                        errors.email = "Invalid Email Format"
                    }
            else{                            
                errors.email = null;
            }
            this.setState({errors: errors})
        }
        if(id == 'contactNo'){
            if(!this.state.formElements.contactNo){
                errors.contactNo = "Number Required"
            }
            else if(this.state.formElements.contactNo && this.state.formElements.contactNo.length !== 10){
                        errors.contactNo= "Invalid Number Format"        
                    }
                
            else{
                errors.contactNo= null;
            }
            this.setState({errors: errors})
        }
        let errorValues= Object.values(this.state.errors);
        let formIsValid;
        for(let e in errorValues){
            if(errorValues[e] !== null){
                formIsValid= false;
                break;
            }
            formIsValid= true;
        }
        this.setState({formIsValid: formIsValid});
      };
      submitFormHandler =(event) =>{
        event.preventDefault();
            
        // })
        // console.log(this.selectedSubjects);
        // const formData={}
        // let formIsValidTemp= true;
        // for(let formElementIdentifier in this.state.formElements){
        //     formData[formElementIdentifier] = this.state.formElements[formElementIdentifier].value;
        //     formIsValidTemp= formIsValidTemp && this.state.formElements[formElementIdentifier].valid;
        //     console.log("temp is : " + formIsValidTemp)
        //     console.log(this.state.formElements[formElementIdentifier].valid)
        // };
        // console.log(formIsValidTemp + " finally")
        // let selectedSubjects= [];
        // for(let i in this.selectedSubjects){
        //     let l=(this.selectedSubjects.filter(x => x === this.selectedSubjects[i]).length);
        //     console.log("is is: " + i + " l is: " + l);
        //     if((l %2 !== 0) && (!selectedSubjects.includes(this.selectedSubjects[i]))) {
        //         selectedSubjects.push(this.selectedSubjects[i]);
        //     }       
        // }
        // console.log(selectedSubjects);
        // // if(formIsValidTemp === true){
        // //     console.log("in true")
        // //     this.setState({formIsValid: true});
        // // }
        // // else{
        // //     this.setState({formIsValid: false});
        // // }
        // console.log(this.state.formIsValid)
        // formData["Subjects"] = selectedSubjects;
        // console.log(formData)
        // if(!this.state.formIsValid){
        //     alert(this.state.formIsValid);
        //     return;
        // }
        // this.setState({loading: true})
        // axios.post('https://react-forms-practice-default-rtdb.firebaseio.com/personalFormDetails.json', formData)
        // .then(response => {
        //     console.log(response);
        //     this.setState({loading: false})
        //     this.props.history.push('/contestants');
        // }
        // )
        // .catch(error => {
        //     console.log(error);
        // })
        // console.log(formData);
        
    }

    render(){
        const files = this.state.files.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
          ));
        const {
            formIsValid,
            errors,
            formElements: { name, email, contactNo, gender, collegeName, selectedSubject }
          } = this.state;
            
        return(
            <form onSubmit={this.submitFormHandler}>
                <Input 
                    label="Name"
                    name="name"
                    type="text"
                    value={name}
                    changed={(event) => this.inputChangedHandler(event, "name")}
                    placeholder="Enter your name here..."
                    error={errors.name}
                    />
                <Input 
                    label="Email"
                    name="email"
                    type="text"
                    value={email}
                    changed={(event) => this.inputChangedHandler(event, "email")}
                    placeholder="Enter your email here..."
                    error={errors.email}
                    />
                <Input 
                    label="Contact Number"
                    name="contactNo"
                    type="text"
                    value={contactNo}
                    changed={(event) => this.inputChangedHandler(event, "contactNo")}
                    placeholder="Enter your number here..."
                    error={errors.contactNo}
                    />
                <label htmlFor="subjects" className={styles.Label}>Subjects</label>
                <Select 
                    name="subjects"
                    value={selectedSubject} 
                    onChange={this.selectChangeHandler} 
                    options={SUBJECTS}
                    className={styles.Select}
                    placeholder="---SELECT SUBJECTS---" isMulti isSearchable={false} />
                <span style={{color:"red", fontSize:"16px"}}>{this.state.errors.subjects}</span>

                <Dropzone onDrop={this.onDrop} 
                accept='image/jpeg, image/png'
                multiple
                >
                    {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
        
                    <section className="container">
                        <div {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} />
                        {!isDragActive && 'Click here or drop a file to upload!'}
                        {isDragActive && !isDragReject && "Drop it like it's hot!"}
                        {isDragReject && "File type not accepted, sorry!"}
                        
                        {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
                        </div>
                        <aside>
                        <h4>Files</h4>
                        <ul>{files}</ul>
                        </aside>
                    </section>
                    )}
                </Dropzone>
                    <Button type="submit" name="Submit" disabled={!formIsValid} clicked={this.submitFormHandler} />
            </form>
        )
    }
}
export default ParticipationForm;
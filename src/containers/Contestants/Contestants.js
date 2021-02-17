import React, {Component} from 'react';
import axios from 'axios';
import Spinner from '../../UI/spinner/spinner'
import styles from './Contestants.module.css'

class Contestants extends Component{
    state= {
        dataObject: {},
        loading: true,
    }
    
    componentDidMount(){
        this.getContestants();
    }
    getContestants() {
        axios.get('https://react-forms-practice-default-rtdb.firebaseio.com/personalFormDetails.json')
        .then(response => {
            console.log(response.data)
            this.setState({dataObject : response.data, loading: false}) 
        }
        )
        .catch(error =>{
            console.log(error)
        })
    }
    deleteContestant= (id) => {
        let deleteConfirmation = window.confirm("Are you sure u want to delete?");
        if(deleteConfirmation){
            
        axios.delete('https://react-forms-practice-default-rtdb.firebaseio.com/personalFormDetails/' + id + ".json")
        .then(response =>{
            console.log(response)
            this.getContestants();
        })
        .catch(error => {
            console.log(error)
        })
        }
        else{
            return;
        }
    }
    editContestant =(id) => {
        console.log("edit")
        let obj ={
            CollegeName: "ldrp",
            ContactNo: "5555555555",
            Email: "harshal@gmail.com",
            Gender: "Female",
            Name: "edited",
            Subjects: ["Science"]
        }
        axios.put('https://react-forms-practice-default-rtdb.firebaseio.com/personalFormDetails/' + id + ".json", obj)
        .then(response =>{
            console.log(response)
            this.getContestants();
        })
        .catch(error => {
            console.log(error)
        })
    }
    render(){
        let dataArray= [];
        for(let key in this.state.dataObject){
            console.log(key);
            dataArray.push({
                id: key,
                name: this.state.dataObject[key].Name,
                email: this.state.dataObject[key].Email,
                collegeName: this.state.dataObject[key].CollegeName
            })
        }
        console.log(dataArray);
        let dataList = <Spinner />;
        if(this.state.loading === false){
            let dataListElements = dataArray.map((row, index) => (
                <tr key={index}>
                    <td className={styles.Td}>{row.name}</td>
                    <td className={styles.Td}>{row.email}</td>
                    <td className={styles.Td}>{row.collegeName}</td>
                    <td className={styles.Td}><button className={styles.Button} onClick={() => this.deleteContestant(row.id)}>Delete</button></td>
                    <td className={styles.Td}><button className={styles.Button} onClick={() => this.editContestant(row.id)}>Edit</button></td>
                </tr>
            ))
            dataList = 
            <table className={styles.Table}>
                <thead className={styles.Thead}>
                    <tr>
                        <td className={styles.Td}>NAME</td>
                        <td className={styles.Td}>EMAIL</td>
                        <td className={styles.Td}>COLLEGE NAME</td>
                        <td className={styles.Td}>Delete</td>
                    </tr>
                </thead>
                <tbody className={styles.Tr}>
                    {dataListElements}
                </tbody>
                    
            </table>
        
        }

        return (
            <div className={styles.TableUsers}>
                <div className={styles.Header}>Contestants</div>
                {dataList}
            </div>
        );
    }
}

export default Contestants;
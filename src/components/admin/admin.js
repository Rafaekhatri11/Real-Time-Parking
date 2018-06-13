import React,{Component} from 'react';
import * as firebase from 'firebase';
import Adminavbar from './navbar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import './style.css';
const style = {
    height: 400,
    width: 500,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    marginLeft: '34%',
    paddingTop: 60,
    marginTop: 40,
    backgroundColor:'#03062b'
  };
 
 
export default class Admin extends  Component{
    constructor(){
        super();
        this.state={
            area: '',
            slot: '',
            place: '',
            value:''
        }
    }
    logout(){
        firebase.auth().signOut();
        this.props.history.push('/');
    }

    addslots(evt){
            evt.preventDefault();
            let area = this.state.area;
            let slot = this.state.slot;
            let place= this.state.place;
            let loopTheSlot = parseInt(slot);
            console.log(loopTheSlot);
            let mykey=   firebase.database().ref(`/Parking Table/`).push();
           mykey.set({Area: area ,Place : place})
               
          
            
         
         for(var i=0 ; i<loopTheSlot ;i++){
        
            mykey.child(`/slots/${i}/`).set({flag : 'true',color :'green'});
                
           }
           

            this.setState({
                area: '',
                slot : '',
                place: '',
                value:''
            })
            alert('Successfuly slots added');
    }
    render(){
        return(
            <div>
                <Adminavbar  logOut={()=> this.logout()} />
                <Paper style={style} zDepth={2} >
                <form onSubmit={(evt)=> this.addslots(evt)}>
                <TextField  inputStyle={{color:'white'}}
                hintText="Area Name"
                floatingLabelText="Area Name"
                maxLength="10"
                value={this.state.area}
                onChange={(evt) => this.setState({area: evt.target.value})}
                        /> <br/>
                         <TextField inputStyle={{color:'white'}}
                hintText="Place"
                value={this.state.place}
                floatingLabelText="Place"
                maxLength="10"
                onChange={(evt) => this.setState({place: evt.target.value})}
                        /> <br/>
                         <TextField inputStyle={{color:'white'}}
                value={this.state.slot}
                hintText="Slot"
                floatingLabelText="Slot"
                type="number"
                maxLength="2"
                onChange={(evt) => this.setState({slot: evt.target.value})}
                        /><br />
                        <RaisedButton  primary={true} label="Add" type="submit" />
                </form>
                </Paper>
            </div>
        );
    }
}
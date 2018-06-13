import React, {Component} from 'react';
import Navbar from './navbar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Loader from './loader';
import * as firebase from 'firebase';
import TiUserOutline from 'react-icons/lib/fa/user-plus';

const style = {
    height: 620,
    width: 500,
    margin: 20,
    textAlign: 'center',
    background: '#03062b' ,
    marginLeft: '32%',
    marginRight: '30%',
    paddingTop:'5%',
    opacity: 0.9
  };

  const buttonstyle={
      margin: 12
  }
  const text={
    color : 'white'
}
export default class Signup extends Component{
    constructor(){
        super();
        this.state={
            flag : false,
            username: '',
            password: ''
        }
    }

    Signup(evt){
        evt.preventDefault();
        this.setState({flag: true});
        if(this.state.username ==="" || this.state.password ===""){
            alert('Please Enter remaining fields');
            
    }
    else{
        this.setState({loader: true})
       
        let email = this.state.username;
        let pass = this.state.password;
        let fireAuth = firebase.auth();
        let fireDatabase = firebase.database().ref('Users');
        
        fireAuth.createUserWithEmailAndPassword(email,pass)
        .then(()=>{
            fireDatabase.child(fireAuth.currentUser.uid).set({
                username : email,
                password : pass,
               
            })
    

             firebase.database().ref('Users').on('value', snap =>{
                 let data = snap.val();
                 for(var key in data){
                    if(key === fireAuth.currentUser.uid){
                        if(data[key].username === fireAuth.currentUser.email){
                             this.props.history.push('/viewarea');
                             break;
                         }
                      }
                 }
              })
         })
        .catch((error) =>{
            this.setState({flag: false})
            alert(error);
        })        
       }
   }

    render(){
        return(
            <div id="background">
                <Navbar />
                   
                    <form onSubmit={(evt) => this.Signup(evt)}>
                    <Paper style={style} zDepth={5} >
                    <TiUserOutline  style={{height:150,width:150 ,color:'white'}} /> <br/>
                    <TextField inputStyle={text}
                        onChange={(para) => this.setState({username : para.target.value})
                   }
                         hintText="Username"
                        floatingLabelText="Username"
                       value={this.state.username}
                        /><br />
                      <TextField inputStyle={text}
                      onChange={(para) => this.setState({password : para.target.value})}
                    hintText="Password Field"
                    floatingLabelText="Password"
                    value={this.state.password}
                    type="password" /> <br/>
                     {
                        this.state.flag === false ? 
                    
                     <RaisedButton label="Sign Up" primary={true} style={buttonstyle} type="submit"/> :

                        <Loader />
                     
                    }
                    
                    </Paper>
                    </form>
            </div>
        );
    }
}
import React, {Component} from 'react';
import Navbar from './navbar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Loader from './loader';
import * as firebase from 'firebase';
import TiUserOutline from 'react-icons/lib/fa/user';
import './style.css';

const style = {
    height: 620,
    width: 500,
    margin: 20,
    textAlign: 'center',
    background: '#03062b' ,
    marginLeft: '32%',
    marginRight: '30%',
    paddingTop: '5%',
    opacity: 0.9
  };

  const buttonstyle={
      margin: 12
  }

  const text={
      color : 'white'
  }
export default class Login extends Component{
    constructor(){
        super();
        this.state={
            flag : false,
            username: '',
            password:''
        }
    }

    login(evt){
        evt.preventDefault();
        this.setState({flag: true});
        let email = this.state.username;
        let pass = this.state.password;
        let fireAuth= firebase.auth();
        fireAuth.signInWithEmailAndPassword(email,pass)
        .then((user) => {
           
            let uid = user.uid
            if(email==='admin@gmail.com' && pass === '123456'){
                this.props.history.push('/admin');
            }
            else if(user){
                firebase.database().ref('Users').child(uid).once('value')
                .then((data) =>{
                   // console.log(data.val().type);
                  if(data.val() !== null){
                     
                    if(data.val().username === fireAuth.currentUser.email){
                        this.props.history.push('/viewarea');
                    }
                }
                else{
                    user.delete();
                    alert('user is deleted by admin');
                    this.setState({flag: false})
                }
                    
                })
              
             
            }

            
        })
        .catch((error ) =>{
                this.setState({flag: false})
                alert(error)
            })
       
        
    }
    render(){
        return(
            <div  id="background" >
                <Navbar />
                   <div>
                    <form onSubmit={(evt)=> this.login(evt)}>
                    <Paper style={style} zDepth={5} >
                    <TiUserOutline style={{height:150,width:150,color:'white'}} /><br/>
                    <TextField inputStyle={text}
                        hintText="Username"
                        floatingLabelText="Username"
                        onChange={(para) => this.setState({username : para.target.value})}
                        /><br />
                      <TextField inputStyle={text}
                    hintText="Password Field"
                    floatingLabelText="Password"
                    onChange={(para) => this.setState({password: para.target.value})}
                    type="password" /> <br/>
                    {
                        this.state.flag === false ? 
                    
                     <RaisedButton label="Log In" primary={true} style={buttonstyle} type="submit"/> :

                        <Loader />
                     
                    }
                    </Paper>
                    </form>
                    </div>
            </div>
        );
    }
}
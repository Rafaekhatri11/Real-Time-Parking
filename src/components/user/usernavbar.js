import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import { lightBlue400 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';

const mystyle={
    buttonstyle:{
       fontWeight: 'bold',
       color: lightBlue400,
       //background: brown500
    },
}
   

export default class Navbar extends Component{
    logout(){
        firebase.auth().signOut();
        this.props.history.push("/")
    }
    render(){
        return(
            <div>
             <AppBar zDepth={2}  showMenuIconButton={false}
                style={{background:'#03062b' ,borderBottom: '3px solid lightblue'}}   iconElementRight={ 
                    <div style={{ paddingTop: 7}}>
                 <Link to="/viewarea" >
                <FlatButton label="Areas"   className="flat"  labelStyle={mystyle.buttonstyle} />
                </Link>
                <Link to="/viewbooked">
                <FlatButton label="Booked"   className="flat"  labelStyle={mystyle.buttonstyle} />
                </Link>
                <Link to="/userfeedback">
                <FlatButton label="Feeback" labelStyle={mystyle.buttonstyle} />
                </Link> 
                <Link to="/" >
                
                <FlatButton label="Log Out"  className="flat" onClick={this.props.logout}  labelStyle={mystyle.buttonstyle} />
                </Link>

                </div>
                 }/>

            </div>
        );
    }
}
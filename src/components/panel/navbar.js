import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import { lightBlue400, grey200 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';
import './style.css';

const mystyle={
    buttonstyle:{
       fontWeight: 'bold',
       color: lightBlue400,
       //background: brown500
    },

   
   
}
export default class Navbar extends Component{
    render(){
        return(
            <div>
             <AppBar zDepth={2}  showMenuIconButton={false}
                style={{background:'#03062b',borderBottom: '2px solid #3bddc5'}}   iconElementRight={ 
                    <div style={{ paddingTop: 7}}>
                 <Link to="/" >
                <FlatButton label="Log In"  className="flat"  labelStyle={mystyle.buttonstyle} />
                </Link>
                <Link to="/signup">
                <FlatButton label="Sign Up"   className="flat" onClick={this.props.postjob} labelStyle={mystyle.buttonstyle} />
                </Link>
                </div>
                 }/>

            </div>
        );
    }
}
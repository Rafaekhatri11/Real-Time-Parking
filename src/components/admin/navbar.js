import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import { lightBlue400, grey200 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';
const mystyle={
    buttonstyle:{
       fontWeight: 'bold',
       color: lightBlue400,
       //background: brown500
    }
}
    export default class Adminavbar extends Component{
      
        render(){
            return(
                <div>
                 <AppBar zDepth={2}  showMenuIconButton={false}
                    style={{background:'#03062b',borderBottom: '2px solid #3bddc5'}}   iconElementRight={ 
                        <div style={{ paddingTop: 7}}>
                     <Link to="/admin" >
                    <FlatButton label="Add Parking Areas"  className="flat"  labelStyle={mystyle.buttonstyle} />
                     </Link>
                    <Link to="/userdetails">
                    <FlatButton label="Users"   className="flat"  labelStyle={mystyle.buttonstyle} />
                    </Link>
                    <Link to="/bookings" >
                    <FlatButton label="Bookings"   className="flat"  labelStyle={mystyle.buttonstyle} />
                    </Link>
                    <Link to="/feedback">
                    <FlatButton label="Feedback"   className="flat" labelStyle={mystyle.buttonstyle} />
                    </Link>
                    
                    <FlatButton label="Log Out" onClick={this.props.logOut}  className="flat" labelStyle={mystyle.buttonstyle} />
                   

                    </div>
                     }/>
    
                </div>
            );
        }
    }
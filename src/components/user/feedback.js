import React , {Component} from 'react';
import Navbar from './usernavbar';
import * as firebase from 'firebase';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
const style = {
    height: 420,
    width:'50%',
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    marginLeft  : '25%',
    background: 'white'
  };



export default class Userfeedback extends Component{
    constructor(){
        super();
        this.state={
            msgText : '',
            showMessage : []
        }
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
             console.log(user.uid);
             firebase.database().ref(`/feedback/${user.uid}/`).on('value' ,snap => {
                let data = snap.val();
                let array = [];
                for (var key in data){
                        let newdata = data[key].sendmessage;
                        let newemail = data[key].user
                        array.push({key , newdata , newemail})
                }
                this.setState({showMessage: array});
                console.log(this.state.showMessage);
            })
            }
          });
       
       
    }
    logout(){
        firebase.auth().signOut();
        this.props.history.push('/');
    }

    sendFeedback(evt){
        evt.preventDefault();
        let fireAuth = firebase.auth().currentUser.uid;
        let firename = firebase.auth().currentUser.email;
        firebase.database().ref(`/feedback/${fireAuth}/`).push().set({user : firename ,sendmessage : this.state.msgText});
        this.setState({msgText : ''});
    }
    render(){
        return(
            <div>
                <Navbar logout={()=> this.logout()} />
         
                <form onSubmit={(evt) => this.sendFeedback(evt)}>
                    
                    <Paper zDepth={1} style={style}>
                        <div style={{height:375,overflow: 'scroll', width:'100%'}}>
                                {
                                    this.state.showMessage.map((text, index) => {
                                        return(
                                            <div key={index} >
                                                <div >
                                                <div style={{display: 'inline-flex' ,float:'left',width:'90%',paddingLeft:10}}>
                                                    <h4 style={{color:'lightblue'}}>
                                                {text.newemail}
                                                     </h4>
                                                     <p style={{paddingLeft: 10,paddingTop:5}}>
                                                 {" : "  +text.newdata}
                                                    </p>
                                                 </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                        </div>
                        <TextField style={{width: 720}}
                        value={this.state.msgText}
                        onChange={(evt) => this.setState({msgText: evt.target.value})}
                        hintText="Write feedbak here"
                       
                          />
                        <RaisedButton label="Send" type="submit" primary={true} fullWidth={true} />
                    </Paper>

                </form>
            </div>
        );
    }
}
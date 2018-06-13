
import React, {Component} from 'react';
import Adminavbar from './navbar';
import * as firebase from 'firebase';
import { TextField, RaisedButton } from 'material-ui';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
const theme ={
    root: {
      width: '100%',
      marginTop:  3,
      overflowX: 'auto',
      background: 'white'
    },
    table: {
      minWidth: 700,
    },
  };
  
  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }
export default class Feedbacks extends Component{
    constructor(){
        super();
        this.state ={
            userId: [] ,
            adminmessage :'',
            flag: false,
            usermessage:[] ,
            particularUser : '',
            open: false,
        }
    }
    componentDidMount(){
        firebase.database().ref(`/Users/`).on('value' , snap =>{
            let user = snap.val();
            let userkey = []
            for(var key in user){
                let alluser= user[key].username; 
                userkey.push({key, alluser });
                this.setState({userId: userkey});
            }
         //   console.log(this.state.userId);
        });

      

       
        firebase.database().ref(`/feedback/`).on('value', snap => {
            let data = snap.val();
            for(var key in data){
               // if(key === text.key){
                   let newdata = data[key];
                   for(var key2 in newdata){
                       let usermsg = newdata[key2].sendmessage;
           //         console.log({key, usermsg});
                   } 
                  
               // }
             
             
               
            }
        })
    
    }
    logout(){
        firebase.auth().signOut();
        this.props.history.push('/');
    }


    selectuser(para){
     console.log(para.key);
     this.setState({ open: true , particularUser:para.key});
       firebase.database().ref(`/feedback/${para.key}/`).on('value' , snap =>{
           let key = snap.key;
           let array=[];
           snap.forEach((element) =>{

         
            array.push({
                message : element.val()
            })
              
            
           })
           this.setState({usermessage: array});
           console.log(array)
       });
        
        
    }

    sendmessage(para){
        para.preventDefault();
        let fireAuth = firebase.auth().currentUser.uid;
        let firename = firebase.auth().currentUser.email;
        firebase.database().ref(`/feedback/${this.state.particularUser}/`).push().set({user : firename ,sendmessage : this.state.adminmessage});
        this.setState({adminmessage : ''});
    }

  
    
      handleClose(){
        this.setState({ open: false });
      };
    
    render(){
        const { fullScreen } = this.props;
        return(
            <div>
                <Adminavbar logOut={()=> this.logout()} />
              
                <Table style={theme.root} >
        <TableHead>
          <TableRow>
            <TableCell style={{paddingLeft:'45%'}}>Users feedback detail</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        {
                         this.state.userId.map((text, index) =>{
                             return(
                                 <TableRow key={index}>
                                
                                     <TableCell  style={{width:400,fontSize:20}}  >
                                     {text.alluser}
                                     <RaisedButton  label="View" style={{float:'right'}} primary={true}
                                      onClick={(para) => this.selectuser(text)} />
                                     </TableCell> 
                                 
                                  </TableRow>
                             )
                         })
                     }
        </TableBody>
      </Table>


<Dialog  
        
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() =>this.handleClose()}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Messge Box
          </DialogTitle>
          <div style={{width: '100%', overflow: 'scroll'}}>
          {this.state.usermessage.map((text,index) =>{
                                        return(
                                            <div key={index} >
                                                <div style={{width:'100%',float: 'left'}}>
                                                 <div style={{float: 'left',display:'inline-flex',width: '100%'}}> 
                                                 <h4 style={{color:'lightblue'}}>   {text.message.user} </h4>
                                                  <p style={{paddingLeft: 10,paddingTop:5}}>
                                                  {" : " +text.message.sendmessage}</p></div>
                                                </div>
                                                
                                            </div>
                                        );
                                            })}
          <form onSubmit={(para) => this.sendmessage(para)}>

                        <div style={{display:'inline-flex', width: '90%'}}>
                            <div>
                                <TextField hintText="Type message"  value={this.state.adminmessage}
                                 onChange={(evt) => this.setState({adminmessage: evt.target.value}) } style={{width:400}} />
                             </div>
                               <div> <RaisedButton label='send' type="submit" primary={true} /> </div>
                               <div><RaisedButton  onClick={() => this.handleClose()} secondary={true} label="close" /> </div>
                        </div>
         </form>
         </div>
          
        </Dialog>
                
            </div>
        );
    }
}



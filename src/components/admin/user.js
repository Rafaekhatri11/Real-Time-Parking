import React, {Component} from 'react';
import Adminavbar from './navbar';
import {Table , TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';
export default class User extends Component{
    constructor(){
        super();
        this.state={
            alluser: []
        }
    }

    componentDidMount(){
            let fireData = firebase.database().ref('Users');
         
            fireData.on('value' , snap => {
                let array=[];
                let alluser = snap.val();
                for(var key in alluser){
                    array.push({uid : key ,name: alluser[key].username , pass : alluser[key].password});
                  
                }
               
                this.setState({alluser:array});
            })
         
    }


    removeUser(para){
      
        console.log(para.uid);
        firebase.database().ref("Users").child(para.uid).remove();
      
    }
    logout(){
        firebase.auth().signOut();
        this.props.history.push('/');
    }

    render(){
        console.log(this.state.alluser);
        return(
            <div>
                <Adminavbar logOut={()=> this.logout()} />
                <Table  style={{ background:'white'}}>
                            <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn style={{paddingLeft: '42%'}}>List of Users</TableHeaderColumn>
                              
                            </TableRow>
                            <TableRow>
                                <TableHeaderColumn>Serial No</TableHeaderColumn>
                                <TableHeaderColumn>Email</TableHeaderColumn>
                                <TableHeaderColumn>Password</TableHeaderColumn>
                                <TableHeaderColumn>Remove User</TableHeaderColumn>
                            </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                    {this.state.alluser.map((text,index) =>{
                                        return(
                                            <TableRow key={index}>
                                    <TableRowColumn>{index + 1}</TableRowColumn>
                                    <TableRowColumn>{text.name}</TableRowColumn>
                                    <TableRowColumn>{text.pass}</TableRowColumn>
                                    <TableRowColumn><RaisedButton label="Delete" secondary={true}
                                     onClick={(para) => this.removeUser(text)}/>
                                    </TableRowColumn>
                                  </TableRow>
                                        )
                                    })}
                            </TableBody>
                            </Table>

            </div>
        );
    }
}






import React ,{Component} from 'react';
import * as firebase from 'firebase';
import Navbar from './usernavbar';
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
    TableHeader,
    TableHeaderColumn
  } from 'material-ui/Table';
import { RaisedButton } from 'material-ui';
  
export default class Viewbooked extends Component{
    constructor(){
        super();
        this.state={
            userUid : '',
            bookedArea: [],
            reltimearray: [],
            LocationArray: []
        }
    }
    componentDidMount(){
          
        firebase.database().ref(`/Parking Table`).on('value',snap =>{
            let data = snap.val();
            let newarray= this.state.LocationArray;
                    for(var key in data){
                        newarray.push({areaKey: key , AreaName: data[key].Area,AreaPlace: data[key].Place});
                    }
            this.setState({LocationArray:newarray});
            console.log(this.state.LocationArray);
            }) 


        firebase.auth().onAuthStateChanged(user => {
            if (user) {

                this.setState({userUid: user.uid})
                firebase.database().ref(`/Booking/`).on('value' , snap =>{
                    let tables= snap.val();
                    let array= [];
                    for(var key in tables){
                        let newdata = tables[key];
                                for(var key2 in newdata){
                                        if(newdata[key2].id === this.state.userUid){
                                                        this.state.LocationArray.map((text,index)=>{
                                                                        if(text.areaKey === newdata[key2].parkid){
                                                                            array.push({Area : text.AreaName ,
                                                                            Place: text.AreaPlace ,
                                                                            Start: newdata[key2].starttime ,
                                                                            Endtime:newdata[key2].endtime,
                                                                            myDate: newdata[key2].date,
                                                                        parkiKey: newdata[key2].parkid,
                                                                        keyforDelete : key2
                                                                        });
                                                        
                                                        
                                                            }
                                            })
                                    }
                               
                         }                 
                    }
                    this.setState({bookedArea: array});          
                });

                let currentTime = new Date ;
                console.log(currentTime);
                let date = currentTime.getDate();
                let month = currentTime.getMonth();
                let year = currentTime.getFullYear();
                let comparisionDate=year+ '-' + '0' +(month+1) + '-'+date;
                let currenttimeinhour= currentTime.getHours();
                let currenttimeinminutes= currentTime.getMinutes();
                let comparisionTime = currenttimeinhour*60*60*1000+currenttimeinminutes*60*1000;
                console.log(comparisionTime);


                     firebase.database().ref(`/Booking/`).on('value' ,snap =>{
                    let data = snap.val();
                    let tempArray= [];
                    for(var key in data){
                        let newdata= data[key];
                        
                        for( var key1 in newdata){
                            let slots = newdata[key1];
                
                            
                            if(this.state.userUid === newdata[key1].id){
                                if(newdata[key1].date === comparisionDate){
                                
                                    if(newdata[key1].endtime <comparisionTime){
                                        firebase.database().ref(`/Booking/${key}/${key1}/`).remove();
                                    }
                            }
                    
                        }
                        
                    }
                }
           
        })
    

    } 
});  
        
    }

    cancelBooking(para){
        console.log(para);
         firebase.database().ref(`/Booking/${para.parkiKey}/${para.keyforDelete}/`).remove();
       
    }
    
    logout(){
        firebase.auth().signOut();
        this.props.history.push('/');
    }
    render(){
        return(
            <div>
                <Navbar logout={()=> this.logout()}/>
                 
                <div style={{display: 'inline-flex' , width: '100%'}}>
                            <Table  style={{ background:'white'}}>
                            <TableHeader displaySelectAll={false}>
                            <TableRow>
                            <TableHeaderColumn>Serial No</TableHeaderColumn>
                                <TableHeaderColumn>Area Name</TableHeaderColumn>
                                <TableHeaderColumn>Place Name</TableHeaderColumn>
                                <TableHeaderColumn>Booking Time</TableHeaderColumn>
                                <TableHeaderColumn>Cancle Parking</TableHeaderColumn>
                            </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                         {
                            this.state.bookedArea.map((text, index) => {
                                
                                return(
                                    <TableRow key={index}>
                                    <TableRowColumn>{index + 1}</TableRowColumn>
                                    <TableRowColumn>{text.Area}</TableRowColumn>
                                    <TableRowColumn>{text.Place}</TableRowColumn>
                                    <TableRowColumn>{text.myDate+' from '+text.Start+' and '+text.Endtime}</TableRowColumn>
                                    <TableRowColumn><RaisedButton label="Cancel" primary={true}
                                     onClick={(para) => this.cancelBooking(text)}/>
                                    </TableRowColumn>
                                  </TableRow>
                                    )
                            })
                        } 
                            </TableBody>
                            </Table>
                         </div>


              
            </div>
        );
    }
}
import React, {Component} from 'react';
import Adminavbar from './navbar';
import * as firebase from 'firebase';
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
    TableHeader,
    TableHeaderColumn
  } from 'material-ui/Table';
import { RaisedButton } from 'material-ui';

export default class Booking extends Component{

    constructor(){
        super();
        this.state ={
            allUser:[],
            showParking:[],
            viewArea:[]
        }
    }
    componentDidMount(){

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
        firebase.database().ref(`/Users/`).on('value' , item =>{
            let data = item.val();
            let user = []
            for( var key in data){
                let newdata = data[key];
                user.push({key, newdata});
                console.log(key, data[key]);
            }
            this.setState({allUser:user})
          //  console.log(this.state.allUser);
        })

        firebase.database().ref(`/Parking Table`).on('value',snap =>{
            let data  = snap.val();
            let areas= [];
            for(var key in data){
                let newdata = data[key];
                areas.push({Areakey: key, AreaName: data[key].Area,AreaPlace: data[key].Place});
            }
            this.setState({viewArea:areas})
        })

        firebase.database().ref(`/Booking/`).on('value' ,snap =>{
            let details = snap.val();
            let array= [];
            for(var key in details){
                console.log(details[key]);
                let newdata = details[key];
                for(var key2 in newdata){
                    this.state.viewArea.map((text,index) => {
                        if(text.Areakey === key){
                        array.push({
                            key: key2,
                         slotnumber: newdata[key2].slot,
                         name : newdata[key2].email,
                        Area : text.AreaName,
                        Place: text.AreaPlace ,
                        Start:newdata[key2].starttime ,
                        Endtime: newdata[key2].endtime,
                        myDate: newdata[key2].date,
                        parkiKey: newdata[key2].parkid
                            })
                        }
                    })
        console.log(array);
                   
                }
            }
            this.setState({showParking: array});
        })
        // firebase.database().ref(`/Booking/`).on('child_added', snap =>{
        //     let tables= snap.val();
        //     let array= [];
        //     for(var key in tables){
        //         let newtables = tables[key];
        //         //    console.log(newtables);
        //         //    console.log(this.state.viewArea)
        //            this.state.viewArea.map((text,index)=>{
                       
        //                if(text.Areakey === snap.key){
        //                    console.log(snap.key);
        //                           array.push({key: key,
        //                          slotnumber: tables[key].slot,
        //                          name : tables[key].email,
        //                         Area : text.AreaName,
        //                         Place: text.AreaPlace ,
        //                         Start:tables[key].starttime ,
        //                         Endtime: tables[key].endtime,
        //                         myDate: tables[key].date,
        //                         parkiKey: tables[key].parkid
        //                 })
                     
        //                }
            
        //             })     
        //             this.setState({showParking: array})
                                 
        //     }
         
        // });
        
        // firebase.database().ref(`/Booking/`).on('child_changed' , snap =>{
        //     let tables= snap.val();
        //     let array= [];
        //     for(var key in tables){
        //         let newtables = tables[key];
        //            console.log(newtables)
        //            this.state.viewArea.map((text,index)=>{
                       
        //               if(text.Areakey === snap.key){
        //                    console.log(snap.key);
        //                           array.push({key: key,
        //                          slotnumber: tables[key].slot,
        //                          name : tables[key].email,
        //                         Area : text.AreaName,
        //                         Place: text.AreaPlace ,
        //                         Start:tables[key].starttime ,
        //                         Endtime: tables[key].endtime,
        //                         myDate: tables[key].date,
        //                         parkiKey: tables[key].parkid
        //                 })
                       
                       
        //              }
            
        //             })         
        //             this.setState({showParking: array})      
        //     }
        //  //   console.log(array)
        // });
        let currentTime = new Date ;
        console.log(currentTime);
        let date = currentTime.getDate();
        let month = currentTime.getMonth();
        let year = currentTime.getFullYear();
        let comparisionDate=year+ '-' + '0' +(month+1) + '-'+date;
        let currenttimeinhour= currentTime.getHours();
        let currenttimeinminutes= currentTime.getMinutes();
        let comparisionTime = currenttimeinhour+':'+currenttimeinminutes;
        console.log(comparisionTime);
        firebase.database().ref(`/Parking Table/`).on('value' ,snap =>{
            let data = snap.val();
            let tempArray= [];
            for(var key in data){
                let newdata= data[key];
                
                for( var key1 in newdata){
                    let slots = newdata[key1];
                    for(var key2 in slots){
                       
                        
                        if(slots[key2].date === comparisionDate || slots[key2].time !== comparisionDate){
                    
                                    if(slots[key2].endtime <comparisionTime){
                                       
                                        firebase.database().ref(`/Parking Table/${key}/slots/${key2}/`).set({
                                            color:'green',
                                            endtime: '',
                                            id: '',
                                            parkid: ''
                                        })
                                    }
                                }
                    }
                }
                
            }
           
        })
       }
     })
    }
    logout(){
        firebase.auth().signOut();
        this.props.history.push('/');
    }

    cancelBooking(para){
        firebase.database().ref(`/Booking/${para.parkiKey}/${para.key}/`).remove();
       
    }
    render(){
        return(
            <div>
                <Adminavbar logOut={()=> this.logout()} />
               
                <div style={{display: 'inline-flex' , width: '100%'}}>
                            <Table  style={{ background:'white'}}>
                            <TableHeader displaySelectAll={false}>
                            <TableRow>
                            <TableHeaderColumn>Username</TableHeaderColumn>
                                <TableHeaderColumn>Area Name</TableHeaderColumn>
                                <TableHeaderColumn>Place Name</TableHeaderColumn>
                                <TableHeaderColumn>Booking Time</TableHeaderColumn>
                                <TableHeaderColumn>Cancle Parking</TableHeaderColumn>
                            </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                         {
                            this.state.showParking.map((text, index) => {
                                
                                return(
                                    <TableRow key={index}>
                                    <TableRowColumn>{text.name}</TableRowColumn>
                                    <TableRowColumn>{text.Area}</TableRowColumn>
                                    <TableRowColumn>{text.Place}</TableRowColumn>
                                    <TableRowColumn>{text.myDate+' from '+text.Start+' and '+text.Endtime}</TableRowColumn>
                                    <TableRowColumn><RaisedButton label="Cancel"  primary={true}
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



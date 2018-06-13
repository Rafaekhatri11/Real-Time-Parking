import React ,{Component} from 'react';
import Navbar from './usernavbar';
import {Link } from 'react-router-dom';
import { lightBlue400 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import  DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Dialog from 'material-ui/Dialog';
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
    TableHeader,
    TableHeaderColumn
  } from 'material-ui/Table';
import Timing from './timepicker';
import * as firebase from 'firebase';

  
const mystyle={
    buttonstyle:{
       fontWeight: 'bold',
       color: lightBlue400,
       //background: brown500
    },
}

export default class Viewarea extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dialogue: false,
            Areas: [],
            slots: [],
            myarray:[],
            dialogueforslot: false,
            Places: '',
            heading: 'Please Select Areas',
            currentdate : null ,
            starttime: '',
            endtime : '',
            starttimevalue24: null,
            endtimevalue24: null,
            todaydate: '' ,
            starttimehour: '' ,
            starttimeminutes: '',
            endtimehour : '' ,
            endtimemunutes : '',
            uniqueKey : ''
        };
      }
   
  
    componentDidMount(){
            firebase.database().ref().child(`/Parking Table/`).on('value', snap =>{
                let parkingArea= snap.val();
                let array=[];
                for(var key in parkingArea){
                  
                    array.push({ uid : key, parkArea: parkingArea[key].Area , parkPlace: parkingArea[key].Place })
                }
                this.setState({Areas: array});
            })
           this.state.slots.map((text,index) => {
               console.log(text,index);
           })
    }

            handleChangeDate = (event, date) => {
            
            
                let currentDate = date.getDate();
                let currentMonth= date.getMonth();
                currentMonth++;
                let currentYear = date.getFullYear();
                let finalDate = currentYear+ '-0'+ currentMonth +'-'+currentDate;
                console.log(finalDate);


                this.setState({
                    currentdate: date,
                    todaydate : finalDate
                });
                
            };


            startTimePicker24 = (event, date) => {
                let currentHour= date.getHours();
                let currentMinute= date.getMinutes();
                let finalTime = currentHour + ":"+currentMinute;
                console.log(finalTime);
                this.setState({starttimevalue24: date ,
                        starttimehour : currentHour ,
                        starttimeminutes: currentMinute
                });

            };

            endTimePicker24 = (event , date) =>{
                let currentHour= date.getHours();
                let currentMinute= date.getMinutes();
                let finalTime = currentHour + ":" +currentMinute;
                console.log(finalTime);
                    this.setState({endtimevalue24: date,
                                endtimehour: currentHour ,
                                    endtimemunutes: currentMinute
                    });
                    
            };




            handleOpen = () => {
                this.setState({dialogue: true});
            };

    
            handleClose = () => {
                this.setState({dialogue: false , currentdate: null,starttimevalue24: null,endtimevalue24:null , myarray: []});
            };

    showPlace(para){
        
        console.log(para.uid);
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
        firebase.database().ref(`/Parking Table/${para.uid}/slots/`).on('value' ,snap =>{
            let slot = snap.val();
            for(var key in slot){
              
                if(slot[key].date === comparisionDate){
                    
                    if(slot[key].endtime <comparisionTime){
                       
                        firebase.database().ref(`/Parking Table/${para.uid}/slots/${key}/`).set({
                            color:'green',
                            endtime: '',
                            id: '',
                            parkid: ''
                        })
                    }
                }
            }
        })
        this.setState({Places : para.parkPlace , open: true , uniqueKey: para.uid});
    }
  

    selectSlots(){
        let selectedDate = new Date(this.state.currentdate).getDate();
        let selectedMonth = new Date(this.state.currentdate).getMonth();
        let selecteYear = new Date(this.state.currentdate).getFullYear();
        let myDate = new Date();
        let todayDate = new Date(myDate).getDate();
        let todayMonth = new Date(myDate).getMonth();
        let currentYear = new Date(myDate).getFullYear();
        let userUid = firebase.auth().currentUser.uid;
        

        if(this.state.currentdate === null || this.state.starttimevalue24 === null || this.state.endtimevalue24 === null){
            alert('Please enter all values');
        }

        else{
        let selectedDate = new Date(this.state.currentdate).getDate();
        let selectedMonth = new Date(this.state.currentdate).getMonth();
        let selecteYear = new Date(this.state.currentdate).getFullYear();
        let myDate = new Date();
        let todayDate = new Date(myDate).getDate();
        let todayMonth = new Date(myDate).getMonth();
        let currentYear = new Date(myDate).getFullYear();
        let checktime = new Date();
        let checktodayhour= new Date(checktime).getHours();
        let checktodayminutes= new Date(checktime).getMinutes();
        console.log(checktodayhour, checktodayminutes );
        let Ctime = checktodayhour*60*60*1000+checktodayminutes*60*1000;
        let  Stime = this.state.starttimehour*60*60*1000+this.state.starttimeminutes*60*1000;
        let Etime = this.state.endtimehour*60*60*1000+this.state.endtimemunutes*60*1000;
        console.log( 'start time' +this.state.starttimehour*60*60*1000+this.state.starttimeminutes*60*1000
            +'end time' + this.state.endtimehour*60*60*1000+this.state.endtimemunutes*60*1000
        )
        
     
        if((selectedDate===todayDate) && (selectedMonth === todayMonth) && (selecteYear === currentYear) &&(Ctime>Stime || Etime <Stime)){
            alert('please select correct time');
        }

        else if( Stime >= Etime ) {
            alert('please select correct time');
        }
        else   if(selectedDate<todayDate || selectedMonth<todayMonth || selecteYear<currentYear){
            alert('Please select correct date');
        }
       
        else{
            let  Stime = this.state.starttimehour*60*60*1000+this.state.starttimeminutes*60*1000;
            let Etime = this.state.endtimehour*60*60*1000+this.state.endtimemunutes*60*1000;
            let localArray = this.state.myarray; 
            let newlocalArray= this.state.myarray;
            let fireID = firebase.auth().currentUser.uid;
            firebase.database().ref(`/Parking Table/${this.state.uniqueKey}/slots/`).on('value' , snap =>{
                let data = snap.val();
               
              for(var key in data){
                  localArray.push(false);
              }
            this.setState({myarray : localArray})
               
            })
           
            this.setState({ dialogueforslot: true})
                firebase.database().ref(`/Booking/${this.state.uniqueKey}/`).on('value' ,snap =>{
                    let newdata= snap.val();
                    for(var key in newdata){
                      
                        if(newdata[key].date === this.state.todaydate){
                            if((Stime <= newdata[key].starttime && Etime >= newdata[key].starttime) || (Stime >= newdata[key].starttime && Stime<= newdata[key].endtime)){

                            this.state.myarray.splice(newdata[key].slot , 1 , true);
                            console.log(this.state.myarray);
                            this.setState({dialogueforslot: true});
                        }
                      
                    }
                }
                }) 
              
                     
        }
    
        
       
    }

}

  bookSlot(text,index){
      let fireID = firebase.auth().currentUser.uid;
      let fireEmail= firebase.auth().currentUser.email;
      let  Stime = this.state.starttimehour*60*60*1000+this.state.starttimeminutes*60*1000;
      let Etime = this.state.endtimehour*60*60*1000+this.state.endtimemunutes*60*1000;
      console.log(text , this.state.uniqueKey,fireID,index);
      if(text === true)  {
        alert('Slot is already booked');
      } 
      else{
      
        firebase.database().ref(`/Booking/${this.state.uniqueKey}/`).push({
            id: fireID,
            email: fireEmail,
            parkid: this.state.uniqueKey,
             date: this.state.todaydate,
              starttime: Stime ,
              endtime: Etime,
              color:'yellow',
              slot: index,
               flag: false

               
            })
            alert('Successfully booked');
            this.setState({dialogueforslot: false, dialogue: false,currentdate: null,starttimevalue24: null,endtimevalue24:null  , myarray:[]})

     }
    }
       
  
      
  


    sameSlot(text){
         text === true ? alert('Slot is already Booked') : ''
    }
    handleOpen2(){
        this.setState({dialogueforslot: true})
    }
    handleClose2(){
        this.setState({dialogueforslot: false , myarray : []})
    }
    logout(){
        firebase.auth().signOut();
        this.props.history.push('/');
    }
    render(){
        const actions = [
            <RaisedButton
              label="Cancel"
              secondary={true}
              onClick={() =>this.handleClose()}
            />,
            <RaisedButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={() =>this.selectSlots()}
            />,
          ];

          const actions2 = [
            <RaisedButton
              label="Cancel"
              secondary={true}
              onClick={() =>this.handleClose2()}
            />
          ];
   
        
        return(
            <div>
                <Navbar logout={()=> this.logout()} />
               
               <div style={{display: 'inline-flex' , width: '100%'}}>
                            <Table  style={{ background:'white'}}>
                            <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Serial No</TableHeaderColumn>
                                <TableHeaderColumn>Area Name</TableHeaderColumn>
                                <TableHeaderColumn>Place Name</TableHeaderColumn>
                                <TableHeaderColumn>Booking</TableHeaderColumn>
                            </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                        {
                            this.state.Areas.map((text, index) => {
                                
                                return(
                                    <TableRow key={index}>
                                    <TableRowColumn>{index + 1}</TableRowColumn>
                                    <TableRowColumn>{text.parkArea}</TableRowColumn>
                                    <TableRowColumn>{text.parkPlace}</TableRowColumn>
                                    <TableRowColumn><RaisedButton label="Book Now" primary={true} 
                                     onClick={(para,index) => {this.showPlace(text,index), this.handleOpen()}}/>
                                    </TableRowColumn>
                                  </TableRow>
                                    )
                            })
                        }
                            </TableBody>
                            </Table>
                         

                   <Dialog
         
          actions={actions}
          modal={false}
          open={this.state.dialogue}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <div style={{marginLeft:'30%'}}>
                           <h1 style={{paddingLeft:'15%'}}>
                            {this.state.Places}
                            </h1>
                                    <div>
                                    <DatePicker
                                        hintText="Controlled Date Input"
                                        mode="landscape"
                                        
                                        value={this.state.currentdate}
                                        onChange={this.handleChangeDate}
                                    /><br/>
                                    <TimePicker   onChange={this.startTimePicker24}
                                    hintText="Start Time" value={this.state.starttimevalue24}
                                    /> <br />
                                    <TimePicker  onChange={this.endTimePicker24}
                                    hintText="End Time" value={this.state.endtimevalue24}
                                    />
                                    </div>
            </div>
        </Dialog>

         <Dialog
          title="Select slots"
          actions={actions2}
          modal={false}
          open={this.state.dialogueforslot}
          onRequestClose={this.handleClose2}
          autoScrollBodyContent={true}
        >
        
          {
              
              this.state.myarray.map((text,index) => {
                   console.log(text)
                    //  if(text === false){
                        return  (       
                        <div key={index} style={{paddingLeft: 20 , display:'inline-flex'}}>
                            <RaisedButton label={'Slot No '+(index +1)} labelColor="white" 
                            buttonStyle={{backgroundColor: text ? 'yellow' : 'green',width:150}}
                              onClick={() => this.bookSlot(text,index)}/>
                        </div>
                           )
             
                     
             
          }) 
        }
        </Dialog>
                </div>
            </div>
        );
    }
}
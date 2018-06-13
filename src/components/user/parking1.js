import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';


const style = {
    height: '95%',
    width: '99%',
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  }; 

export default class Parking1 extends Component{
    render(){
        return(
            <div>
                <Paper zDepth={3} style={style} >
                <DatePicker hintText="Landscape Inline Dialog" container="inline" mode="landscape" /> <br/>
                     <TimePicker
                        hintText="12hr Format"
                        />
                    <br/>
                    <RaisedButton label="Book" primary={true} />
    
                </Paper>
            </div>
        );
    }
}
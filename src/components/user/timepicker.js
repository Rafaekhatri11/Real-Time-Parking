import React,{Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
export default class Timing extends Component{
    render(){
        return(
            <div>
                <h1> TIme data</h1>
                     <DatePicker hintText="Landscape Inline Dialog" container="inline" mode="landscape" /> <br/>
                     <TimePicker
                        hintText="12hr Format"
                        />
                    <br/>
                    <RaisedButton label="Book" primary={true} />
    
            </div>
        );
    }
}
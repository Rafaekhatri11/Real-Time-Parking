import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/root/App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB3_ulrmfkALahhCSHEj4VGsXUuPbEdmOY",
  authDomain: "newmobile-c7fb1.firebaseapp.com",
  databaseURL: "https://newmobile-c7fb1.firebaseio.com",
  projectId: "newmobile-c7fb1",
  storageBucket: "newmobile-c7fb1.appspot.com",
  messagingSenderId: "106765727427"
};
firebase.initializeApp(config);

ReactDOM.render(
<MuiThemeProvider>
<App /> 
</MuiThemeProvider>  , document.getElementById('root'));
registerServiceWorker();

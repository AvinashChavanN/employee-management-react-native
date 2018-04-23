import React,{Component} from 'react';
import {AppRegistry,Text,View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk'
import LoginForm from './components/LoginForm'
import Router from './Router'

class App extends Component {

  componentWillMount(){

  firebase.initializeApp({
    apiKey: 'AIzaSyAZVzD_dQD-jcnp_3jOGG4qepfa_pxK1bc',
    authDomain: 'manager-2fb69.firebaseapp.com',
    databaseURL: 'https://manager-2fb69.firebaseio.com',
    projectId: 'manager-2fb69',
    storageBucket: 'manager-2fb69.appspot.com',
    messagingSenderId: '120406921596'
  });
  }
  render(){
    const store = createStore(reducers,{},applyMiddleware(ReduxThunk));
    return(
      <Provider store={store}>
      <View>
      <Router/>
      </View>
      </Provider>
    );
  }
}

export default App;

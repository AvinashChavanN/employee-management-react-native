import React,{Component} from 'react';
import {TextInput,Text,View} from 'react-native';
import {connect} from 'react-redux';
import {emailChanged,passwordChanged,loginUser} from '../actions';
import {Card,CardItem,Input,Button,Header,Spinner} from './common'

class LoginForm extends Component {

  onEmailChange(text){
    this.props.emailChanged(text);
  }
  onPasswordChange(text){
    this.props.passwordChanged(text);
  }

  onButtonPress(){
    const {email,password} = this.props;

    this.props.loginUser({email,password});
  }

  renderError(){
    if(this.props.error){
      return(
        <View style={{backgroundColor:'white'}}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderButton(){
    if(this.props.loading){
      return (<Spinner size="large"/>);
    }
    else{
      return(<Button onPress={this.onButtonPress.bind(this)}>Log In</Button>);
    }
  }

  render(){
    return(
      <Card>
        <Header headerText="Welcome"/>
        <CardItem>
          <Input
            label="Email"
            value={this.props.email}
            placeHolder="user@test.com"
            onChangeText={this.onEmailChange.bind(this)}
            />
        </CardItem>
        <CardItem>
          <Input
            label="Password"
            placeHolder="password"
            value={this.props.password}
            onChangeText={this.onPasswordChange.bind(this)}
            secureTextEntry
            />
        </CardItem>
          {this.renderError()}
        <CardItem>
          {this.renderButton()}
        </CardItem>
      </Card>
    );
  }
}


const styles={
  errorTextStyle:{
    fontSize:20,
    alignSelf:'center',
    color:'red'
  }
};
const mapStateToProp = state =>{
  return{
    email: state.auth.email,
    password:state.auth.password,
    error:state.auth.error,
    loading:state.auth.loading
  };
};
export default connect(mapStateToProp,{emailChanged,passwordChanged,loginUser})(LoginForm);

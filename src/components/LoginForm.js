import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';

export default class LoginForm extends Component {
   state = { email: '', password: '', error: '', loading: false };

   onButtonPress(){
       let { email, password } = this.state;
       this.setState({ error: '', loading: true });

       firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
           firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFailed.bind(this));
       });
   }

   onLoginFailed(){
       this.setState({
           error: 'Authentifation Failed', loading: false
       });
   }

   onLoginSuccess(){
       this.setState({
           email: '',
           password: '',
           loading: false,
           error: ''
       });
   }

   renderButton() {
       if(this.state.loading) {
           return <Spinner size="small" />;

       }

       return(
           <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>
       );
   }

    render(){
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="user@test.com"
                        label="Email"
                        onChangeText={email => this.setState({ email })}
                        value={ this.state.email }
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="password"
                        label="Password"
                        onChangeText={password => this.setState({ password })}
                        value={ this.state.password }
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}
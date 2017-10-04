import React, { Component } from 'react';
import firebase from 'firebase';
import { View, TouchableOpacity, Text  } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


export default class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyBTfmMu1Zk4Xt6r56vPRqUzB9HWmSnzHjc",
            authDomain: "authentication-33f89.firebaseapp.com",
            databaseURL: "https://authentication-33f89.firebaseio.com",
            projectId: "authentication-33f89",
            storageBucket: "authentication-33f89.appspot.com",
            messagingSenderId: "895917340125"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.setState({ loggedIn: true});
            }
            else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent(){
        switch (this.state.loggedIn) {
            case true:
                return (
                    <TouchableOpacity style={styles.opacityStyle} onPress={() => firebase.auth().signOut()}>
                         <Text> Log Out </Text>
                    </TouchableOpacity>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

const styles = {
    opacityStyle: {
        marginLeft: 5,
        marginRight: 5,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
    }
}
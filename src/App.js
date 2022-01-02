import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { doc, onSnapshot, getFirestore } from "firebase/firestore";



class App extends React.Component{
  constructor() {
    super();

    this.state={
      currentUser:null
    }
  }
  
  unsubscribeFromAuth = null

    componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        await createUserProfileDocument(userAuth);
        const db = getFirestore();
        onSnapshot(doc(db, "users", userAuth.uid), (doc) => {
          this.setState({
            currentUser: {
              id: doc.id,
              ...doc.data()
            }
          });

          console.log(this.state);
        });
      }
    });
  }
  
  
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
    <div>
      <Header currentUser={this.state.currentUser} />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  )
  };

  
}

export default App;
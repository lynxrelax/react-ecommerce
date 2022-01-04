import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import {setCurrentUser} from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';


class App extends React.Component{
 
  unsubscribeFromAuth = null

    componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        await createUserProfileDocument(userAuth);
        const db = getFirestore();
        onSnapshot(doc(db, "users", userAuth.uid), (doc) => {
          setCurrentUser({
              id: doc.id,
              ...doc.data()
            });
        });
      }
      setCurrentUser(userAuth)
    });
  }
  
  
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={()=> 
          this.props.currentUser ? 
          (<Redirect to = '/'/>):(<SignInAndSignUpPage/>)} 
          />
      </Switch>
    </div>
  )
  };
}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser
})


const mapDispatchToProps = dispatch =>({
  setCurrentUser: user =>dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps
  ,mapDispatchToProps
  )(App);
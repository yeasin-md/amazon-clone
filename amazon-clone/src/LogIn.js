import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import Zoom from 'react-reveal/Zoom';
import Slide from 'react-reveal/Slide';
import { auth } from './firebase';
function LogIn() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = e => {
    e.preventDefault();

    //some fancy firebase login stuffs--
    auth
      .signInWithEmailAndPassword(email, password)
      .then(auth => {
        history.push('/');
      })
      .catch(error => alert(error.message));
  };
  const register = e => {
    e.preventDefault();

    //some firebase register stuffs--
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(auth => {
        //using this to redirect to home page
        if (auth) {
          history.push('/');
        }
      })
      .catch(error => alert(error.message));
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <Zoom left>
        <div className="login__container">
          <h1
            style={{
              fontWeight: '400',
              fontSize: '28px',
              lineHeight: '1.2',
              marginBottom: '14px',
            }}
          >
            Sign-In
          </h1>
          <form action="">
            <h5>Email</h5>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              className="login__siginButton"
              onClick={signIn}
              type="submit"
            >
              Sign In
            </button>
          </form>
          <p>
            By signing-in you agree to AmazonClone.ymd Conditions of Use & Sale.
            Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
        </div>
      </Zoom>
      <p className="create__account">New to Amazon?</p>
      <Slide right>
        <button className="login__registerButton" onClick={register}>
          Create your Amazon Account
        </button>
      </Slide>
    </div>
  );
}

export default LogIn;

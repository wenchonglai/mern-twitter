import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";

function SignupForm({signedIn, signup, errors, history}){
  function update(field){
    return e => _setState({..._state, [field]: e.currentTarget.value})
  }

  function handleSubmit(e){
    e.preventDefault();

    const user = {
      email: _state.email,
      handle: _state.handle,
      password: _state.password,
      password2: _state.password2,
    }

    signup(user, history);
  } 

  function renderErrors(){
    return (
      <ul>
        { Object.keys(_state.errors).map((key, i) => (
            <li key={`error-${i}`}>
              {_state.errors[key]}
            </li>
          ))
        }
      </ul>
    )
  }

  const [_state, _setState] = useState({
    email: '',
    handle: '',
    password: '',
    password2: '',
    errors: {}
  });
  
  useEffect(() => {
    if (signedIn)
      history.push('/login');

    _setState({..._state, errors})
  }, [signedIn, errors]);

  return (
    <div className="signup-form-container">
      <form onSubmit={e => handleSubmit(e)}>
        <div className="signup-form">
          <input type="text" value={_state.email} onChange={update('email')} placeholder="Email"/>
          <br/>
          <input type="text" value={_state.handle} onChange={update('handle')} placeholder="Handle"/>
          <br/>
          <input type="password" value={_state.password} onChange={update('password')} placeholder="Password"/>
          <br/>
          <input type="password" value={_state.password2} onChange={update('password2')} placeholder="Confirm Password"/>
          <br/>
          <input type="submit" value="submit" />
          {renderErrors()}
        </div>
      </form>
    </div>
  )
}

export default withRouter(SignupForm);
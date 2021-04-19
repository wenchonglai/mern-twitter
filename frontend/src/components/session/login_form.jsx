import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';

function LoginForm({login, currentUser, errors, history}){
  function update(field){
    return e => _setState({
      ..._state,
      [field]: e.currentTarget.value
    })
  }

  function handleSubmit(e){
    e.preventDefault();

    const {email, password} = _state;

    login({email, password});
  }

  function renderErrors(){
    return (
      <ul>
        { Object.keys(_state.errors).map((err, i) => (
            <li key={`error-${i}`}>
              {_state.errors[err]}
            </li>
          ))
        }
      </ul>
    )
  }
  
  const [_state, _setState] = useState({email: '', password: '', errors: {}});

  useEffect(() => {
    if (currentUser === true){
      history.push('/tweets');
    }

    _setState({..._state, errors})
  }, [currentUser, errors]);

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <input type="text" value={_state.email} onChange={update('email')} placeholder="Email"/>
          <br />
          <input type="password" value={_state.password} onChange={update('password')} placeholder="Password"/>
          <input type="submit" value="Submit"/>
          {renderErrors()}
        </div>
      </form>
    </div>
  )
}

export default withRouter(LoginForm);
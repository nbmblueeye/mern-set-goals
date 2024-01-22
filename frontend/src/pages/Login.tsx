import { FaSignInAlt } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useState } from 'react';
import { resetAuth, userLogin } from '../features/authSlide';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate();
  const { error, loading, success, message } = useAppSelector((state:any) => state.auth);

  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState({email:"", password:""});
  const { email, password } = userData;

  const _setUserData = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserData((prevState) => {return {...prevState, [e.target.name]: e.target.value}});
  }

  const handleUserLogin = (e:React.FormEvent<HTMLFormElement>) =>{
    
    e.preventDefault();
    dispatch(userLogin(userData));
    setUserData({email:"", password:""});
    setTimeout(() => {
      dispatch(resetAuth());
      navigate('/');
    }, 1000)
   
  }


  return (
    <div className="container">
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>
      <section className='form'>
      <div className="form-group">
          {
            success && <div className="success-message"><p>{message}</p></div>
          }
          {
            error && <div className="error-message"><p>{message}</p></div>
          }
        </div>
        <form onSubmit={(e) => handleUserLogin(e)}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => _setUserData(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => _setUserData(e)}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              {
                loading ?"Loading...": "Submit"
              }
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Login


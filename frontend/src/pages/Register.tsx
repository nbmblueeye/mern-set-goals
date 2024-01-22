import { FaUser } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { resetAuth, userRegister } from '../features/authSlide'


const Register = () => {
  
  const { error, success, message } = useAppSelector((state:any) => state.auth);

  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState({
    name:"", email:"", password:"", passwordConfirmation:""
  });

  const { name, email, password, passwordConfirmation } = userData;

  const _setUser = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserData((prevState) => {return {...prevState, [e.target.name]: e.target.value}});
  }

  const handUserRegister = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    dispatch(userRegister(userData))
   
  }

  useEffect(() => {
    setUserData({name:"", email:"", password:"", passwordConfirmation:""})
    if(success){
      setTimeout(() => {
        dispatch(resetAuth())
      }, 1000);
    }
  },[success]);

  return (
     <div className="container">
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
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
        <form  onSubmit={(e) => handUserRegister(e)}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => _setUser(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => _setUser(e)}
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
              onChange={(e) => _setUser(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='passwordConfirmation'
              name='passwordConfirmation'
              placeholder='Confirm password'
              value={passwordConfirmation}
              onChange={(e) => _setUser(e)}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
                Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Register

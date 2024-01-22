import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector} from '../app/hooks';
import { userLogout } from '../features/authSlide';
import { resetGoal } from '../features/goalSlide';

function Header() {

    const { user } = useAppSelector((state:any) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

   
    const userLogoutHandler = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(userLogout());
        setTimeout(() => {
            dispatch(resetGoal());
            navigate('/login');
        }, 2000);
    }

    return (
        <header className='header'>
            <div className="container">
                <div className="header-wrapper">
                    <div className='logo'>
                        <Link to='/'>GoalSetter</Link>
                    </div>
                    <ul>
                        {
                            user ?
                            <li>
                                <button className='btn' onClick={(e) => userLogoutHandler(e)}>
                                    <FaSignOutAlt /> Logout
                                </button>
                            </li>
                            :
                            <>
                                 <li>
                                    <Link to='/login'>
                                        <FaSignInAlt /> Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/register'>
                                        <FaUser /> Register
                                    </Link>
                                </li>
                            </>
                        }
                       
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header
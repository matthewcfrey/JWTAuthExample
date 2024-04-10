import {Link, Outlet} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
 
const Layout = props => {
    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleClick = () => {
        logout()
      }

    return (
        <div>
            <header>
                <Link className='links' to='/'>Home</Link>
                {!user && <Link className='links' to='/login'>Login</Link>}
                {!user && <Link className='links' to='/signup'>Signup</Link>}
                {user && (
                    <span>
                        <Link className='links' onClick={handleClick} to='/login'>Logout</Link>
                        <span>{user.email}</span>
                    </span>)
                }
            </header>
            <Outlet />
        </div>
    )
}

export default Layout
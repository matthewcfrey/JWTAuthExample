import { useThingsContext } from '../hooks/useThingsContext'
import { useAuthContext } from '../hooks/useAuthContext'


const ThingItem = ({ thing }) => {
  const { dispatch } = useThingsContext()
  const {user} = useAuthContext()

  const handleClick = async (id) => {
    if(!user) {
      return
    }

    const response = await fetch(import.meta.env.VITE_THING_API + thing._id, {
      method: 'DELETE', 
      headers: {
        'Authorization':`Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_THING', payload: json})
    }
  }

  return (
    <li>{thing.thing}<button onClick={handleClick}>Delete</button></li>
  )
}

export default ThingItem
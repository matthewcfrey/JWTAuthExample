import { useState, useEffect }from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import { useThingsContext } from "../hooks/useThingsContext"
import ThingForm from '../components/ThingForm'
import ThingItem from '../components/ThingItem'

const Home = () => {
  const {things, dispatch} = useThingsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchThings = async () => {
      const response = await fetch(import.meta.env.VITE_THING_API, {
        headers: {
          'Authorization':`Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_THINGS', payload: json})
      }
    }
    
    if(user) {
      fetchThings()
    }
    
  }, [dispatch, user])

  return (
    <div className="home">
      <ul className="things">
        {things && things.map((thing) => (
          <ThingItem key={thing._id} thing={thing} />
        ))}
      </ul>
      {things && <ThingForm />}
    </div>
  )
}

export default Home
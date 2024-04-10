import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useThingsContext } from "../hooks/useThingsContext"

const ThingForm = () => {
  const {user} = useAuthContext()
  const {dispatch} = useThingsContext()

  const [thing, setThing] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!user) {
      setError('You must be logged in')
      return
    }

    const aThing = {thing}

    const response = await fetch(import.meta.env.VITE_THING_API, {
      method: 'POST',
      body: JSON.stringify(aThing),
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setThing('')
      setError(null)
      console.log('new thing added', json)
      dispatch({type: 'CREATE_THING', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Thing</h3>

      <label>Thing:</label>
      <input 
        type="text"
        onChange={(e) => setThing(e.target.value)}
        value={thing}
      />

      <button>Add Thing</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ThingForm
import { createContext, useReducer } from 'react'

export const ThingsContext = createContext()

export const thingsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THINGS': 
      return {
        things: action.payload
      }
    case 'CREATE_THING':
      return {
        things: [action.payload, ...state.things]
      }
    case 'DELETE_THING':
      return {
        things: state.things.filter((t) => t._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const ThingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(thingsReducer, {
    things: null
  })

  return (
    <ThingsContext.Provider value={{...state, dispatch}}>
      { children }
    </ThingsContext.Provider>
  )
}
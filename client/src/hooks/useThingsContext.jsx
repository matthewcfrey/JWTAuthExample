import { ThingsContext } from '../context/ThingContext'
import { useContext } from 'react'

export const useThingsContext = () => {
  const context = useContext(ThingsContext)

  if (!context) {
    throw Error('useThingsContext must be used inside an ThingsContextProvider')
  }

  return context
}
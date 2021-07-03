import { useContext } from 'react'
import { RoomsContext } from '../contexts/RoomsContext'

export function useRooms () {
  const value = useContext(RoomsContext)

  return value
}

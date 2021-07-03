import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import { useRooms } from './useRooms'

type useRoomReturnType = {
  isLoading: boolean
  title: string
  description: string
  author: {
    id: string
    name: string
    avatar: string
  }
  isEnded: boolean
}
export function useRoom (roomId: string): useRoomReturnType {
  const { filterRoom } = useRooms()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState({
    id: '',
    name: '',
    avatar: ''
  })
  const [isEnded, setIsEnded] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const databaseRoom = filterRoom(roomId)
    if (databaseRoom) {
      setTitle(databaseRoom.title)
      setDescription(databaseRoom.description || '')
      setAuthor(databaseRoom.author)
      setIsEnded(databaseRoom.endedAt ? true : false)
      setIsLoading(false)
    }
  }, [filterRoom, roomId, user?.id])

  return {
    isLoading,
    title,
    description,
    author,
    isEnded
  }
}

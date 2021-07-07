import { useEffect, useState } from 'react'
import { database } from '../services/firebase'
import { useAuth } from './useAuth'
import { useRooms } from './useRooms'

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isAnswered: boolean
    isHighlighted: boolean
    isUserDeleted: boolean
    isAdminDeleted: boolean
    likes: Record<
      string,
      {
        authorId: string
      }
    >
  }
>

type QuestionType = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  isUserDeleted: boolean
  isAdminDeleted: boolean
  likeCount: number
  likeId: any
}

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
  isOwner: boolean
  isLoadingQuestions: boolean
  questions: QuestionType[]
  endRoom: (roomId: string) => void
}
export function useRoom (roomId: string): useRoomReturnType {
  const { user } = useAuth()
  const { rooms, filterRoom } = useRooms()
  const [isOwner, setIsOwner] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState({
    id: '',
    name: '',
    avatar: ''
  })
  const [isEnded, setIsEnded] = useState(false)
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true)
  const [questions, setQuestions] = useState<QuestionType[]>([])

  async function endRoom (roomId: string) {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })
    setIsEnded(true)
  }

  useEffect(() => {
    if (rooms.length === 0) return
    setIsLoading(true)
    const databaseRoom = filterRoom(roomId)
    if (databaseRoom) {
      setTitle(databaseRoom.title)
      setDescription(databaseRoom.description || '')
      setAuthor(databaseRoom.author)
      setIsEnded(databaseRoom.endedAt ? true : false)
      if (user && databaseRoom.author.id === user?.id) {
        setIsOwner(true)
      }
      setIsLoading(false)
    }
  }, [filterRoom, roomId, rooms, user])

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}/questions`)

    roomRef.on('value', room => {
      const firebaseQuestions: FirebaseQuestions = room.val()
      console.log(firebaseQuestions)

      if (!firebaseQuestions) {
        setIsLoadingQuestions(false)
        return
      }
      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            isUserDeleted: value.isUserDeleted,
            isAdminDeleted: value.isAdminDeleted,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {})
          }
        }
      )
      setQuestions(parsedQuestions)
      setIsLoadingQuestions(false)
    })

    return () => {
      roomRef.off('value')
    }
  }, [roomId])

  return {
    isLoading,
    title,
    description,
    author,
    isEnded,
    isOwner,
    questions,
    isLoadingQuestions,
    endRoom
  }
}

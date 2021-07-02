import { useEffect, useState } from 'react'
import { database } from '../services/firebase'
import { useAuth } from './useAuth'

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
  likeId: string | undefined
}
type useRoomReturnType = {
  isLoading: boolean
  questions: QuestionType[]
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
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState({
    id: '',
    name: '',
    avatar: ''
  })
  const [isEnded, setIsEnded] = useState(false)

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      if (!databaseRoom) {
        setIsLoading(false)
        return
      }
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions || {}

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
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0]
          }
        }
      )
      setIsLoading(false)
      setTitle(databaseRoom.title)
      setDescription(databaseRoom.description)
      setAuthor(databaseRoom.author)
      setQuestions(parsedQuestions)
      setIsEnded(databaseRoom.endedAt ? true : false)
    })

    return () => {
      roomRef.off('value')
    }
  }, [roomId, user?.id])

  return { isLoading, questions, title, description, author, isEnded }
}

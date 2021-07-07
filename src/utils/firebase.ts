import { database } from '../services/firebase'

type FirebaseReturn = Record<
  string,
  {
    title: string
    description?: string
    author: {
      id: string
      name: string
      avatar: string
    }
    endedAt: string | null
    questions: any[]
  }
>

type roomQuestionsType = Record<
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

export async function retrieveData (refUrl: string) {
  const ref = database.ref(refUrl)
  const snapshot = await ref.once('value')
  if (snapshot.exists()) {
    return snapshot.val()
  }
}

export function mapRoomData (roomData: FirebaseReturn) {
  return Object.entries(roomData || {}).map(([key, value]) => ({
    id: key,
    title: value.title,
    description: value.description,
    author: value.author,
    endedAt: value.endedAt || null,
    questionNum: Object.keys(value.questions || {}).length
  }))
}

export function mapQuestionsData (questionsData: roomQuestionsType) {
  return Object.entries(questionsData || {}).map(([key, value]) => {
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
  })
}

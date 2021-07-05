import { createContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

type FirebaseReturn = Record<
  string,
  {
    title: string;
    description?: string;
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    endedAt: string | null;
    questions: any[];
  }
>;
type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  isUserDeleted: boolean;
  isAdminDeleted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

type RoomType = {
  id: string;
  title: string;
  questions?: QuestionType[];
  description?: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  endedAt: string | null;
};

type RoomsContextType = {
  rooms: RoomType[];
  handleCreateRoom: (
    title: string,
    description: string,
  ) => Promise<string | null | undefined>;
  isLoadingRooms: boolean;
  handleLoadQuestions: (roomId: string) => QuestionType[];
  isLoadingQuestions: boolean;
  filterRoom: (roomId: string) => RoomType;
};

type RoomsContextProviderProps = {
  children: ReactNode;
};

type roomQuestionsType = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    isUserDeleted: boolean;
    isAdminDeleted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

export const RoomsContext = createContext({} as RoomsContextType);

export function RoomsContextProvider(props: RoomsContextProviderProps) {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    try {
      database.ref('rooms').on('value', function (snapshot) {
        const databaseRooms = snapshot.val();
        const mappedRooms = Object.entries(
          (databaseRooms as FirebaseReturn) ?? {},
        ).map(([key, value]) => ({
          id: key,
          title: value.title,
          description: value.description,
          author: value.author,
          endedAt: value.endedAt,
          questionNum: Object.keys(value.questions || {}).length,
        }));
        // Ended rooms go to bottom, then sorts by number of comments
        setRooms(
          mappedRooms.sort((a, b) =>
            Number(!!b.endedAt) > Number(!!a.endedAt)
              ? -1
              : a.questionNum < b.questionNum
              ? 0
              : -1,
          ),
        );
        setIsLoadingRooms(false);
      });
    } catch {
      console.error('Ocorreu um erro ao carregar as salas');
    }
  }, [user]);

  async function handleCreateRoom(title: string, description: string) {
    if (title.trim() === '' || !user) {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title,
      description,
      author: { id: user?.id, name: user?.name, avatar: user?.avatar },
    });

    //history.push(`/rooms/${firebaseRoom.key}`);
    return firebaseRoom ? firebaseRoom.key : null;
  }

  function handleLoadQuestions(roomId: string): QuestionType[] {
    setIsLoadingQuestions(true);
    const roomRef = database.ref(`rooms/${roomId}/questions`);
    let retQuestions: QuestionType[] = [];
    roomRef.on('value', (questions) => {
      const roomQuestions = questions.val();
      if (!roomQuestions) {
        setIsLoadingQuestions(false);
        return;
      }
      const parsedQuestions: QuestionType[] = Object.entries(
        (roomQuestions as roomQuestionsType) || {},
      ).map(([key, value]) => {
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
            ([key, like]) => like.authorId === user?.id,
          )?.[0],
        };
      });
      setIsLoadingQuestions(false);
      retQuestions = parsedQuestions;
    });
    return retQuestions;
  }

  function filterRoom(roomId: string) {
    const filteredRoom = rooms.filter((room) => room.id === roomId)[0];
    return filteredRoom || null;
  }

  return (
    <RoomsContext.Provider
      value={{
        rooms,
        handleCreateRoom,
        isLoadingRooms,
        handleLoadQuestions,
        isLoadingQuestions,
        filterRoom,
      }}>
      {props.children}
    </RoomsContext.Provider>
  );
}

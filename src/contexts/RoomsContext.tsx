import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { mapQuestionsData, mapRoomData, retrieveData } from '../utils/firebase';

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
  likeId: any;
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
  handleLoadQuestions: (roomId: string) => Promise<QuestionType[]>;
  isLoadingQuestions: boolean;
  filterRoom: (roomId: string) => RoomType;
};

type RoomsContextProviderProps = {
  children: ReactNode;
};

export const RoomsContext = createContext({} as RoomsContextType);

export function RoomsContextProvider(props: RoomsContextProviderProps) {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const { user } = useAuth();

  const fetchRooms = useCallback(async () => {
    setIsLoadingRooms(true);
    const rooms = await retrieveData('rooms');
    const mappedRooms = await mapRoomData(rooms);
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
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

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

  const handleLoadQuestions = useCallback(async (roomId: string) => {
    setIsLoadingQuestions(true);
    const questions = await retrieveData(`rooms/${roomId}/questions`);
    const mappedQuestions = await mapQuestionsData(questions);
    setIsLoadingQuestions(false);
    return mappedQuestions;
  }, []);

  const filterRoom = useCallback(
    (roomId: string) => {
      const filteredRoom = rooms.filter((room) => room.id === roomId)[0];
      return filteredRoom || null;
    },
    [rooms],
  );

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

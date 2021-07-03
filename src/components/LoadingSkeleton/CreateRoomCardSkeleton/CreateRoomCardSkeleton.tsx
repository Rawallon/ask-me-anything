import { CreateRoomCardContainer } from './style';

export function CreateRoomCardSkeleton() {
  return (
    <CreateRoomCardContainer>
      <div className="first-row">
        <div className="user-image"></div>
        <div className="fake-input"></div>
      </div>
    </CreateRoomCardContainer>
  );
}

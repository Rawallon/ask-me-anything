import { CreateRoomCardContainer } from './style';
import { Shimmer } from './../Shimmer/Shimmer';

export function CreateRoomCardSkeleton() {
  return (
    <CreateRoomCardContainer>
      <div className="first-row">
        <div className="user-image"></div>
        <div className="fake-input"></div>
      </div>
      <Shimmer />
    </CreateRoomCardContainer>
  );
}

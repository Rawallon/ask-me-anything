import { RoomCardContainer } from './style';
import { Shimmer } from '../Shimmer/Shimmer';

export function RoomCardSkeleton() {
  return (
    <RoomCardContainer>
      <div className="user-info"></div>
      <div className="post-info">
        <div className="post-title"></div>
        <div className="post-description"></div>
      </div>
      <Shimmer />
    </RoomCardContainer>
  );
}

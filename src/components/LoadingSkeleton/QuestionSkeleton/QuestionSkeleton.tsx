import { QuestionCard } from './style';
import { Shimmer } from './../Shimmer/Shimmer';

export function QuestionSkeleton() {
  return (
    <QuestionCard>
      <div className="post-question"></div>
      <footer>
        <div className="user-info">
          <div className="user-picture"></div>
          <div className="user-name"></div>
        </div>
        <div>
          <div className="user-option"></div>
        </div>
      </footer>
      <Shimmer />
    </QuestionCard>
  );
}

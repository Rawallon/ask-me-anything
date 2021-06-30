import copyImg from '../../assets/images/copy.svg';
import { RoomCodeContainer } from './style';

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <RoomCodeContainer className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>{props.code}</span>
    </RoomCodeContainer>
  );
}

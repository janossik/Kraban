import { IUserProps } from "@/types";
import { Status, Wrapper } from "./UserCard.styles";

const UserCard = (props: IUserProps & { index: number }) => {
  return (
    <Wrapper index={props.index + 1}>
      <Status status={props.status} />
      <h2>
        {props.firstName} {props.lastName}
      </h2>
      <p>{props.email}</p>
    </Wrapper>
  );
};

export default UserCard;

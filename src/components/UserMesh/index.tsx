import useGet from "@/hooks/useGet";
import UserService from "@/service/UserService";
import { IUserProps } from "@/types";
import UserCard from "./UserCard";
import { UserCardSkeleton } from "./UserCard/UserCardSkeleton";
import { Wrapper } from "./UserMesh.styles";

const UserMesh = ({
  users,
  loading,
}: {
  users: IUserProps[];
  loading: boolean;
}) => {
  return (
    <Wrapper>
      {loading ? (
        <>
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
        </>
      ) : (
        <>
          {users?.map((user, index) => (
            <UserCard key={user.uid} index={index} {...user} />
          ))}
        </>
      )}
    </Wrapper>
  );
};

export default UserMesh;

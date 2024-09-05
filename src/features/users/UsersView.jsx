import { useGetUsersQuery } from "./usersSlice";
import UserView from "./UserView";
import { BallTriangle } from "react-loader-spinner";

const UsersView = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;

  // todo: style '.loader'
  if (isLoading) {
    content = (
      <>
        <p className="loader">Loading...</p>
        <div className="loader">
          <BallTriangle height={100} color="#61dbfb" />
        </div>
      </>
    );
  } else if (isError) {
    content = <p className="errmsg">{error.data.message}</p>;
  } else if (isSuccess) {
    const { ids } = users;
    const usersTable = ids?.length
      ? ids.map((userId) => 
          <UserView key={userId} userId={userId} />
        )
      : null;

    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Username
            </th>
            <th scope="col" className="table__th user__roles">
              Roles
            </th>
            <th scope="col" className="table__th user__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{usersTable}</tbody>
      </table>
    );
  }

  return content;
};

export default UsersView;

import { useGetUsersQuery } from "./usersSlice";

const UsersView = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery();

  let content;

  // todo: style '.loader'
  if (isLoading) {
    content =
    <>
      <p className="loader">Loading...</p>
      <div className="loader">
        <BallTriangle 
        height={100}
        color="#61dbfb" />
      </div>
    </>
  }
  if (isError) {
    content =
    <p className='errmsg'>
      {error.data.message}
    </p>
  }

  return (
    <h1>UsersList</h1>
  );
}

export default UsersView;
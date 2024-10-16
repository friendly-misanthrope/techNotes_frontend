import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersSlice";
import { useNavigate } from "react-router-dom";
import { EMPLOYEE_ROLES } from "../../config/roles";

const USER_REGEX = /^[A-z0-9]{4,24}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{8,32}$/;

const AddUserView = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);

  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { username, password, confirmPassword } = user;

  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  const userChangeHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const rolesChangeHandler = (e) => {
    const userRoles = Array.from(
      e.target.selectedOptions,
      (userRole) => userRole.value
    )
    setRoles(userRoles)
  };

  const validConfirmPassword = password === confirmPassword;

  const userDataValid = [
    roles.length,
    validUsername,
    validPassword,
    validConfirmPassword,
  ].every(Boolean);

  const saveUser = async (e) => {
    e.preventDefault();
    if (userDataValid) {
      await addNewUser({ username, password, confirmPassword, roles });
    }
    if (isSuccess) {
      setUser({
        username: '',
        password: '',
        confirmPassword: ''
      })
      setRoles([])
      navigate('/dashboard/users')
    }
  };

  const rolesOptions = Object.values(EMPLOYEE_ROLES).map(
    (role) => (
      <option key={role} value={role}>
        {role}
      </option>
    )
  )

  return (
    <div>

    </div>
  );
};
export default AddUserView;

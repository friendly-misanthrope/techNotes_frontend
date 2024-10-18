import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersSlice";
import { useNavigate } from "react-router-dom";
import { EMPLOYEE_ROLES } from "../../config/roles";

const USER_REGEX = /^[A-z0-9_-]{4,24}$/;
const PWD_REGEX = /^[A-z0-9!@#$%^&*()-_+=\\|/;'<>`~]{8,32}$/;

const AddUserView = () => {

  // RTKQ addNewUser mutation & status object
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  // user roles state array
  const [roles, setRoles] = useState([]);

  // user state object
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { username, password, confirmPassword } = user;

  // Boolean state values for username/password validation
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  // Side effect for testing username input against REGEX pattern
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  // Side effect for testing password input against REGEX pattern
  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  // onChange event handler for username, password, and confirmPassword
  const userChangeHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // onChange event handler for user roles
  const rolesChangeHandler = (e) => {
    const userRoles = Array.from(
      e.target.selectedOptions,
      (userRole) => userRole.value
    )
    setRoles(userRoles)
  };

  // Form input validations
  const validConfirmPassword = password === confirmPassword;

  const userDataValid = [
    roles.length,
    validUsername,
    validPassword,
    validConfirmPassword,
  ].every(Boolean) && !isLoading;

  // onClick event handler for saving user
  const saveUser = async (e) => {
    e.preventDefault();
    try {
      if (userDataValid) {
        await addNewUser({ username, password, confirmPassword, roles });
        setUser({
          username: '',
          password: '',
          confirmPassword: ''
        })
        setRoles([])
        navigate('/dashboard/users')
      }
    } catch(e) {
      console.error(`Unable to add user\nerror: ${e}`)
    }
    
  };

  // select options content
  const rolesOptions = Object.values(EMPLOYEE_ROLES).map(
    (role) => (
      <option key={role} value={role}>
        {role}
      </option>
    )
  )

  // error message classNames
  const errMsg = isError ? "errmsg" : "offscreen"
  const usernameInvalid = !validUsername && username.length ? "form__input--incomplete" : ""
  const pwdInvalid = !validPassword ? "form__input--incomplete" : ""
  const rolesInvalid = !roles.length ? "form__input--incomplete" : ""


  return (
    <div className="data-container">
      <h2 className="data-title">New User</h2>
      <p className={errMsg}>{error?.data?.message}</p>

      <section className="full-card">
        <article className="full-data__card">
          <form>

            {/* Username input */}
            <div className="form-group full-card__section">
              <label htmlFor="username"
              className="card-section__header">Username:</label>
              <input type="text"
              className={`form-control ${usernameInvalid}`} 
              name="username"
              value={username}
              onChange={userChangeHandler} />
              
            </div>
            {
                username.length && usernameInvalid ?
                  <span className="inputErr">
                    Username must be 4-24 characters
                  </span>
                  : null
              }

            <div className="form-group full-card__section">
              <label htmlFor="password"
              className="card-section__header">Password:</label>
              <input type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={userChangeHandler} />
              {
                password.length && pwdInvalid ?
                <span className="inputErr">
                  Password must be 8-24 characters
                </span>
                : null
              }
            </div>

            <div className="form-group full-card__section">
              <label htmlFor="confirmPassword"
              className="card-section__header">Confirm Password:</label>
              <input type="password"
              className="form-control"
              name="confirmPassword"
              value={confirmPassword}
              onChange={userChangeHandler} />
              {
                confirmPassword.length && !validConfirmPassword ?
                <span className="inputErr">
                  Passwords must match
                </span>
                : null
              }
            </div>

            <div className="form-group full-card__section">
              <label htmlFor="roles"
              className="card-section__header">Role:</label>
              <select name="roles"
              className="form-control"
              value={roles}
              multiple={true}
              onChange={rolesChangeHandler}>
                {rolesOptions}
              </select>
            </div>

            <div className="form-group full-data-buttons">
              <button className="btn btn-primary"
              onClick={saveUser}>
                Save
              </button>
              
              <button className="btn btn-secondary"
              onClick={() => navigate('/dashboard/users')}>
                Cancel
              </button>
            </div>
          </form>
        </article>
      </section>
    </div>
  );
};
export default AddUserView;

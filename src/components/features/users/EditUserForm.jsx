import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../../config/roles";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [firstname, setFirstname] = useState(user.first_name);
  const [lastname, setLastname] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [roles, setRoles] = useState(user.roles);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setFirstname("");
      setLastname("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onFirstnameChanged = (e) => setFirstname(e.target.value);
  const onLastnameChanged = (e) => setLastname(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onActiveChanged = () => setActive((prev) => !prev);
  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id, user: user });
  };

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const canSave = [roles.length, username].every(Boolean) && !isLoading;

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  // const validRolesClass = !Boolean(roles.length) ? "form__input--incomplete" : ""

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (password) {
      await updateUser({
        id: user.id,
        username,
        first_name: firstname,
        last_name: lastname,
        email,
        roles,
        password,
        active,
      });
    } else {
      await updateUser({
        id: user.id,
        username,
        first_name: firstname,
        last_name: lastname,
        email,
        roles,
        active,
      });
    }
  };

  const content = (
    <>
      <p className={errClass}>{errContent} </p>
      <section id="edit_user_forms">
        <form className="form" onSubmit={onSaveUserClicked}>
          <label htmlFor="username">Username:</label>
          <input
            className={`form__input ${validUserClass}`}
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={onUsernameChanged}
          />

          <label htmlFor="first_name">First name:</label>
          <input
            className={`form__input ${validUserClass}`}
            id="first_name"
            name="first_name"
            type="text"
            autoComplete="off"
            value={firstname}
            onChange={onFirstnameChanged}
          />

          <label htmlFor="last_name">Last name:</label>
          <input
            className={`form__input ${validUserClass}`}
            id="last_name"
            name="last_name"
            type="text"
            autoComplete="off"
            value={lastname}
            onChange={onLastnameChanged}
          />

          <label htmlFor="email">Email:</label>
          <input
            className={`form__input`}
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            value={email}
            onChange={onEmailChanged}
          />

          {/* <span>[4-12 chars incl. !@#$%] </span> */}
          <label htmlFor="roles">Assigned Roles:</label>
          <select
            className={"form__select"}
            id="roles"
            name="roles"
            type="text"
            value={roles}
            multiple={true}
            size="3"
            onChange={onRolesChanged}
          >
            {options}
          </select>

          <label
            className="form__label form__checkbox-container"
            htmlFor="user-active"
          >
            ACTIVE:
            <input
              className="form__checkbox"
              id="user-active"
              name="user-active"
              type="checkbox"
              checked={active}
              onChange={onActiveChanged}
            />
          </label>

          <label htmlFor="password">Password:</label>
          <input
            className={`form__input ${validPwdClass}`}
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}
          />

          <div className="button_div">
            <button
              id="form__action-buttons"
              className="icon-button"
              title="Save"
              disabled={!canSave}
            >
              Save
            </button>
          </div>
        </form>
      </section>
      <div>
        <h2>Delete User</h2>
        <div>
          <button type="button" title="Delete" onClick={onDeleteUserClicked}>
            Delete
          </button>
        </div>
      </div>
    </>
  );

  return content;
};

export default EditUserForm;

import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

const VALID_USER = /^[A-z]{4,24}$/
const VALID_PWD = /^[A-z0-9!@#$%]{8,32}$/

const AddUserView = () => {
  return (
    <div>AddUserView</div>
  )
}
export default AddUserView;
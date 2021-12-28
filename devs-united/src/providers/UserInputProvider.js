import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { Spinner } from "../utils/Spinner";
import ErrorWarning from "../components/ErrorWarning";

const UserInputContext = React.createContext();
const useUserInput = () => React.useContext(UserInputContext);

const UserInputProvider = ({ children }) => {
  const [userInput, setUserInput] = useState("");
}

export default UserInputProvider;

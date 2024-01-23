import { createContext, useReducer } from "react";
import { SortReducer } from "../reducer/SortReducer";

const Sort = createContext();

const INITIAL_STATE = {
  value: 0,
  name: "Popularity",
};

export function SortProvider({ children }) {
  const [state, dispatch] = useReducer(SortReducer, INITIAL_STATE);

  return <Sort.Provider value={[state, dispatch]}>{children}</Sort.Provider>;
}

export default Sort;

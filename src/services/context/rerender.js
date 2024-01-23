import { createContext, useReducer } from "react";
import { RerenderReducer } from "../reducer/RerenderReducer";

const Rerender = createContext();

const INITIAL_STATE = false;

export function RerenderProvider({ children }) {
  const [state, dispatch] = useReducer(RerenderReducer, INITIAL_STATE);

  return (
    <Rerender.Provider value={[state, dispatch]}>{children}</Rerender.Provider>
  );
}

export default Rerender;

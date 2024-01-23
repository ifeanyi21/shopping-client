import { ACTION_TYPES } from "../actions/actions";

export const RerenderReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.RERENDER_START:
      return true;

    case ACTION_TYPES.RERENDER_STOP:
      return false;

    default:
      return state;
  }
};

import { ACTION_TYPES } from "../actions/actions";

export const SortReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SORT_POPULARITY:
      return {
        value: 0,
        name: "Popularity",
      };

    case ACTION_TYPES.SORT_HIGH_TO_LOW:
      return {
        value: 1,
        name: "High to Low",
      };

    case ACTION_TYPES.SORT_LOW_TO_HIGH:
      return {
        value: 2,
        name: "Low to High",
      };

    default:
      return state;
  }
};

import { ACTION_TYPES } from "../actions/actions";

export const CartReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TO_CART:
      return [...state];

    case ACTION_TYPES.DELETE_FROM_CART:
      const removeItem = state.filter((item) => {
        return item.id !== action.payload.productId;
      });
      return removeItem;

    default:
      return state;
  }
};

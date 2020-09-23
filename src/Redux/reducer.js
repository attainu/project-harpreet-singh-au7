export const initialState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, items) => items.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      //find the product in the basket
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      //Copied basket
      let newBasket = [...state.basket];
      //ccondition if exists freak out that product

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`No such item with id: ${action.id} exists `);
      }

      //since we are splicing so returning basket as new basket

      return { ...state, basket: newBasket };

    default:
      return state;
  }
};

export default reducer;

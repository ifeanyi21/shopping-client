import {createContext, useReducer} from 'react'
import { CartReducer } from '../reducer/CartReducer';

const Cart = createContext()

const INITIAL_STATE = [];

export function CartProvider({children}){

    const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE)

    return <Cart.Provider value={[state, dispatch]}>
        {children}
    </Cart.Provider>
}

export default Cart
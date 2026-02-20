import { createContext, useReducer} from 'react'



const product_type = {
  LOAD_PRODUCTS: 'LOAD_PRODUCTS',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  UPDATE_BASIC: 'UPDATE_BASIC',
  LOAD_USERS: 'LOAD_USERS',
  DELETE_USER: 'DELETE_USER',
  SELECT_PRODUCT: 'SELECT_PRODUCT',
  RESET: 'RESET'
};


export const ProductContext = createContext({});

const productReducer = (state, action) => {
    switch (action.type) {
      case product_type.LOAD_PRODUCTS:
        return {
          ...state,
          products: { details: action.payload, version: state.products.version + 1 },
          selectProduct: {...state.selectedProduct, version: state.selectedProduct.version + 1}
        };
      case product_type.DELETE_PRODUCT:
        const newProduct = state.products.details.filter(p => p.id !== Number(action.payload))
        const newSelectedProduct = state.selectedProduct.id === Number(action.payload) ?
          {id: null, details: null, version: state.selectedProduct.version + 1} :
          {...state.selectedProduct}
        return {
          ...state,
          products: { details: newProduct, version: state.products.version + 1 },
          selectedProduct: newSelectedProduct
        }
      case product_type.LOAD_USERS:
        return {
          ...state,
          users: { details: action.payload, version: state.users.version + 1 },
        };
      case product_type.DELETE_USER:
        const newUser = state.users.details.filter(p => p.id !== action.payload)
        return {
          ...state,
          users: { details: newUser, version: state.users.version + 1 },
        }
      case product_type.RESET:
        return {
          products: {details: [], version: 0} ,
          selectedProduct: {id: null, details: null, version: 0},
          users: {details: [], version: 0}
        }
      case product_type.SELECT_PRODUCT:
        const selectProduct = state.products.details.find(i => i.id === Number(action.payload))
        return {...state, selectedProduct: {id: Number(action.payload), details: selectProduct, version: state.selectedProduct.version + 1}}
      default:
        return state;
    }
};




export function ProductProvider({children}) {
  const [state, dispatch] = useReducer(productReducer, {
    products: {details: [], version: 0} ,
    selectedProduct: {id: null, details: null, version: 0},
    users: {details: [], version: 0}
  });

  const loadProducts = (data) => {
    dispatch({ type: product_type.LOAD_PRODUCTS, payload: data });
  };

  const deleteProducts = (data) => {
    dispatch({ type: product_type.DELETE_PRODUCT, payload: data });
  };

  const loadUsers = (data) => {
    dispatch({ type: product_type.LOAD_USERS, payload: data });
  };

  const deleteUsers = (id) => {
    dispatch({ type: product_type.DELETE_USER, payload: id });
  };

  const selectProduct = (id) => {
    dispatch({ type: product_type.SELECT_PRODUCT, payload: id });
  };

  const reset = () => {
    dispatch({ type: product_type.RESET });
  };

    return (
        <ProductContext.Provider value={{...state, loadProducts, deleteProducts, loadUsers, deleteUsers, selectProduct, reset}}>
            {children}
        </ProductContext.Provider>

    )

};



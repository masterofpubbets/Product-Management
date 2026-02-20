import { createContext, useReducer} from 'react'



const strategy_type = {
  LOAD_STRATEGY: 'LOAD_STRATEGY',
  DELETE_STRATEGY: 'DELETE_STRATEGY',
  UPDATE_BASIC: 'UPDATE_BASIC',
};


export const StrategyContext = createContext({});

const strategyReducer = (state, action) => {
  switch (action.type) {
    case strategy_type.LOAD_STRATEGY:
      return {
        ...state,
        strategy: { details: action.payload, version: state.strategy.version + 1 },
      };
    case strategy_type.DELETE_STRATEGY:
      const newStakeholder = state.strategy.details.filter(p => p.id !== Number(action.payload))
      return {
        ...state,
        strategy: { details: newStakeholder, version: state.strategy.version + 1 },
      }
    case strategy_type.UPDATE_BASIC:
      let newSt = state.strategy.details.filter(p => p.id !== Number(action.payload.id))
      newSt.push(action.payload)
      return {
        ...state,
        strategy: { details: newSt, version: state.strategy.version + 1 },
      }
    default:
      return state;
  }
};




export function StrategyProvider({children}) {
  const [state, dispatch] = useReducer(strategyReducer, {
    strategy: {details: [], version: 0} ,
  });

  const loadStrategy = (data) => {
    dispatch({ type: strategy_type.LOAD_STRATEGY, payload: data });
  };




  return (
    <StrategyContext.Provider value={{...state, loadStrategy}}>
      {children}
    </StrategyContext.Provider>

  )

};



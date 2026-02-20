import { createContext, useReducer} from 'react'



const targetAud_type = {
  LOAD: 'LOAD',
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
};


export const TargetAudContext = createContext({});

const targetAudReducer = (state, action) => {
  switch (action.type) {
    case targetAud_type.LOAD:
      return {
        ...state,
        targetAud: { details: action.payload, version: state.targetAud.version + 1 },
      };
    case targetAud_type.ADD:
      return {
        ...state,
        targetAud: { details: [...state.targetAud.details, action.payload], version: state.targetAud.version + 1 },
      };
    case targetAud_type.DELETE:
      const newFeature = state.targetAud.details.filter(p => p.id !== Number(action.payload))
      return {
        ...state,
        targetAud: { details: newFeature, version: state.targetAud.version + 1 },
      }
    case targetAud_type.UPDATE:
      let newSt = state.targetAud.details.filter(p => p.id !== Number(action.payload.id))
      newSt.push(action.payload)
      return {
        ...state,
        targetAud: { details: newSt, version: state.targetAud.version + 1 },
      }
    default:
      return state;
  }
};




export function TargetAudProvider({children}) {
  const [state, dispatch] = useReducer(targetAudReducer, {
    targetAud: {details: [], version: 0} ,
  });

  const loadTargetAud = (data) => {
    dispatch({ type: targetAud_type.LOAD, payload: data });
  };

  const addTargetAud = (data) => {
    dispatch({ type: targetAud_type.ADD, payload: data });
  };

  const deleteTargetAud = (id) => {
    dispatch({ type: targetAud_type.DELETE, payload: id });
  };

  const updateTargetAud = (data) => {
    dispatch({ type: targetAud_type.UPDATE, payload: data });
  };




  return (
    <TargetAudContext.Provider value={{...state, loadTargetAud, addTargetAud, deleteTargetAud, updateTargetAud}}>
      {children}
    </TargetAudContext.Provider>

  )

};



import { createContext, useReducer} from 'react'



const stakeholder_type = {
  LOAD_STAKEHOLDER: 'LOAD_STAKEHOLDER',
  DELETE_STAKEHOLDER: 'DELETE_STAKEHOLDER',
  UPDATE_BASIC: 'UPDATE_BASIC',
};


export const StakeholderContext = createContext({});

const stakeholderReducer = (state, action) => {
  switch (action.type) {
    case stakeholder_type.LOAD_STAKEHOLDER:
      return {
        ...state,
        stakeholders: { details: action.payload, version: state.stakeholders.version + 1 },
      };
    case stakeholder_type.DELETE_STAKEHOLDER:
      const newStakeholder = state.stakeholders.details.filter(p => p.id !== Number(action.payload))
      return {
        ...state,
        stakeholders: { details: newStakeholder, version: state.stakeholders.version + 1 },
      }
    case stakeholder_type.UPDATE_BASIC:
      let newSt = state.stakeholders.details.filter(p => p.id !== Number(action.payload.id))
      newSt.push(action.payload)
      return {
        ...state,
        stakeholders: { details: newSt, version: state.stakeholders.version + 1 },
      }
    default:
      return state;
  }
};




export function StakeholderProvider({children}) {
  const [state, dispatch] = useReducer(stakeholderReducer, {
    stakeholders: {details: [], version: 0} ,
  });

  const loadStakeholders = (data) => {
    dispatch({ type: stakeholder_type.LOAD_STAKEHOLDER, payload: data });
  };

  const UpdateStakeholders = (data) => {
    dispatch({ type: stakeholder_type.UPDATE_BASIC, payload: data });
  };

  const deleteStakeholder = (data) => {
    dispatch({ type: stakeholder_type.DELETE_STAKEHOLDER, payload: data });
  };


  return (
    <StakeholderContext.Provider value={{...state, loadStakeholders, UpdateStakeholders, deleteStakeholder}}>
      {children}
    </StakeholderContext.Provider>

  )

};



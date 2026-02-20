import { createContext, useReducer} from 'react'



const competition_type = {
  LOAD: 'LOAD',
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
};


export const CompetitionContext = createContext({});

const competitionReducer = (state, action) => {
  switch (action.type) {
    case competition_type.LOAD:
      return {
        ...state,
        competition: { details: action.payload, version: state.competition.version + 1 },
      };
    case competition_type.ADD:
      return {
        ...state,
        competition: { details: [...state.competition.details, action.payload], version: state.competition.version + 1 },
      };
    case competition_type.DELETE:
      const newFeature = state.competition.details.filter(p => p.id !== Number(action.payload))
      return {
        ...state,
        competition: { details: newFeature, version: state.competition.version + 1 },
      }
    case competition_type.UPDATE:
      let newSt = state.competition.details.filter(p => p.id !== Number(action.payload.id))
      newSt.push(action.payload)
      return {
        ...state,
        competition: { details: newSt, version: state.competition.version + 1 },
      }
    default:
      return state;
  }
};




export function CompetitionProvider({children}) {
  const [state, dispatch] = useReducer(competitionReducer, {
    competition: {details: [], version: 0} ,
  });

  const loadCompetition = (data) => {
    dispatch({ type: competition_type.LOAD, payload: data });
  };

  const addCompetition = (data) => {
    dispatch({ type: competition_type.ADD, payload: data });
  };

  const deleteCompetition = (id) => {
    dispatch({ type: competition_type.DELETE, payload: id });
  };

  const updateCompetition = (data) => {
    dispatch({ type: competition_type.UPDATE, payload: data });
  };




  return (
    <CompetitionContext.Provider value={{...state, loadCompetition, deleteCompetition, updateCompetition, addCompetition}}>
      {children}
    </CompetitionContext.Provider>

  )

};



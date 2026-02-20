import { createContext, useReducer} from 'react'



const businessModel_type = {
  LOAD: 'LOAD',
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
  CLEAR: 'CLEAR',
};

const initDetails = {
  partner: null,
  activity: null,
  prop: null,
  resource: null,
  relationship: null,
  channels: null,
  segment: null,
  structures: null,
  gain: null,

};

export const BusinessModelContext = createContext({});

const businessModelReducer = (state, action) => {
  switch (action.type) {
    case businessModel_type.LOAD:
      return {
        ...state,
        businessModel: { details: action.payload, version: state.businessModel.version + 1 },
      };
    case businessModel_type.ADD:
      return {
        ...state,
        businessModel: { details: [...state.businessModel.details, action.payload], version: state.businessModel.version + 1 },
      };
    case businessModel_type.DELETE:
      const newFeature = state.businessModel.details.filter(p => p.id !== Number(action.payload))
      return {
        ...state,
        businessModel: { details: newFeature, version: state.businessModel.version + 1 },
      }
    case businessModel_type.UPDATE:
      let newSt = state.businessModel.details.filter(p => p.id !== Number(action.payload.id))
      newSt.push(action.payload)
      return {
        ...state,
        businessModel: { details: newSt, version: state.businessModel.version + 1 },
      }
    case businessModel_type.CLEAR:
      return {
        ...state,
        businessModel: { details: initDetails, version: state.businessModel.version + 1 },
      };

    default:
      return state;
  }
};


export function BusinessModelProvider({children}) {
  const [state, dispatch] = useReducer(businessModelReducer, {
    businessModel: {details: initDetails, version: 0} ,
  });

  const loadBusinessModel = (data) => {
    dispatch({ type: businessModel_type.LOAD, payload: data });
  };

  const clearBusinessModel = () => {
    dispatch({ type: businessModel_type.CLEAR });
  };


  return (
    <BusinessModelContext.Provider value={{...state, loadBusinessModel, clearBusinessModel}}>
      {children}
    </BusinessModelContext.Provider>

  )

};



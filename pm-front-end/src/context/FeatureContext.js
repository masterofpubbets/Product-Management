import { createContext, useReducer} from 'react'



const feature_type = {
  LOAD: 'LOAD',
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
  CLEAR_INI: 'CLEAR_INI',
};


export const FeatureContext = createContext({});

const featureReducer = (state, action) => {
  switch (action.type) {
    case feature_type.LOAD:
      return {
        ...state,
        features: { details: action.payload, version: state.features.version + 1 },
      };
    case feature_type.ADD:
      return {
        ...state,
        features: {
          details: [...state.features.details, action.payload],
          version: state.features.version + 1,
        },
      };
    case feature_type.DELETE:
      const newFeature = state.features.details.filter((p) => p.id !== Number(action.payload));
      return {
        ...state,
        features: { details: newFeature, version: state.features.version + 1 },
      };
    case feature_type.UPDATE:
      let newSt = state.features.details.filter((p) => p.id !== Number(action.payload.id));
      newSt.push(action.payload);
      return {
        ...state,
        features: { details: newSt, version: state.features.version + 1 },
      };
    case feature_type.CLEAR_INI:
      const currentFeature = state.features.details.find((p) => p.id === Number(action.payload));
      const clearFeature = {...currentFeature, iniid: null};
      const currentFeatures = state.features.details
        .find((p) => p.id !== Number(action.payload))
        .push(clearFeature);
      return {
        ...state,
        features: { details: currentFeatures, version: state.features.version + 1 },
      };
    default:
      return state;
  }
};




export function FeatureProvider({children}) {
  const [state, dispatch] = useReducer(featureReducer, {
    features: {details: [], version: 0} ,
  });

  const loadFeature = (data) => {
    dispatch({ type: feature_type.LOAD, payload: data });
  };

  const addFeature = (data) => {
    dispatch({ type: feature_type.ADD, payload: data });
  };

  const deleteFeature = (id) => {
    dispatch({ type: feature_type.DELETE, payload: id });
  };

  const updateFeature = (data) => {
    dispatch({ type: feature_type.UPDATE, payload: data });
  };

  const clearFeatureIni = (id) => {
    dispatch({ type: feature_type.CLEAR_INI, payload: id });
  };




  return (
    <FeatureContext.Provider
      value={{ ...state, loadFeature, deleteFeature, updateFeature, addFeature, clearFeatureIni }}
    >
      {children}
    </FeatureContext.Provider>
  );

};



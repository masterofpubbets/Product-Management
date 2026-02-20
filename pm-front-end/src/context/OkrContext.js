import { createContext, useReducer} from 'react'



const strategy_type = {
  LOAD_Objectives: 'LOAD_Objectives',
  ADD_Objectives: 'ADD_Objectives',
  LOAD_KeyResults: 'LOAD_KeyResults',
  LOAD_Initiatives: 'LOAD_Initiatives',
  LOAD_Features: 'LOAD_Features',
  CLEAR_INI: 'CLEAR_INI',
  Delete_Feature: 'Delete_Feature',
  LOAD_Summary: 'LOAD_Summary',
  LOAD_KeyStatus: 'LOAD_KeyStatus',
  ADD_Status: 'ADD_Status',
  DEL_Status: 'DEL_Status',
  Edit_Status: 'Edit_Status',
};


export const OkrContext = createContext({});

const okrReducer = (state, action) => {
  switch (action.type) {
    case strategy_type.LOAD_Objectives:
      return {
        ...state,
        objectives: { details: action.payload, version: state.objectives.version + 1 },
      };
    case strategy_type.ADD_Objectives:
      let addObj = { ...state.objectives.details };
      addObj.push(action.payload);
      return {
        ...state,
        objectives: { details: addObj, version: state.objectives.version + 1 },
      };
    case strategy_type.LOAD_KeyResults:
      return {
        ...state,
        keyResults: { details: action.payload, version: state.keyResults.version + 1 },
      };
    case strategy_type.LOAD_Initiatives:
      return {
        ...state,
        initiatives: { details: action.payload, version: state.initiatives.version + 1 },
      };
    case strategy_type.LOAD_Features:
      return {
        ...state,
        features: { details: action.payload, version: state.features.version + 1 },
      };
    case strategy_type.LOAD_Summary:
      return {
        ...state,
        summary: { details: action.payload, version: state.summary.version + 1 },
      };
    case strategy_type.LOAD_KeyStatus:
      return {
        ...state,
        keyStatus: { details: action.payload, version: state.keyStatus.version + 1 },
      };
    case strategy_type.CLEAR_INI:
      const currentFeature = state.features.details.find((p) => p.id === Number(action.payload));
      const clearFeature = { ...currentFeature, iniid: null };
      let currentFeatures = state.features.details.filter((p) => p.id !== Number(action.payload));
      currentFeatures.push(clearFeature);
      return {
        ...state,
        features: { details: currentFeatures, version: state.features.version + 1 },
      };
    case strategy_type.Delete_Feature:
      const newFeature = state.features.details.filter((p) => p.id !== Number(action.payload));
      return {
        ...state,
        features: { details: newFeature, version: state.features.version + 1 },
      };
    case strategy_type.DEL_Status:
      const updatedStatus = state.keyStatus.details.filter((s) => s.id !== Number(action.payload));
      return {
        ...state,
        keyStatus: { details: updatedStatus, version: state.keyStatus.version + 1 },
      };
    case strategy_type.Edit_Status:
      let editStatus = state.keyStatus.details.filter((s) => s.id !== Number(action.payload));
      editStatus.push(action.payload);
      return {
        ...state,
        keyStatus: { details: editStatus, version: state.keyStatus.version + 1 },
      };

    default:
      return state;
  }
};




export function OkrProvider({children}) {
  const [state, dispatch] = useReducer(okrReducer, {
    objectives: {details: [], version: 0},
    keyResults: {details: [], version: 0},
    initiatives: {details: [], version: 0},
    features: {details: [], version: 0},
    summary: {details: [], version: 0},
    keyStatus: {details: [], version: 0},
  });

  const loadObjectives = (data) => {
    dispatch({ type: strategy_type.LOAD_Objectives, payload: data });
  };

  const loadKeyResults = (data) => {
    dispatch({ type: strategy_type.LOAD_KeyResults, payload: data });
  };

  const loadInitiatives = (data) => {
    dispatch({ type: strategy_type.LOAD_Initiatives, payload: data });
  };

  const loadFeatures = (data) => {
    dispatch({ type: strategy_type.LOAD_Features, payload: data });
  };

  const clearFeatureIni = (id) => {
    dispatch({ type: strategy_type.CLEAR_INI, payload: id });
  };

  const deleteFeature = (id) => {
    dispatch({ type: strategy_type.Delete_Feature, payload: id });
  };

  const loadSummary = (data) => {
    dispatch({ type: strategy_type.LOAD_Summary, payload: data });
  };

  const loadKeyStatus = (data) => {
    dispatch({ type: strategy_type.LOAD_KeyStatus, payload: data });
  };

  const addKeyStatus = (data) => {
    dispatch({ type: strategy_type.ADD_Status, payload: data });
  };

  const delKeyStatus = (id) => {
    dispatch({ type: strategy_type.ADD_Status, payload: id });
  };

  const updateKeyStatus = (data) => {
    dispatch({ type: strategy_type.Edit_Status, payload: data });
  };

  const addObj = (data) => {
    dispatch({ type: strategy_type.ADD_Objectives, payload: data });
  };


  return (
    <OkrContext.Provider
      value={{
        ...state,
        loadObjectives,
        loadKeyResults,
        loadInitiatives,
        loadFeatures,
        clearFeatureIni,
        deleteFeature,
        loadSummary,
        loadKeyStatus,
        addKeyStatus,
        delKeyStatus,
        updateKeyStatus,
        addObj,
      }}
    >
      {children}
    </OkrContext.Provider>
  );

};



import { createContext, useReducer} from 'react'

const documentType = {
    MODEL_WHITE: 'MODEL_WHITE',
    MODEL_Default: 'MODEL_Default'
};

export const ModelContext = createContext()

const modelReducer = (state, action) => {
    switch (action.type) {
        case documentType.MODEL_WHITE:
            return {...state, docId: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6c2lsbGVubzIvU0lsbGVuby1XaGl0ZS5ud2Q'}
        case documentType.MODEL_Default:
            return {...state, docId: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6c2lsbGVubzIvU0lsbGVuby5ud2Q'}
        default:
            return state
    }
};

export function ModelProvider({children}) {
    const [state, dispatch] = useReducer(modelReducer, {
        docId: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6c2lsbGVubzIvU0lsbGVuby1XaGl0ZS5ud2Q'
    })

    const setModelWhite = () => {
        dispatch({type: documentType.MODEL_WHITE})
    }
    const setModelDefault = () => {
        dispatch({type: documentType.MODEL_Default})
    }

    return (
        <ModelContext.Provider value={{...state, setModelWhite, setModelDefault}}>
            {children}
        </ModelContext.Provider>
    )
}
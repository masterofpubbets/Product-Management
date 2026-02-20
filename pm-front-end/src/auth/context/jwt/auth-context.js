import { version } from 'nprogress';
import { createContext, useReducer} from 'react'


const userType = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    UPDATE_ABOUT: 'UPDATE_ABOUT',
    UPDATE_SOCIAL: 'UPDATE_SOCIAL',
    UPDATE_BASIC: 'UPDATE_BASIC',
    UPDATE_LOGO: 'UPDATE_LOGO',
    REMOVE_LOGO: 'REMOVE_LOGO',
    UPDATE_SKILLS: 'UPDATE_SKILLS'

};

export const AuthContext = createContext({});

const authReducer = (state, action) => {
    switch (action.type) {
        case userType.LOGIN:
            return {...state, authenticated: true, user: {details: action.payload.details, uuid: action.payload.uuid, version: state.user.version + 1}}
        case userType.LOGOUT:
            return {...state, user: {details: {}, uuid: '', version: state.user.version + 1}, authenticated: false}
        case userType.UPDATE_ABOUT:
            const newDetails = {...state.user.details, about: action.payload}
            return {...state, user: { details: newDetails, uuid: state.user.uuid, version: state.user.version + 1} }
        case userType.UPDATE_SOCIAL:
            const newSocial = {...state.user.details, socials: action.payload}
            return {...state, user: { details: newSocial, uuid: state.user.uuid, version: state.user.version + 1} }
        case userType.UPDATE_BASIC:
            const newbasic = {...state.user.details, details: action.payload}
            return {...state, user: { details: newbasic, uuid: state.user.uuid, version: state.user.version + 1} }
        case userType.UPDATE_LOGO:
            const newLogo = {...state.user.details, logo: action.payload}
            return {...state, user: { details: newLogo, uuid: state.user.uuid, version: state.user.version + 1} }
        case userType.REMOVE_LOGO:
            const newLogo2 = {...state.user.details, logo: null}
            return {...state, user: { details: newLogo2, uuid: state.user.uuid, version: state.user.version + 1} }
        case userType.UPDATE_SKILLS:
            const newSkills = {...state.user.details, skills: action.payload}
            return {...state, user: { details: newSkills, uuid: state.user.uuid, version: state.user.version + 1} }
        default:
            return state
    }
};

export function AuthProvider({children}) {
    const [state, dispatch] = useReducer(authReducer, {
        authenticated: false,
        user: {details: {}, uuid: '', version: 0},
        products: []
    })



    const userLogin = (user) => {
        dispatch({type: userType.LOGIN, payload: user})
    };

    const logout = () => {
        dispatch({type: userType.LOGOUT})
    };

    const updateAbout = (about) => {
        dispatch({type: userType.UPDATE_ABOUT, payload: about})
    };

    const updateSocials = (about) => {
        dispatch({type: userType.UPDATE_SOCIAL, payload: about})
    };

    const updateBasic = (data) => {
        dispatch({type: userType.UPDATE_BASIC, payload: data})
    };

    const updateLogo = (data) => {
        dispatch({type: userType.UPDATE_LOGO, payload: data})
    };

    const removeLogo = () => {
        dispatch({type: userType.REMOVE_LOGO})
    };

    const updateSkills = (data) => {
        dispatch({type: userType.UPDATE_SKILLS, payload: data})
    };


    return (
        <AuthContext.Provider value={{...state, userLogin, logout, updateAbout, updateSocials, updateBasic, updateLogo, removeLogo, updateSkills}}>
            {children}
        </AuthContext.Provider>
    )
}

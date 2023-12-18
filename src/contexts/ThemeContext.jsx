import { createContext, useReducer } from 'react'

const ThemeReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_THEME":
            return { ...state, theme : action.payload };
        default:
            return state;
    }
}

// Themes Context Create
const ThemeContext = createContext();

// themecontextprovider component
const ThemeContextProvider = ({ children }) => {

    // define useReducer
    const [ state, dispatch ] = useReducer(ThemeReducer, {
        theme: 'light'
    })

    const changeTheme = (theme) => {
        dispatch({ type : 'CHANGE_THEME', payload: theme})
    }

    const isDark = state.theme === 'dark';

    return (
        <ThemeContext.Provider value={{ ...state, changeTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeContextProvider }
import { createContext, useEffect, useReducer } from 'react'

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

    const storedTheme = localStorage.getItem('theme');
    const initialTheme = storedTheme ? storedTheme : 'light';

    

    // define useReducer
    const [ state, dispatch ] = useReducer(ThemeReducer, {
        theme: initialTheme
    })

    const changeTheme = (theme) => {
        dispatch({ type : 'CHANGE_THEME', payload: theme})
        localStorage.setItem('theme', theme);
    }

    useEffect(() => {
        localStorage.setItem('theme', state.theme);
    }, [state.theme]);

    const isDark = state.theme === 'dark';

    return (
        <ThemeContext.Provider value={{ ...state, changeTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeContextProvider }
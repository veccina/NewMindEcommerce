import React, { createContext, useContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

const ThemeToggleContext = createContext({
    mode: 'light',
    toggleColorMode: () => {},
});

export function useThemeToggle() {
    return useContext(ThemeToggleContext);
}

export function CustomThemeProvider({ children }) {
    const [mode, setMode] = useState('light');

    const colorMode = useMemo(
        () => ({
            mode,
            toggleColorMode: () => {
                setMode(prev => (prev === 'light' ? 'dark' : 'light'));
            },
        }),
        [mode]
    );

    let theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: { main: '#673AB7' },
                    secondary: { main: '#E91E63' },
                },
                typography: {
                    h4: { fontWeight: 700 },
                    h5: { fontWeight: 600 },
                },
            }),
        [mode]
    );

    theme = responsiveFontSizes(theme);

    return (
        <ThemeToggleContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeToggleContext.Provider>
    );
}

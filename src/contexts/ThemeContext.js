import { createContext, useLayoutEffect, useState } from "react";

const themes = {
    "light": {
        "bg": "#ffffff",
        "bg-panel": "#f0f0f0",
        "bg-canvas": "#181818",
        "bg-input": "#ebebeb",
        "border": "#d9d9d9",
        "border-focus": "#bfbfbf",
        "text-primary": "#000000",
        "text-disabled": "#8c8c8c"
    },
    "dark": {
        "bg": "#141414",
        "bg-panel": "#1f1f1f",
        "bg-canvas": "#181818",
        "bg-input": "#1c1c1c",
        "border": "#2a2a2a",
        "border-focus": "#3d3d3d",
        "text-primary": "#fafafa",
        "text-disabled": "#8c8c8c"
    }
}

export const ThemeContext = createContext();

export function ThemeProvider(props) {
    const [dark, setDark] = useState(window.localStorage.getItem("darkMode"));

    const toggle = () => {
        setDark(!dark);
        window.localStorage.setItem("darkMode", !dark);
    };

    const getTheme = () => {
        return dark ? themes["dark"] : themes["light"];
    }

    const getColour = (colourName) => {
        return getTheme()[colourName];
    }

    const applyCssVars = theme => {
        const root = document.getElementsByTagName("html")[0];
        let style = "";
        for (let key in theme) {
            if (theme.hasOwnProperty(key)) {
                style += `--${key}: ${theme[key]};`;
            }
        }
        root.style.cssText = style;
    }

    useLayoutEffect(() => {
        const lastDark = window.localStorage.getItem("darkMode");
        if (!lastDark || lastDark === "true") {
            setDark(true);
            applyCssVars(themes["dark"]);
            window.localStorage.setItem("darkMode", true);
        }
        else if (lastDark === "false") {
            setDark(false);
            applyCssVars(themes["light"]);
            window.localStorage.setItem("darkMode", false);
        }
    }, [dark]);

    return (
        <ThemeContext.Provider value={{ dark, toggle, getTheme, getColour }}>
            {props.children}
        </ThemeContext.Provider>
    );
}
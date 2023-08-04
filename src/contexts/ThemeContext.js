import { createContext, useLayoutEffect, useState } from "react";


const themes = {
    "light": {
        "bg": "#ffffff",
        "bg-panel": "#f0f0f0",
        "border": "#d9d9d9",
        "border-focus": "#bfbfbf",
        "text-primary": "#000000"
    },
    "dark": {
        "bg": "#181818",
        "bg-panel": "#1f1f1f",
        "border": "#2a2a2a",
        "border-focus": "#3d3d3d",
        "text-primary": "#fafafa"
    }
}


// todo: extend this to allow for more themes

// default context values
export const ThemeContext = createContext({
    dark: false,
    toggle: () => {}
});

export function ThemeProvider(props) {
    const [dark, setDark] = useState(window.localStorage.getItem("darkMode"));

    const toggle = () => {
        setDark(!dark);
        window.localStorage.setItem("darkMode", !dark);
    };

    useLayoutEffect(() => {
        const lastDark = window.localStorage.getItem("darkMode");
        if (!lastDark || lastDark === "true") {
            setDark(true);
            applyTheme(themes["dark"]);
        }
        else if (lastDark === "false") {
            setDark(false);
            applyTheme(themes["light"]);
        }
    }, [dark]);

    const applyTheme = theme => {
        const root = document.getElementsByTagName("html")[0];
        let style = "";
        for (let key in theme) {
            if (theme.hasOwnProperty(key)) {
                style += `--${key}: ${theme[key]};`;
            }
        }
        root.style.cssText = style;
    }

    return (
        <ThemeContext.Provider value={{ dark, toggle }}>
            {props.children}
        </ThemeContext.Provider>
    );
}
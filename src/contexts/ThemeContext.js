import { createContext, useLayoutEffect, useState } from "react";


const themes = {
    "light": {
        "bg": "#ffffff",
        "panel-bg": "#f0f0f0",
        "border": "#d9d9d9",
        "text-primary": "#000000"
    },
    "dark": {
        "bg": "#181818",
        "panel-bg": "#1f1f1f",
        "border": "#2a2a2a",
        "text-primary": "#fafafa"
    }
}


// todo: extend this to allow for more themes

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
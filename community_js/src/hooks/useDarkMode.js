import { useState, useEffect } from 'react';

const useDarkMode = () => {
    const [isDark, setIsDark] = useState(
        localStorage.theme === "dark" ? true : false
    );

    useEffect(()=>{
        if (isDark) {
            document.body.classList.add("dark");
            localStorage.theme = "dark";
        } else {
            document.body.classList.remove("dark");
            localStorage.theme = "ligth";
        }
    }, [isDark]);
    
    return  [isDark, setIsDark];
}

export default useDarkMode;
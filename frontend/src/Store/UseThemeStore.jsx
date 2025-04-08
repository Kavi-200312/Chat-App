import { create } from "zustand";

export const UseThemeStore = create((set)=>({
    theme : localStorage.getItem("chat-theme") || "light",
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        set({ theme });
        }
}))
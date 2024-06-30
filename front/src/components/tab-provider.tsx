"use client"
import { createContext, useState, useContext, useEffect } from "react";

type Tab = {
    value: string;
    setValue?: (value: string) => void;
}

const defaultTab: Tab = {
    value: "twitch",
    setValue: () => {},
}

const getInitialTab = () => {
    const tab = localStorage.getItem('selectedTab');
    return tab || defaultTab.value;
}

const TabContext = createContext<Tab>(defaultTab);

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
    const [value, setValue] = useState("nodefinit");
    const [carregat, setCarregat] = useState(false);

    useEffect(() => {
        if (carregat){
            console.log("actualitzar");
            localStorage.setItem('selectedTab', value);
        }
    }, [value, carregat]);

    useEffect(() => {
        console.log("carregar inicial");
        setValue(getInitialTab);
        setCarregat(true);
    }, []);
    
    return (
        <TabContext.Provider value={{ value, setValue}}>
            {children}
        </TabContext.Provider>
    )
}

export const useTab = () => useContext(TabContext);
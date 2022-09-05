import React, { createContext, useState } from "react"; 
 
export const NavigationContext = createContext({
    isAppDetialsPath: true,
    isHightouchPath: false,
    isSetupPath: false,
    isAppDetialsDone: false,
    isHightouchDone: false,
    isSetupDone: false,
    updateState: (sApp: boolean, isHightouch: boolean, isSetup: boolean,
        isAppDetailsDone: boolean, isHightouchDone: boolean, isSetupDone: boolean) => { }
});

export const NavigationProvider = ({ children }: any) => {
    const [isAppDetialsPath, setIsAppDetialsPath] = useState(true);
    const [isHightouchPath, setIsHightouchPath] = useState(false);
    const [isSetupPath, setIsSetupPath] = useState(false);
    const [isAppDetialsDone, setIsAppDetialsDone] = useState(false);
    const [isHightouchDone, setIsHightouchDome] = useState(false);
    const [isSetupDone, setIsSetupDone] = useState(false);

    const updateState = (isApp: boolean, isHightouch: boolean,
        isSetup: boolean, isAppDetailsDone: boolean, isHightouchDone: boolean, isSetupDone: boolean) => {
        setIsAppDetialsPath(isApp);
        setIsHightouchPath(isHightouch);
        setIsSetupPath(isSetup);
        setIsAppDetialsDone(isAppDetailsDone);
        setIsHightouchDome(isHightouchDone);
        setIsSetupDone(isSetupDone);



    }
    return (
        <NavigationContext.Provider value={{
            isAppDetialsPath, isHightouchPath, isSetupPath,
            isAppDetialsDone, isHightouchDone, isSetupDone, updateState
        }}>
            {children}
        </NavigationContext.Provider>
    );
};
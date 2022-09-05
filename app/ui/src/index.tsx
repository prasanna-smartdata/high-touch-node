import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { IconSettings } from "@salesforce/design-system-react"

import actionSprite from "@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg";
import customSprite from "@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg";
import doctypeSprite from "@salesforce-ux/design-system/assets/icons/doctype-sprite/svg/symbols.svg";
import standardSprite from "@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg";
import utilitySprite from "@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg";
import "./index.css";
//import "@salesforce-ux/design-system/scss/index.scss";

import App from "./App";
import React from "react";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

window.addEventListener("error", (err) => console.error("CAUGHT!", err));
window.addEventListener("unhandledrejection", (err) =>
    console.error("CAUGHT unhandledrejection!", err)
);
root.render(
    <IconSettings iconPath="@salesforce-ux/design-system/assets/assets/icons"
        actionSprite={actionSprite}
        customSprite={customSprite}
        doctypeSprite={doctypeSprite}
        standardSprite={standardSprite}
        utilitySprite={utilitySprite}
    >
        <React.StrictMode>
            <BrowserRouter>
                <CookiesProvider>
                    {/* <div>
                    <Header></Header>
                </div> */}
                    <Routes>
                        <Route path="*" element={<App />}></Route>
                    </Routes>
                </CookiesProvider>
            </BrowserRouter>
        </React.StrictMode>
    </IconSettings>
);

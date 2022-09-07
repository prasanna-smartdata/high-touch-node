import classNames from "classnames";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { withNavigation } from "./withNavigation";

const Header = (prop: any) => {
    console.log(prop)
    const location = useLocation();
    console.log(location.pathname);

    const { isAppDetialsPath, isHightouchPath, isSetupPath, isAppDetialsDone, isHightouchDone, isSetupDone } = prop;

    useEffect(() => {
        switch (location.pathname) {
            case "/":
            case "/CheckApplicationDetails":
                prop.updateState(true, false, false,false,false,false);
                break;
            // case "/ConfigHightouch":
            //     prop.updateState(false, true, false,true,false,false);
            //     break;
            case "/ReviewSetup":
                prop.updateState(false, false, true,true,true,false);
                break;
            default:
                break;
        }
    }, [])


    const navigationAppDetailsClass = classNames({
        'slds-path__item': true,
        'btn-slds-is-current slds-is-active': !isAppDetialsDone && isAppDetialsPath,
        'slds-is-incomplete': !isAppDetialsPath,
        'slds-is-complete': isAppDetialsDone,
    });
    const navigationHightouchClass = classNames({
        'slds-path__item': true,
        'btn-slds-is-current slds-is-active': !isHightouchDone && isHightouchPath,
        'slds-is-incomplete': !isHightouchPath,
        'slds-is-complete': isHightouchDone,
    });
    const navigationSetupClass = classNames({
        'slds-path__item': true,
        'btn-slds-is-current slds-is-active': !isSetupDone && isSetupPath,
        'slds-is-incomplete': !isSetupPath,
        'slds-is-complete': isSetupDone,
    });

    return (
        <div className="slds-path slds-m-top_xx-large">
            <div className="slds-grid slds-path__track">
                <div className="slds-grid slds-path__scroller-container">
                    <div className="slds-path__scroller">
                        <div className="slds-path__scroller_inner">
                            <ul className="slds-path__nav" role="listbox" aria-orientation="horizontal">

                                <li className={navigationAppDetailsClass} role="presentation">
                                    <a aria-selected="true" className="slds-path__link" id="path-1" role="option"  >
                                        <span className="slds-path__stage">
                                            <svg className="slds-icon slds-icon_x-small" aria-hidden="true">
                                                <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#check"></use>
                                            </svg>
                                            <span className="slds-assistive-text">Current Stage:</span>
                                        </span>
                                        <span className="slds-path__title">S2S Application Setup</span>
                                    </a>
                                </li>
                                {/* <li className={navigationHightouchClass} role="presentation">
                                    <a aria-selected="false" className="slds-path__link" id="path-2" role="option" >
                                        <span className="slds-path__stage">
                                            <svg className="slds-icon slds-icon_x-small" aria-hidden="true">
                                                <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#check"></use>
                                            </svg>
                                        </span>
                                        <span className="slds-path__title">Configure HighTouch</span>
                                    </a>
                                </li> */}
                                <li className={navigationSetupClass} role="presentation">
                                    <a aria-selected="false" className="slds-path__link" id="path-3" role="option"  >
                                        <span className="slds-path__stage">
                                            <svg className="slds-icon slds-icon_x-small" aria-hidden="true">
                                                <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#check"></use>
                                            </svg>
                                        </span>
                                        <span className="slds-path__title">Review Setup</span>
                                    </a>
                                </li>


                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
//export default Header;

export default withNavigation(Header);
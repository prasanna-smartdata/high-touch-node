import React, { useEffect, useState } from "react";
//import Button from "react-bootstrap/Button";
import { BrandBand, Button, Card, Icon, Input, InputIcon, ProgressRing } from
    '@salesforce/design-system-react';
import { Link, useLocation } from "react-router-dom";
import { AuthRequestBody, verifYServer2ServerOAuth } from "../actions/ApiActions";
import { useCookies } from "react-cookie";
import axios from "axios";
import Cookies from "js-cookie";
import { withNavigation } from "../components/withNavigation";
import classNames from "classnames";
// require("dotenv").config();

function AppDetails(prop: any) {


    const [client, setclientid] = useState("");
    const [secret, setsecret] = useState("");
    const [cookies, setCookie] = useCookies(['XSRF-Token'])
    const [isValid, setIsValid] = useState(false);
    const getcid = (e: any) => {
        setclientid(e.target.value);
    };
    const getsecret = (e: any) => {
        setsecret(e.target.value);
    };
    const navigationDisableClass = classNames({
        'disabled-link': !isValid,

    });

    const verifyAccount = () => {

        const request: AuthRequestBody = {
            clientId: client,
            secretKey: secret
        }

        //Call the s2s Api
        verifYServer2ServerOAuth(request, cookies['XSRF-Token']).then((response: any) => {
            if (response === "valid") {
                showFooter();
                setIsValid(true);
            }
            else {
                showErroFooter();
                setIsValid(false);
            }
        })

    }


    function showFooter() {
        document.getElementById("form1card")?.setAttribute("style", "padding-bottom: 0%");
        const foot = document.getElementById("foot")?.setAttribute("style", "display :block");
    }
    function showErroFooter() {
        document.getElementById("form1card")?.setAttribute("style", "padding-bottom: 0%");
        const foot = document.getElementById("errorfoot")?.setAttribute("style", "display :block");
    }

    return (
        <div className="slds-form-element slds-border_bottom slds-border_left slds-border_right">
            <div style={{ paddingTop: "3%" }}>
                <BrandBand
                    id="brand-band-no-image"

                    theme="lightning-blue">
                    <div
                        id="form1card"

                    >

                        <div className="slds-box slds-theme_default">
                            <h3 className="slds-text-heading_label slds-truncate">Server 2 Server Application Details</h3>
                        </div>

                        <form >
                            <div className="slds-align_absolute-center">
                            <div className="slds-col slds-size_2-of-6 slds-grid_pull-padded">
                                <div className="slds-col_padded">
                                    <div className="slds-col_padded">
                                        <Input
                                            aria-describedby="error-4"
                                            id="unique-id-4"
                                            required
                                            onChange={getcid}
                                           // errorText="Error Message"
                                            label="Client ID"
                                        placeholder="Enter Client ID "
                                        />
                                    </div>
                                    {/* <Input
                                        iconRight={
                                            <InputIcon
                                                assistiveText={{
                                                    icon: 'Clear',
                                                }}
                                                name="clear"
                                                category="utility"

                                            />
                                        }
                                        onChange={getcid}
                                        id="unique-id-3"
                                        label="Client ID"
                                        placeholder="Enter Client ID "
                                    /> */}
                                </div>
                                <br />
                                <div className="slds-col_padded slds-m-left_none">
                                    <div className="slds-col_padded">
                                        <Input
                                            aria-describedby="error-4"
                                            id="unique-id-4"
                                            label="Client Secret"
                                            required
                                            placeholder="Enter Secret"
                                            onChange={getsecret}
                                        />
                                    </div>
                                    {/* <Input
                                        iconRight={
                                            <InputIcon
                                                assistiveText={{
                                                    icon: 'Clear',
                                                }}
                                                name="clear"
                                                category="utility"

                                            />
                                        }
                                        onChange={getsecret}
                                        id="unique-id-4"
                                        label="Client Secret"
                                        placeholder="Enter Secret"
                                    /> */}
                                </div>
                                &nbsp;
                                <div className="slds-align_absolute-center" >
                                    <Button
                                        variant="brand"
                                        name="verify"
                                        label="Verify My Account"
                                        onClick={verifyAccount}
                                        className="button1"
                                    > </Button>
                                </div>

                                {/* <div className="slds-col_padded">
                                    <ProgressRing flowDirection="fill" size="large" value={40} />
                                </div> */}

                                <div id="foot" style={{ paddingTop: "0%" }}>
                                    <div className="line"></div>
                                    <br></br>
                                    <div className="slds-notify_container slds-is-relative">
                                        <div className="slds-notify slds-notify_toast slds-theme_success" role="status">
                                            <span className="slds-assistive-text">success</span>
                                            <span className="slds-icon_container slds-icon-utility-success slds-m-right_small slds-no-flex slds-align-top" title="Description of icon when needed">
                                                <svg className="slds-icon slds-icon_small" aria-hidden="true">
                                                    <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#success"></use>
                                                </svg>
                                            </span>
                                            <div className="slds-notify__content">
                                                <h2 className="slds-text-heading_small ">SFMC App Credentials Verified </h2>
                                            </div>
                                            <div className="slds-notify__close">
                                                <button className="slds-button slds-button_icon slds-button_icon-inverse" title="Close">
                                                    <svg className="slds-button__icon slds-button__icon_large" aria-hidden="true">
                                                        <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
                                                    </svg>
                                                    <span className="slds-assistive-text">Close</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="errorfoot" style={{ paddingTop: "0%" }}>
                                    <div className="line"></div>
                                    <br></br>
                                    <div className="slds-notify_container slds-is-relative">
                                        <div className="slds-notify slds-notify_toast slds-theme_error" role="status">
                                            <span className="slds-assistive-text">error</span>
                                            <span className="slds-icon_container slds-icon-utility-error slds-m-right_small slds-no-flex slds-align-top" title="Description of icon when needed">
                                                <svg className="slds-icon slds-icon_small" aria-hidden="true">
                                                    <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#error"></use>
                                                </svg>
                                            </span>
                                            <div className="slds-notify__content">
                                                <h2 className="slds-text-heading_small "> Verification failed.Please check the credentials</h2>
                                            </div>
                                            <div className="slds-notify__close">
                                                <button className="slds-button slds-button_icon slds-button_icon-inverse" title="Close">
                                                    <svg className="slds-button__icon slds-button__icon_large" aria-hidden="true">
                                                        <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
                                                    </svg>
                                                    <span className="slds-assistive-text">Close</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            </div>
                         


                            <div className="slds-float_right slds-m-right_x-small">

                                <Button id="button" >
                                    <Link className={navigationDisableClass}
                                        onClick={() => prop.updateState(false, true, false, true, false, false)}
                                        to="/ConfigHightouch"
                                        state={{
                                            client: client,
                                            secret: secret,
                                        }}
                                    >
                                        Next
                                    </Link>
                                </Button>

                            </div>

                        </form>

                    </div>
                    <br></br>


                </BrandBand>
            </div>


        </div>
    );
}
export default withNavigation(AppDetails);
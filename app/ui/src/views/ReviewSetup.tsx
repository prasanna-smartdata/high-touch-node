import { BrandBand, Button } from "@salesforce/design-system-react";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AuthRequestBody, connectToHightouch } from "../actions/ApiActions";
import { withNavigation } from "../components/withNavigation";

function Review(prop: any) {

    const [cookies, setCookie] = useCookies(['_csrf'])
    const [isValid, setIsValid] = useState(false);
    const [redirectUri, setRedirectUri] = useState("")
    const loc: any = useLocation();
    const client = loc.state.client;
    const secret = loc.state.secret;
    const accountId: string = loc.state.accountId;
    const userId: string = loc.state.userId;
    const email: string = loc.state.email;
    const subDomain: string = loc.state.subDomain;

    const CreateHightouch = () => {
        const request: AuthRequestBody = {
            clientId: client,
            secretKey: secret
        }

        connectToHightouch(request).then((response: any) => {
            document.getElementById("spinner")?.setAttribute("class", "slds-is-expanded");

            if (response) {
                console.log(response)
                setIsValid(true);
                document.getElementById("foot")?.setAttribute("class", "slds-is-expanded");
                prop.updateState(true, true, true, true);
                setRedirectUri(response.redirect_uri);
            }
            document.getElementById("spinner")?.setAttribute("class", "slds-is-collapsed");

        })


    }
    return (
        <div className="slds-form-element slds-border_bottom slds-border_left slds-border_right">
            <div className="slds-m-top_x-large">
                <BrandBand id="brand-band-no-image" theme="lightning-blue">
                    <div id="form1card">

                        <div className="slds-box slds-theme_default slds-text-heading_label">
                            <div className="slds-text-heading_small  slds-truncate">SFMC-HighTouch Details</div>

                        </div>
                        <form>
                            <div className=" slds-m-left_x-large slds-m-top_x-large">
                                <div className="slds-col slds-size_2-of-6 slds-grid_pull-padded">
                                    <div className="slds-grid">
                                        <div className="slds-col ">
                                            <div>
                                                <b>SFMC Cofiguration</b>
                                            </div>

                                            <div className="slds-m-top_xxx-small">
                                                Client ID
                                            </div>
                                            {client}
                                            <br></br>
                                            <div>
                                                Client Secret
                                            </div>
                                            {secret}
                                            <br></br>
                                        </div>
                                        <div className="slds-col">
                                            <div>
                                                <b>Hightouch Cofiguration</b>
                                            </div>

                                            <div className="slds-m-top_xxx-small">
                                                User ID
                                            </div>
                                            {userId}<br></br>
                                            <br></br>
                                            Email
                                            <br></br>
                                            {email} <br></br>
                                            <br></br>
                                            Account ID
                                            <br></br>
                                            {accountId}<br></br>
                                            <br></br>
                                            Sub Domain
                                            <br></br>
                                            {subDomain}<br></br>
                                            <br></br>
                                        </div>

                                    </div>
                                    <br />

                                    &nbsp;


                                </div>
                            </div>
                            <div id="spinner" className="slds-is-collapsed">
                                <div className="demo-only" style={{ height: "6rem", position: "relative" }}>
                                    <div className="slds-spinner_container">
                                        <div role="status" className="slds-spinner slds-spinner_medium slds-spinner_brand">
                                            <span className="slds-assistive-text">Loading</span>
                                            <div className="slds-spinner__dot-a"></div>
                                            <div className="slds-spinner__dot-b"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="slds-float_right slds-m-right_x-small">

                                <form>
                                    <Button id="button">
                                        <Link to="/CheckApplicationDetails"
                                            onClick={
                                                () => prop.updateState(true, false, false, false)
                                            }
                                            state={
                                                {
                                                    client: client,
                                                    secret: secret
                                                }
                                            }>
                                            Back
                                        </Link>
                                    </Button>
                                    &nbsp; &nbsp;

                                    <Button id="button" disabled={isValid} variant="brand" onClick={CreateHightouch} >

                                        Create

                                    </Button>
                                </form>
                            </div>
                            <div id="foot" className="slds-is-collapsed">
                                <div className="slds-notify_container slds-is-relative">
                                    <div className="slds-notify slds-notify_toast slds-theme_info" role="status">
                                        <span className="slds-assistive-text">info</span>
                                        <span className="slds-icon_container slds-icon-utility-info slds-m-right_small slds-no-flex slds-align-top" title="Description of icon when needed">
                                            <svg className="slds-icon slds-icon_small" aria-hidden="true">
                                                <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#info"></use>
                                            </svg>
                                        </span>
                                        <div className="slds-notify__content">
                                            <h2 className="slds-text-heading_small">You're almost done connecting the Salesforce Marketing Cloud to Hightouch! Please open this
                                                link in a new tab to add it to your Hightouch workspace. You must link it to your workspace in order to complete the connection.

                                                <a href="#">{redirectUri}</a>
                                            </h2>
                                        </div>
                                        <div className="slds-notify__close">
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById("foot")?.setAttribute("class", "slds-is-collapsed");
                                            }} className="slds-button slds-button_icon slds-button_icon-inverse" title="Close">
                                                <svg className="slds-button__icon slds-button__icon_large" aria-hidden="true">
                                                    <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
                                                </svg>
                                                <span className="slds-assistive-text">Close</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <br></br>

                </BrandBand>
            </div>
        </div>

    );
}
export default withNavigation(Review);

import { BrandBand, Input } from "@salesforce/design-system-react";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { withNavigation } from "../components/withNavigation";

function ConfigHightouch(prop: any) {
    const loc: any = useLocation();
    const client = loc.state.client;
    const secret = loc.state.secret;

    const getAPIKey=()=>{

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
                            <h3 className="slds-text-heading_label slds-truncate">
                                Connect My Experience</h3>
                        </div>
                        <form>
                            <div className="slds-align_absolute-center">
                                <div className="slds-col slds-size_2-of-6 slds-grid_pull-padded">
                                    <div className="slds-col_padded">
                                        <div className="slds-col_padded">
                                            <Button id="ht" >ht</Button>
                                            <br></br>
                                            <br></br>
                                        </div>
                                        <div className="slds-col_padded">
                                        <Input
                                            aria-describedby="error-4"
                                            id="unique-id-4"
                                            required
                                            onChange={getAPIKey}
                                           // errorText="Error Message"
                                            label="API Secret Key"
                                        placeholder="API Secret Key"
                                        />
                                    </div>
                                    </div>
                                    <br />

                                    &nbsp;
 

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


                                </div>
                            </div>



                            <div className="slds-float_right slds-m-right_x-small">

                                <form>
                                    <Button id="button">
                                        <Link
                                            to="/CheckApplicationDetails"
                                            onClick={() => prop.updateState(true, false, false, false, false, false)}
                                            state={{
                                                client: client,
                                                secret: secret,
                                            }}
                                        >
                                            Back
                                        </Link>
                                    </Button>
                                    &nbsp; &nbsp;
                                    <Button id="button">
                                        <Link
                                            to="/ReviewSetup"
                                            onClick={() => prop.updateState(false, false, true, true, true, false)}
                                            state={{
                                                client: client,
                                                secret: secret,
                                            }}
                                        >
                                            Next
                                        </Link>
                                    </Button>
                                </form >
                            </div>

                        </form>

                    </div>
                </BrandBand>
            </div>
        </div>


    );
}
export default withNavigation(ConfigHightouch);
import { BrandBand } from "@salesforce/design-system-react";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { withNavigation } from "../components/withNavigation";

function Review(prop: any) {
    const loc: any = useLocation();
    const client = loc.state.client;
    const secret = loc.state.secret;
    const jwt = loc.state.jwt;
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
                                SFMC-HighTouch Details</h3>
                        </div>
                        <form>
                            <div className="slds-align_absolute-center">
                                <div className="slds-col slds-size_2-of-6 slds-grid_pull-padded">
                                    <div className="slds-col_padded">

                                        <div className="slds-col_padded">
                                            <div className="rvw1">
                                                <p>
                                                    <b>SFMC Cofiguration</b>
                                                </p>
                                                Client ID <br></br>
                                                {client}
                                                <br></br>
                                                <br></br>
                                                Client Secret <br></br>
                                                {secret}
                                                <br></br>
                                                <br></br>

                                            </div>
                                            <div className="rvw2">
                                                <p>
                                                    <b>Hightouch Cofiguration</b>
                                                </p>
                                                Name <br></br>
                                                SFMC Prod<br></br>
                                                <br></br>
                                                Slug <br></br>
                                                sfmc-prod<br></br>
                                                <br></br>
                                                Link <br></br>
                                                --<br></br>
                                                <br></br>
                                            </div>
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
                                            to="/ConfigHightouch"
                                            onClick={() => prop.updateState(false, true, false, true, false, false)}
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
        // <div>

        //     <div className="cardsec form3">
        //         <Card.Title></Card.Title>
        //         <form>
        //             <label>
        //                 <div className="rvw1">
        //                     <p>
        //                         <b>SFMC Cofiguration</b>
        //                     </p>
        //                     Client ID <br></br>
        //                     {client}
        //                     <br></br>
        //                     <br></br>
        //                     Client Secret <br></br>
        //                     {secret}
        //                     <br></br>
        //                     <br></br>
        //                     JWT Token <br></br>
        //                     {jwt}
        //                     <br></br>
        //                     <br></br>
        //                 </div>
        //                 <div className="rvw2">
        //                     <p>
        //                         <b>Hightouch Cofiguration</b>
        //                     </p>
        //                     Name <br></br>
        //                     SFMC Prod<br></br>
        //                     <br></br>
        //                     Slug <br></br>
        //                     sfmc-prod<br></br>
        //                     <br></br>
        //                     Link <br></br>
        //                     --<br></br>
        //                     <br></br>
        //                 </div>
        //             </label>
        //         </form>
        //     </div>
        //     <br></br>

        //     <div>
        //         <Card className="cardfooter">
        //             <form>
        //                 <Button id="button">
        //                     <Link
        //                         to="/ConfigHightouch"
        //                         onClick={() => prop.updateState(false, true, false, true, false, false)}
        //                         state={{
        //                             client: client,
        //                             secret: secret,
        //                             jwt: jwt,
        //                         }}
        //                     >
        //                         Back
        //                     </Link>

        //                 </Button>
        //                 &nbsp; &nbsp;
        //                 <Button id="button">
        //                     <Link to="/">Create</Link>
        //                 </Button>
        //             </form>
        //         </Card>
        //     </div>
        // </div>
    );
}
export default withNavigation(Review);
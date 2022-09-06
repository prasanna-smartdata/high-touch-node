import { BrandBand, Button } from "@salesforce/design-system-react";
import React from "react";
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
                            <div className="slds-align_absolute-center slds-m-top_x-large">
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
                                            <br></br>
                                            <div>
                                                Client Secret
                                            </div>
                                            {secret}
                                            <br></br>
                                            <br></br>
                                        </div>
                                        <div className="slds-col">
                                            <div>
                                                <b>Hightouch Cofiguration</b>
                                            </div>

                                            <div className="slds-m-top_xxx-small">
                                                Name
                                            </div>
                                            ---<br></br>
                                            <br></br>
                                            Slug <br></br>
                                            ---<br></br>
                                            <br></br>
                                        </div>

                                    </div>
                                    <br />

                                    &nbsp;




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
                                            Create
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
export default withNavigation(Review);
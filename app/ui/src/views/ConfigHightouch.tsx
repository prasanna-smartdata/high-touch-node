import { BrandBand, Button, Input } from "@salesforce/design-system-react";
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
                            <div className="slds-m-left_x-large">
                                <div className="slds-col slds-size_2-of-6 slds-grid_pull-padded">
                                    <div className="slds-col_padded slds-m-top_x-small">
                                        <div className="slds-col_padded ">
                                            <Button id="ht" 
                                            	style={{
                                                    height: '100px',
                                                    marginLeft: '5px',
                                                    display: 'inline-block',
                                                    fontSize:'50px',
                                                }}
                                            variant="brand" className="slds-size_1-of-2"  >ht</Button>
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
 

                                 

                                </div>
                            </div>



                            <div className="slds-float_right slds-m-right_x-small">

                                <form>
                                    <Button  >
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
                                    <Button>
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
                    <br></br>

                </BrandBand>
            </div>
        </div>


    );
}
export default withNavigation(ConfigHightouch);
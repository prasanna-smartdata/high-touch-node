import React, { useEffect, useState } from "react";
//import Button from "react-bootstrap/Button";
import { BrandBand, Button, Card, Icon, Input, InputIcon } from
    '@salesforce/design-system-react';
import { Link, useLocation } from "react-router-dom";
import { AuthRequestBody, verifYServer2ServerOAuth } from "../actions/ApiActions";
import { useCookies } from "react-cookie";
import axios from "axios";
import Cookies from "js-cookie";
import { withNavigation } from "../components/withNavigation";
// require("dotenv").config();

function AppDetails(prop: any) {

    console.log(prop)
    function getCookie(name: string) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');
    const [client, setclientid] = useState("");
    const [secret, setsecret] = useState("");

    const [cookies, setCookie] = useCookies(['XSRF-Token'])

    const getcid = (e: any) => {
        setclientid(e.target.value);
    };
    const getsecret = (e: any) => {
        setsecret(e.target.value);
    };

   
    const verifyAccount = () => {

        const request: AuthRequestBody = {
            clientId: client,
            secretKey: secret
        }
        // const csrf = cookie.load('csrf-token');
        // verifYServer2ServerOAuth(request, csrf);
    }


    function showFooter() {
        document.getElementById("form1card")?.setAttribute("style", "padding-bottom: 0%");
        const foot = document.getElementById("foot")?.setAttribute("style", "display :block");
    }

    const isEmpty = 1;
    return (
        <div>

            <div style={{ paddingTop: "5%" }}>
                <BrandBand
                    id="brand-band-no-image"

                    theme="lightning-blue">
                    <div
                        id="form1card"

                    >
                        
                        <div className="slds-box slds-theme_default">
                            <h3 className="slds-text-heading_label slds-truncate">Server 2 Server Application Details</h3>
                        </div>

                        <form>
                            <div className="slds-col slds-size_1-of-4 slds-grid_pull-padded">
                                <div className="slds-col_padded">
                                    <Input
                                        iconRight={
                                            <InputIcon
                                                assistiveText={{
                                                    icon: 'Clear',
                                                }}
                                                name="clear"
                                                category="utility"

                                            />
                                        }
                                        id="unique-id-3"
                                        label="Client ID"
                                        placeholder="Enter Client ID "
                                    />
                                </div>
                                <br />
                                <div className="slds-col_padded slds-m-left_none">
                                    <Input
                                        iconRight={
                                            <InputIcon
                                                assistiveText={{
                                                    icon: 'Clear',
                                                }}
                                                name="clear"
                                                category="utility"

                                            />
                                        }
                                        id="unique-id-4"
                                        label="Client Secret"
                                        placeholder="Enter Secret"
                                    />
                                </div>
                                &nbsp;
                                <div>
                                    <Button
                                        variant="brand"
                                        name="verify"
                                        label="Verify My Account"
                                        onClick={verifyAccount}
                                        className="button1"
                                    > </Button>
                                </div>



                                <div id="foot" style={{ paddingTop: "0%" }}>
                                    <div className="line"></div>
                                    <br></br>
                                    <Card heading="SFMC App Credentials Verified" className="cardBody">

                                    </Card>
                                </div>

                            </div>


                            <div>

                                {/* <Button id="btnCancel">Cancel</Button> */}
                                <Button id="button">
                                    <Link
                                        onClick={()=>prop.updateState(false, true, false,true,false,false)}
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
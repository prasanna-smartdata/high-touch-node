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
    const jwt = loc.state.jwt;
    return (
        <div>
          
            <div className="cardsec form2">
                
                <Card id="cnfg">Connect My Experience</Card>
                <Button id="ht">ht</Button>
                <br></br>
                <br></br>
                API Key <br></br>
                <input
                    type="text"
                    id="key"
                    style={{ width: "400px" }}
                    className="textBox"
                    placeholder="API Key"
                />{" "}

            </div>

            <br></br>

            <div>
                <Card className="cardfooter">
                    <form>
                        <Button id="button">
                            <Link
                                to="/CheckApplicationDetails"
                                onClick={() => prop.updateState(true, false, false, false, false, false)}
                                state={{
                                    client: client,
                                    secret: secret,
                                    jwt: jwt,
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
                                    jwt: jwt,
                                }}
                            >
                                Next
                            </Link>
                        </Button>
                        {/* <a id="button" href="/ReviewSetup">Next</a> */}
                    </form>
                </Card>
            </div>
        </div>
    );
}
export default withNavigation(ConfigHightouch);
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ConfigHightouch() {
    const loc:any = useLocation();
    const client = loc.state.client;
    const secret = loc.state.secret;
    const jwt = loc.state.jwt;
    return (
        <div>
            <div className="row marginZero">
                <div
                    className="col-sm-4 Div1 txtlabel txtCompleted clsUnlink"
                    // onClick={onchangeHandler}
                >
                    <span className="wrdtext">S2S Application Setup</span>
                </div>
                <div
                    className="col-sm-4 Div2 txtlabel txtCompleted clsUnlink"
                    // onClick={onchangeHandler}
                >
                    <span className="wrdtext">Configure HighTouch</span>
                </div>
                <div
                    className="col-sm-4 Div3 txtlabel txtIncompleted clsUnlink"
                    // onClick={onchangeHandler}
                >
                    <span className="wrdtext">Review Setup</span>
                </div>
                <div>
                    <h2 className="h2txt">hightouch</h2>
                </div>
            </div>
            <div className="cardsec form2">
                <Card id="cnfg">Connect My Experience</Card>
                <Button id="ht">ht</Button>
            </div>
            <br></br>

            <div>
                <Card className="cardfooter">
                    <form>
                        <Button id="btnCancel">
                            <Link
                                to="/CheckApplicationDetails"
                                state={{
                                    client: client,
                                    secret: secret,
                                    jwt: jwt,
                                }}
                            >
                                Cancel
                            </Link>
                        </Button>
                        <Button id="button">
                            <Link
                                to="/ReviewSetup"
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

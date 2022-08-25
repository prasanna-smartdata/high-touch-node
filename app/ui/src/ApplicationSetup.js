import React, { useState } from "react";
// import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
// require("dotenv").config();

export default function AppDetails() {
    // const cid = process.env.SFMC_CLIENT_ID;
    // console.log('CID::',cid)
    // const navigate = useNavigate();
    const [client, setclientid] = useState("");
    const [secret, setsecret] = useState("");
    const [jwt, setjwt] = useState("");
    const getcid = (e) => {
        setclientid(e.target.value);
    };
    const getsecret = (e) => {
        setsecret(e.target.value);
    };
    const getjwt = (e) => {
        setjwt(e.target.value);
    };
    console.log("CId::", client, "Secret::", secret, "jwt::", jwt);

    function showFooter() {
        console.log("Function Called");
        document.getElementById("form1card").style = { "padding-bottom": "0%" };
        document.getElementById("foot").style.display = "block";
    }

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
                    className="col-sm-4 Div2 txtlabel txtIncompleted clsUnlink"
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
            <div
                id="form1card"
                className="cardsec form1"
                style={{ "padding-bottom": "7%" }}
            >
                <Card.Title>Server 2 Server Application Details</Card.Title>
                <form>
                    <label>
                        Client ID <br></br>
                        <input
                            type="text"
                            id="clientid"
                            onChange={getcid}
                            className="textBox"
                            placeholder="  Client ID"
                        />
                        <br></br>
                        <br></br>
                        Client Secret <br></br>
                        <input
                            type="text"
                            id="secret"
                            onChange={getsecret}
                            className="textBox"
                            placeholder="  Client Secret"
                        />{" "}
                        <br></br>
                        <br></br>
                        JWT Token <br></br>
                        <input
                            type="text"
                            id="jwt"
                            onChange={getjwt}
                            style={{ width: "400px" }}
                            className="textBox"
                            placeholder="  JWT"
                        />{" "}
                        <br></br>
                    </label>
                    &nbsp;
                    <Button
                        variant="primary"
                        name="verify"
                        onClick={showFooter}
                        className="button1"
                    >
                        Verify My Account
                    </Button>
                </form>
                <div id="foot" style={{ "padding-bottom": "0%" }}>
                    <div className="line"></div>
                    <br></br>
                    <Card className="cardBody">
                        SFMC App Credentials Verified
                    </Card>
                </div>
            </div>
            <br></br>

            <div>
                <Card className="cardfooter">
                    <form>
                        <Button id="btnCancel">Cancel</Button>
                        <Button id="button">
                            <Link
                                to="/Config"
                                state={{
                                    client: client,
                                    secret: secret,
                                    jwt: jwt,
                                }}
                            >
                                Next
                            </Link>
                        </Button>
                        {/* <Button id="btnNext" ><Link to="/Config">Next</Link></Button> */}
                        {/* <a id='button' href="/Config" >Next</a>  */}
                        {/* <button onClick={config()}>Next</button> onClick={()=>{config()}}  */}
                        {/* <button type="button" id="button" onClick={config()}>Next </button> */}
                    </form>
                </Card>
            </div>
        </div>
    );
}

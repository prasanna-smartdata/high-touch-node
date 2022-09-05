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
        <div>

            <div className="cardsec form3">
                <Card.Title></Card.Title>
                <form>
                    <label>
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
                            JWT Token <br></br>
                            {jwt}
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
                    </label>
                </form>
            </div>
            <br></br>

            <div>
                <Card className="cardfooter">
                    <form>
                        <Button id="button">
                            <Link
                                to="/ConfigHightouch"
                                onClick={() => prop.updateState(false, true, false, true, false, false)}
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
                            <Link to="/">Create</Link>
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}
export default withNavigation(Review);
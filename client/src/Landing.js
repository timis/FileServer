import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
    render() {
        return (
            <div style={{ height: "75vh" }} class="container ">
                <div class="row">
                    <div class="col ">
                        <h4>
                            Header for my landing page
                        </h4>
                        <p>
                            Create a (minimal) full-stack app with user authentication via
                            passport and JWTs
                        </p>
                        <br />
                        <div class="col">
                            <Link
                                to="/register"
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px"
                                }}
                                class="btn"
                            >
                                Register
              </Link>
                        </div>
                        <div class="col">
                            <Link
                                to="/login"
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px"
                                }}
                                class="btn"
                            >
                                Log In
              </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;
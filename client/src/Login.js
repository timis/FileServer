import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        console.log("Login entry: ", userData);
    }

    render() {
        const { errors } = this.state;

        return (
            <div class="container">
                <div style={{ marginTop: "4rem" }} class="row">
                    <div class="col">
                        <Link to="/" class="btn">
                            <i >keyboard_backspace</i> Back to home
                        </Link>
                        <div class="col" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Login</b> below
                            </h4>
                            <p >
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.username}
                                    error={errors.username}
                                    id="username"
                                    type="username"
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div class="form-group">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div class="col" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    class="btn "
                                >
                                    Login
                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
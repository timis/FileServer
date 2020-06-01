import React, { Component } from 'react';
import axios from 'axios';
import App from './App';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


function Warning(props){
    if(!props.warn){
        return null;
    }
    return(
        <div >
            <p style={{color: "red"}}>{props.warn}</p>
        </div>
    );
}

class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            errors: {},
            users: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    componentDidMount() {
        fetch("/users/foo")
            .then(res => res.json())
            .then(newusers => this.setState({ ...this.state, users: newusers }))
    }

    handleSubmit(event) {
        event.preventDefault();
        let registration = {
            'username': this.state.username,
            'password': this.state.password,
            'email': this.state.email
        };
        console.log("Submitted: " + JSON.stringify(registration))
        axios.post('http://localhost:3001/users/reg', registration)
            .then(resp => {
                if(resp.data.errors){
                    this.setState({...this.state, errors: resp.data.errors});
                } else {
                    this.setState({...this.state, errors:{}});
                }
                //Want to redirect
                //Also use the resp.data.userID maybe for a token authentication or something?
                console.log(resp);
            })
            .catch(err => {
                console.error(err);
            })


        // event.preventDefault();
    }


    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" name="username" class="form-control" value={this.state.username} onChange={this.handleChange} />
                        <Warning warn={this.state.errors.username}/>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="text" name="email" class="form-control" value={this.state.email} onChange={this.handleChange} />
                        <Warning warn={this.state.errors.email}/>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="text" name="password" class="form-control" value={this.state.password} onChange={this.handleChange} />
                        <Warning warn={this.state.errors.password}/>
                    </div>

                    <input type="submit" value="Submit" />
                </form>

                <div className="App">
                    <h1>Users</h1>
                    {this.state.users.map(user =>
                        <div key={user.id}>{user.username}</div>
                    )}
                </div>
            </div>
        );
    }
}
export default RegistrationForm;

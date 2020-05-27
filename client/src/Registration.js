import React, {Component} from 'react';
import axios from 'axios';
import App from './App';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


class RegistrationForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            users: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({...this.state, [event.target.name]: event.target.value});
    }

    componentDidMount(){
        fetch("/users/foo")
          .then(res=>res.json())
          .then(newusers => this.setState({...this.state, users: newusers}))
      }

    handleSubmit(event){
        event.preventDefault();
        let registration = {
            'username': this.state.username,
            'password': this.state.password,
            'email': this.state.email
        };
        axios.post('http://localhost:3001/users/reg', registration)
        .then(() => console.log("Submitted: " + JSON.stringify(registration)))
        .catch(err => {
            console.error(err);
        })

        
        // event.preventDefault();
    }


  render(){
    return(
        <div>
      <form onSubmit={this.handleSubmit}>
          <label>Username:
              <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          </label>
          <label>Email:
              <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>Password:
              <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
          </label>
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

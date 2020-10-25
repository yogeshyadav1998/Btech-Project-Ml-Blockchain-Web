import React, {Component} from 'react';
import { Radio } from 'antd';
import './AuthOptions.css';

class AuthOptions extends Component {

    state = {
        value: 1,
      };

	componentDidMount() {

		const signUpButton = document.getElementById('signUp');
		const signInButton = document.getElementById('signIn');
		const container = document.getElementById('container');

		signUpButton.addEventListener('click', () => {
			container.classList.add("right-panel-active");
		});

		signInButton.addEventListener('click', () => {
			container.classList.remove("right-panel-active");
		});

    }
    
    
    
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };

	render() {
		return (
            <div>
				<div class="container" id="container">
					<div class="form-container sign-up-container">
						<form action="#">
							<h1>Create Account</h1>
							<span>And start enjoying our services</span>
                            <Radio.Group className="input-usertype" onChange={this.onChange} value={this.state.value}>
                                <Radio value={1}>Patient</Radio>
                                <Radio value={2}>Doctor</Radio>
                            </Radio.Group>
							<input type="text" placeholder="Name" />
							<input type="text" placeholder="Last Name" />
							<input type="number" placeholder="Age" />
							<input type="email" placeholder="Email" />
							<input type="password" placeholder="Password" />
							<button>Sign Up</button>
						</form>
					</div>

					<div class="form-container sign-in-container">
						<form action="#">
							<h1>Sign in</h1>
                            <Radio.Group className="input-usertype" onChange={this.onChange} value={this.state.value}>
                                <Radio value={1}>Patient</Radio>
                                <Radio value={2}>Doctor</Radio>
                            </Radio.Group>
							<input type="email" placeholder="Email" />
							<input type="password" placeholder="Password" />
							<a href="#">Forgot your password?</a>
							<button>Sign In</button>
						</form>
					</div>

					<div class="overlay-container">
						<div class="overlay">
							<div class="overlay-panel overlay-left">
								<h1>Welcome Back!</h1>
								<p>To keep connected with us please login with your personal info</p>
								<button class="ghost" id="signIn">Sign In</button>
							</div>

							<div class="overlay-panel overlay-right">
								<h1>Hello, Friend!</h1>
								<p>Enter your personal details and start journey with us</p>
								<button class="ghost" id="signUp">Sign Up</button>
							</div>
						</div>
					</div>
				</div>
                </div>
			);
	}
}

export default AuthOptions;
import React, { Component } from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    this.setState({ errors: {}, isLoading: true });
    event.preventDefault();
    //console.log(this.state);
    //axios.post('/api/users', { user: this.state });
    this.props.userSignupRequest(this.state).then(
      () => {},
      err => {
        this.setState({ errors: err.response.data, isLoading: false });
      }
    );
  }

  render() {
    const { errors } = this.state;
    const options = map(timezones, (val, key) =>
      <option key={val} value={val}>
        {key}
      </option>
    );
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our Community</h1>

        <div
          className={classnames('form-group', { 'has-error': errors.username })}
        >
          <label className="control-label">Username</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={this.state.username}
            onChange={this.onChange}
          />
          {errors.username &&
            <span className="help-block">
              {errors.username}
            </span>}
        </div>

        <div
          className={classnames('form-group', { 'has-error': errors.email })}
        >
          <label className="control-label">Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={this.state.email}
            onChange={this.onChange}
          />
          {errors.email &&
            <span className="help-block">
              {errors.email}
            </span>}
        </div>

        <div
          className={classnames('form-group', { 'has-error': errors.password })}
        >
          <label className="control-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={this.state.password}
            onChange={this.onChange}
          />
          {errors.password &&
            <span className="help-block">
              {errors.password}
            </span>}
        </div>

        <div
          className={classnames('form-group', {
            'has-error': errors.passwordConfirmation
          })}
        >
          <label className="control-label">Password Confirmation</label>
          <input
            type="password"
            name="passwordConfirmation"
            className="form-control"
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
          />
          {errors.passwordConfirmation &&
            <span className="help-block">
              {errors.passwordConfirmation}
            </span>}
        </div>

        <div
          className={classnames('form-group', { 'has-error': errors.timezone })}
        >
          <label className="control-label">Timezone</label>
          <select
            className="form-control"
            name="timezone"
            onChange={this.onChange}
            value={this.state.timezone}
          >
            <option value="" disabled>
              Choose Your Timezone
            </option>
            {options}
          </select>
          {errors.timezone &&
            <span className="help-block">
              {errors.timezone}
            </span>}
        </div>

        <div className="form-group">
          <button
            disabled={this.state.isLoading}
            className="btn btn-primary btn-lg"
          >
            Signup
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
};

export default SignupForm;

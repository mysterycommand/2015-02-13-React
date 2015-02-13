////////////////////////////////////////////////////////////////////////////////
// Excercise:
//
// - experiment with some of the other propTypes, send improper values
//   and look at the messages you get
////////////////////////////////////////////////////////////////////////////////

var React = require('react');
var md5 = require('MD5');
var validateEmail = require('./validateEmail');
var warning = require('react/lib/warning');

var GRAVATAR_URL = "http://gravatar.com/avatar";

var USERS = [
  { id: 1, name: 'Ryan Florence', email: 'rpflorence@gmail.com' },
  { id: 2, name: 'Michael Jackson', email: 'mjijackson@gmail.com' }
];

var emailType = (props, propName, componentName) => {
  warning(
    validateEmail(props[propName]),
    `Invalid ${propName} '${props[propName]}' sent to ${componentName}. Check the render method of ${componentName}.`
  );
};

function validateNumeric(n) {
    // @see http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
    return !isNaN(parseFloat(n)) && isFinite(n);
}

var numericType = (props, propName, componentName) => {
  warning(
    validateNumeric(props[propName]),
    `Invalid ${propName} '${props[propName]}' sent to ${componentName}. Check the render method of ${componentName}.`
  );
};

var Gravatar = React.createClass({
  propTypes: {
    email: emailType,
    size: numericType
  },

  getDefaultProps () {
    return {
      size: 16
    };
  },

  render () {
    var { email, size } = this.props;
    var hash = md5(email);
    var url = `${GRAVATAR_URL}/${hash}?s=${size*2}`;
    return <img src={url} width={size} />;
  }
});

var App = React.createClass({
  render () {
    var users = this.props.users.map((user) => {
      return (
        <li key={user.id}>
          <Gravatar email={user.email} size={36} /> {user.name}
        </li>
      );
    });
    return (
      <div>
        <h1>Users</h1>
        <ul>{users}</ul>
      </div>
    );
  }
});

var appProps = {users: USERS};
React.render(<App {...appProps}/>, document.body);

require('./tests').run(Gravatar, emailType);


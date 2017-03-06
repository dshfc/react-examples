import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({answer, error}) => {
  if (error) {
    return (
      <div>
        <hr/>
        <Alert bsStyle="danger">
          <p>
            {error.message}
          </p>
          <p>
            {error.response ? error.response.status : null}
          </p>
        </Alert>
      </div>
    )
  } else if (answer) {
    return (
      <div>
        <hr/>
        <Alert bsStyle="success">
          {answer}
        </Alert>
      </div>
    )
  } else {
    return <div></div>
  }
}

Message.propTypes = {
  answer: React.PropTypes.string,
  error: React.PropTypes.object
}

export default Message;

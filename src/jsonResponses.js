const respondJSON = (request, response, status, object) => {
  // set status code and content type (application/json)
  response.writeHead(status, { 'Content-Type': 'application/json' });
  // stringify the object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  response.write(JSON.stringify(object));
  // Send the response to the client
  response.end();
};

const success = (request, response) => {
  const responseJSON = {
    message: 'Load successful',
  };

  respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== true) {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    respondJSON(request, response, 401, responseJSON);
  }

  respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };
  respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal server error. Something went wrong',
    id: 'internal',
  };
  respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'A request for this page has not yet been implemented. Check again later',
    id: 'notImplemented',
  };
  respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for could not be found',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};

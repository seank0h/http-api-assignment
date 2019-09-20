// function to send a json object
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // set status code and content type (application/json)
  response.writeHead(status, headers);
  // stringify the object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  response.write(JSON.stringify(object));
  // Send the response to the client
  response.end();
};

const respondXML = (request, response, status, object) => {
  const headers = {
    'Content-type': 'text/xml',
  };

  response.writeHead(status, headers);

  response.write(object);

  response.end();
};
// function to show a success status code
const success = (request, response) => {
  // message to send
  if (request.headers.accept === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> This is a successful response </message>`;
    responseXML = `${responseXML} </response>`;

    return respondXML(request, response, 200, responseXML);
  }
  const responseJSON = {
    message: 'This is a successful response',
  };
  return respondJSON(request, response, 200, responseJSON);


  // send our json with a success status code
};

// function to show a bad request without the correct parameters
const badRequest = (request, response, params) => {
  if (request.headers.accept === 'text/xml') {
    if (!params.valid || params.valid !== 'true') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message> Missing valid query parameter set to true </message>`;
      responseXML = `${responseXML} </response>`;


      return respondXML(request, response, 400, responseXML);
    }
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> This request has the required parameters </message>`;
    responseXML = `${responseXML} </response>`;

    return respondXML(request, response, 200, responseXML);
  }
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    // give the error a consistent id
    responseJSON.id = 'badRequest';
    // return our json with a 400 bad request code
    return respondJSON(request, response, 400, responseJSON);
  }

  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, 200, responseJSON);
};

// function to show not found error
const notFound = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> The page you are looking for was not found. </message>`;
    responseXML = `${responseXML} </response>`;


    return respondXML(request, response, 404, responseXML);
  }
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return our json with a 404 not found error code
  return respondJSON(request, response, 404, responseJSON);
};

const unauthorizedRequest = (request, response, params) => {
  if (request.headers.accept === 'text/xml') {
    if (!params.loggedIn || params.loggedIn !== 'yes') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message> Missing login query parameter set to yes </message>`;
      responseXML = `${responseXML} </response>`;


      return respondXML(request, response, 401, responseXML);
    }


    let responseXML = '<response>';
    responseXML = `${responseXML} <message> This request has required parameters</message>`;
    responseXML = `${responseXML} </response>`;

    return respondXML(request, response, 200, responseXML);
  }
  const responseJSON = {
    message: 'This request has required parameters',
  };
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // set our error message
    responseJSON.message = 'Missing login query parameter set to yes';
    // give the error a consistent id
    responseJSON.id = 'badRequest';
    // return our json with a 400 bad request code
    return respondJSON(request, response, 401, responseJSON);
  }
  return respondJSON(request, response, 200, responseJSON);
};
const forbiddenRequest = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>You do not have access to this material </message>`;
    responseXML = `${responseXML} </response>`;

    return respondXML(request, response, 403, responseXML);
  }
  const responseJSON = {
    message: 'You do not have access to this material',
  };

  return respondJSON(request, response, 403, responseJSON);
};

const badServerRequest = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> This is a successful response </message>`;
    responseXML = `${responseXML} </response>`;


    return respondXML(request, response, 500, responseXML);
  }
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong',
  };

  return respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> Content has not yet been implemented. Come back later for updates</message>`;
    responseXML = `${responseXML} </response>`;


    return respondXML(request, response, 501, responseXML);
  }
  const responseJSON = {
    message: 'Content has not yet been implemented. Come back later for updates',
  };

  return respondJSON(request, response, 501, responseJSON);
};
// exports to set functions to public.
// In this syntax, you can do getIndex:getIndex, but if they
// are the same name, you can short handle to just getIndex,
module.exports = {
  success,
  badRequest,
  forbiddenRequest,
  badServerRequest,
  unauthorizedRequest,
  notImplemented,
  notFound,

};

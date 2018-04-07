/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we can wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/

exports.catchErrors = fn => {
  return function(req, res, next) {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};

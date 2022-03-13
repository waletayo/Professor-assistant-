const adaptRequest = (req = {}) =>
  Object.freeze({
    path: req.path,
    method: req.method,
    params: req.params,
    queryParams: req.query,
    body: req.body,
    sub: req.sub,
    file: req.file,
    files: req.files
  });

module.exports = adaptRequest;

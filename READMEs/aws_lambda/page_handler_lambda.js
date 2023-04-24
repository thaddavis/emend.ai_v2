const hasExtension = /(.+)\.[a-zA-Z0-9]{2,5}/;

exports.handler = async (event) => {
  const req = event.Records[0].cf.request;
  const url = req.uri;
  if (url === "/") {
  } else if (url && !url.match(hasExtension)) {
    req.uri = `${url}.html`;
  }
  return req;
};

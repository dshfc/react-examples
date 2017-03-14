exports.apiUrl = function(url){
  const localPort = process.env.PORT || '3000';
  const serverPort = process.env.REACT_APP_PROXY_PORT || '8080';
  return url.replace(localPort, serverPort);
}

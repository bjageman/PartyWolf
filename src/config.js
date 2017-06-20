
var ENVIRONMENT="production"

function getConfig() {
  switch (ENVIRONMENT) {
  case "debug":
    return {
      API_URL: 'http://10.0.2.2:5000',
      API_VERSION: 1,
      VERSION: 'debug',
      DEBUG: true,
    };
  case "debug-web":
    return {
      API_URL: 'http://0.0.0.0:5000',
      API_VERSION: 1,
      VERSION: 'debug',
      DEBUG: true,
    };
  case "demo":
    return {
      API_URL: 'http://192.168.1.111:5000',
      API_VERSION: 1,
      VERSION: 'demo',
      DEBUG: false,
    };
  case "production":
    return {
      API_URL: 'http://neuro.ddnsking.com:5000',
      API_VERSION: 1,
      VERSION: 'production',
      DEBUG: false,
    };
  case "production-debug":
    return {
      API_URL: 'http://neuro.ddnsking.com:5000',
      API_VERSION: 1,
      VERSION: 'production-debug',
      DEBUG: true,
    };
  default:
    return {
      API_URL: 'http://10.0.2.2:5000',
      API_VERSION: 1,
      VERSION: 'debug',
      DEBUG: true,
    };
  }
}

const myConfig = getConfig();
export default myConfig

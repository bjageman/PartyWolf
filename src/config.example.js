var ENVIRONMENT="production"

function getConfig() {
  switch (ENVIRONMENT) {
  case "local":
    return {
      API_URL: 'http://0.0.0.0:5000',
      API_VERSION: 1,
      VERSION: 'debug',
      DEBUG: false,
      PLAYERMIN: 0,
      TIMEOUT: 10000,
    };
  case "staging":
    return {
      API_URL: 'http://staging.example.com:5000',
      API_VERSION: 1,
      VERSION: 'demo',
      DEBUG: false,
      PLAYERMIN: 5,
      TIMEOUT: 10000,
    };
  case "production":
    return {
      API_URL: 'http://www.example.com:5000',
      API_VERSION: 1,
      VERSION: 'production',
      DEBUG: false,
      PLAYERMIN: 5,
    };
  case "production-debug":
    return {
      API_URL: 'http://www.example.com:5000',
      API_VERSION: 1,
      VERSION: 'production-debug',
      DEBUG: true,
      PLAYERMIN: 5,
    };
  default:
    return {
      API_URL: 'http://10.0.2.2:5000',
      API_VERSION: 1,
      VERSION: 'debug',
      DEBUG: true,
      PLAYERMIN: 0,
    };
  }
}

const myConfig = getConfig();
export default myConfig

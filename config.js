
ENVIRONMENT="debug"

function getConfig() {
  switch (ENVIRONMENT) {
  case "debug":
    return {
      API_URL: 'http://10.0.2.2:5000',
      API_VERSION: 1,
      VERSION: 'debug',
      DEBUG: true,
    };
    break;
  case "demo":
    return {
      API_URL: 'http://192.168.1.111:5000',
      VERSION: 'demo',
      DEBUG: false,
    };
    break;
  case "production":
    return {
      API_URL: 'http://werewolf-site.com:5000',
      VERSION: 'production',
      DEBUG: false,
    };
    break;
  default:
    return {
      API_URL: 'http://10.0.2.2:5000',
      VERSION: 'debug',
      DEBUG: true,
    };
  }
}

export const myConfig = getConfig();

import Keycloak from 'keycloak-js'

const keycloakConfig = {
  url: 'https://login.realyze.cloud',
  realm: 'realyze',
  clientId: 'realyze-webapp'
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak

import { useEffect } from 'react';
import { Stack, Text, Spinner } from '@fluentui/react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

initializeIcons();

const stackTokens = { childrenGap: 15 };
const stackStyles = { root: { width: 300, margin: '0 auto', padding: 20, boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: 5 } };

function Login() {
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized) {
      if (keycloak.authenticated) {
        localStorage.setItem('token', keycloak?.token || '');
        navigate('/home');
      } else {
        keycloak.login();
      }
    }
  }, [keycloak, initialized, navigate]);

  if (!initialized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Stack tokens={stackTokens} styles={stackStyles}>
          <Text variant="xLarge" block>Initializing...</Text>
          <Spinner label="Please wait..." />
        </Stack>
      </div>
    );
  }

  return null; // The login page won't be rendered as Keycloak will handle the login process
}

export default Login;
import { useState } from 'react';
import { TextField, PrimaryButton, Checkbox, Link, Stack, Text, Spinner, MessageBar, MessageBarType } from '@fluentui/react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { useNavigate } from 'react-router-dom';
import useLogin from '../api/login';

initializeIcons();

const stackTokens = { childrenGap: 15 };
const stackStyles = { root: { width: 300, margin: '0 auto', padding: 20, boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: 5 } };
const iconStyles = { root: { fontSize: 24, color: '#0078d4' } };

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  const { login, isLoading, isSuccess, loginError } = useLogin();
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!username.length) {
      setValidationError('Please enter a valid username.');
      return false;
    }
    if (password.length < 4) {
      setValidationError('Password must be at least 4 characters long.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      await login(username, password);
      if (isSuccess) {
          navigate('/');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Stack tokens={stackTokens} styles={stackStyles}>
        <Text variant="xLarge" block>Login</Text>
        {validationError && <MessageBar messageBarType={MessageBarType.error}>{validationError}</MessageBar>}
        {error && <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>}
        {loginError && <MessageBar messageBarType={MessageBarType.error}>{loginError}</MessageBar>}
        <TextField label="User name or email address" required value={username} onChange={(e, newValue) => setUsername(newValue || '')} />
        <TextField label="Password" type="password" required value={password} onChange={(e, newValue) => setPassword(newValue || '')} />
        <Stack horizontal horizontalAlign="space-between">
          <Checkbox label="Remember me" />
          <Link href="#">Forgot password?</Link>
        </Stack>
        <PrimaryButton text="Login" onClick={handleLogin} disabled={isLoading} />
        {isLoading && <Spinner label="Logging in..." />}
      </Stack>
    </div>
  );
}

export default Login;
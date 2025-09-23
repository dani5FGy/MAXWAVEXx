import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Tab,
  Tabs,
  FormControlLabel,
  Checkbox,
  Link,
  Alert,
  CircularProgress,
  Avatar,
  Container,
  Fade,
  Slide,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  FlashOn,
  Person,
  PersonAdd,
  PlayArrow,
  Email,
  Lock,
  AccountCircle,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    rememberMe: false,
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login, register, loginAsGuest, loading, error, clearError } = useAuth();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    clearError();
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      rememberMe: false,
      acceptTerms: false
    });
  };

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    if (error) clearError();
  };

  const handleCheckboxChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      return;
    }

    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.error("Error en login:", error);
      // Error manejado por el contexto
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    if (!formData.acceptTerms) {
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
    } catch (error) {
      console.error("Error en registro:", error);
      // Error manejado por el contexto
    }
  };

  const handleGuestLogin = async (event) => {
    event.preventDefault();
    
    if (!formData.username || formData.username.trim().length < 2) {
      return;
    }

    try {
      await loginAsGuest(formData.username);
    } catch (error) {
      console.error("Error en login como invitado:", error);
      // Error manejado por el contexto
    }
  };

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`login-tabpanel-${index}`}
      aria-labelledby={`login-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Fade in timeout={500}>
          <Box sx={{ pt: 3 }}>
            {children}
          </Box>
        </Fade>
      )}
    </div>
  );

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        py={4}
      >
        <Slide in timeout={800} direction="up">
          <Card
            sx={{
              width: '100%',
              maxWidth: 480,
              backdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 4,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {/* Logo y Título */}
              <Box textAlign="center" mb={4}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    mx: 'auto',
                    mb: 2,
                    background: 'linear-gradient(45deg, #FCD34D, #F59E0B)',
                  }}
                >
                  <FlashOn sx={{ fontSize: 32, color: 'white' }} />
                </Avatar>
                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #FCD34D, #F59E0B)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  MaxWaveX
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Plataforma Educativa de Electromagnetismo
                </Typography>
              </Box>

              {/* Error Alert */}
              {error && (
                <Fade in>
                  <Alert 
                    severity="error" 
                    sx={{ mb: 3, borderRadius: 2 }}
                    onClose={clearError}
                  >
                    {error}
                  </Alert>
                </Fade>
              )}

              {/* Tabs */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  sx={{
                    '& .MuiTab-root': {
                      minHeight: 64,
                      fontWeight: 600,
                    },
                  }}
                >
                  <Tab
                    icon={<Person />}
                    label="Iniciar Sesión"
                    id="login-tab-0"
                    aria-controls="login-tabpanel-0"
                  />
                  <Tab
                    icon={<PersonAdd />}
                    label="Registro"
                    id="login-tab-1"
                    aria-controls="login-tabpanel-1"
                  />
                  <Tab
                    icon={<PlayArrow />}
                    label="Invitado"
                    id="login-tab-2"
                    aria-controls="login-tabpanel-2"
                  />
                </Tabs>
              </Box>

              {/* Login Form */}
              <TabPanel value={tabValue} index={0}>
                <Box component="form" onSubmit={handleLogin} noValidate>
                  <TextField
                    fullWidth
                    label="Email o Usuario"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    margin="normal"
                    required
                    autoComplete="email"
                    InputProps={{
                      startAdornment: <Email sx={{ color: 'text.secondary', mr: 1 }} />,
                    }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    margin="normal"
                    required
                    autoComplete="current-password"
                    InputProps={{
                      startAdornment: <Lock sx={{ color: 'text.secondary', mr: 1 }} />,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.rememberMe}
                          onChange={handleCheckboxChange('rememberMe')}
                          color="primary"
                        />
                      }
                      label="Recordarme"
                    />
                    <Link href="#" variant="body2" color="primary.main">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      background: 'linear-gradient(45deg, #2563EB, #8B5CF6)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1D4ED8, #7C3AED)',
                      },
                    }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
                  </Button>
                </Box>
              </TabPanel>

              {/* Register Form */}
              <TabPanel value={tabValue} index={1}>
                <Box component="form" onSubmit={handleRegister} noValidate>
                  <TextField
                    fullWidth
                    label="Nombre Completo"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    margin="normal"
                    required
                    autoComplete="name"
                    InputProps={{
                      startAdornment: <AccountCircle sx={{ color: 'text.secondary', mr: 1 }} />,
                    }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    margin="normal"
                    required
                    autoComplete="email"
                    InputProps={{
                      startAdornment: <Email sx={{ color: 'text.secondary', mr: 1 }} />,
                    }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    margin="normal"
                    required
                    autoComplete="new-password"
                    InputProps={{
                      startAdornment: <Lock sx={{ color: 'text.secondary', mr: 1 }} />,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Confirmar Contraseña"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    margin="normal"
                    required
                    autoComplete="new-password"
                    error={formData.password !== formData.confirmPassword && formData.confirmPassword !== ''}
                    helperText={
                      formData.password !== formData.confirmPassword && formData.confirmPassword !== ''
                        ? 'Las contraseñas no coinciden'
                        : ''
                    }
                    InputProps={{
                      startAdornment: <Lock sx={{ color: 'text.secondary', mr: 1 }} />,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirmPassword(prev => !prev)} edge="end">
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.acceptTerms}
                        onChange={handleCheckboxChange('acceptTerms')}
                        color="primary"
                        required
                      />
                    }
                    label={
                      <Typography variant="body2">
                        Acepto los{' '}
                        <Link href="#" color="primary.main">
                          términos y condiciones
                        </Link>
                      </Typography>
                    }
                    sx={{ mb: 3 }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      background: 'linear-gradient(45deg, #059669, #10B981)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #047857, #059669)',
                      },
                    }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Crear Cuenta'}
                  </Button>
                </Box>
              </TabPanel>

              {/* Guest Form */}
              <TabPanel value={tabValue} index={2}>
                <Box component="form" onSubmit={handleGuestLogin} noValidate>
                  <TextField
                    fullWidth
                    label="Nombre de Usuario"
                    value={formData.username}
                    onChange={handleInputChange('username')}
                    margin="normal"
                    required
                    placeholder="Elige un nombre de usuario"
                    InputProps={{
                      startAdornment: <AccountCircle sx={{ color: 'text.secondary', mr: 1 }} />,
                    }}
                    helperText="Este nombre se usará para personalizar tu experiencia"
                    sx={{ mb: 3 }}
                  />

                  <Alert
                    severity="info"
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      backgroundColor: 'rgba(251, 191, 36, 0.1)',
                      border: '1px solid rgba(251, 191, 36, 0.3)',
                      '& .MuiAlert-icon': {
                        color: '#FCD34D'
                      }
                    }}
                  >
                    <Typography variant="subtitle2" color="primary.main" gutterBottom>
                      Modo Invitado
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Acceso completo a todos los módulos<br />
                      • El progreso no se guardará<br />
                      • Puedes crear una cuenta más tarde
                    </Typography>
                  </Alert>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      background: 'linear-gradient(45deg, #F59E0B, #D97706)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #D97706, #B45309)',
                      },
                    }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Continuar como Invitado'}
                  </Button>
                </Box>
              </TabPanel>
            </CardContent>
          </Card>
        </Slide>
      </Box>
    </Container>
  );
};

export default LoginPage;

import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Fade,
  Grow,
  Button,
  Avatar
} from '@mui/material';
import {
  Radio,
  Wifi,
  PhoneAndroid,
  MedicalServices,
  FlashOn,
  Satellite
} from '@mui/icons-material';

const ApplicationsModule = () => {
  const applications = [
    {
      id: 'radio',
      title: 'Comunicaciones por Radio',
      icon: Radio,
      description: 'Las ondas de radio permiten las comunicaciones inalámbricas a largas distancias.',
      details: 'Frecuencias de 3 kHz a 300 GHz se utilizan para radio AM/FM, televisión, y comunicaciones móviles.',
      color: '#3B82F6'
    },
    {
      id: 'wifi',
      title: 'WiFi y Bluetooth',
      icon: Wifi,
      description: 'Tecnologías inalámbricas que utilizan microondas para transferencia de datos.',
      details: 'WiFi opera en 2.4 GHz y 5 GHz, mientras que Bluetooth usa 2.4 GHz con saltos de frecuencia.',
      color: '#10B981'
    },
    {
      id: 'mobile',
      title: 'Telefonía Móvil',
      icon: PhoneAndroid,
      description: 'Los teléfonos celulares usan ondas electromagnéticas para comunicación.',
      details: 'Desde 1G hasta 5G, cada generación utiliza diferentes frecuencias y técnicas de modulación.',
      color: '#8B5CF6'
    },
    {
      id: 'medical',
      title: 'Aplicaciones Médicas',
      icon: MedicalServices,
      description: 'Rayos X, resonancia magnética y otros equipos médicos.',
      details: 'Los rayos X permiten ver dentro del cuerpo, mientras que la RM usa campos magnéticos intensos.',
      color: '#EF4444'
    },
    {
      id: 'power',
      title: 'Transmisión de Energía',
      icon: FlashOn,
      description: 'Las líneas de transmisión eléctrica transportan energía a largas distancias.',
      details: 'Frecuencias de 50-60 Hz se utilizan para distribución de energía eléctrica en redes.',
      color: '#F59E0B'
    },
    {
      id: 'satellite',
      title: 'Comunicaciones Satelitales',
      icon: Satellite,
      description: 'Satélites que proporcionan comunicaciones globales y GPS.',
      details: 'Utilizan microondas y frecuencias más altas para comunicación espacial.',
      color: '#06B6D4'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in timeout={600}>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #FCD34D, #F59E0B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Aplicaciones Tecnológicas
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            maxWidth="800px"
            mx="auto"
          >
            Descubre cómo el electromagnetismo impulsa la tecnología moderna
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={3}>
        {applications.map((app, index) => {
          const IconComponent = app.icon;
          return (
            <Grid item xs={12} md={6} lg={4} key={app.id}>
              <Grow in timeout={800 + index * 100}>
                <Card
                  sx={{
                    height: '100%',
                    background: `linear-gradient(135deg, ${app.color}15 0%, ${app.color}05 100%)`,
                    border: `1px solid ${app.color}30`,
                    borderRadius: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar
                        sx={{
                          backgroundColor: app.color,
                          mr: 2,
                          width: 48,
                          height: 48,
                        }}
                      >
                        <IconComponent />
                      </Avatar>
                      <Typography variant="h6" color="text.primary" fontWeight={600}>
                        {app.title}
                      </Typography>
                    </Box>

                    <Typography variant="body1" color="text.primary" mb={2} sx={{ lineHeight: 1.6 }}>
                      {app.description}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mb={3} sx={{ flexGrow: 1 }}>
                      {app.details}
                    </Typography>

                    <Button
                      variant="outlined"
                      sx={{
                        color: app.color,
                        borderColor: app.color,
                        '&:hover': {
                          borderColor: app.color,
                          backgroundColor: `${app.color}10`,
                        },
                      }}
                    >
                      Aprender Más
                    </Button>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ApplicationsModule;
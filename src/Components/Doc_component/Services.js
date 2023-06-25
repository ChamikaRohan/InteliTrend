import React, { useState,useEffect } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginImage from '../../Images/login-form-image.jpg';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9,];

const theme = createTheme();

export default function Album(userData) {
  const [documents, setDocuments] = useState([]);
  const [data, setData] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:8000/doclist", {
      method: "GET",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setData(data.data);
    });
  },[]);

  
  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
        
      <main>
        {/* Hero unit */}
        
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map(item => (
              <Grid item key={item._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex',flexDirection: 'column', transition: 'box-shadow 0.3s ease-in-out', '&:hover': {boxShadow: '0px 10px 50px rgba(141, 158, 71, 0.5)'} }}
                >
                  <CardMedia
                    component="img"
                    image={LoginImage}
                    alt="random"
                    sx={{ flexGrow: 1 }}
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.docname}
                    </Typography>
                    <Typography>
                    Speciality: {item.speciality}<br/>
                    Hospital: {item.workingHospital}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      
      {/* End footer */}
    </ThemeProvider>
  );
}
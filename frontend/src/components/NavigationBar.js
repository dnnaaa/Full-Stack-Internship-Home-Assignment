import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NavigationBar() {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Gestion des offres d'emploi
                </Typography>
                <Button color="inherit" onClick={() => navigate('/')}>
                    Liste des emplois
                </Button>
                <Button color="inherit" onClick={() => navigate('/add-job')}>
                    Ajouter un emploi
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavigationBar;

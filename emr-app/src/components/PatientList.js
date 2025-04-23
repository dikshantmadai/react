import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          'https://hapi.fhir.org/baseR4/Patient?_count=20'
        );
        setPatients(response.data.entry || []);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Patient List
      </Typography>
      <List>
        {patients.map((patient) => (
          <ListItem 
            key={patient.resource.id} 
            component={Link} 
            to={`/patient/${patient.resource.id}`}
            button
          >
            <ListItemText
              primary={`${patient.resource.name?.[0]?.given?.[0] || 'Unknown'} ${patient.resource.name?.[0]?.family || ''}`}
              secondary={`ID: ${patient.resource.id} | Gender: ${patient.resource.gender || 'Unknown'}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PatientList;
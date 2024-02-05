import { Box, TextField, Typography } from '@mui/material'
import React from 'react'
import '../index.css'

export const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Box mt={18}>
        <Typography
          mb={1.5}
          variant="h2"
          component="h2"
          fontFamily={'roboto'}
          fontWeight={600}
          color={'#000'}
        >
          Add Chur
        </Typography>
        <Typography
          variant="h4"
          component="h3"
          fontFamily={'roboto'}
          fontWeight={400}
          color={'#878893'}
        >
          All fields should not be empty, Gedeon
        </Typography>
      </Box>

      {/* GENERAL */}
      <Box
        mt={8}
        sx={{ backgroundColor: '#f7f7f7' }}
        p={4}
        borderRadius={6}
        className="box-shadow"
      >
        <Typography
          variant="h4"
          component="h2"
          fontFamily={'roboto'}
          fontWeight={500}
          color={'#000'}
          mb={2}
        >
          General
        </Typography>

        <TextField
          id="church-name"
          label="Church Name"
          variant="outlined"
          style={{ width: '100%', margin: '0px !important' }}
          className="textField mo"
        />

        {/* PRINCIPAL */}
        <Typography
          variant="h4"
          component="h2"
          fontFamily={'roboto'}
          fontWeight={500}
          color={'#000'}
          mb={2}
        >
          Principal
        </Typography>

        <TextField
          id="pastor-name"
          label="Pastor Name"
          variant="outlined"
          style={{ width: '100%', margin: '0px !important' }}
          className="textField"
        />
      </Box>
    </React.Fragment>
  )
}

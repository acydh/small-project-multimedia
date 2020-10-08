import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl, Input } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

const Form = () => {
    const classes = useStyles();
    return (
        
        <form className={classes.root} action="/api/citta/" method="POST" autoComplete="off">
            <FormControl>  
            <Input placeholder="Regione" inputProps={{ 'aria-label': 'description' }} type="text" id="regione" name="regione" required />
            <Input placeholder="Citta" type="text" id="citta" name="citta" required />
            <Input placeholder="Popolazione" type="number" id="popolazione" name="popolazione" required />
            <Button type="submit" value="Aggiungi" variant="contained" color="primary">Salva</Button>
            </FormControl>
        </form>
        
    )
}

export default Form;
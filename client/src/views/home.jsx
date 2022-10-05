import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField'
import { useState } from 'react';
import EditModal from '../components/edit.modal';

const Home = () => {
    const[note,setNote]=useState('');
    const[details, setDetails]=useState('');

    const handleNote=function(e){
        setNote(e.target.value);
    }
    const handleDetails= function(e){
        setDetails(e.target.value);
    }
    return ( 
        <div>
            <Grid container sx={{display:'grid',placeContent:'center'}}>
                <Grid item sx={{display:'flex',justifyContent:'center' ,flexDirection:'column'}}>
                <TextField
                   label="Notes"
                   value={note}
                   onChange={handleNote}
                   required
                   color='secondary'
                   sx={{marginBottom:5,width:350}}
                />
                <TextField
                  label="Details"
                  value={details}
                  onChange={handleDetails}
                  required
                   sx={{marginBottom:5,width:350}}
                />
                </Grid>
            </Grid>
            <EditModal/>
        </div>
     );
}
 
export default Home;
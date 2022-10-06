import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from '@mui/material/TextField'
import { useState } from 'react';
import axios from "axios";


const AddModal = () => {
    const[note,setNote]=useState('');
    const[details, setDetails]=useState('');
    const[modal, setModal]=useState(false);

    const handleNote=function(e){
        setNote(e.target.value);
    }
    const handleDetails= function(e){
        setDetails(e.target.value);
    }
    const handleAdd =function(e){
        e.preventDefault();
        const newNote=({
            note:note,
            details:details,
        });
        axios.post('http://localhost:8000/notes',newNote)
        .then(function(respond){
            
            console.log(respond);
        })
        .catch(function(err){
            console.log('Post Error: ',err);
        });
        setModal(false);

    }
    const handleOpen = function(){
        setModal(true);
    }
    return (  
        <div>
            <Fab variant="extended" color="primary" sx={{position:'fixed',bottom:(theme)=>theme.spacing(2),
            right:(theme)=>theme.spacing(2)}} onClick={handleOpen}>
                <AddIcon/>Add your Note
            </Fab>
            <Dialog open={modal} sx={{textAlign:'center'}}>
                <DialogTitle>
                    <Typography>Add Your Notes Here</Typography>
                </DialogTitle>
                <DialogContent>
                <form >
                    <TextField
                      label="Notes"
                      value={note}
                      onChange={handleNote}
                      required
                      color='secondary'
                      sx={{marginBottom:5,width:350,marginTop:3}}
                   />
                   <TextField
                     label="Details"
                     value={details}
                     onChange={handleDetails}
                     required
                      sx={{marginBottom:5,width:350}}
                   />
                   
                 </form>
                </DialogContent>
                <DialogActions>
                     <Button onClick={handleAdd} variant='outlined'color='primary'>SUBMIT</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
 
export default AddModal;
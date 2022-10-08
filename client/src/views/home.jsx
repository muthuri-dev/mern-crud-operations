import { Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography } from '@mui/material';
import AddModal from '../components/add.modal';
import { useState,useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
    const[notes,setNotes]= useState('');
    const[note,setNote]=useState('');
    const[detail, setDetail]=('');
    const [editModal, setEditModal]=useState(false);

    const handleNote=function(e){
        setNote(e.target.value);
    }
    const handleDetail=function(e){
        setDetail(e.target.value);
    }
    const handleEdit= function(){
        setEditModal(true);
    }
    const handleEdits= function(id){
        setEditModal(false);
        axios.put(`http://localhost:8000/notes/${id}`)
    }
    const handleDelete= function(e,id){
        e.preventdefault();
        axios.delete(`http://localhost:8000/notes/${id}`)
        .then(function(response){
            console.log('delete');
        })
    }

    useEffect(function(){
        axios.get('http://localhost:8000/notes/')
        .then(function(response){
            setNotes(response.data.data);
            console.log(response.data.data);
        })
        .catch(function(err){
            console.log(err);
        });
    },[]);
    
    return ( 
        <div>
            <Grid container direction='column' sx={{dispay:'flex',alignItems:'center'}}>
                <Grid item container direction='row' sx={{alignItems:'center'}} >
                 {notes  && notes.map((note)=>(
                    <Card elevation={5} sx={{height:200,width:300,margin:5 }} key={note.id}>
                        <CardHeader 
                        title={note.note}
                        action={
                        <IconButton>
                            <DeleteIcon onClick={handleDelete}/>
                        </IconButton>
                       }
                        />
                        <CardContent>
                            <Typography color='secondary'>{note.details}</Typography>
                        </CardContent>
                        <CardActions color='secondary'sx={{alignItems:'end'}}>
                            <Button onClick={handleEdit} variant='outlined'color='secondary'>EDIT</Button>
                        </CardActions>
                    </Card>
                 ))}
                 {!notes && <Typography>Data Loading...</Typography>}
                </Grid>
            </Grid>
            <AddModal/>

            <Dialog open={editModal}>
                <DialogTitle sx={{fontFamily:'monospace',display:'flex',justifyContent:'center'}} >
                    <Typography sx={{fontFamily:'monospace'}}>Edit</Typography>
                </DialogTitle>
                <DialogContent sx={{textAlign:'center'}}>
                        <TextField 
                        color='success'
                        label='note'
                        value={note}
                        onChange={handleNote}
                        sx={{marginTop:2,marginBottom:3,width:300}}
                        type='text'
                        />
                        <TextField 
                        color='success'
                        label='details'
                        value={detail}
                        onChange={handleDetail}
                        sx={{marginTop:2,marginBottom:3,width:300}}
                        type='text'
                        /> 
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEdits}variant='contained'color='success'>SUBMIT</Button>
                </DialogActions>
            </Dialog>
        </div>
     );
}
 
export default Home;
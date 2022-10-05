import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";


const EditModal = () => {
    return (  
        <div>
            <Fab variant="extended" color="primary">
                <EditIcon/>Edit
            </Fab>
        </div>
    );
}
 
export default EditModal;
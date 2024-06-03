import { TextField } from '@mui/material';
import BirdsDropDown from '../BirdsDropDown/BirdsDropDown';

function AddBirdForm() {


    return (
        <form>
        <BirdsDropDown required/>
        <input type="date" required/>
        <TextField variant="outlined" placeholder='location' size='small' required/>
        <TextField variant="outlined" placeholder='Notes' multiline rows={3}/>
        <br />
        <input type='Submit' />
        </form>
    )
}

export default AddBirdForm;
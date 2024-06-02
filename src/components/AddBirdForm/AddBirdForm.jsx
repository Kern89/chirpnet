import { TextField } from '@mui/material';
import BirdsDropDown from '../BirdsDropDown/BirdsDropDown';

function AddBirdForm() {


    return (
        <form>
        <BirdsDropDown />
        <input type="date" />
        <TextField variant="outlined" placeholder='location'/>
        <TextField variant="outlined" placeholder='Notes' multiline rows={3}/>
        <br />
        <input type='Submit' />
        </form>
    )
}

export default AddBirdForm;
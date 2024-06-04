import { TextField } from '@mui/material';
import BirdsDropDown from '../BirdsDropDown/BirdsDropDown';
import { useState } from 'react';
import axios from 'axios';

function AddBirdForm() {
    const [birdSp, setBirdSp] = useState=('');
    const [date, setDate] = useState=('');
    const [location, setLocation] = useState=('');
    const [notes, setNotes] = useState=('');
    const addBird = () => {
        axios.post('', {})
    };

    return (
        <form onSubmit={addBird}>
        <BirdsDropDown required setBirdSp="setBirdSp"/>
        <input type="date" required onChange={(e) => setDate(e.target.value)}/>
        <TextField variant="outlined" placeholder='location' size='small' required onChange={(e) => setLocation(e.target.value)}/>
        <TextField variant="outlined" placeholder='Notes' multiline rows={3} onChange={(e) => setNotes(e.target.value)}/>
        <br />
        <input type='Submit'/>
        </form>
    )
}

export default AddBirdForm;
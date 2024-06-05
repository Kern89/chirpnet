import { TextField } from '@mui/material';
import BirdsDropDown from '../BirdsDropDown/BirdsDropDown';
import { useState } from 'react';
import axios from 'axios';

function AddBirdForm() {
    const [birdSp, setBirdSp] = useState('');
    const [date, setDate] = useState('');
    const [city, setCity] = useState('');
    const [birdState, setBirdState] = useState('');
    const [notes, setNotes] = useState('');
    const addBird = () => {
        axios.post('/api/birdList', { bird_sp: birdSp, city: city, state: birdState, date: date, notes: notes })
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
                alert('Something went wrong')
            })
    };

    return (
        <form onSubmit={addBird}>
        <BirdsDropDown required setBirdSp={setBirdSp}/>
        <input type="date" required onChange={(e) => setDate(e.target.value)}/>
        <TextField variant="outlined" placeholder='City' size='small' required onChange={(e) => setCity(e.target.value)}/>
        <TextField variant="outlined" placeholder='State MN, WI, ETC.' size='small' required onChange={(e) => setBirdState(e.target.value)}/>
        <TextField variant="outlined" placeholder='Notes' multiline rows={3} onChange={(e) => setNotes(e.target.value)}/>
        <br />
        <input type='Submit'/>
        </form>
    )
}

export default AddBirdForm;
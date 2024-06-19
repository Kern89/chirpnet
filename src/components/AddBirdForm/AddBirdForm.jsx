import { TextField } from '@mui/material';
import BirdsDropDown from '../BirdsDropDown/BirdsDropDown';
import { useState } from 'react';
import axios from 'axios';
import './AddBirdForm.css';

function AddBirdForm() {
    const [birdSp, setBirdSp] = useState('');
    const [date, setDate] = useState('');
    const [city, setCity] = useState('');
    const [birdState, setBirdState] = useState('');
    const [notes, setNotes] = useState('');
    const addBird = () => {
        if(birdSp === undefined || null) {
            alert("Please choose a species from the drop down menu.")
          } else {
            axios.post('/api/birdList', { bird_sp: birdSp, city: city, state: birdState, date: date, notes: notes })
            .then(response => {
                console.log(response);
                setDate('');
                setCity('');
                setBirdState('');
                setNotes('');
                setBirdSp('');
            }).catch(error => {
                console.log(error);
                alert('Something went wrong')
            }) 
          }
    };

    return (
        <>
        <h2 id='add'>Add Bird Sighting</h2>
        <form onSubmit={addBird} >
        <BirdsDropDown required setBirdSp={setBirdSp} birdSp={birdSp}/>
        <input value={date} type="date" required onChange={(e) => setDate(e.target.value)}
                className='textfield' />
        <br />
        <TextField value={city} variant="outlined" placeholder='City' size='small' 
                     onChange={(e) => setCity(e.target.value)} className='textfield'
                     required
        />
        <br />
        <TextField value={birdState} variant="outlined" placeholder='State MN, WI, ETC.' 
                    size='small' required onChange={(e) => setBirdState(e.target.value)}
                    className='textfield'
        />
        <br />
        <TextField value={notes} variant="outlined" placeholder='Notes' multiline rows={3} 
                    onChange={(e) => setNotes(e.target.value)}
                    className='textfield'
        />
        <br />
        <input type='Submit' className='submit'/>
        </form>
        </>
    )
}

export default AddBirdForm;
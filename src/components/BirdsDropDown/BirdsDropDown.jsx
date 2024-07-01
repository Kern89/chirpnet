import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './BirdsDropDown.css'

function BirdsDropDown({setBirdSp, birdSp}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'GET_BIRDS'});
    },[])
    const localBirds = useSelector(store => store.localBirds);
    const localBirdsArray = [];
    {localBirds.map(bird => (
      localBirdsArray.push(bird.common_name)
    ))}

  const setBird = (name) => {
     // console.log("bird selected:", [name.inputProps.value]);
    const birdName = name.inputProps.value;
    // 
    const newBirdId = localBirds.find((bird) => bird.common_name === birdName)?.id;
      
    console.log("newBirdId:", newBirdId);
    setBirdSp(newBirdId);
  }
    
    return (
        <>
        <div id="autocomp">
        <Autocomplete
      disablePortal
      id="localBirds"
      options={localBirdsArray}
      sx={{ width: 250, style: { textAlign: 'center', align: 'center' } }}
      renderInput={(params) => <TextField {...params} label="Bird Species" size='small' onClick={setBird(params)} required />}
    />
    </div>
       </>
    )
};

export default BirdsDropDown;
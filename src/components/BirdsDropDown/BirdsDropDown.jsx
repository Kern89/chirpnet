import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import './BirdsDropDown.css'

function BirdsDropDown({setBirdSp, birdSp}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'GET_BIRDS'});
        // console.log('local birds array:', localBirdsArray);
    },[])
    const localBirds = useSelector(store => store.localBirds);
    const localBirdsArray = [];
    {localBirds.map(bird => (
      localBirdsArray.push(bird.common_name)
    ))}
  //   console.log('local birds array:', localBirdsArray);
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const closeMenu = () => {
  //   setAnchorEl(null);
  // };
  const setBird = (name) => {
     // console.log("bird selected:", [name.inputProps.value]);
    const birdName = name.inputProps.value;
    // 
    const newBirdId = localBirds.find((bird) => bird.common_name === birdName)?.id;
      
    console.log("newBirdId:", newBirdId);
    setBirdSp(newBirdId);
      
    
    // axios.get(`/api/birds/${birdName}`).then(response => {
    //   console.log(response.data[0].id);
    //   const birdID = response.data[0].id;
    //   setBirdSp(birdID);
    // }).catch(error => {
    //   console.log(error);
    //   alert('Something went wrong!');
    // });
    // setBirdSp('')
    // setBirdSp(event.target.ariaValueNow)
    // setAnchorEl(null);
  }
    
    return (
        <>
        <div id="autocomp">
        <Autocomplete
      disablePortal
      id="localBirds"
      options={localBirdsArray}
      sx={{ width: 300, style: { textAlign: 'center', align: 'center' } }}
      renderInput={(params) => <TextField {...params} label="Bird Species" size='small' onClick={setBird(params)} required />}
    />
    </div>
        {/* <Button onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-placeholder="Bird Species"
        >Bird Species</Button>
        <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}> 
             {localBirds.map(bird => (
            <MenuItem key={bird.sp_code}>
                <h6 onClick={setBird} aria-valuenow={bird.id}>{bird.common_name}</h6>
            </MenuItem>
        ))}
        </Menu> */}
       
        </>
    )
};

export default BirdsDropDown;
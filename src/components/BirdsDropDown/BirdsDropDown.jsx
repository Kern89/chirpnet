import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function BirdsDropDown({setBirdSp}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'GET_BIRDS'});
        console.log('local birds array:', localBirdsArray);
    },[])
    const localBirds = useSelector(store => store.localBirds);
    const localBirdsArray = [];
    {localBirds.map(bird => (
      localBirdsArray.push(bird.common_name)
    ))}
    console.log('local birds array:', localBirdsArray);
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const closeMenu = () => {
  //   setAnchorEl(null);
  // };
  // const setBird = (event) => {
  //   console.log(event.target);
  //   setBirdSp(event.target.ariaValueNow)
  //   setAnchorEl(null);
  // }
    
    return (
        <>
        {/* need to look further at MUI doc to get menu working better, much of this is coppied directly from MUI for testing 
            ------Needs to be scrollable!!------
        */}
        <Autocomplete
      disablePortal
      id="localBirds"
      options={localBirdsArray}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Bird Species" />}
    />
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
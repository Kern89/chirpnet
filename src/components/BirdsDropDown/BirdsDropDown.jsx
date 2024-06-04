import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function BirdsDropDown({setBirdSp}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'GET_BIRDS'})
    },[])
    const localBirds = useSelector(store => store.localBirds)
    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const setBird = (event) => {
    console.log(event.target.outerText);
    // setBirdSp(event.target.outerText)
    setAnchorEl(null);
  }
    
    return (
        <>
        {/* need to look further at MUI doc to get menu working better, much of this is coppied directly from MUI for testing 
            ------Needs to be scrollable!!------
        */}
        <Button onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-placeholder="Bird Species"
        >Bird Species</Button>
        <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}> 
             {localBirds.map(bird => (
            <MenuItem key={bird.sp_code}>
                <h6 onClick={setBird}>{bird.common_name}</h6>
            </MenuItem>
        ))}
        </Menu>
       
        </>
    )
};

export default BirdsDropDown;
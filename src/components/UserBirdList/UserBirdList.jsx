import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";


function UserBirdList() {
    const dispatch = useDispatch();
    const [userList, setUserList] = useState([]);
    const [editBirdId, setEditBirdId] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newState, setNewState] = useState('');
    const [newNotes, setNewNotes] = useState('');
   
    // edit valeus from store
    const editCity = useSelector(store => store.editCity);
    const editState = useSelector(store => store.editState);
    const editDate = useSelector(store => store.editDate);
    const editNotes = useSelector(store => store.editNotes);

    // async await to make get request then send to reducer?
    const editBird = async (id) => {
        setEditBirdId(id);
        await axios.get(`/api/birds/edit/${id}`).then(response => {
            console.log("Response.data:", response.data[0]);//store response data in an array to be passed as payload to reducer?
        dispatch({ type: 'SET_CITY', payload: response.data[0].city })
        dispatch({ type: 'SET_STATE', payload: response.data[0].state });
        dispatch({ type: 'SET_DATE', payload: response.data[0].date });
        dispatch({ type: 'SET_NOTES', payload: response.data[0].notes });
        dispatch({ type: 'SET_ID', payload: id });
            }).catch(error => {
            console.log(error);
            alert('Something went wrong!');
        });
    }
    
    const seenBirds = () => {
        axios.get('/api/birdList').then(response => {
            //console.log('GET response',response.data);
            setUserList(response.data)
        }).catch(error => {
            console.log(error);
            alert('Something went wrong!')
        });
    }

    const deleteBird = (id) => {
        axios.delete(`/api/birdList/${id}`).then(response => {
            seenBirds();
        }).catch(error => {
            console.log(error);
            alert('Something went wrong!');
        })
    };

    const saveEditedBird = (id) => {
        const birdChanges = [
            editCity,
            editState,
            editDate,
            editNotes,
            id
        ];
    // console.log("birdChanges:", birdChanges);
    axios.put(`/api/birdList`, [birdChanges]).then(response => {
        console.log('PUT response:', response);
        seenBirds();
    }).catch(error => {
        console.log(error);
        alert('somehting went wrong!');
    });
       setEditBirdId('');
    };
 
    useEffect(() => {
      seenBirds();  
    }, [])

    return (
        <>
        {userList.map((bird) => (
            bird.id === editBirdId ? // need to have state use default value if no value is added??
                <div key={bird.id}>
                    <h4>{bird.common_name}</h4>
                    <h6>{bird.scientific_name}</h6> 
                    <input onChange={(e) => dispatch({ type: 'SET_CITY', payload: e.target.value })} defaultValue={bird.city} />
                    <input onChange={(e) => dispatch({ type: 'SET_STATE', payload: e.target.value })} defaultValue={bird.state} />
                    <input onChange={(e) => dispatch({ type: 'SET_DATE', payload: e.target.value })} defaultValue={moment(bird.date).format('LL')} />
                    <input onChange={(e) => dispatch({ type: 'SET_NOTES', payload: e.target.value })}  defaultValue={bird.notes} /> 
                    <button onClick={() => deleteBird(bird.id)}>Delete</button>
                    <button onClick={() => saveEditedBird(bird.id)}>Save</button> 
                </div>
                :
                <div key={bird.id}>
                    <h4>{bird.common_name}</h4>
                    <h6>{bird.scientific_name}</h6>
                    <p>{bird.city},{bird.state}</p>
                    <h6>{moment(bird.date).format('LL')}</h6>
                    <p>{bird.notes}</p>
                    <button onClick={() => deleteBird(bird.id)}>Delete</button>
                    <button onClick={() => editBird(bird.id)}>Edit</button> 
                </div>
        ))}
        {/* <button onClick={() => setEditBirdId(bird.id)}>Edit</button>  */}
                    {/* Make edit onclick a function that sets bird id (target parent key?) 
                        and sets the state for city state date notes */}
        </>
    )
};

export default UserBirdList;
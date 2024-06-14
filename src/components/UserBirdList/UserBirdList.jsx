import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";


function UserBirdList() {
    const [userList, setUserList] = useState([]);
    const [editBirdId, setEditBirdId] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newState, setNewState] = useState('');
    const [newnotes, setNewNotes] = useState('');
    // variables for edit state
    const [editCity, setEditCity] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editState, setEditState] = useState('');
    const [editnotes, setEditNotes] = useState('');

    
    const editBird = (id) => {
        setEditBirdId(id);
        axios.get(`/api/birds/edit/${id}`).then(response => {
            console.log("Response.data:", response.data[0]);
            setEditCity(response.data[0].city);
            setEditDate(response.data[0].date);
            setEditState(response.data[0].state);
            setEditNotes(response.data[0].notes);
            }).catch(error => {
            console.log(error);
            alert('Something went wrong!');
        });
    }
    
    const seenBirds = () => {
        axios.get('/api/birdList').then(response => {
            // console.log('GET response',response.data);
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
        setEditBirdId('');
        newCity === '' ? setNewCity(editCity): null;
        newState === '' ? setNewState(editState): null;
        newDate === '' ? setNewDate(editDate): null;
        newnotes === '' ? setNewNotes(editnotes): null; 
        const birdChanges = [
            newCity,
            newState,
            newDate,
            newnotes,
            id
        ];
        axios.put(`/api/birdList`, [birdChanges]).then(response => {
            console.log('PUT response:', response);
            seenBirds();
            //// -------- Need to get this to wait for the axios call to complete/ maybe this can be a use for async await?
            // setNewCity('');
            // setNewState('');
            // setNewDates('');
            // setNewNotes('');
            // setEditCity('');
            // setEditDate('');
            // setEditNotes('');
            // setEditState('');
        }).catch(error => {
            console.log(error);
            alert('somehting went wrong!');
        })
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
                    <input onChange={(e) => setNewCity(e.target.value)} defaultValue={bird.city} />
                    <input onChange={(e) => setNewState(e.target.value)} defaultValue={bird.state} />
                    <input onChange={(e) => setNewDate(e.target.value)} defaultValue={moment(bird.date).format('LL')} />
                    <input onChange={(e) => setNewNotes(e.target.value)}  defaultValue={bird.notes} /> 
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
                    {/* <button onClick={() => setEditBirdId(bird.id)}>Edit</button>  */}
                    {/* Make edit onclick a function that sets bird id (target parent key?) 
                        and sets the state for city state date notes */}
                </div>
        ))}
        </>
    )
};

export default UserBirdList;
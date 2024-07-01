import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import './UserBirdList.css';


function UserBirdList() {
    const dispatch = useDispatch();
    const [userList, setUserList] = useState([]);
    const [editBirdId, setEditBirdId] = useState('');
   
    // edit values from store
    const editCity = useSelector(store => store.editCity);
    const editState = useSelector(store => store.editState);
    const editDate = useSelector(store => store.editDate);
    const editNotes = useSelector(store => store.editNotes);
    const user = useSelector(store => store.user);

    const editBird = async (id) => {
        setEditBirdId(id);
        await axios.get(`/api/birds/edit/${id}`).then(response => {
            //console.log("Response.data:", response.data[0]);
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
        if(user.id) {
            axios.get('/api/birdList').then(response => {
                //console.log('GET response',response.data);
                setUserList(response.data)
            }).catch(error => {
                console.log(error);
                alert('Something went wrong!')
            });
        } else {
            console.log('user.id:', user.id);
        }
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
        if(user.id) {
           // console.log('in if statment:', user.id);
            seenBirds();  
        } else {
            console.log('user is:', user.id);
        }
    }, [])

    return (
        <>
        {userList.map((bird) => (
            bird.id === editBirdId ? 
                <div key={bird.id} className="birditem">
                    <div className="names">
                        <h4>{bird.common_name}</h4>
                        <h6>{bird.scientific_name}</h6> 
                    </div>
                    <div className="locdate">
                        <input onChange={(e) => dispatch({ type: 'SET_CITY', payload: e.target.value })} 
                            defaultValue={bird.city} />
                        <input onChange={(e) => dispatch({ type: 'SET_STATE', payload: e.target.value })} 
                            defaultValue={bird.state} />
                        <input onChange={(e) => dispatch({ type: 'SET_DATE', payload: e.target.value })} 
                            defaultValue={moment(bird.date).format('LL')} />
                        </div>
                        <div className="btnotes">
                        <input onChange={(e) => dispatch({ type: 'SET_NOTES', payload: e.target.value })}  
                            defaultValue={bird.notes} className="notes"/> 
                        <button onClick={() => deleteBird(bird.id)}>Delete</button>
                        <button onClick={() => saveEditedBird(bird.id)}>Save</button> 
                    </div>
                </div>
                :
                <div key={bird.id} className="birditem">
                    <div className="names">
                        <h4>{bird.common_name}</h4>
                        <h6>{bird.scientific_name}</h6>
                        
                    </div>
                    <div className="locdate">
                    <p>{bird.city},{bird.state} {moment(bird.date).format('LL')}</p>
                    <p className="notes">{bird.notes}</p>
                    </div>
                    <div className="btnotes">
                    <button onClick={() => deleteBird(bird.id)}>Delete</button>
                    <button onClick={() => editBird(bird.id)}>Edit</button> 
                    </div>
                </div>
        ))}
        </>
    )
};

export default UserBirdList;
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";



function UserBirdList() {
    const [userList, setUserList] = useState([])
    
    const seenBirds = () => {
        axios.get('/api/birdList').then(response => {
            console.log('GET response',response.data);
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
    }

    useEffect(() => {
      seenBirds();  
    }, [])

    return (
        <>
        {userList.map(bird => (
            <div key={bird.id}>
                <h4>{bird.common_name}</h4>
                <h6>{bird.scientific_name}</h6>
                <p>{bird.city},{bird.state}</p>
                <h6>{moment(bird.date).format('LL')}</h6>
                <p>{bird.notes}</p>
                <button onClick={() => deleteBird(bird.id)}>Delete</button>
            </div>
        ))}
        </>
    )
};

export default UserBirdList;
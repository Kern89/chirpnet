import axios from "axios";
import { useEffect, useState } from "react";



function UserBirdList() {
    const [userList, setUserList] = useState([])
    
    const seenBirds = () => {
        axios.get('/api/birdList').then(response => {
            console.log(response.data);
            setUserList(response.data)
        }).catch(error => {
            console.log(error);
            alert('Something went wrong!')
        });
    }

    useEffect(() => {
      seenBirds();  
    }, [])

    return (
        <>
        {userList.map(bird => (
            <div>
                <h4>{bird.common_name}</h4>
                <h6>{bird.date}</h6>
            </div>
        ))}
        </>
    )
};

export default UserBirdList;
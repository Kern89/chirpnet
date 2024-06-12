import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

function NearbyBirds() {
    const [birdsSeen, setBirdsSeen] = useState([])

    const eBirdList = () => {
        axios.get('/api/birdList/nearby').then(response => {
            //console.log('GET response.data:', response.data);
            setBirdsSeen(response.data);
            }).catch(error => {
            console.log(error);
            alert('Something went wrong!')
        })
    };

    useEffect(() => {
        eBirdList();

    }, []);
    //add a refresh button?
    // if (birdsSeen[0]) {
        return(
            <>
            {birdsSeen.map((bird) => (
                <div key={bird.comName+bird.lat}>
                    <h4>{bird.comName}</h4>
                    <h6>{bird.sciName}</h6>
                    <p>{bird.locName}</p>
                    <h6>{moment(bird.obsDt).format('LL')}</h6>
                </div>
            ))}
            </>
        )
    // } else {
    //     <h1>Loading</h1>
    // }
};

export default NearbyBirds;
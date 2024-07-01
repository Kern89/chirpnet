import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import './NearbyBirds.css';

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
        return(
            <>
            <h2>Recent Sightings in your state</h2>
            {birdsSeen.map((bird) => (
                <div key={bird.comName+bird.lat} className="birdnear">
                    <h4>{bird.comName}</h4>
                    <h6 className="center">{bird.sciName}</h6>
                    <p>{bird.locName}</p>
                    <h6 className="date">{moment(bird.obsDt).format('LL')}</h6>
                </div>
            ))}
            </>
        )
};

export default NearbyBirds;
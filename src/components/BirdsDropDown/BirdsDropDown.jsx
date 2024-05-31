import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function BirdsDropDown() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'GET_BIRDS'})
    },[])

    const localBirds = useSelector(store => store.localBirds)


    // {selectedDetails.map(movie => (
    //     <h6 key={movie.id}>
    //         {movie.name}
    //     </h6>
    // ))}
    return (
        <>
        {localBirds.map(bird => (
            <div key={bird.sp_code}>
                <h6>{bird.common_name}</h6>
                <h6>{bird.scientific_name}</h6>
            </div>
        ))}
        </>
    )
};

export default BirdsDropDown;
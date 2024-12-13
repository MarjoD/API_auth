import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext.jsx";

export default function ValidatedAccessForm () {
    const { username, setAuthenticated } = useContext(UserContext);
    const [error, setError] = useState(null);
    const [datas, setDatas] = useState('');

    const token = localStorage.getItem('token');

    const handleClick = () => {
        localStorage.clear();
        setAuthenticated(null); //set state
    }

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 
                authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' }
        };

        //call API to find out if the API can be reached
        fetch(`http://localhost:5000/api/users`, requestOptions)
        .then(async response => {
                const data = await response.json();
                
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const errorMessage = (data && data.message) || response.status;
                    //show the error message for user
                    setError(errorMessage);
                    //detailed error in log
                    console.log(error);
                } else {
                    //if the response status is 200, set the message in health state to display to the user
                    setDatas(data);
                    console.log(data);
                }
            })
            .catch(errorMessage => {
                //show the error message for user
                setError(errorMessage);
                //detailed error in log
                console.log("Server error : " + errorMessage.toString());
            });
    }, []);

    return (
        <form>
            <p>Congratulations, {username} !</p>
            <p>Your token is stored in local storage ;</p>
            <p>If it is valid, you will see the list of users below :</p>
            {error ? (
                <p>{error}</p>
            ) : ""}
            {datas ? (
                <div className="flex">
                    {datas.users.map((user, index) => (
                        <div className="card" key={index}>
                            <p>{user.username}</p>
                            <p>{user.first_name}</p>
                            <p>{user.last_name}</p>
                            <p>{user.email}</p>
                            <p>{user.birth_date.split('T')[0]}</p>
                        </div>
                    ))}
                </div>
            ) : ""}

            <a id='Disconnect' className='button-link' onClick={handleClick}>Disconnect</a>

        </form>
)}
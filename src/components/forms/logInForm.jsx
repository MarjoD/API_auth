import { useState, useContext } from "react";
import UserContext from "../../context/userContext.jsx";

export default function LogInForm () {
    const [error, setError] = useState(null);
    const [mail, setMail] = useState('');
    const [clearPassword, setClearPassword] = useState('');
    const { setAuthenticated } = useContext(UserContext);

    const handleChangeMail = (e) => {
        setMail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setClearPassword(e.target.value);
    };

    const handleConnection = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: mail,
                password: clearPassword
            })
        };

        fetch('http://localhost:5000/api/login', requestOptions)
            .then(async response => {
                    const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const errorMessage = (data && data.message) || response.status;
                    //show the error message for user
                    setError(errorMessage);
                } else {
                    //if the response status is 200, set the message in health state to display to the user
                    setAuthenticated(data.username);
                    localStorage.setItem('token', data.accessToken);
                }
            })
            .catch(errorMessage => {
                //show the error message for user
                setError(errorMessage);
                //detailed error in log
                console.log("Server error : " + errorMessage.toString());
            });
    };

    return (
        <form>
            <label htmlFor="username" >E-Mail : </label>
            <input type="text" id="username" onChange={(e)=>handleChangeMail(e)} />

            <label htmlFor="password" >Password:</label>
            <input type="password" id="password" onChange={(e)=>handleChangePassword(e)} />

            {error ? (
                <p>{error}</p>
            ) : ""}

            <a id='connect' className='button-link' onClick={handleConnection} >Connection</a>
        </form>
)}
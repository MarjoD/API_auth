import { useState } from "react";

export default function SignUpForm () {
    const [message, setMessage] = useState(null);
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleChangeFirstname = (e) => {
        setFirstname(e.target.value);
    };

    const handleChangeLastname = (e) => {
        setLastname(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleChangeMail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangeBirthdate = (e) => {
        setBirthdate(e.target.value);
    };

    const handleRegister = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: username,
                email: email,
                password: password,
                first_name: firstname,
                last_name: lastname,
                birth_date: birthdate,
            })
        };

        fetch('http://localhost:5000/api/signup', requestOptions)
            .then(async response => {
                    const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const errorMessage = (data && data.message) || response.status;
                    //show the error message for user
                    setMessage(errorMessage);
                } else {
                    //if the response status is 200, set the message in health state to display to the user
                    setMessage(data.message);
                }
            })
            .catch(errorMessage => {
                //show the error message for user
                setMessage(errorMessage);
                //detailed error in log
                console.log("Server error : " + errorMessage.toString());
            });
    };

    return (
        <form>
            <label htmlFor="username" >Username : </label>
            <input type="text" id="username" onChange={(e)=>handleChangeUsername(e)} />

            <label htmlFor="firstname" >First Name : </label>
            <input type="text" id="username" onChange={(e)=>handleChangeFirstname(e)} />

            <label htmlFor="lastname" >Last Name : </label>
            <input type="text" id="username" onChange={(e)=>handleChangeLastname(e)} />

            <label htmlFor="password" >Password : </label>
            <input type="password" id="password" onChange={(e)=>handleChangePassword(e)} />

            <label htmlFor="email" >E-Mail : </label>
            <input type="text" id="username" onChange={(e)=>handleChangeMail(e)} />

            <label htmlFor="birthdate" >Birth Date : </label>
            <input type="date" id="username" onChange={(e)=>handleChangeBirthdate(e)} />

            {message ? (
                <p>{message}</p>
            ) : ""}

            <a id='create' className='button-link' onClick={handleRegister} >Create account</a>
        </form>
)}
import './App.css';
import { useEffect, useState } from "react";
import SignUpForm from './components/forms/signUpForm';
import LogInForm from './components/forms/logInForm';
import ValidatedAccessForm from './components/forms/validatedAccessForm.jsx';
import UserContext from "./context/userContext.jsx";
import { errorMessage } from "./consts/consts.jsx";

function App() {

    const [health, setHealth] = useState(null); //state to check API health response
    const [sign, setSign] = useState(null); //state to sign up or log in
    const [username, setAuthenticated] = useState(localStorage.getItem('username') || null);

    useEffect(() => {
        //call API to find out if the API can be reached
        fetch(`http://localhost:5000/api/health`)
        .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    //show the error message for user
                    setHealth({message : errorMessage});
                    //detailed error in log
                    console.log(error);
                } else {
                    //if the response status is 200, set the message in health state to display to the user
                    setHealth(data);
                }
            })
            .catch(error => {
                //show the error message for user
                setHealth({message : errorMessage});
                //detailed error in log
                console.log("Server error : " + error.toString());
            });
    }, []);

    //on click, set the id of the targeted button in the "sign" state
    const handleClick = (e) => {
        e.preventDefault(); //prevent refresh
        setSign(e.target.id); //set state
    }

    //on click on return link, clear the "sign" state
    const handleReturn = () => {
        setSign(null);
    }

    return (
        <>
            <UserContext.Provider value={{ username, setAuthenticated }}>
                {!username || !localStorage.getItem('token') ? (
                    <>
                        {sign ? (
                    <>
                        <a className='button-link' onClick={handleReturn}>Return</a>
                        {sign === 'SignUp' ? (
                            <>
                                {/**on click on sign up link, show the sign up form */}
                                <SignUpForm/>
                            </>
                        ) : sign === 'LogIn' ? (
                            <>
                                {/**on click on log in link, show the log in form */}
                                <LogInForm/>
                            </>
                        ) : ("")}
                    </>
                ) : (
                    <>
                    {/**default welcome page (if user is not authenticated) */}
                        <h1>Welcome!</h1>
                        <h3>{!health ? "Loading..." : health.message}</h3>

                        <a id='SignUp' className='button-link' onClick={e => handleClick(e)}>Sign up</a>
                        <a id='LogIn' className='button-link' onClick={e => handleClick(e)}>Log in</a>
                    </>
                )}
                    </>
                ) : (
                    <>
                        <ValidatedAccessForm />
                    </>
                )}
            </UserContext.Provider>
        </>
    )
}

export default App;
import React, { useState, useRef, useEffect } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup, signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import person2Img from '../assets/images/person2.png'

function Login({ setIsAuth }) {
    let navigate = useNavigate();
    const loginEl = useRef(null);

    //create state to know if user made error logging in
    const [loginError, setLoginError] = useState(false);

    //When page loads, scroll to the login element with "useRef"
    useEffect(() => {
        const executeScroll = () => {
            loginEl.current.scrollIntoView();
        };
        executeScroll();
    }, []);

    //function that allows sign-in through Google. We set the login status, username and id into local storage for use. Then we navigate to search page
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                localStorage.setItem("isAuth", true);
                localStorage.setItem("userName", auth.currentUser.displayName);
                localStorage.setItem("userId", auth.currentUser.uid);
                setLoginError(false);
                setIsAuth(true);
                navigate("/");
            })
            .catch((error) => {
                setLoginError(true);
            });
    };

    //function that allows sign-in anonymously. We set the login status, username and id into local storage for use. Then we navigate to search page.
    const signInAnon = () => {
        signInAnonymously(auth)
            .then(() => {
                localStorage.setItem("isAuth", true);
                localStorage.setItem("userName", "anonymous");
                localStorage.setItem("userId", "anonymousId");
                setLoginError(false);
                setIsAuth(true);
                navigate("/");
            })
            .catch((error) => setLoginError(true));
    };

    return (
        <section className="loginSection">
            <div className="wrapper">
                <div className="loginPage">
                    <div className="loginHeadingContainer">
                        <h2 ref={loginEl}>Sign in to Continue</h2>
                    </div>
                    <div className="loginContainer">
                        
                        <button
                            className="login-with-google-btn loginBtn"
                            onClick={signInWithGoogle}
                        >
                            Sign in With Google
                        </button>
                        <button
                            onClick={signInAnon}
                            className="loginBtn anonLogin"
                        >
                            Sign in Anonymously
                        </button>
                        {loginError && (
                            <p className="errorMessage">
                                Login failed. Please try again.
                            </p>
                        )}
                    </div>
                    <img src={person2Img} alt="person reading a book" className="person2Img"/>
                </div>
            </div>
        </section>
    );
}
export default Login;

import { useState, useEffect } from "react";
import Form from "../components/Form";
import Instructions from "../components/Instructions";
import Footer from "../components/Footer";
import firebase from "../firebase-config";
import { get, getDatabase, ref, update } from "firebase/database";

function Home() {
    const [input, setInput] = useState("");

    //IF userID exists in localStorage AND path to the directory under users doesn't exist
    //create an object for them in the directory

    useEffect(() => {
        const userObject = {
            userName: localStorage.getItem("userName"),
            userId: localStorage.getItem("userId"),
            list: {},
        };
        const userId = localStorage.getItem("userId");
        const database = getDatabase(firebase);
        const userRef = ref(database, `/users/${userId}`);

        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                return;
            } else {
                update(userRef, userObject);
            }
        });
    }, []);

    return (
        <>
            <Instructions />

            <Form input={input} setInput={setInput} />
        </>
    );
}

export default Home;

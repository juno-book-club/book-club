import { useState, useEffect } from "react";
import Form from "../components/Form";
import Instructions from "../components/Instructions";
import firebase from "../firebase-config";
import { get, getDatabase, ref, update } from "firebase/database";

function Home() {
    const [input, setInput] = useState("");

    //IF userID exists in localStorage but user doesn't exist in firebase
    //create an object for them in the users directory
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

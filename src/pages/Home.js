import { useState, useEffect } from "react";
import Form from "../components/Form";
import Instructions from "../components/Instructions";
import firebase from "../firebase-config";
import { get, getDatabase, ref, update } from "firebase/database";

function Home() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    const [input, setInput] = useState("");
    const [userObject, setUserObject] = useState({
        userName: localStorage.getItem("userName"),
        userId: localStorage.getItem("userId"),
        list: {},
    });
    //IF userID exists in localStorage AND path to the directory under users doesn't exist
    //create an object for them in the directory

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/users`);
        const userRef = ref(database, `/users/${userId}`);
        console.log(dbRef);
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                return;
            } else {
                update(userRef, userObject);
            }
        });
        // if (localStorage.getItem("userId") && !dbRef) {
        //     console.log(dbRef);
        //     update(dbRef, "owijef");
        // } else {
        //     console.log("exists");
        //     update(dbRef, { user: "value" });
        // }
    }, []);

    return (
        <>
            <Form input={input} setInput={setInput} />

            <Instructions />
        </>
    );
}

export default Home;

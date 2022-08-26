import Form from "../components/Form";
import { useState, useEffect } from "react";
import firebase from "../firebase-config";
import {
    ref,
    push,
    remove,
    get,
    getDatabase,
    onValue,
} from "firebase/database";
import DisplayBook from "../components/DisplayBook";
import axios from "axios";

//need a local favourite list
//make sure that only logged in users can see this page
//create an empty array inside useEffect call books
//using useEffect, pull their bookIds from firebase
//using a loop, for each item in our booklist, make a separate axios call for each book and push each result to books
//setBooks(books)
//display books that are in their favourites list using our display book component

function Favourites() {
    const [books, setBooks] = useState([]);
    const [localFavouriteList, setLocalFavouriteList] = useState([]);
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const database = getDatabase(firebase);
        const userRef = ref(database, `/users/${userId}/list`);
        const bookArray = [];
        const newArray = [];
        let listInDatabase;

        if (!isAuth) {
            window.location.pathname = "/login";
        }
        //it looks into the user's favourite list in firebase. If it exists, we push it into our localFavouriteList
        onValue(userRef, (response) => {
            const newState = [];
            const data = response.val();
            for (let key in data) {
                newState.push(data[key]);
            }
            setLocalFavouriteList(newState);
            setBooks(newState);
        });

        // get(userRef).then((snapshot) => {
        //     if (snapshot.exists()) {
        //         listInDatabase = snapshot.val();
        //         for (let key in listInDatabase) {
        //             bookArray.push(listInDatabase[key]);
        //             axios({
        //                 url: `https://www.googleapis.com/books/v1/volumes/${listInDatabase[key]}?key=AIzaSyBaAlI0TF-XE92kWNHCoAcLGY8EP_ilwsk`,
        //                 method: "GET",
        //                 dataResponse: "json",
        //             })
        //                 .then((res) => {
        //                     newArray.push(res.data);
        //                 })
        //                 .catch((err) => {
        //                     console.log("error");
        //                 });
        //         }
        //         setBooks(newArray);
        //         setLocalFavouriteList(newArray);
        //     }
        // });
    }, []);

    // if (books.length >= 1) {
    //     return <DisplayBook books={books} />;
    // }
}

export default Favourites;

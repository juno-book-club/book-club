import axios from "axios";
import { useEffect, useState } from "react";
import Form from "../components/Form";
import DisplayBook from "../components/DisplayBook";
import { useParams, Link } from "react-router-dom";
import { getDatabase, ref, onValue, remove, push, set, update, get } from "firebase/database";
import firebase from "../firebase-config";
import { useDatabaseSnapshot } from "@react-query-firebase/database";

function SearchPage() {
    const { search } = useParams();
    const [books, setBooks] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [key,setKey] = useState([])
    const [userName, setUserName] = useState(localStorage.getItem('userName'))
    const [userId, setUserId] = useState(localStorage.getItem('userId'))
    const [userObject, setUserObject] = useState({[userId] : {name: userName, id: userId, list:[]}}
        )
    
    
    useEffect(() => {
        const database = getDatabase(firebase)
        const dbRef = ref(database);
        const keyArray = []
        get(dbRef).then((snapshot) => {
          if (snapshot.exists()) {
           const allUserData = snapshot.val().users;
         
            // console.log(allUserData)
        for(let key in allUserData) {
            keyArray.push(key)
        }
        setKey(keyArray)
        
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });

    }, [])
    
 

    useEffect(() => {
        // before get result from API, setloading will be true
        setLoading(true);
        //on load, take the param from the url and inject it into our api search.
        axios({
            url: "https://www.googleapis.com/books/v1/volumes?",
            method: "GET",
            dataResponse: "json",
            params: {
                key: "AIzaSyCQ1DG2RnA8h8cdrFVsaShbyOXT_GHt8P8",
                q: search,
                maxResults: 3,
                projection: "full",
            },
        }).then((res) => {
            // after we got repsonse from API, setLoading will be false
            setLoading(false);
            setBooks(res.data.items);
        }).catch((error) => {
            setError(true);
        });

        
    }, [search]);

    //function add to favourites
    //check db to see if userID exists
    //if it doesn't, update users object with new object
    //it should contain userName, userId, and an object with the bookID of the book being clicked on

    //if userID exists, we just want to push the bookID into user>list
    // const database = getDatabase(firebase);
    // const dbRef = ref(database, '/users');

    // const users = useDatabaseSnapshot(["users"], dbRef);
    // const snapshot = users.data;
    // console.log(snapshot)

    // if(dataSnapshot.exists()){
    //     console.log('hello');
    // }

    function addToFavourites(bookId) {
        const database = getDatabase(firebase)
        const dbRef = ref(database, '/users');
        setUserObject({[userId] : {name: userName, id: userId, list:[[bookId]]}})

        const newRef = ref(database, `/users/${userId}/list`)
      if(!(key.includes(userId))){
        update(dbRef, userObject)
        console.log(`we're updating`)
    } else {
        const newRef = ref(database, `/users/${userId}/list`)

       push(newRef, [bookId])
    }


    }

    const database = getDatabase(firebase)
    const listRef = ref(database, `/users/${userId}/list`);
    
    get(listRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val())
     
    
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });


    return (
        <section className="Home">
            {
                // if loading is true, show the loader
                loading ? (
                    <div className="loader"></div>
                ) : (
                    <Form input={input} setInput={setInput} books={books}/>
                )
            }

            {books ? (
                <DisplayBook books={books} addToFavourites={addToFavourites}/>
            ) : (
                <Link to="/">
                    <p>
                        What you searched is not exist, click here to go back to
                        Home Page
                    </p>
                </Link>
            )}

            {error &&   <Link to="/">
                    <p>
                        What you searched is not exist, click here to go back to
                        Home Page
                    </p>
                </Link>}
        </section>
    );
}

export default SearchPage;

import { useState } from "react";
import Form from "../components/Form";
import Instructions from "../components/Instructions";

function Home() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    const [input, setInput] = useState("");

    return (
        <>
            <Form input={input} setInput={setInput} />
            {/* CHANGE ON MONDAY, because we have a search page now, the instructions should always be on the main page */}
            {!isAuth && <Instructions />}
        </>
    );
}

export default Home;

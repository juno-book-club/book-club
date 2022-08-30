import person1 from "../assets/images/person1.png"

const Instructions = () => {
    return (
        <section className="instructionsSection">
            <h2>Welcome to our Book Club!</h2>
            <div className="instructions">
                <img src={person1} alt="person sitting and reading" className="person1Img" />
                <div className="instructionBox"></div>
                <ul className="instructionContainer">
                    <h3>Instructions:</h3>
                    <li>Log in with your google account (by clicking the Log In page) to be able to 'favourite' and keep track of how many books you've read.</li>
                    <br></br>
                    <li>If you sign in anonymously these features will be disabled but you will still be able to search and read more information about the book you've selected. After logging in, enter the full book title in our search bar below.</li>
                    <br></br>
                    <li>You'll see a few options to choose from. If you want to find more information on the book, simply click on the book cover image. If you want to add it to your favourites list immediately, click the favourites button!</li>
                    <br></br>
                    <li>Once the image is clicked, you'll find the book description, author, genre and rating. If you've completed reading the book, there is a 'mark as read' button to help you keep track of how many books you've finished. You also still have the option to remove it from your favourites list.</li>
                    <br></br>
                    <li>And that's it! We hope you enjoy the book club!</li>
                </ul>
            </div>
        </section>

    )
}

export default Instructions
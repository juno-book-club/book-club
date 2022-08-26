const Instructions = () => {
    return (
        <section className="instructions">
            <h2>Welcome to our Book Club!</h2>
            <p>Here are some instructions to help you get started:</p>
            <ul className="instructionContainer">
                <br></br>
                <li>Log in with your google account (by clicking the Log In page) to be able to 'favourite', rate a book, and keep track of how many books you've read.</li>
                <br></br>
                <li>If you sign in anonymously these features will be disabled but you will still be able to search and read more information about the book you've selected.</li>
                <br></br>
                <li>After logging in, enter the full book title in our search bar.</li>
                <br></br>
                <li>You'll see a few options to choose from. If you want to find more information on the book, simply click on the book cover image. If you want to add it to your favourites list immediately, click the favourites button!</li>
                <br></br>
                <li>Once the image is clicked, you'll find the book description, author, genre and rating. If you've completed reading the book, there is a 'mark as read' button to help you keep track of how many books you've finished reading. You also still have the option to remove from your favourites list.</li>
                <br></br>
                <li>And that's it! We hope you enjoy the book club!</li>
            </ul>
        </section>

    )
}

export default Instructions
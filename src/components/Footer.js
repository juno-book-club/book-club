import { FaHeart } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footerBar">
            <p>Made with 
                <FaHeart
                    size={".7em"}
                    color={"#000"}>
                </FaHeart> 
                at Juno College by Charles, Jingru, Daniel, and Sarah.</p>
        </footer>
    );
}

export default Footer;

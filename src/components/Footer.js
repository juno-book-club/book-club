import { FaHeart } from "react-icons/fa";

function Footer() {
    return (
        <div className="footerBar">
            <p>Made with {" "}
                <FaHeart
                    size={".7em"}
                    color={"#000"}>
                </FaHeart> {" "}
                at Juno College by Charles, Jingru, Daniel, and Sarah.</p>
        </div>
    );
}

export default Footer;

import danielPhoto from "../assets/images/danielSelfPort.png";
import jingruPhoto from "../assets/images/jingruPhoto.PNG";
import charlesPhoto from "../assets/images/charlesSelfPort.png";
import sarahPhoto from "../assets/images/sarahPhoto.png";

function About() {
    const us = [
        {
            name: "Daniel Ramsauer",
            img: danielPhoto,
            description: `I'm a front end developer that loves to be creative. I come from a background of tattooing and construction. On my off time I love to watch anime, movies, play video games, sports and work out!`,
            github: "https://github.com/DanRamsauer",
            portfolio: "https://danielramsauer.com/",
        },
        {
            name: "Charles Li",
            img: charlesPhoto,
            description: `I'm a determined problem solver who thrives in a collaborative environment. In my free time, I love catching up on NBA basketball and fantasy novels. My favourite reads this year come from Joe Abercrombie and his Age of Madness Trilogy.`,
            github: "https://github.com/41CharlesLi",
            portfolio: "https://www.charlesli.ca",
        },
        {
            name: "Jingru Xu",
            img: jingruPhoto,
            description: `I'm a dynamic front-end developer with passion in maintaining and building user-friendly websites. When I'm not working, you'll often find me watching movies, trying new restaurants & drinking wines. 🥂`,
            github: "https://github.com/jxu710",
            portfolio: "https://www.jingruxu-web.com/",
        },
        {
            name: "Sarah Bolton",
            img: sarahPhoto,
            description: `Sarah is a front-end developer with a background in healthcare and graphic design. When she's not building websites, you can find her painting, reading or chillin' with her cats. ✨`,
            github: "https://github.com/sarah-bolton",
            portfolio: "https://sarahbolton.ca",
        },
    ];

    return (
        <div className="aboutTitle">
            <h2>Meet The Developers</h2>

            <div className="aboutContainer">
                {us.map((details) => {
                    return (
                        <div className="about" key={details.name}>
                            <h2>{details.name}</h2>
                            <img
                                src={details.img}
                                alt={`A headshot of ${details.name}`}
                            />
                            <p>{details.description}</p>
                            <div className="aboutButtons">
                                <a
                                    target="_blank"
                                    href={details.github}
                                    rel="noreferrer"
                                >
                                    <button>Github</button>
                                </a>
                                <a
                                    target="_blank"
                                    href={details.portfolio}
                                    rel="noreferrer"
                                >
                                    <button>Portfolio</button>
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default About;

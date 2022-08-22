import danielPhoto from '../assets/images/danielSelfPort.jpg'

function About() {

  const us = [
    {
      name: 'Daniel Ramsauer',
      img: danielPhoto,
      description: `I'm a front end developer that loves to be creative. I come from a background of tattooing and construction. On my off time I love to watch anime, starwars, play video games, work out and play sports!`,
      github: 'https://github.com/DanRamsauer',
      portfolio: 'https://danielramsauer.com/'
    },
    {
      name: 'Charles Li',
      img: './',
      description: 'About',
      github: 'https://github.com/41CharlesLi',
      portfolio: ''
    },
    {
      name: 'Jingru Xu',
      img: './',
      description: 'About',
      github: 'https://github.com/jxu710',
      portfolio: ''
    },
    {
      name: 'Sarah Bolton',
      img: './',
      description: 'About',
      github: 'https://github.com/sarah-bolton',
      portfolio: ''
    }
  ]

    return (
      <div className="About">
        {
          us.map( (details) => {
            return(
              <div className="about" key={details.name}>
                <h2>{details.name}</h2>
                <img src={details.img} alt={`A headshot of ${details.name}`} />
                <p>{details.description}</p>
                <a target="_blank" href={details.github}>Link to {details.name}'s github profile</a>
                <a target="_blank" href={details.portfolio}>Link to {details.name}'s portfolio</a>
              </div>
            )
          })
        }
      </div>
    );
  }
  
  export default About;
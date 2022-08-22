import danielPhoto from '../assets/images/danielSelfPort.jpg'

function About() {

  const us = [
    {
      name: 'Daniel Ramsauer',
      img: danielPhoto,
      description: `I'm a front end developer that loves to be creative. I come from a background of tattooing and construction. On my off time I love to watch anime, starwars, play video games, work out and play sports!`,
      github: 'https://github.com/DanRamsauer'
    },
    {
      name: 'Charles Li',
      img: './',
      description: 'About',
      github: ''
    },
    {
      name: 'Jingru Xu',
      img: './',
      description: 'About',
      github: ''
    },
    {
      name: 'Sarah Bolton',
      img: './',
      description: 'About',
      github: ''
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
              </div>
            )
          })
        }
      </div>
    );
  }
  
  export default About;
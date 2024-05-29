import React, { Component } from 'react';
import { TypeAnimation } from 'react-type-animation';

class Header extends Component {
  render() {

    if (this.props.data) {
      var name = this.props.data.name;
      var occupation = this.props.data.occupation;
      var description = this.props.data.description;
      var city = this.props.data.address.city;

      var networks = this.props.data.social.map(function (network) {
        return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
      });
    }

    const fontStyle = {
      fontFamily: "'Ubuntu', sans-serif",
    };

    return (
      <header id="home">
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap" rel="stylesheet" />
        </head>
        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
          <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

          <ul id="nav" className="nav">
            <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
            <li><a className="smoothscroll" href="#about">About</a></li>
            <li><a className="smoothscroll" href="#resume">Resume</a></li>
            {/*<li><a className="smoothscroll" href="#portfolio">Works</a></li>
            <li><a className="smoothscroll" href="#testimonials">Testimonials</a></li>
            <li><a className="smoothscroll" href="#contact">Contact</a></li>*/}
          </ul>
        </nav>

        <div className="row banner">
          <div className="banner-text" style={fontStyle}>
            <h1> &#123;Christopher Sherman&#125;</h1>
            <h3 id="typewriter_h3">
              <TypeAnimation
                sequence={[
                  "I'm a Sydney based Site Reliability Engineer",
                  1500,
                  "I'm a Sydney based Software Engineer",
                  1500,
                  "I'm a Sydney based DevOps Engineer",
                  1500,
                  "I'm a Sydney based Linux enthusiast",
                  1500,
                  "I'm a Sydney based Power lifter",
                  1500,
                  "I'm a Sydney based Macbook elitist",
                  1500,
                  "I'm a Sydney based Seinfeild enjoyer",
                  1500,
                  "I'm a Sydney based FOSS fanatic",
                  1500,
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '1em', display: 'inline-block', fontFamily: "'Ubuntu', sans-serif" }}
                repeat={Infinity}
              />
            </h3>
            <hr />
            <ul className="social">
              {networks}
            </ul>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
        </p>
      </header>
    );
  }
}

export default Header;

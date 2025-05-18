import React, { Component } from 'react';

class About extends Component {
  render() {
    if (this.props.data) {
      var name = this.props.data.name;
      var profilepic = "images/" + this.props.data.image;
      var bio = this.props.data.bio;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone = this.props.data.phone;
      var email = this.props.data.email;
      var resumeDownload = this.props.data.resumedownload;
      var pgpKeyDownload = this.props.data.pgpkeydownload; // Add PGP key download link to props
      var pgpFingerprint = this.props.data.pgpfingerprint; // Add PGP key fingerprint to props
    }

    return (
      <section id="about">
        <div className="row">
          <div className="three columns">
            <img className="profile-pic" src={profilepic} alt={`${name} pic`} />
          </div>
          <div className="nine columns main-col">
            <h2>About Me</h2>
            <p>{bio}</p>
            <div className="row">
              <div className="columns contact-details">
                <h2>Contact Details</h2>
                <p className="address">
                  <span>{name}</span><br />
                  <span>{email}</span>
                </p>
              </div>
              <div className="columns download">
                <p>
                  <a href="https://resume.csherman.net" className="button"><i className="fa fa-download"></i>View Resume</a>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="columns pgp-key">
                <h2>PGP Key</h2>
                <p>You can use my <a href="https://keys.openpgp.org/search?q=csherman@mailbox.org">PGP key </a>to encrypt emails sent to me for added security.</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;

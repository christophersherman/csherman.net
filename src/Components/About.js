import React from 'react';

const About = ({ data }) => {
  if (!data) return null;

  return (
    <section id="about">
      <div className="section-container">
        <h2 className="section-title">About</h2>
        <div className="about-content">
          <img
            src={`images/${data.image}`}
            alt={data.name}
            className="about-image"
          />
          <div className="about-text">
            <h2>Chris Sherman</h2>
            <p>
              {data.bio}
            </p>
            <p>
              At Meta, I build and maintain HPC clusters for Facebook AI Research.
              This involves Kubernetes orchestration, Lustre and OpenZFS storage systems
              at petabyte scale, and ensuring reliability for critical AI workloads.
            </p>
            <div className="about-contact">
              <a href={`mailto:${data.email}`}>{data.email}</a>
              <a href="https://keys.openpgp.org/search?q=csherman@mailbox.org" target="_blank" rel="noopener noreferrer">
                PGP Key
              </a>
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

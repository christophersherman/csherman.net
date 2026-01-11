import React from 'react';

const Experience = ({ data }) => {
  if (!data) return null;

  const formatDate = (years) => {
    const parts = years.split(' - ');
    if (parts.length === 2) {
      return parts[0].replace(/\s+/g, ' ').trim();
    }
    return years;
  };

  return (
    <section id="experience">
      <div className="section-container">
        <h2 className="section-title">Experience</h2>
        <div className="experience-list">
          {data.work?.map((job, index) => (
            <div key={index} className="experience-item">
              <div className="experience-date">{formatDate(job.years)}</div>
              <div className="experience-content">
                <h3>{job.company}</h3>
                <p className="experience-role">{job.title}</p>
                <p className="experience-description">{job.description}</p>
              </div>
            </div>
          ))}
          {data.education?.map((edu, index) => (
            <div key={`edu-${index}`} className="experience-item">
              <div className="experience-date">{formatDate(edu.graduated)}</div>
              <div className="experience-content">
                <h3>{edu.school}</h3>
                <p className="experience-role">{edu.degree}</p>
                <p className="experience-description">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

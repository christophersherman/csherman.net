import React, { useState, useEffect } from 'react';
import { inject } from '@vercel/analytics';
import './App.css';
import Header from './Components/Header';
import About from './Components/About';
import Experience from './Components/Experience';
import Footer from './Components/Footer';

function App() {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    inject();
    fetch('/resumeData.json')
      .then(res => res.json())
      .then(data => {
        setResumeData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="app">
      <Header data={resumeData?.main} />
      <About data={resumeData?.main} />
      <Experience data={resumeData?.resume} />
      <Footer data={resumeData?.main} />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import ImageSlider from '../Imageslider.js';
import { fetchTopMentors } from './fetchTopMentor.js';
import './Homepage.css';
import Courses from './Courses.js';
import axios from 'axios';

export const Homepage = () => {
  const slides = [
    { url: '/images/g1.jpg' },
    { url: '/images/usefull2.jpg' },
  ];

  const [topMentors, setTopMentors] = useState([]);

  // useEffect(() => {
  //   const getTopMentors = async () => {
  //     const mentors = await fetchTopMentors();
  //     setTopMentors(mentors);
  //   };

  //   getTopMentors();
  // }, []);
  useEffect(()=>{
    axios.get('/mentor')
    .then((res)=>{
      setTopMentors(res.data)
    })
    .catch((err)=>console.log(err))
  },[])

  return (
    <div className='homepage'>
      <div className='navbar'>
        <div className='opening'>
          <a href='./Homepage' className='opening'>
            Skillshare
          </a>
        </div>
        <a href='./about_the_company' className='text'>
          <div className='opening'>About Us</div>
        </a>
        <div className='searchbar-container'>
          <div className='searchbar'>
            <input type='text' placeholder='Search anything...' />
          </div>
          <div className='right-side'>
            <a href='./about_the_company' className='text'>
              <div className='opening'>Login</div>
            </a>
            <a href='./about_the_company' className='text'>
              <div className='opening'>Sign-up</div>
            </a>
            <a href='./about_the_company' className='text'>
              <div className='opening'>Teach on Skillshare</div>
            </a>
          </div>
        </div>
      </div>
      <div className='picture_provider'>
        <ImageSlider slides={slides} />
      </div>
      <div className='main_text'>All the skills you need in one place</div>
      <div className='text1'>
        From critical skills to technical topics, Skill Share supports your professional development.
      </div>
      <div className='courses'>
        <Courses />
        <div className='text2'>Our best seller courses</div>
        <div className='top-mentors'>
          <h2>Top Mentors</h2>
          {topMentors.length > 0 ? (
            topMentors.map((mentor, index) => (
              <div key={index} className='mentor-card'>
                <h3>{mentor.name}</h3>
                <p>Course: {mentor.course}</p>
                <p>Rating: {mentor.rating}</p>
              </div>
            ))
          ) : (
            <p>No mentors available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;

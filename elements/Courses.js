import React, { useRef, useState } from 'react';
import './Homepage.css';

const Courses = () => {
  const courses = [
    'Programming', 'Web Development', 'Database Management', 'Cloud Computing', 'Cybersecurity', 
    'Data Science and Analytics', 'Artificial Intelligence and Machine Learning', 'Version Control and Collaboration', 
  
  ];
  
  const [activeButton, setActiveButton] = useState(null); 
  const coursesListRef = useRef(null); 


  const scrollLeft = () => {
    if (coursesListRef.current) {
      coursesListRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };


  const scrollRight = () => {
    if (coursesListRef.current) {
      coursesListRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  
  const handleButtonClick = (index) => {
    setActiveButton(index); 
  };

  return (
    <div className='courses-container'>
      <button className='arrow-button left-arrow' onClick={scrollLeft}>❮</button>
      <div className='courses-list' ref={coursesListRef}>
        {courses.map((course, index) => (
          <button
            key={index}
            className={`course-button ${activeButton === index ? 'active' : ''}`} 
            onClick={() => handleButtonClick(index)} 
          >
            {course}
          </button>
        ))}
      </div>
      <button className='arrow-button right-arrow' onClick={scrollRight}>❯</button>
    </div>
  );
};

export default Courses;

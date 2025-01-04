import React from 'react';
import SessionBooking from '../components/sessionBooking';
import SessionReminders from '../components/sessionReminder';
import GoalTracking from '../components/GoalTracking';
import GroupStudyRooms from '../components/groupStudyRoom';

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#e0e0e0', // Grayish background color for the entire screen
  minHeight: '100vh', // Ensure it takes full screen height
  padding: '40px',
};

const containerStyle = {
  maxWidth: '1400px', // Increased container width
  width: '100%',
  padding: '40px', // Increased padding for more spacing
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '40px', // Spacing below the title
  fontSize: '28px', // Slightly larger font for the title
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)', // Two columns layout
  gridGap: '30px', // Larger gap between boxes
};

const cardStyle = {
  backgroundColor: '#001f3f', // Navy blue background color
  color: '#fff', // White text for contrast
  padding: '40px', // Increased padding inside each box
  borderRadius: '12px',
  boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)', // Slightly stronger shadow for the boxes
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  cursor: 'pointer',
  minHeight: '250px', // Minimum height to make boxes taller
};

const cardHoverStyle = {
  transform: 'scale(1.05)', // Slight zoom effect on hover
  boxShadow: '0 12px 20px rgba(0, 0, 0, 0.2)', // Stronger shadow on hover
};

const contentStyle = {
  fontSize: '20px', // Larger font size for inner content
  padding: '20px', // Padding around the inner content for better spacing
  transition: 'transform 0.3s ease-in-out',
};

const contentHoverStyle = {
  transform: 'scale(1.1)', // Slight zoom effect on the content inside the card
  transition: 'transform 0.3s ease-in-out',
};

const LearningSessions = () => {
  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Learning Sessions and Scheduling</h1>
        <div style={gridStyle}>
          {/* Session Booking Card */}
          <div
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.2)';
              e.currentTarget.querySelector('.content').style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.1)';
              e.currentTarget.querySelector('.content').style.transform = 'scale(1)';
            }}
          >
            <div className="content" style={contentStyle}>
              <SessionBooking />
            </div>
          </div>

          {/* Session Reminders Card */}
          <div
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.2)';
              e.currentTarget.querySelector('.content').style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.1)';
              e.currentTarget.querySelector('.content').style.transform = 'scale(1)';
            }}
          >
            <div className="content" style={contentStyle}>
              <SessionReminders />
            </div>
          </div>

          {/* Goal Tracking Card */}
          <div
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.2)';
              e.currentTarget.querySelector('.content').style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.1)';
              e.currentTarget.querySelector('.content').style.transform = 'scale(1)';
            }}
          >
            <div className="content" style={contentStyle}>
              <GoalTracking />
            </div>
          </div>

          {/* Group Study Rooms Card */}
          <div
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.2)';
              e.currentTarget.querySelector('.content').style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.1)';
              e.currentTarget.querySelector('.content').style.transform = 'scale(1)';
            }}
          >
            <div className="content" style={contentStyle}>
              <GroupStudyRooms />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningSessions;

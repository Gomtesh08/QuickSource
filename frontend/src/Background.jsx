import React from 'react';
import './Background.css';

const Background = () => {
  return (
    <>
      <div className="banner">
        <div className="slider" style={{ "--quantity": 10 }}>
          <div className="item" style={{ "--position": 1 }}>
            <img src="./src/Images/dragon_1.jpg" alt="" />
          </div>
          <div className="item" style={{ "--position": 2 }}>
            <img src="./src/Images/dragon_2.jpg" alt="" />
          </div>
          <div className="item" style={{ "--position": 3 }}>
            <img src="./src/Images/dragon_3.jpg" alt="" />
          </div>
          <div className="item" style={{ "--position": 4 }}>
            <img src="./src/Images/dragon_4.jpg" alt="" />
          </div>
          <div className="item" style={{ "--position": 5 }}>
            <img src="./src/Images/dragon_5.jpg" alt="" />
          </div>
          <div className="item" style={{ "--position": 6 }}>
            <img src="./src/Images/dragon_6.jpg" alt="" />
          </div>
          <div className="item" style={{ "--position": 7 }}>
            <img src="./src/Images/dragon_7.jpg" alt="" />
          </div>
          <div className="item" style={{ "--position": 8 }}>
            <img src="./src/Images/dragon_8.jpg" alt="" />
          </div>
          <div className="item" style={{ "--position": 9 }}>
            <img src="./src/Images/dragon_9.jpg" alt="" />
          </div>
          <div className="item" style={{ "--position": 10 }}>
            <img src="./src/Images/dragon_10.jpg" alt="" />
          </div>
        </div>
        <div className="content">
          {/* <h1 data-content="CSS ONLY">QuickSource</h1> */}
          <div className="author">
            <h2>QuickSource</h2>
            <p><b>Quick Learn</b></p>
            <p>Fastest way to get the resources.</p>
          </div>
          <div className="model"></div>
        </div>
      </div>
    </>
  );
};

export default Background;

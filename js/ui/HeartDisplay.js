import React from 'react';

export class HeartDisplay extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="heart-display">
        <canvas id="main" width="600px" height="600px"/>
      </div>
    );
  }
}

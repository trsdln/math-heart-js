import React from 'react';

export class ControlBar extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="control-bar">
        <input type="number" placeholder="Lines"/>
        <input type="number" placeholder="Sectors"/>
        <input type="number" placeholder="Multiplier"/>
      </div>
    );
  }
}

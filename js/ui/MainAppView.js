import React from 'react';
import { ControlBar } from './ControlBar';
import { HeartDisplay } from './HeartDisplay';

export class MainAppView extends React.Component {
  constructor(props) {
    super(props);
  }

  onConfigSubmit(event) {
    console.log('config submit', event);
  }

  render() {
    return (
      <div className="app-wrapper">
        <ControlBar onConfigSubmit={this.onConfigSubmit.bind(this)}/>
        <HeartDisplay />
      </div>
    );
  }
}

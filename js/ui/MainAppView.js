import React from 'react';
import { ControlBar } from './ControlBar';
import { HeartDisplay } from './HeartDisplay';

export class MainAppView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app-wrapper">
        <ControlBar/>
        <HeartDisplay/>
      </div>
    );
  }
}

import React from 'react';

import { ConfigurationInputEntry } from './ConfigurationInputEntry';


export class ControlBar extends React.Component {
  static propTypes = {
    onConfigSubmit: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  onConfigEntryChange(event) {
    console.log('change', event.target.name, event.target.value);

    // todo: call cb fn here
    // this.props.onConfigSubmit(newConfig)
  }

  render() {
    // todo: throttle change function
    const throttledConfigChange = this.onConfigEntryChange.bind(this);

    return (
      <div className="control-bar">
        <ConfigurationInputEntry placeholder="Lines" name="lines" onChange={throttledConfigChange}/>
        <ConfigurationInputEntry placeholder="Sectors" name="sectors" onChange={throttledConfigChange}/>
        <ConfigurationInputEntry placeholder="Multiplier" name="multiplier" onChange={throttledConfigChange}/>
      </div>
    );
  }
}

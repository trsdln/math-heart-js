import React from 'react';


export class ConfigurationInputEntry extends React.Component {
  static propTypes = {
    placeholder: React.PropTypes.string,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input type="number"
             min="0"
             placeholder={this.props.placeholder}
             name={this.props.name}
             onChange={this.props.onChange}/>
    );
  }
}

import { html } from 'snabbdom-jsx';

export function controlView({sectorsCount, multiplier}) {
  return (
    <div>
      <div>
        <label>Sectors: {sectorsCount}</label>
        <input className="sectors-count" type="range" min="1" max="100" value={sectorsCount}/>
      </div>
      <div>
        <label>Multiplier: {multiplier}</label>
        <input className="multiplier" type="range" min="1" max="10" value={multiplier}/>
      </div>
    </div>
  );
}
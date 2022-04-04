import React from 'react';

export default function Die(props) {
  return (
    <div
      className={props.isHeld ? 'die freeze' : 'die'}
      onClick={() => props.onClick(props.id)}
    >
      {props.value}
    </div>
  );
}

import {useState} from 'react';
import Calendar from 'react-calendar';

import Times from './Times.js'

import React from 'react'

function Time(props) {
 
 return (
 <div className='timbtn'>
  {props.showTime ? <Times date={props.date}/> : null}
 </div>
  )
}

export default Time;
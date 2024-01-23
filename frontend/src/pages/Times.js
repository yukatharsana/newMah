import React from 'react'
import {useState} from 'react';
import Calendar from 'react-calendar';


const time = ['02:00 PM - 03:00 PM','04:00 PM - 05:00 PM','07:00 PM - 08:00 PM','09:00 PM - 10:00 PM']

function Times(props) {

 const [event, setEvent] = useState(null)
 const [info, setInfo] = useState(false)

 function displayInfo(e) {
   setInfo(true);
   setEvent(e.target.innerText);
}

return (
 
 <div className="times timbtn">
   {time.map(times => {
    return (
    <div className="times timbtn transform-on-hoverrr active">
      <button onClick={(e)=> displayInfo(e)}> {times} </button>
    </div>
        )
     })}
    <div className='text-center timedatecon'>
      {info ? `Your appointment is set to ${event} ${props.date.toDateString()}` : null}
    </div>
 </div>
  )
}

export default Times;
import React from 'react';
import useScript from '../hooks/useScript'

export default function PageOne() {
    useScript('./1.js');
    return (
        <div className='container' >
            <picture>
                <img src={require('../assets/images/BG.webp')} alt='BG' className='BG' />
            </picture>

            <div className='centerBox'>
                <div style={{ margin: 30, display: 'flex', justifyContent: 'space-evenly' }}>
                    <button className='viewEvent' id='viewEvent'>View Events</button>
                    <button className='connect' id='connect'>connect</button>
                </div>

                {/* <div className='eventList'>
                    {
                        Array.map(item)=>{
                        return(<div>
                            <p>{item.Name}</p>
                            <p>{item.Name}</p>
                            <p>{item.Name}</p>
                        
                    </div>
                    )
                    }
                    }
                </div> */}

                <div id="eventCreation" className='inputFields'>
                    <input type="text" name="familyEvent" id="familyEvent" placeholder="Family event" />
                    <input type="text" name="mainEvent" id="mainEvent" placeholder="Main Event" />
                <button id="createContract">Create Contract</button>
                </div>

            </div>


        </div >
    )
}

import React, { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import './Destination.css'
import bike from '../../photos/Frame-1.png'
import car from '../../photos/Frame-2.png'
import bus from '../../photos/Frame-3.png'
import train from '../../photos/Frame-4.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router';
import GoogleMap from '../GoogleMap/GoogleMap';

const Destination = () => {
    const [media, setMedia] = useState({})
    const [destination, setDestination] = useState({from:"", to:""})
    const [search, setSearch]= useState(false)
    const { rider } = useParams()

    const rideInfomration=[
        {name:"bike", price:32,photo:bike,capacity:1},
        {name:"train", price:10,photo:train,capacity:1},
        {name:"bus", price:15,photo:bus,capacity:1},
        {name:"car", price:35,photo:car,capacity:4}
    ]

    useEffect(()=>{
        const selectedRider = rider
        const selectedItem =rideInfomration.find(item=>item.name== selectedRider)
        setMedia(selectedItem);
    },[0])

    const handleSearch=()=>{
        if(destination.from && destination.to){
            setSearch(!search);
        }
    }

    const handleChange=(e)=>{
        
        if(e.target.name === "to"){
            const newDestination = {...destination}
            newDestination.to = e.target.value 
            setDestination(newDestination)
        }
        if(e.target.name=== "from"){
            const newDestination = {...destination}
            newDestination.from = e.target.value
            setDestination(newDestination) 
        }
    }
    return (
        <div className="container destination">
            <div className="col-md-4">
               {
                   !search &&
                   <div className="search-field">
                   <label for="exampleInputFrom">Pic From</label>
                   <input onChange={handleChange} name="from" type="text" class="form-control" id="exampleInputFrom" required/>

                   <label for="exampleInputTo">Pic To</label>
                   <input onChange={handleChange} name="to" type="text" class="form-control" id="exampleInputTo" required/>

                   <button onClick={handleSearch}>Search</button>
               </div>
               }

               {
                     search &&
                     <div className="search-result-field">
                    <div className="destination-information">
                        <p>{destination.from}</p>
                        <p>{destination.to}</p>
                    </div>
                    <div className="raider-and-price">
                        <div className="price price-1">
                            <img src={media?.photo || ""} alt="" />
                            <p className="media">Car</p>
                            <FontAwesomeIcon icon={faUserAlt} />
                            <p className="sit-capacity">{media?.capacity}</p>
                            <p className="ride-price">${media?.price}</p>
                        </div>
                        <div className="price price-2">
                            <img src={media?.photo || ""} alt="" />
                            <p className="media">Car</p>
                            <p><span>{<FontAwesomeIcon icon={faUserAlt} />}</span></p>
                            <p className="sit-capacity">{media?.capacity}</p>
                            <p className="ride-price">${media?.price}</p>
                        </div>
                        <div className="price price-3">
                           <img src={media?.photo} alt="" />
                            <p className="media">Car</p>
                            <FontAwesomeIcon icon={faUserAlt} />
                            <p className="sit-capacity">{media?.capacity}</p>
                            <p className="ride-price">${media?.price}</p>
                        </div>
                        </div>
                        </div>
                    }
                </div>
                
            <div className="col-md-8">
                <div className="map-field">
                    <GoogleMap></GoogleMap>
                   
                </div>
            </div>
        </div>
    );
};

export default Destination;
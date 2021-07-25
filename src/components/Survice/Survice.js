import React from 'react';
import { Link } from 'react-router-dom';
import Photo1 from '../../photos/Frame-1.png';
import Photo2 from '../../photos/Frame-2.png';
import Photo3 from '../../photos/Frame-3.png';
import Photo4 from '../../photos/Frame-4.png';
import './Survice.css'

const Survice = () => {
    return (
        <div className="container service">
           <div className="row  ">
           <div className=" col-md-3 ">
               <div className="rider">
                <img src={Photo1} alt="" />
                <Link to="/destination/bike"><h5>Bike</h5></Link>
               </div>
           </div>
            <div className="col-md-3 ">
                <div className="rider">
                <img src={Photo2} alt="" />
                <Link to="/destination/car"><h5>Car</h5></Link>
                </div>
            </div>
            <div className="col-md-3">
                <div className="rider ">
                <img src={Photo3} alt="" />
                <Link to="/destination/bus"><h5>Bus</h5></Link>
                </div>
            </div>
            <div className="col-md-3">
                <div className="rider">
                <img src={Photo4} alt="" />
                <Link to="/destination/train"><h5>train</h5></Link>
                </div>

            </div>
           </div>
        </div>
    );
};

export default Survice;
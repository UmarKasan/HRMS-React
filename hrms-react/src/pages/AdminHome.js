import React from "react";
import { roles } from "../utils/HomeConfig";
import { useNavigate } from "react-router-dom";
import leaveImage from '../images/calender.jpg';
import medicalImage from '../images/medical.png';
import claimImage from '../images/claim.png';

const Home = () => {
    const navigate = useNavigate();
    const selectedRole = 'employee';
    // const roles = roles;

    const navigateToPages = (route) => {
        navigate(route);
    }

    const getImage = (title) => {
        switch(title){
            case "Apply Leave":
                return leaveImage;
                break;
            case "Apply Claim":
                return claimImage;
                break
            case "Apply MC":
                return medicalImage;
                break;
            default:
                return leaveImage;
        }
    }

    return (
        <div class="container ">
            <h1 className="text-info">Admin Home</h1>

            <div class="d-flex align-items-center justify-content-around full-height">
                {roles[selectedRole].map(m => {
                    return (
                        <div className="card text-white bg-info m-3 mt-5" onClick={() =>navigateToPages(m.route)}>
                            <div className="card-header" style={{backgroundColor: '#ffffff', color: '#000000'}} >{m.title}</div>
                            <div className="card-body" style={{backgroundColor: '#ffffff'}} >
                                {/* <h5 className="card-title">Info card title</h5> */}
                                {/* <p className="card-text">{m.description}</p> */}
                                <img src={getImage(m.title)} class="img-fluid" width="200rem" alt="Responsive image" /> 
                            </div>
                        </div>
                    )
                })
                }


            </div>
        </div>

    )
}

export default Home;
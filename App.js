import React, { useState } from "react";
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import axios from 'axios';

const CarRent = () => {

    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [VehicleType, setVehicleType] = useState('');
    // const [Vehiclesubtype, setVehiclesubtype] = useState([]);
    const [SelectestartDate, setselectedstartDate] = useState(null);
    const [SelectelastDate, setselectedlastDate] = useState(null);







    const handlevehicletypechange = (event) => {
        setVehicleType(event.target.value);
    }


    const handlefirstname = (event) => {
        setfirstname(event.target.value)
    }

    const handlelastname = (event) => {
        setlastname(event.target.value)
    }



    const handlesubmit = (e) => {
        e.preventDefault();
        if (firstname === "" || lastname === "" || VehicleType === "" || SelectestartDate === "" || SelectelastDate === "") {
            alert("please fill the all required fields");
            return false;
        }
        axios.post("http://localhost:3000/booking", {
            firstname: firstname,
            lastname: lastname,
            VehicleType: VehicleType,
            SelectestartDate: SelectestartDate,
            SelectelastDate: SelectelastDate
        })
            .then(res => {
                alert("car booking done successfully");
                setfirstname('');
                setlastname('');
                setVehicleType('');
                setselectedstartDate('');
                setselectedlastDate('');

            })
            .catch(e => {
                alert("An error occured,while booking  car");
            })



    }

    return (
        <div className="formcontainer">
            <h1>CarRent</h1>
            <form onSubmit={handlesubmit}>
                <label htmlFor="firstName">firstname</label><br></br>
                <input type="text" className="user" value={firstname} onChange={handlefirstname} />
                <br></br>
                <br></br>
                <label htmlFor="lastName">Lastname</label><br></br>
                <input type="text" className="user" value={lastname} onChange={handlelastname} />
                <br></br>
                <h3>NumberOfWheels</h3>
                <input type="radio"
                    value="2Wheeler"
                    checked={VehicleType === "2Wheeler"}
                    onChange={handlevehicletypechange}
                />
                2wheeler
                <br></br>
                <input type="radio"
                    value="4Wheeler"
                    checked={VehicleType === "4Wheeler"}
                    onChange={handlevehicletypechange}
                />
                4Wheeler
                <br></br>
                {/* {Vehiclesubtype.length > 0 && (
                    <div>
                        <p>Vehicle-Sub-Types</p>
                        <ul>
                            {Vehiclesubtype.map((subtype) => (
                                <li key={subtype}>{subtype}</li>
                            ))}
                        </ul>
                    </div>
                )} */}
                <label>SelecteDate:</label><br></br>
                startdate:
                <Datepicker
                    selected={SelectestartDate}
                    placeholderText="dd/mm/yyyy"
                    onChange={(date) => setselectedstartDate(date)}
                />
                <br></br>
                Lastdate:
                <Datepicker
                    selected={SelectelastDate}
                    placeholderText="dd/mm/yyyy"
                    onChange={(date) => setselectedlastDate(date)}
                />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}
export default CarRent;
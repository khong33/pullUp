# pullup
Parking reservation system


npm install
npm start


// USER TABLE
{
    "u_id": "leoson",
    "name": "Leo",
    "car": "Honda",
    "locaion": "Atlanta",

    "r_id": "2", // Current Reservation ID
    "p_id": "4", // Current Parking ID
    "s_id": "13", // Current Reserved Spot ID
    "history": ["4", "3", "2", "1"] // Past Reservation Records (R_IDs)
}

// RESERVATION TABLE
{
    "r_id": "423", // unique reservation id
    "u_id": "3", // Spot 23 is part of p_id:3
    "p_id": "4",
    "start": "2018-9-3-10-20",
    "end": "2018-9-3-12-20",
    "isExtentable": false,
    "userinfo" : {
        "name": "Leo",
        "payment": "credit card", // User feedback 
        "city": "Atlanta", // Periphery 
    },
    "payment": "$3.45"
}


// PARKING TABLE
{
    "p_id": "41", // unique id for spot
    "s_id": {
        "12": "reserved",
        "13": "reserved",
        "14": "available",
        "15": "reserved"
    }, 
    "available": 1,
    "reserved": 3,
    "rate": "",
    "name": "Georgia Tech Klaus Parking",
    "location": "Atlanta",
    "latitude": "",
    "longitude": "",
    "photo": "", // user feedback
    "city": "Atlanta", 
}

// SPOT TABLE
{
    "s_id": "23", // unique id for spot
    "past_status": [],
    "current_status": "reserved", // status ["reserved" , "available", "unknown"]
    "future_status": [],
    "next_avail": "",
    "p_id": "3", // Spot 23 is part of p_id:3
    "location": "3rd floor corner", // User feedback 
    "city": "Atlanta", // Periphery 
}


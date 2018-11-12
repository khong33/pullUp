# pullup - Parking reservation system

Getting started
```
npm install
npm start
```

# REST API Documentation
CRUD Operations for Parking, Reservation, Spot, User


## PARKING

* [Create a Parking Lot instance] : `POST /parking`

* [Read a Parking Lot by PUUID] : `GET /parking/{PUUID}`

* [Read Near By Parking Lots] : `GET /parking` | Params: [latitude, longitude, size]

* [Delete a Parking Lot] : `DELETE /parking/{PUUID}`


## RESERVATION

* [Create a reservation] : `POST /reservation`

* [Read a reservation by RUUID] : `GET /reservation/{RUUID}`

* [Read time slots by SUUID and Date] : `GET /reservation/timeslots` | Params: [SUUID, date]

* [Delete a reservation by RUUID] : `DELETE /reservation/{RUUID}`

## SPOT

* [Create a Spot instance] : `POST /spot`

* [Read a Spot by SUUID] : `GET /spot/{SUUID}`

* [Update a Spot availability] : `PUT /spot/{STATE}` | STATE: ["true", "false"]

## USER

* [Create a user instance] : `POST /user`

* [Read a user by UUID] : `GET /user/{UUID}`

* [Delete a user by RUUID] : `DELETE /user/{UUID}`
# pullup - Parking reservation system

Getting started
```
npm install
npm start
```

# REST API Documentation
CRUD Operations for Parking, Reservation, Spot, User


## PARKING

* [Create a Parking Lot instance](apidocs/parkingPOST.md) : `POST /parking`

* [Read a Parking Lot by PUUID](apidocs/parkingGET.md) : `GET /parking/{PUUID}`

* [Read Near By Parking Lots](apidocs/parkingGET.md)  : `GET /parking`

* [Delete a Parking Lot](apidocs/parkingDELETE.md)  : `DELETE /parking/{PUUID}`


## RESERVATION

* [Create a reservation](apidocs/reservationPOST.md) : `POST /reservation`

* [Read a reservation by RUUID](apidocs/reservationGET.md) : `GET /reservation/{RUUID}`

* [Read time slots](apidocs/reservationTimeSlotsGET.md) : `GET /reservation/timeslots`

* [Delete a reservation by RUUID](apidocs/reservationDELETE.md) : `DELETE /reservation/{RUUID}`

## SPOT

* [Create a Spot instance](apidocs/spotPOST.md) : `POST /spot`

* [Read a Spot by SUUID](apidocs/spotGET.md) : `GET /spot/{SUUID}`

* [Update a Spot availability](apidocs/spotPUT.md) : `PUT /spot/{STATE}`

## USER

* [Create a user instance](apidocs/userPOST.md) : `POST /user`

* [Read a user by UUID](apidocs/userGET.md) : `GET /user/{UUID}`

* [Update user Information by UUID](apidocs/userPUT.md) : `PUT /user/{UUID}`

* [Delete a user by RUUID](apidocs/userDELETE.md) : `DELETE /user/{UUID}`
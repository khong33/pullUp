**Reservation Delete**
----
  Removes Reservation instance from  user database.

* **URL**

  /reservation/:RUUID

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `UUID=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ Message : ""Message": "Successfully deleted " + params.RUUID }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Error: Parking lot with PUUID: " + RUUID + " does not exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Error: Requirement for the body not satisfied" }`

* **Sample Response:**

  ```javascript
    {
    "Message": "Successfully deleted a ",
    "RUUID": "486bedd7-8f8b-41f9-a592-96c38d01abb5"
}
  ```
**Reservation POST**
----
  Creates Reservation instance and stores in user database.

* **URL**

  /reservation

* **Method:**

  `POST`
  
*  **URL Params**

    None    
   

* **Data Params**

  **Required:**
 
   `SSUID=[string]`
   `UUID=[string]`
   `time=[integer]`
   `date=[date]`
   

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "Message": "Successfully instantiated " + RUUID,`
    `"RUUID": RUUID,`
    `"SUUID": body.SUUID,`
    `"time": body.time,`
    `"date": body.date`
 
* **Error Response:**

  * **Code:** 401 NOT FOUND <br />
    **Content:** `{ error : "Error: Requirement for the body not satisfied" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Time slot must be in between 0 and 48" }`

* **Sample Response:**

  ```javascript
    {
    "Message": "Successfully instantiated 683a14a6-87e3-4f3e-b489-a1ac860f5f6f",
    "RUUID": "683a14a6-87e3-4f3e-b489-a1ac860f5f6f",
    "SUUID": "11ad594a-2d6b-49a9-b7cc-bbc35b26ea25",
    "time": "20",
    "date": "11/12/2018"
}
  ```
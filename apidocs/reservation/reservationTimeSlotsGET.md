**Reservation GET**
----
  Retrieves parking lot object from user database.

* **URL**

  /reservation

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**
    
    **Required:**
 
   `SUUID=[string]`
   `date=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  JSON body of reservation object time slots for user input reservation
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Error: Requirement for the body not satisfied" }`

  OR

  * **Code:** 404 UNAUTHORIZED <br />
    **Content:** `{ error : "Error: Error Occured during request" }`

* **Sample Response:**

  ```javascript
    {
    [
    "18",
    "20",
    "25",
    "4"
    ]
}
  ```
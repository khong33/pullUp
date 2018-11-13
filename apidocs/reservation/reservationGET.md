**Reservation GET**
----
  Retrieves parking lot object from user database.

* **URL**

  /reservation/:RUUID

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `RUUID=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  JSON body of reservation object
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Error: Requirement for the body not satisfied" }`

  OR

  * **Code:** 404 UNAUTHORIZED <br />
    **Content:** `{ error : "Error: Error: Unidenfied RUUID" }`

* **Sample Response:**

  ```javascript
    {
    "date": "11/12/2018",
    "time": "4",
    "UUID": "sample",
    "SUUID": "11ad594a-2d6b-49a9-b7cc-bbc35b26ea25",
    "RUUID": "47b23706-7a29-4425-b408-5e926c22463d"
}
  ```
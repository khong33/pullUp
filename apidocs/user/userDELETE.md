**User Delete**
----
  Removes User instance from  user database.

* **URL**

  /user/:RUUID

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `UUID=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ Message : ""Message": "Successfully deleted " + params.UUID }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Error: Parking lot with PUUID: " + UUID + " does not exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Error: Requirement for the body not satisfied" }`

* **Sample Response:**

  ```javascript
    {
    "Message": "Successfully deleted ",
    "UUUID": "Ronald"
}
  ```
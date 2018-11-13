**Parking Delete**
----
  Removes parking lot object from  user database.

* **URL**

  /parking/:PUUID

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `PUUID=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ Message : "Successfully removed parking lot", PUUID : PUUID }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Error: Parking lot with PUUID: " + PUUID + " does not exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Error: Requirement for the body not satisfied" }`

* **Sample Response:**

  ```javascript
    {
    "Message": "Successfully removed a parking lot",
    "PUUID": "486bedd7-8f8b-41f9-a592-96c38d01abb5"
}
  ```
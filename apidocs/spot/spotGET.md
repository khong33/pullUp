**Spot GET**
----
  Retrieves spot object from user database.

* **URL**

  /spot/:SUUID

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `SUUID=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  JSON body of spot object
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Error: Requirement for the body not satisfied" }`

  OR

  * **Code:** 404 UNAUTHORIZED <br />
    **Content:** `{ error : "Error: No result found. Unidenfied SUUID" }`

* **Sample Response:**

  ```javascript
    {
    "SUUID": "11ad594a-2d6b-49a9-b7cc-bbc35b26ea25",
    "avail": false,
    "PUUID": "ccca04de-c40a-463f-a7d1-59fb1d3e4656",
    "floor": 1
}
  ```
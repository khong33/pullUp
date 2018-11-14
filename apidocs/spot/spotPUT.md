**Spot PUT**
----
  Updates Spot object and stores in database.

* **URL**

  /spot

* **Method:**

  `PUT`
  
*  **URL Params**

    None    
   

* **Data Params**

  **Required:**
  Combination or all:
   `SUUID=[string]`
   `avail=[boolean]`
   `PUUID=[string]`
   `floor=[integer]`
   

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "Successfully Updated " + SUUID + " to " + avail "`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Only 'true' or 'false' is used for the update." }`

    OR

  * **Code:** 404 UNAUTHORIZED <br />
    **Content:** `{ error : "Error: Requirement for the body not satisfied" }`



* **Sample Response:**

  ```javascript
    {
    "Message": "Successfully updated 11ad594a-2d6b-49a9-b7cc-bbc35b26ea25 to true",
}
  ```
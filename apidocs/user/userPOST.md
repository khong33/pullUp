**User POST**
----
  Creates User instance and stores in database.

* **URL**

  /user

* **Method:**

  `POST`
  
*  **URL Params**

    None    
   

* **Data Params**

  **Required:**
 
   `email=[string]`
   `first=[string]`
   `last=[string]`
   `pw=[string]`
   

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "Successfully created user " + UUID + " to registration table "`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Error: Requirement for the body not satisfied" }`

* **Sample Response:**

  ```javascript
    {
    "Message": "Successfully created user ronald to registration table",
}
  ```
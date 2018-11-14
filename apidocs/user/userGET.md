**User GET**
----
  Retrieves User object from user database.

* **URL**

  /user/:UUID

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `UUID=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  JSON body of User object
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Error: Requirement for the body not satisfied" }`

  OR

  * **Code:** 404 UNAUTHORIZED <br />
    **Content:** `{ error : "Error: Error: Unidenfied UUID" }`

* **Sample Response:**

  ```javascript
    {
    "email": "ronaldfadehan@gmail.com",
	"first": "ronald",
	"last": "fadehan",
}
  ```
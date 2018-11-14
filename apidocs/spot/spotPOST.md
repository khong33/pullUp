**Spot POST**
----
  Creates Spot instance and stores in user database.

* **URL**

  /spot

* **Method:**

  `POST`
  
*  **URL Params**

    None    
   

* **Data Params**

  **Required:**
 
   `SSUID=[string]`
   `avail=[boolean]`
   

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "Message": "Successfully instantiated " + body.SUUID,`
    `"SUUID": body.SUUID,`
    `"PUUID": body.PUUID`
 
* **Error Response:**


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
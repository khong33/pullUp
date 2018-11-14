**Parking POST**
----
  Creates parking lot object with a user assigned number of spots and stores in user database.

* **URL**

  /parking

* **Method:**

  `POST`
  
*  **URL Params**

    None    
   

* **Data Params**

  **Required:**
 
   `name=[string]`
   `zip=[integer]`
   `latitude=[integer]`
   `longitude=[integer]`
   `spotCount=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ Message : "Successfully instantiated " + PUUID, `
    `PUUID : PUUID,`
    `spots: spots}`
 
* **Error Response:**

  * **Code:** 401 NOT FOUND <br />
    **Content:** `{ error : "Error: Requirement for the body not satisfied. Name, zip, latitude, and longitude are required" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Error: Spot count exceeds maximum amount. Minimum is 1 and Maximum is 100" }`

* **Sample Response:**

  ```javascript
    {
    "Message": "Successfully instantiated 486bedd7-8f8b-41f9-a592-96c38d01abb5",
    "PUUID": "486bedd7-8f8b-41f9-a592-96c38d01abb5",
    "spots": [
        "f1730972-491b-43bc-9130-93dde663a7f6",
        "a43a4a96-f6eb-4e6a-bf27-a447e5968c79",
        "1431d154-10c7-4deb-a146-c54fc05e3f7e",
        "52e8dabf-a6d1-4946-88bb-72bc8727d2c8",
        "6fdf8992-a0ba-4e05-b9eb-9102235088cb",
        "baedd306-8ab0-49c1-b268-b2cc5073af12",
        "809a39e1-46a5-4793-a459-40334b325ba4",
        "83d6487a-5309-4c4d-b6bd-602907811a4c",
        "db8b1a7e-9427-43b4-96cd-3b7480cba809",
        "50cc4130-9d27-4092-972c-423ae8e2ea65"
    ]
}
  ```
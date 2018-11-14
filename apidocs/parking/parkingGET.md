**Parking GET**
----
  Retrieves parking lot object from user database.

* **URL**

  /parking/:PUUID

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `PUUID=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**  JSON body of parking object
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Error: Requirement for the body not satisfied" }`

  OR

  * **Code:** 404 UNAUTHORIZED <br />
    **Content:** `{ error : "Error: Failed to get specified PUUID's item from the DB" }`

* **Sample Response:**

  ```javascript
    {
    "zip": "30303",
    "longitude": "-84.392000",
    "spotCount": "10",
    "latitude": "33.762280",
    "name": "AAA parking lot",
    "PUUID": "d9b3ebaa-88fb-4c86-9878-a7caa2a2116e",
    "spots": [
        "29f26524-c78f-4af9-a03f-3b9da35482bb",
        "561b9c3b-a08f-445a-8e02-8e3157f7f7f6",
        "6f65a92b-9cb1-4d31-a28f-360c436226eb",
        "72cd7c05-e797-4942-9567-542dfb042c55",
        "75814456-55ee-4e3d-9d30-3ab95bab729b",
        "9666fc28-bb34-404f-816d-13e753e301b2",
        "b5227244-6e9e-488f-bb41-7cf3b3924090",
        "b59b2aa4-642d-4c82-80cf-f1c17fe02985",
        "bef46187-58b1-4a3c-b7c0-12d8b15489d4",
        "f2439ff7-dfca-402f-b117-6499220ae97e"
    ]
}
  ```
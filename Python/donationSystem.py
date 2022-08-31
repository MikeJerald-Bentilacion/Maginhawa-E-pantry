from flask import Flask, jsonify, request
from connectDatabase import spcall_display, spcall, sp
from flask_httpauth import HTTPBasicAuth
import flask

app = Flask(__name__)
auth = HTTPBasicAuth()

### Owner/Admin ###

@app.route('/login', methods=["POST"])
def login():
    params = request.get_json()
    username = params["username"]
    password = params["password"]
    login = spcall("login", (username, password,), True)[0][0]
    return jsonify(login)
    # curl -i -H "Content-Type: application/json" -d '{"username":"Admin","password":"admin123"}' -X POST http://localhost:8000/login 

@app.route('/admin', methods=["GET"])
def display_admin():
    admin = spcall_display("display_admin", ())[0][0]
    return jsonify(admin)

# Logout
@app.route('/logout', methods=["POST"])
def logout():
    logout = spcall("logout", (), True)[0][0]
    return jsonify(logout)

### Donors ###

# Login
@app.route('/donor/login', methods=["POST"])
def login_donor():
    params = request.get_json()
    username = params["username"]
    password = params["password"]
    login = spcall("login_donor", (username, password,), True)[0][0]
    return jsonify(login)
    #  curl -i -H "Content-Type: application/json" -d '{"username": "juandelacruz","password":"juandelacruz"}' -X POST http://localhost:8000/login/donor

# Logout
@app.route('/donor/logout', methods=["POST"])
def logout_donor():
    logout = spcall("logout_donor", (), True)[0][0]
    return jsonify(logout)
    #  curl -i -H "Content-Type: application/json" -d '{}' -X POST http://localhost:8000/donor/logout

# Register
@app.route('/donor', methods=["POST"])
def register_donor():
    params = request.get_json()
    id = params["donor_id"]
    name = params["donor_name"]
    address = params["donor_address"]
    phone_number = params["donor_phone_number"]
    username = params["donor_username"]
    password = params["donor_password"]
    result = spcall("donor_registration", (id, name, address, phone_number, username, password), True)[0][0]

    return jsonify(result)
    # curl -i -H "Content-Type: application/json" -d '{"donor_id":"2022-0003","donor_name":"Juan Dela Cruz","donor_address":"Davao City","donor_phone_number":"09876543715", "donor_username":"juan","donor_password":"juan123"}' -X POST http://localhost:8000/donor

# Update Donor
@app.route('/donor', methods=["PUT"])
def edit_donor():
    params = request.get_json()
    id = params["donor_id"]
    name = params["donor_name"]
    address = params["donor_address"]
    phone_number = params["donor_phone_number"]
    result = spcall("edit_donor", (id, name, address, phone_number), True)[0][0]

    return jsonify(result)
    # curl -i -H "Content-Type: application/json" -d '{"donor_id":"2022-0003","donor_name":"Juan Dela Cruz","donor_address":"Iligan City","donor_phone_number":"09876543715"}' -X PUT http://localhost:8000/donor

# Delete Donor
@app.route('/donor/<string:id>', methods=["DELETE"])
def delete_donor(id):
    result = spcall("delete_donor", (id,), True)[0][0]
    return jsonify(result)
    # curl -i -H "Content-Type: application/json" -X DELETE http://localhost:8000/donor/2022-0003

# Search Donor
@app.route('/donor/<string:id>', methods=["GET"])
def search_donor(id):
    donor = spcall("search_donor", (id,))[0][0]
    return jsonify(donor)
    # curl -H "Content-Type: application/json" -X GET http://localhost:8000/donor/2022-0001

# Display Donor
@app.route('/donor', methods=["GET"])
def display_donor():
    donor = spcall_display("display_donor", ())[0][0]
    return jsonify(donor)
    #  curl -H "Content-Type: application/json" -X GET http://localhost:8000/donor

@app.route('/donor/user', methods=["GET"])
def display_donor_user():
    donor = spcall_display("display_donor_user", ())[0][0]
    return jsonify(donor)
### Rider ###

# Login
@app.route('/rider/login', methods=["POST"])
def login_rider():
    params = request.get_json()
    username = params["username"]
    password = params["password"]
    login = spcall("login_rider", (username, password,), True)[0][0]
    return jsonify(login)
    #  curl -i -H "Content-Type: application/json" -d '{"username": "doerider","password":"rider123"}' -X POST http://localhost:8000/login/rider

# Logout
@app.route('/rider/logout', methods=["POST"])
def logout_rider():
    logout = spcall("logout_rider", (), True)[0][0]
    return jsonify(logout)

# Register
@app.route('/rider', methods=["POST"])
def register_rider():
    params = request.get_json()
    id = params["rider_id"]
    name = params["rider_name"]
    phone_number = params["rider_phone_number"]
    username = params["rider_username"]
    password = params["rider_password"]
    result = spcall("rider_registration", (id, name, phone_number, username, password), True)[0][0]

    return jsonify(result)
    # curl -i -H "Content-Type: application/json" -d '{"rider_id":"2022-0009","rider_name":"Juan Dela Cruz","rider_phone_number":"09876543715", "rider_username":"juan","rider_password":"juan123"}' -X POST http://localhost:8000/rider

# Update Rider
@app.route('/rider', methods=["PUT"])
def edit_rider():
    params = request.get_json()
    id = params["rider_id"]
    name = params["rider_name"]
    phone_number = params["rider_phone_number"]
    result = spcall("edit_rider", (id, name, phone_number), True)[0][0]

    return jsonify(result)
    # curl -i -H "Content-Type: application/json" -d '{"rider_id":"2022-0003","rider_name":"Juan Dela Cruz","rider_phone_number":"09876543715"}' -X PUT http://localhost:8000/rider

# Update Rider Availability
@app.route('/rider/availability/<string:id>', methods=["GET"])
def edit_rider_availavility(id):
    result = spcall("edit_rider_availability", (id,), True)[0][0]

    return jsonify(result)
    # curl -H "Content-Type: application/json" -X GET http://localhost:8000/rider/availability/2022-0001
    
# Delete Rider
@app.route('/rider/<string:id>', methods=["DELETE"])
def delete_rider(id):
    result = spcall("delete_rider", (id,), True)[0][0]
    return jsonify(result)
    # curl -i -H "Content-Type: application/json" -X DELETE http://localhost:8000/rider/2022-0003

# Search Rider
@app.route('/rider/<string:id>', methods=["GET"])
def search_rider(id):
    rider = spcall("search_rider", (id,))[0][0]
    return jsonify(rider)
    # curl -H "Content-Type: application/json" -X GET http://localhost:8000/rider/2022-0001

# Display Rider
@app.route('/rider', methods=["GET"])
def getRider():
    rider = spcall_display("display_rider", ())[0][0]
    return jsonify(rider)
    #  curl -H "Content-Type: application/json" -X GET http://localhost:8000/rider

@app.route('/rider/user', methods=["GET"])
def display_rider_user():
    rider = spcall_display("display_rider_user", ())[0][0]
    return jsonify(rider)
### Items ###

# Donate 
@app.route('/item', methods=["POST"])
def donate_items():
    params = request.get_json()
    id = params["item_id"]
    dtype = params["donation_type"]
    quantity = params["quantity"]
    result = spcall("donate_item", (id, dtype, quantity,), True)[0][0]

    return jsonify(result)
    # curl -i -H "Content-Type: application/json" -d '{"item_id":"2022-0002","donation_type":"Clothes","quantity":"20", "donor_id":"2022-0001"}' -X POST http://localhost:8000/item

@app.route('/item/received', methods=["POST"])
def donation_received():
    params = request.get_json()
    id = params["item_id"]
    result = spcall("donation_received", (id,), True)[0][0]

    return jsonify(result)

@app.route('/item/not_received', methods=["POST"])
def donation_not_received():
    params = request.get_json()
    id = params["item_id"]
    result = spcall("donation_not_received", (id,), True)[0][0]

    return jsonify(result)

# Display
@app.route('/item', methods=["GET"])
def display_item():
    item = spcall_display("display_item", ())[0][0]
    return jsonify(item)
    #  curl -H "Content-Type: application/json" -X GET http://localhost:8000/item

@app.route('/item2', methods=["GET"])
def display_donated_item():
    received_item = spcall_display("display_received", ())[0][0]
    return jsonify(received_item)

@app.route('/item3', methods=["GET"])
def display_not_donated_item():
    not_received_item = spcall_display("display_not_received", ())[0][0]
    return jsonify(not_received_item)

# Display Donated Items by Donor
@app.route('/donor/item', methods=["GET"])
def display_donor_item():
    display_donor_item = spcall_display("display_donor_item", ())[0][0]
    return jsonify(display_donor_item)

# Display Donation Received in Donor UI
@app.route('/donor/item/received', methods=["GET"])
def display_received_by_donor_id():
    display = spcall_display("display_received_by_donor_id", ())[0][0]
    return jsonify(display)

# Display Donation Not Received in Donor UI
@app.route('/donor/item/notreceived', methods=["GET"])
def display_not_received_by_donor_id():
    display = spcall_display("display_not_received_by_donor_id", ())[0][0]
    return jsonify(display)

### Schedules ###

# Donate 
@app.route('/schedule', methods=["POST"])
def add_schedule():
    params = request.get_json()
    id = params["sched_id"]
    time = params["time"]
    date = params["date"]
    donor_id = params["donor_id"]
    donor_info = params["donor_info"]
    rider_id = params["rider_id"]
    item = params["item_id"]
    result = spcall("add_schedule", (id, time, date, donor_id, donor_info, rider_id, item,), True)[0][0]

    return jsonify(result)
    # curl -i -H "Content-Type: application/json" -d '{"sched_id":"2022-0002","time":"8:00","date":"2022/04/14", "donor_id":"2022-0001","donor_info":"Iligan City","rider_id":"2022-0001","item":"2022-0002", "user_id":"admin1"}' -X POST http://localhost:8000/schedule

# Edit Schedule
@app.route('/schedule', methods=["PUT"])
def edit_schedule():
    params = request.get_json()
    id = params["sched_id"]
    time = params["time"]
    date = params["date"]
    donor_id = params["donor_id"]
    donor_info = params["donor_info"]
    rider_id = params["rider_id"]
    item = params["item_id"]
    result = spcall("edit_schedule", (id, time, date, donor_id, donor_info, rider_id, item), True)[0][0]

    return jsonify(result)

# Delete Schedule
@app.route('/schedule/<string:id>', methods=["DELETE"])
def delete_schedule(id):
    result = spcall("delete_schedule", (id,), True)[0][0]
    return jsonify(result)

# Search Schedule
@app.route('/schedule/<string:id>', methods=["GET"])
def search_schedule(id):
    rider = spcall("search_schedule", (id,))[0][0]
    return jsonify(rider)
    # curl -H "Content-Type: application/json" -X GET http://localhost:8000/schedule/2022-0001

# Display Schedule
@app.route('/schedule', methods=["GET"])
def display_schedule():
    schedule = spcall_display("display_schedule", ())[0][0]
    return jsonify(schedule)
    #  curl -H "Content-Type: application/json" -X GET http://localhost:8000/schedule

# Display Schedule By Donor ID
@app.route('/donor/schedule', methods=["GET"])
def display_schedule_by_donor_id():
    display = spcall_display("display_schedule_by_donor_id", ())[0][0]
    return jsonify(display)

# Display Schedule By Rider ID
@app.route('/rider/schedule', methods=["GET"])
def display_schedule_by_rider_id():
    display = spcall_display("display_schedule_by_rider_id", ())[0][0]
    return jsonify(display)

@app.after_request
def add_cors(resp):
    resp.headers['Access-Control-Allow-Origin'] = flask.request.headers.get('Origin', '*')
    resp.headers['Access-Control-Allow-Credentials'] = True
    resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS, GET, PUT, DELETE'
    resp.headers['Access-Control-Allow-Headers'] = flask.request.headers.get('Access-Control-Request-Headers', 'Authorization')
    # set low for debugging

    if app.debug:
        resp.headers["Access-Control-Max-Age"] = '1'
    return resp

if __name__ == '__main__':
    app.debug = True
    port = 8000
    app.run(host='0.0.0.0', port = port)

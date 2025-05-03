# from flask import Flask, jsonify

# app = Flask(__name__)

# @app.route('/api/alerts', methods=['GET'])
# def get_alerts():
#     alerts = [
#         {
#             "lat": 12.9716,
#             "lng": 80.2200,
#             "type": "traffic",
#             "message": "Heavy traffic ahead",
#             "severity": "high"
#         },
#         {
#             "lat": 12.9750,
#             "lng": 80.2225,
#             "type": "animal_crossing",
#             "message": "Animal crossing ahead",
#             "severity": "moderate"
#         },
#         {
#             "lat": 12.9800,
#             "lng": 80.2250,
#             "type": "speed_breaker",
#             "message": "Speed breaker ahead",
#             "severity": "low"
#         }
#     ]
#     return jsonify({"alerts": alerts})

# if __name__ == '__main__':
#     app.run(debug=True)



from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend (cross-origin)

# Example route to serve alert data
@app.route('/alerts', methods=['GET'])
def get_alerts():
    # Sample data, you can update this with real-time or AI-based logic
    alerts = [
        {"type": "traffic", "lat": 13.0827, "lng": 80.2707, "message": "Heavy traffic near T. Nagar"},
        {"type": "animal", "lat": 13.063, "lng": 80.256, "message": "Animal crossing zone"},
        {"type": "speedbreaker", "lat": 13.098, "lng": 80.281, "message": "Speed breaker ahead"}
    ]
    return jsonify(alerts)

if __name__ == '__main__':
    app.run(debug=True)


from datetime import datetime

import atexit
import pymongo
import werkzeug

from flask import Flask, redirect, jsonify, json
from flask import request
import requests
from apscheduler.scheduler import Scheduler


app = Flask(__name__)
cron = Scheduler(daemon=True)
cron.start()
client = pymongo.MongoClient("mongodb://localhost:27017/")
database = client.get_database("iot_mining")


def create_json(elements):
    results = list()
    for document in elements:
        new_document = {}
        for key, value in document.items():
            new_document.update({key: str(value)})
        results.append(new_document)

    return app.response_class(
        response=json.dumps(results),
        status=200,
        mimetype='application/json'
    )


@cron.interval_schedule(hours=1)
def start():
    for element in ['idokep', 'livetraffic', 'parking']:
        data = {
            'project': element,
            'spider': element
        }
        requests.post('http://scrapy1:6800/schedule.json', data)

# Custom error message


@app.errorhandler(werkzeug.exceptions.BadRequest)
def handle_bad_request(e):
    response = jsonify("Bad request")
    response.status_code = 400
    return response


@app.errorhandler(werkzeug.exceptions.MethodNotAllowed)
def handle_bad_request(e):
    response = jsonify("Method not allowed on this endpoint")
    response.status_code = 405
    return response


@app.errorhandler(werkzeug.exceptions.NotFound)
def handle_bad_request(e):
    response = jsonify("Endpoint cannot be found")
    response.status_code = 404
    return response


class InternalConnectionError(Exception):
    status_code = 500

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['error'] = self.message
        return rv


@app.errorhandler(InternalConnectionError)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

# Rest Endpoints


@app.route("/")
def hello():
    return "Okos városok adatbányászata"


@app.route("/scrapy/jobs")
def get_scrapy():
    try:
        r = requests.get('http://scrapy1:6800/jobs')
        return r.content
    except Exception as e:
        raise InternalConnectionError('Data mining connection failed', status_code=500)


@app.route("/scrapy/start/<project>")
def start_spider(project):
    param_spider = request.args.get('spider')
    data = {
        'project': project,
        'spider': param_spider
    }
    try:
        r = requests.post('http://scrapy1:6800/schedule.json', data)
        return r.content
    except Exception as e:
        raise InternalConnectionError('Data mining connection failed', status_code=500)


@app.route("/data/<collection>")
def get_data(collection):
    param_city = request.args.get('location')
    param_from = request.args.get('from')
    param_to = request.args.get('to')
    query = dict()
    time = dict()
    if param_city is not None:
        query['location'] = str(param_city)
    if param_from is not None:
        date = datetime.strptime(param_from, '%Y-%m-%dT%H:%M')
        time['$gte'] = date
        query['time'] = time
    if param_to is not None:
        date = datetime.strptime(param_to, '%Y-%m-%dT%H:%M')
        time['$lt'] = date
        query['time'] = time
    try:
        collection = database.get_collection(collection)

        first_element = collection.find().sort('save_time', -1).limit(1)
        query['save_time'] = first_element[0]['save_time']
        elements = [row for row in collection.find(query)]
        return create_json(elements)
    except Exception as e:
        raise InternalConnectionError('Database connection failed', status_code=500)


@app.route("/data/<collection>/query")
def get_data_by_query(collection):
    query = dict(request.args)
    time = dict()
    if 'from' in query and query['from'] is not None:
        date = datetime.strptime(query['from'], '%Y-%m-%dT%H:%M')
        time['$gte'] = date
        query['save_time'] = time
        del query['from']
    if 'to' in query and query['to'] is not None:
        date = datetime.strptime(query['to'], '%Y-%m-%dT%H:%M')
        time['$lt'] = date
        query['save_time'] = time
        del query['to']
    if not query:
        first_element = collection.find().sort('save_time', -1).limit(1)
        query['save_time'] = first_element[0]['save_time']

    try:
        collection = database.get_collection(collection)
        elements = [row for row in collection.find(query)]
        return create_json(elements)
    except Exception as e:
        raise InternalConnectionError('Database connection failed', status_code=500)


@app.route("/data/<collection>/keys")
def get_collection_keys(collection):
    try:
        collection = database.get_collection(collection)
        elements = [row for row in collection.find_one().keys()]
        return app.response_class(
            response=json.dumps(elements),
            status=200,
            mimetype='application/json')
    except Exception as e:
        raise InternalConnectionError('Database connection failed', status_code=500)


app.run(host="0.0.0.0", port="7000")
atexit.register(lambda: cron.shutdown(wait=False))

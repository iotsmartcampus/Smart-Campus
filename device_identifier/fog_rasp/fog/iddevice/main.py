from flask import Flask, jsonify, abort, request, make_response
import requests 
import json
import time
import datetime
import threading
import os
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__, static_url_path = "")

# global variables
brokerURL = ''
outputs = []
timer = None
lock = threading.Lock()
counter = 0 
deviceName = ""
samplesPeriodCalc = []

#=======================================CurrentSensor==============================================

print("-_-------------------------train--RF-------------------------------------------")

df = pd.read_csv('samples_v8.csv')

#classes = ["desconected", "loader", "fan", "tv", "blender"]
classes = ["desconected", "notebook power adapter", "fan", "tv", "blender", "lamp", "hairdryer", "soldering iron", "smartphone power adapter", "sandwich maker"]
X = df.drop(columns=[' device'])
y = np.array(df[' device'].apply(classes.index))

#clf = GradientBoostingClassifier(n_estimators=100, learning_rate=1.0, max_depth=1, random_state=42)
clf = RandomForestClassifier(n_estimators = 25, criterion = 'entropy', random_state = 42)
clf.fit(X, y)

#===================================================================================================

@app.errorhandler(400)
def not_found(error):
    print("=============Bad request=============")
    return make_response(jsonify( { 'error': 'Bad request' } ), 400)

@app.errorhandler(404)
def not_found(error):
    print("=============Not found=============")
    return make_response(jsonify( { 'error': 'Not found' } ), 404)

@app.route('/admin', methods=['POST'])
def admin():
    print("=============Admin=============")    
    if not request.json:
        abort(400)
    
    configObjs = request.json
    handleConfig(configObjs)    
        
    return jsonify({ 'responseCode': 200 })


@app.route('/notifyContext', methods = ['POST'])
def notifyContext():
    print("=============notify=============")

    if not request.json:
        abort(400)
    	
    objs = readContextElements(request.json)

    global counter
    counter = counter + 1
    
    print(objs)

    handleNotify(objs)
    
    return jsonify({ 'responseCode': 200 })


def element2Object(element):
    ctxObj = {}
    
    ctxObj['entityId'] = element['entityId'];
    
    ctxObj['attributes'] = {}  
    if 'attributes' in element:
        for attr in element['attributes']:
            ctxObj['attributes'][attr['name']] = {'type': attr['type'], 'value': attr['value']}   
    
    ctxObj['metadata'] = {}
    if 'domainMetadata' in element:    
        for meta in element['domainMetadata']:
            ctxObj['metadata'][meta['name']] = {'type': meta['type'], 'value': meta['value']}
    
    return ctxObj

def object2Element(ctxObj):
    ctxElement = {}
    
    ctxElement['entityId'] = ctxObj['entityId'];
    
    ctxElement['attributes'] = []  
    if 'attributes' in ctxObj:
        for key in ctxObj['attributes']:
            attr = ctxObj['attributes'][key]
            ctxElement['attributes'].append({'name': key, 'type': attr['type'], 'value': attr['value']})
    
    ctxElement['domainMetadata'] = []
    if 'metadata' in ctxObj:    
        for key in ctxObj['metadata']:
            meta = ctxObj['metadata'][key]
            ctxElement['domainMetadata'].append({'name': key, 'type': meta['type'], 'value': meta['value']})
    
    return ctxElement

def readContextElements(data):
    print(data)

    ctxObjects = []
    
    for response in data['contextResponses']:
        if response['statusCode']['code'] == 200:
            ctxObj = element2Object(response['contextElement'])
            ctxObjects.append(ctxObj)
    
    return ctxObjects

def handleNotify(contextObjs):
    for ctxObj in contextObjs:
        processInputStreamData(ctxObj)

def processInputStreamData(obj):
    print('===============receive context entity====================')
    print(obj)
    
    global counter    
    counter = counter + 1

    #===========================================CurrentSensor=============================================

    samples = obj['attributes']['current']['value']
    samplesVec = samples.split(" ");

    min = 0;
    samplesPeriod = []

    for i in range(0,31):
        if(int(samplesVec[min]) > int(samplesVec[i])):
            min = i;

    for i in range(min,(min+14)):
        samplesPeriod.append(int(samplesVec[i]))

    predicted = clf.predict(np.array([samplesPeriod]))

    global deviceName
    deviceName = classes[int(predicted)]

    global samplesPeriodCalc
    samplesPeriodCalc = samplesPeriod

    #=====================================================================================================

def handleConfig(configurations):  
    global brokerURL
    global num_of_outputs  
    for config in configurations:        
        if config['command'] == 'CONNECT_BROKER':
            brokerURL = config['brokerURL']
        if config['command'] == 'SET_OUTPUTS':
            outputs.append({'id': config['id'], 'type': config['type']})
    
def handleTimer():
    global timer

    # publish the counting result
    entity = {}       
    entity['id'] = "CurrentSensor:001001001"
    entity['type'] = "Result"
    entity['counter'] = counter   
     
    publishResult(entity)
        
    timer = threading.Timer(10, handleTimer)
    timer.start()


def publishResult(result):
    resultCtxObj = {}
        
    resultCtxObj['entityId'] = {}
    resultCtxObj['entityId']['id'] = result['id']
    resultCtxObj['entityId']['type'] = result['type']        
    resultCtxObj['entityId']['isPattern'] = False    
    
    resultCtxObj['attributes'] = {}
    #resultCtxObj['attributes']['counter'] = {'type': 'interger', 'value': counter}
    resultCtxObj['attributes']['device'] = {'type': 'string', 'value': deviceName}
    resultCtxObj['attributes']['samples'] = {'type': 'int', 'value': samplesPeriodCalc}

    # publish the real time results as context updates    
    updateContext(resultCtxObj)

def updateContext(ctxObj):
    global brokerURL
    if brokerURL == '':
        return
        
    ctxElement = object2Element(ctxObj)
    
    updateCtxReq = {}
    updateCtxReq['updateAction'] = 'UPDATE'
    updateCtxReq['contextElements'] = []
    updateCtxReq['contextElements'].append(ctxElement)

    headers = {'Accept' : 'application/json', 'Content-Type' : 'application/json'}
    response = requests.post(brokerURL + '/updateContext', data=json.dumps(updateCtxReq), headers=headers)
    if response.status_code != 200:
        print('failed to update context')
        print((response.text))

                             
if __name__ == '__main__':
    handleTimer()    
    
    myport = int(os.environ['myport'])
    
    myCfg = os.environ['adminCfg']
    adminCfg = json.loads(myCfg)
    handleConfig(adminCfg)
    
    app.run(host='0.0.0.0', port=myport)
    
    timer.cancel()
    

--- main.py	(original)
+++ main.py	(refactored)
@@ -9,9 +9,9 @@
 #import pandas as pd
 
 def greet(name):
-    print "Hello, {0}!".format(name)
-print "What's your name?"
-name = raw_input()
+    print("Hello, {0}!".format(name))
+print("What's your name?")
+name = input()
 greet(name)
 
 app = Flask(__name__, static_url_path = "")
@@ -44,7 +44,7 @@
 
 @app.route('/notifyContext', methods = ['POST'])
 def notifyContext():
-    print "=============notify============="
+    print("=============notify=============")
 
     if not request.json:
         abort(400)
@@ -98,7 +98,7 @@
     return ctxElement
 
 def readContextElements(data):
-    print data
+    print(data)
 
     ctxObjects = []
     
@@ -114,8 +114,8 @@
         processInputStreamData(ctxObj)
 
 def processInputStreamData(obj):
-    print '===============receive context entity===================='
-    print obj
+    print('===============receive context entity====================')
+    print(obj)
     
     global counter    
     counter = counter + 1
@@ -174,8 +174,8 @@
     headers = {'Accept' : 'application/json', 'Content-Type' : 'application/json'}
     response = requests.post(brokerURL + '/updateContext', data=json.dumps(updateCtxReq), headers=headers)
     if response.status_code != 200:
-        print 'failed to update context'
-        print response.text
+        print('failed to update context')
+        print(response.text)
 
                              
 if __name__ == '__main__':

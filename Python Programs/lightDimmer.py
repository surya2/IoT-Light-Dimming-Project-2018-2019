from firebase import firebase #import firebase library on Raspberry Pi
import serial  #import Raspberry Pi serial library to send data to Arduino
import time #import time library to make small delays

firebase = firebase.FirebaseApplication('https://basementautomation.firebaseio.com/') #HTTP GET request to database
ser = serial.Serial('/dev/ttyACM0',9600)    #Serial communication with Arduino


print("Hello World - Starting Program")

firstCenter = firebase.get('HomeTheater/Controls/center',None)  #Getting data from teh JSON text representation
print("Center Lights: " +   str(firstCenter))
firstCorner = firebase.get('HomeTheater/Controls/corner',None)
print("Corner Lights: " + str(firstCorner))
firstStrip = firebase.get('HomeTheater/Controls/strip',None)
print("Strip Lights: " + str(firstStrip))

firstCen = str(firstCenter)
m = str.encode(firstCen)
type(m)
ser.write(m)

"""def nextStep(center, corner, strip):
    centerNum = str(center)
    cornerNum = str(corner)
    stripNum = str(strip)
    if center != firstCenter:
        print('Change: ' + ' - ' + centerNum)"""


while True:
    center = firebase.get('HomeTheater/Controls/center',None)
    corner = firebase.get('HomeTheater/Controls/corner',None)
    strip = firebase.get('HomeTheater/Controls/strip',None)
    #nextStep(center, corner, strip)
 if center != firstCenter:    #If the is a change in the database, do the following below.                                      
        print('Change in Center Lights: ' + str(firstCenter) + ' - ' + str(center))
        firstCenter = center
        nextNum = 300 + int(center)
        string = str(nextNum)
        #time.sleep(5)
        message = str.encode(string)  #encode data into byte packet
        type(message)   #compress data
        ser.write(message)    #send data thrpough Serial port
        print("Sent")
        
#The Below Code is for future updates
    if corner != firstCorner:
        print('Change in Corner Lights: ' + str(firstCorner) + ' - ' + str(corner))
        firstCorner = corner
        if corner == 'OFF':
            string1 = "+"
            message = str.encode(string1)
            type(message)
            ser.write(message)
            print("off")
        if corner == 'ON+':
            string1 = "+"
            message = str.encode(string1)
            type(message)
            ser.write(message)
            print("on")

    if strip != firstStrip:
        print('Change in Strip Lights: ' + str(firstStrip) + ' - ' + str(strip))
        firstStrip = strip

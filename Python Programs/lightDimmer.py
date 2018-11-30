from firebase import firebase
import serial
import time

firebase = firebase.FirebaseApplication('https://basementautomation.firebaseio.com/')
ser = serial.Serial('/dev/ttyACM0', 9600)

print("Starting Program… ")

firstValue = firebase.get('HomeTheater/Controls/center', None)
print("First Intensity Value for Lights: " + str(firstValue))

while True:
  nextValue = firebase.get('HomeTheater/Controls/center', None)

  if nextValue != firstValue:
    print('Change in Light Brightness: ' + str(firstValue) + ' - ' + str(nextValue))
    firstValue = nextValue
    string = str(nextValue)
    message = str.encode(string)
    type(message)
    ser.write(message)
    print("Sent")

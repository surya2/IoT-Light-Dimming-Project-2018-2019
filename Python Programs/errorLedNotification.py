import RPi.GPIO as GPIO     #import Raspberry Pi hardware pins
import time                 #import time for delays
import os                   #import operating system functions
GPIO.setmode(GPIO.BCM)      
GPIO.setwarnings(False)
GPIO.setup(18,GPIO.OUT)     #look for pin 18 which is the pin that the led is connected to
print "LED on"            
GPIO.output(18,GPIO.HIGH)   #Turn the led on
time.sleep(1)               #Delay 1 sec
print "LED off"            
GPIO.output(18,GPIO.LOW)    #Turn the led off
state = os.stat('logs/cronlog').st_size==0      #read error message file called cronlog
if(state == False):                  #if cronlog's size is not equal to 0
    GPIO.output(18,GPIO.HIGH)        #Turn the led on - this is the notification

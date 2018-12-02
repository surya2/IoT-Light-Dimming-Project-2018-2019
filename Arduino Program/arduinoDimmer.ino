unsigned int i = 0;  //variable of unsigned integer data type called i set to 0
int pwmPin = 3;     //variable of integer data type called pwmPin set to pin 3
int zcPin = 2;       //variable of integer data type called zcPin set to pin 2
//char data;
int led = 8;        //variable of integer data type called led set to pin 8

int intensity;      //variable of integer data type called intensity set to a temporary null value

void setup()
{
    Serial.begin(9600);
    pinMode(pwmPin,OUTPUT);  //set pwmPin as an output device 
    pinMode(led, OUTPUT);    //set led as an output device    
    pinMode(zcPin, INPUT);   //set zcPin (zero-cross detector) as an input device
}


void loop() {
  if(Serial.available() > 0){   //if incoming data is detected, run the below code
    digitalWrite(led, HIGH);    //turn led on
    delay(500);                 //delay 500 milliseconds - half a second
    digitalWrite(led, LOW);     //turn led off
    intensity = 0;              //set intensity to 0
    while(Serial.available() > 0){     //If the value of the data is greater than 0, run code below

        intensity *= 10;                            //make intensity equal to its self times 10
        intensity += (Serial.read() - '0');        //Make variable 'data' equal to the value of the data packets
        delay(10);                                 //small delay
    }
  }
  i = intensity*2.55;          //set i equal to the value of intensity times 2.55

  dim(i);                     //go to the function called dim while passing the variable i with it 
  delay(1000);               //delay for smoothness

}

void dim(int x){                //function 'dim'
  int b = x;                    
  analogWrite(pwmPin, b);       //set light dimmer module equal to the value of x, which is equal to the value of i above
  Serial.println(b);
  if(Serial.available() > 0){   //if more incoming data is being received:
    return;                     //return to the beginning of the code to start over
  }
}



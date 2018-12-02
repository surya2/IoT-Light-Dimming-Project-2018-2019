unsigned int i = 0; 
int pwmPin = 11;
int zcPin = 2;
//char data;
boolean state;
int led = 8;

int intensity;

void setup()
{
    Serial.begin(9600);
    pinMode(3, OUTPUT);
    pinMode(pwmPin,OUTPUT);
    pinMode(led, OUTPUT);
    pinMode(pir, INPUT);
    pinMode(zcPin, INPUT);
    state = LOW;
}


void loop() {
  if(Serial.available() > 0){
    digitalWrite(led, HIGH);
    delay(500);
    digitalWrite(led, LOW);
    intensity = 0;
    while(Serial.available() > 0){     //If the value of the data is greater than 0:

        intensity *= 10;
        intensity += (Serial.read() - '0');        //Make variable 'data' equal to the value of the data packets
        delay(10);
    }
  }
  i = intensity*2.55;
  int ph = intensity;

  dim(i);
  delay(1000);

}

void dim(int x){
  int b = x;
  analogWrite(3, b);
  Serial.println(b);
  if(Serial.available() > 0){
    return;
  }
}



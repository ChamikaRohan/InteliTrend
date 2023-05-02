#include <Keypad.h>

const int sensorPin = A0; // Analog pin for sensor output
const float R0 = 76.63; // Sensor resistance in clean air
const float NH3Factor = 6.33; // Conversion factor for NH3 concentration
const float COFactor = 4.85; // Conversion factor for CO concentration
float baselineNH3 = 0; // Baseline NH3 concentration in ppm
float baselineCO = 0; // Baseline CO concentration in ppm

const byte ROWS = 1; // We only have one row
const byte COLS = 2; // We have two columns
char keys[ROWS][COLS] = {
  {'1', '2'}
};
byte rowPins[ROWS] = {6}; // Row pin is connected to pin 6
byte colPins[COLS] = {7, 8}; // Column pins are connected to pins 7 and 8
Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

void setup() {
  Serial.begin(9600);
}

void loop() {
  char key = keypad.getKey();
  if (key == '1') {
    float sensorValue = analogRead(sensorPin);
    float RS = (1023 - sensorValue) * 10 / sensorValue;
    float NH3Concentration = pow(10, NH3Factor * log10(RS / R0) - 2.758) - baselineNH3;
    Serial.print("NH3 concentration: ");
    Serial.print(NH3Concentration, 2); // Print 2 decimal places
    Serial.println(" ppm");
  }
  else if (key == '2') {
    float sensorValue = analogRead(sensorPin);
    float RS = (1023 - sensorValue) * 10 / sensorValue;
    float COConcentration = pow(10, COFactor * log10(RS / R0) - 1.830) - baselineCO;
    Serial.print("CO concentration: ");
    Serial.print(COConcentration, 2); // Print 2 decimal places
    Serial.println(" ppm");
  }
  delay(100);
}

import serial
import requests
import time
import cv2

ser = serial.Serial('/dev/arduino_fr', 9600, timeout=1)
url = "http://127.0.0.1:22123/capture"

try:
    while True:
        line = ser.readline().strip()
        print('Listening')

        if line:
            print('Triggered')
            response = requests.get(url)
            time.sleep(5)

except KeyboardInterrupt:
    ser.close()
    print("Serial port closed.")

# try:
#     while True:
#         print('Listening')
#         if cv2.waitKey(1) & 0xFF == 32:
#             print('Triggered')
#             response = requests.get(url)
#             # time.sleep(5)

# except KeyboardInterrupt:
#     ser.close()
#     print("Serial port closed.")


import os
import requests
import time

from flask import Flask
from process import Killer

app = Flask(__name__)

def get_directory_names(path='./TEMP'):
    try:
        entries = os.listdir(path)
        directories = [entry for entry in entries if os.path.isdir(os.path.join(path, entry))]

        return directories

    except FileNotFoundError:
        print(f"The specified path '{path}' was not found.")
        return []

# @app.get('/restart_app')
# def restart_app():
#     killer.kill_process()
#     killer.start_app()

#     return "Application restarted."

@app.get('/restart_app')
def restart_app():
    killer.kill_process()
    killer.start_app()

    time.sleep(3)

    try:
        for dir in get_directory_names():
            print(f"Deleting directory {dir}...")
            _ = requests.post(f"http://localhost:22123/delete/0")
    except Exception as e:
        print(f"Error deleting directories: {e}")

    return "Application restarted."

if __name__ == '__main__':
    killer = Killer()
    app.run(host='0.0.0.0', port=2125, debug=False)

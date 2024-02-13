#!/bin/bash

home_dir=$HOME
echo "Home directory: $home_dir"

# Start backend in a new terminal window
gnome-terminal --tab --title="TUTUP TERMINAL INI BUAT MATIIN SISTEM FRONT-UB" --command="bash -c 'cd /home/richo/AI/ai-ub-front-p2/backend; python3 front_ub_app.py; $SHELL'"

# Start listener in a new terminal window
gnome-terminal --tab --title="TUTUP TERMINAL INI BUAT MATIIN SISTEM FRONT-UB" --command="bash -c 'cd /home/richo/AI/ai-ub-front-p2/backend; python3 capture_button.py; $SHELL'"

# Start process in a new terminal window
gnome-terminal --tab --title="TUTUP TERMINAL INI BUAT MATIIN SISTEM FRONT-UB" --command="bash -c 'cd /home/richo/AI/ai-ub-front-p2/backend; python3 front_ub_process.py; $SHELL'"

# Start frontend in a new terminal window
gnome-terminal --title="JANGAN TUTUP INI, BISA BUAT MATI PROGRAM COBOT" --command="bash -c 'cd /home/richo/AI/ai-ub-front-p2/frontend; npm start; $SHELL'"

import subprocess
import psutil

class Killer:
    def kill_process(self):
        process_name = "bash"
        keywords = ["front_ub_app.py", "capture_button.py"]

        # Get the list of processes matching the process name
        cmd = ["pgrep", process_name]
        process_ids = subprocess.check_output(cmd, text=True).splitlines()

        # Iterate through the process IDs and check their command lines
        for pid in process_ids:
            print(f"Checking process with PID {pid}")
            try:
                # Get the command line associated with the process ID
                cmd_line_bytes = subprocess.check_output(["ps", "-p", pid, "-o", "args=", "--no-headers"])
                cmd_line = cmd_line_bytes.decode("utf-8").strip()
                for keyword in keywords: 
                    if keyword in cmd_line:
                        subprocess.run(["kill", pid])
                        print(f"Process with PID {pid} and command '{cmd_line}' killed.")
                    else:
                        print(f"Process with PID {pid} does not match the keyword.")
                # subprocess.run(["pkill", "chrome"])
            except subprocess.CalledProcessError as e:
                print(f"Error handling process with PID {pid}: {e}")

    # def kill_app(process_name="front_ub_app.py"):
    #     try:
    #         cmd = ["pgrep", process_name]
    #         process_ids = subprocess.check_output(cmd, text=True).splitlines()
    #     except subprocess.CalledProcessError as e:
    #         print(f"Error getting process IDs: {e}")
    #         process_ids = []

    #     for pid_str in process_ids:
    #         pid = int(pid_str)
    #         print(f"Terminating process {pid} - {process_name}")
    #         try:
    #             psutil.Process(pid).terminate()
    #         except psutil.NoSuchProcess as e:
    #             print(f"Error terminating process: {e}")
    
    # def start_backend(self):
    #     try:
    #         # Execute first command
    #         cmd1 = "/home/pc/AI/front-ub_new/backend/front_ub_app.py"
    #         p1 = subprocess.Popen(cmd1, stdout=subprocess.PIPE, shell=True)
    #         p1.communicate()  # Wait for the process to complete
    #         print("Front UB App started.")

    #         # Execute second command
    #         # cmd2 = "/home/pc/AI/front-ub_new/backend/capture_button.py"
    #         # p2 = subprocess.Popen(cmd2, stdout=subprocess.PIPE, shell=True)
    #         # p2.communicate()  # Wait for the process to complete
    #         # print("Capture Button started.")

    #         print("Applications started.")
    #     except subprocess.CalledProcessError as e:
    #         print(f"Error starting applications: {e}")

    def start_app(self):
        cmd = "sh /home/richo/AI/ai-ub-front-p2/backend/start_app.sh"
        try:
            p = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
            print("Application started.")
        except subprocess.CalledProcessError as e:
            print(f"Error starting application: {e}")
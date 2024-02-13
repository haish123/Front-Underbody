import numpy as np 
import glob
import cv2
import datetime
import os

from ultralytics.utils.plotting import Annotator, colors
from PIL import Image

from camera import Camera

folder_tracebility = 'TRACEBILITY_IMAGES'

variant_df = {
    "00" : "TEST",
    "21" : "VELOZ",
    "20" : "VELOZ",
    "90" : "YARIS CROSS",
    "40" : "CALYA",
    "41" : "CALYA",
    "05" : "YARIS"
}

def saveImageCapture(*args, variant, suffix_no, camera_idx, qr):

    timestamp = datetime.datetime.now()
    date = timestamp.strftime("%y-%m-%d")

    folder_vehicle_trace = f'{folder_tracebility}/{date}/{camera_idx}/{variant}'
    folder_vehicle_check_trace = os.path.exists(folder_vehicle_trace)

    if folder_vehicle_check_trace == False:
        os.makedirs(folder_vehicle_trace)


    frame_bgr2rgb = [cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) for frame in args]

    folder_vehicle_glob = glob.glob(f'{folder_vehicle_trace}/*jpeg')

    seq_vehicle  = len(folder_vehicle_glob)

    images = [Image.fromarray(np.array(x)) for x in frame_bgr2rgb]

    for im in images:
        im.save(r'{}/{}/{}/{}/{}_{}_{}_{}.jpeg'.format(folder_tracebility, date, camera_idx, variant, qr, variant, suffix_no, seq_vehicle))

def initialize_camera(cam_config, program_config, cv_backend):
    camera = {}
    camera_indexes = []

    print("Initializing Camera ...")

    for i in cam_config:
        cap = Camera(i, cam_config[i], cv_backend)

        if cap.isOpened():
            camera_indexes.append(i)
            camera[i] = cap

        if program_config["release_cam"]:
            cap.release_camera()

    print(f"Available cameras: {camera_indexes}")
    print(f'Camera test {camera}')

    return camera, camera_indexes

def get_key_value_by_substring(dictionary, substring):
    for k, v in dictionary.items():
        if substring in k:
            return k, v
    return None, None

# def inference_frame(uuid, model, conf, img_size):
#         total_inf_res = {}
#         specs_exist = []
#         try:
#             p = './TEMP'
#             directory = os.walk(f"{p}/{uuid}")
#             for _, _, files in directory:
#                 for file in files:
#                     print(f'yang infernce dulu {file}')
#                     image = cv2.imread(f"{p}/{uuid}/{file}")
#                     res_one_cam = _inference_frame(image, model, conf, img_size)

#                     for r in res_one_cam:
#                         spec = r.split('-')
#                         if spec[1][:2]=='RH' or spec[1][:2]=='LH':
#                             spec = r.split(':')
#                         if spec[0] not in specs_exist:
#                             total_inf_res[r] = res_one_cam[r]
#                             specs_exist.append(spec[0])
#                         else:
#                             k, v = get_key_value_by_substring(total_inf_res, spec[0])
#                             if total_inf_res[k]<res_one_cam[r]:
#                                 total_inf_res[r] = res_one_cam[r]
#                                 del total_inf_res[k]
#             return total_inf_res
#         except Exception as x:
#             print(x)



# def inference_frame(uuid, model, conf, img_size):
#         total_inf_res = {}
#         try:
#             p = './TEMP'
#             directory = os.walk(f"{p}/{uuid}")
#             for _, _, files in directory:
#                 for file in files:
#                     image = cv2.imread(f"{p}/{uuid}/{file}")
#                     res_one_cam = _inference_frame(image, model, conf, img_size)

#                     for r in res_one_cam:
#                         if r not in total_inf_res:
#                             total_inf_res[r] = res_one_cam[r]
#                         else:
#                             total_inf_res[r] = max(total_inf_res[r], res_one_cam[r])
#             return total_inf_res
#         except Exception as x:
#             print(x)

def inference_frame(uuid, model, conf, img_size):
    total_inf_res = {}
    specs_exist = []
    try:
        p = './TEMP'
        directory = os.walk(f"{p}/{uuid}")
        
        # Get the list of files and sort them numerically
        _, _, files = next(directory)
        files = sorted(files, key=lambda x: int(x.split('.')[0]))

        for file in files:
            print(f'yang infernce dulu {file}')
            image = cv2.imread(f"{p}/{uuid}/{file}")
            res_one_cam = _inference_frame(image, model, conf, img_size)

            for r in res_one_cam:
                spec = r.split('-')
                if spec[1][:2] == 'RH' or spec[1][:2] == 'LH':
                    spec = r.split(':')
                if spec[0] not in specs_exist:
                    total_inf_res[r] = res_one_cam[r]
                    specs_exist.append(spec[0])
                else:
                    k, v = get_key_value_by_substring(total_inf_res, spec[0])
                    if total_inf_res[k] < res_one_cam[r]:
                        total_inf_res[r] = res_one_cam[r]
                        del total_inf_res[k]
        return total_inf_res
    except Exception as x:
        print(x)

def _inference_frame(frame, model, conf, img_size):
    try:
        inf_frame = frame
        result = model(
            inf_frame, verbose=False, conf=conf, imgsz=img_size
        )
        inf_res = _draw_label(inf_frame, model, result)
        _save_inferenced_frame(inf_frame)
        
        return inf_res
    except Exception as e:
        print(e)
        raise Exception(e)
    
def _draw_label(frame, model, result):
    detected_res = {}

    for r in result:
        annotator = Annotator(frame, line_width=1)

        boxes = r.boxes
        for box in boxes:
            b = box.xyxy[0]
            c = box.cls

            key = model.names[int(c)]
            probs = box.conf[0].item()
            
            if key not in detected_res:
                detected_res[key] = probs
            else:
                if probs > detected_res[key]:
                    detected_res[key] = probs

            annotator.box_label(
                b,
                model.names[int(c)] + str(round(box.conf[0].item(), 2)),
                color=colors(c, True),
            )

    return detected_res
    
def _save_inferenced_frame(frame):
    if not os.path.exists('./INFERENCED_IMAGES'):
        os.makedirs('./INFERENCED_IMAGES')
        
    files_count = len(os.listdir('./INFERENCED_IMAGES'))
    cv2.imwrite("./INFERENCED_IMAGES/"+'fr_'+str(files_count)+'.jpg', frame)

def get_newest_files(directory, num_files=5):
    files = glob.glob(os.path.join(directory, '*'))
    files.sort(key=os.path.getmtime, reverse=True)
    # return files[:num_files]
    return files[:num_files][::-1]


def get_key_value_pairs_with_substring(dictionary, substring):
    # Use a dictionary comprehension to filter key-value pairs
    filtered_pairs = [key for key, value in dictionary.items() if substring in key]
    return filtered_pairs

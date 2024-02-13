import React from "react";

function ImageList({ index, imageList, DeleteResults }) {
    if (imageList.length > 0) {
        return (
            <div>
                <div className="flex flex-row my-2">
                    <div className="grid grid-cols-4 text-white w-full ml-4">
                        {imageList?.map((image, index) => (
                            <div index={index} className="flex flex-col">
                                <img
                                    className="m-1 rounded-lg"
                                    src={image}
                                    alt="camera"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row justify-end">
                        <button 
                            className="text-white font-bold py-2 px-4 rounded mx-3"
                            onClick={() => DeleteResults(index)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="w-full border-b-2 border-white"></div>
            </div>
        );
    }
}

export default ImageList;

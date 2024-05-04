import React, { FormEvent, useEffect, useState } from "react";
import Video from "./types/Video";
import VideoModal from "./components/VideoModal";

function App() {
    const [text, setText] = useState<string>("");
    const [list, setList] = useState<Video[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    const fetchElements = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/videos`)
            .then((res) => res.json())
            .then((data: { data: Video[] }) => {
                setList(data.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(fetchElements, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            url: text,
        };

        const options = {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        fetch(`${import.meta.env.VITE_API_URL}/api/videos`, options)
            .then((res) => res.json())
            .then((data: { video: Video }) => {
                console.log(data);
                setList([...list, data.video]);
            })
            .catch((err) => console.log(err));

        setText("");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleDelete = (index: number) => {
        setShowConfirmation(true);
        setDeleteIndex(index);
    };

    const confirmDelete = () => {
        if (deleteIndex !== null) {
            const id = list[deleteIndex]._id;

            fetch(`${import.meta.env.VITE_API_URL}/api/videos/${id}`, {
                method: "DELETE",
            });

            const newList = [...list];
            newList.splice(deleteIndex, 1);
            setList(newList);
            setShowConfirmation(false);
        }
    };

    const closeModal = () => {
        setSelectedVideo(null);
        setShowModal(false);
    };

    const openModal = (video: Video) => {
        setSelectedVideo(video);
        setShowModal(true);
    };

    return (
        <main className="flex flex-col items-center justify-start min-h-screen bg-gray-100 py-4">
            <h1 className="text-3xl font-bold mb-8">Añadir nuevo vídeo</h1>
            <form onSubmit={handleSubmit} className="flex items-center w-1/2">
                <input
                    className="w-3/4 px-4 py-2 border border-gray-300 rounded rounded-r-none focus:outline-none"
                    type="text"
                    placeholder="Introduzca aquí la URL del vídeo"
                    value={text}
                    onChange={handleChange}
                />
                <button
                    className="w-1/4 px-4 py-2 bg-blue-500 text-white rounded rounded-l-none hover:bg-blue-600 focus:outline-none"
                    type="submit"
                >
                    Añadir
                </button>
            </form>

            <div className="grid grid-cols-3 gap-4 mt-8 w-1/2">
                {list.map((video, index) => (
                    <div key={index} className="relative">
    <img
        src={video.thumbnail}
        alt="Thumbnail"
        className="w-full h-full cursor-pointer"
        onClick={() => openModal(video)}
    />

    <button
        type="button"
        className="absolute top-2 right-2 bg-black rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        onClick={() => handleDelete(index)}
    >
        <span className="sr-only">Close menu</span>
        <svg
            className="h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    </button>
</div>
                ))}
            </div>

            {showModal && (
                <VideoModal video={selectedVideo} close={closeModal} />
            )}

            {showConfirmation && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        <p className="text-lg font-bold">
                            ¿Seguro que quieres eliminar este video?
                        </p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="bg-gray-400 text-gray-800 px-4 py-2 rounded mr-4 hover:bg-gray-500 hover:text-white focus:outline-none"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default App;

import Video from "../types/Video";

interface Props {
    video: Video | null;
    close: () => void;
}

const getIdFromURL = (url: string) => {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
};

export default function VideoModal({ video, close }: Props) {
    if (video == null) return video;

    return (
<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
  <div className="relative flex flex-col items-center bg-white p-8 rounded-lg w-1/2 max-h-full overflow-y-auto">
    <iframe
      className="w-3/4 h-60"
      src={`https://www.youtube.com/embed/${getIdFromURL(video!.url)}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
    <div className="flex flex-col items-center justify-center text-center justify-between">
      <div>
        <h2 className="text-xl font-bold mt-4">{video!.title}</h2>
        <div className="mt-2 overflow-y-auto max-h-24">
          <p className="w-full">{video!.description}</p>
        </div>
      </div>
      <button
        type="button"
        className="absolute top-0 right-0 bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        onClick={close}
      >
        <span className="sr-only">Close menu</span>
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</div>

    );
}

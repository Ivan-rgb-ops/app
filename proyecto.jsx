import { useState, useEffect } from "react";
import { FaYoutube, FaDownload } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { BiError } from "react-icons/bi";
import { BsSun, BsMoon } from "react-icons/bs";

const YouTubeDownloader = () => {
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [recentDownloads, setRecentDownloads] = useState([]);

  const validateYouTubeUrl = (url) => {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return pattern.test(url);
  };

  useEffect(() => {
    setIsValid(validateYouTubeUrl(url));
  }, [url]);

  const handleDownload = async () => {
    if (!isValid) return;

    setIsLoading(true);
    setStatus("Processing...");

    try {
      // Simulated download process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setStatus("Download completed!");
      setRecentDownloads([...recentDownloads, url].slice(-5));
      setUrl("");
    } catch (error) {
      setStatus("Download failed. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? <BsSun size={24} /> : <BsMoon size={24} />}
          </button>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <FaYoutube className="text-red-600 text-6xl" />
            <h1 className="text-3xl font-bold ml-4">YouTube MP3 Downloader</h1>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube video link here"
                className={`w-full px-4 py-3 rounded-lg border ${isValid ? "border-green-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
              />
              {url && !isValid && (
                <div className="absolute -bottom-6 left-0 text-red-500 text-sm flex items-center">
                  <BiError className="mr-1" /> Invalid YouTube URL format
                </div>
              )}
            </div>

            <button
              onClick={handleDownload}
              disabled={!isValid || isLoading}
              className={`px-6 py-3 rounded-lg flex items-center justify-center space-x-2 w-full md:w-auto mx-auto
                ${isValid && !isLoading ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}
                text-white font-semibold transition-colors duration-300`}
            >
              {isLoading ? (
                <ImSpinner8 className="animate-spin text-xl" />
              ) : (
                <>
                  <FaDownload />
                  <span>Download MP3</span>
                </>
              )}
            </button>

            {status && (
              <div className={`text-center font-medium ${status.includes("failed") ? "text-red-500" : "text-green-500"}`}>
                {status}
              </div>
            )}

            {recentDownloads.length > 0 && (
              <div className={`mt-12 p-6 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white shadow-lg"}`}>
                <h2 className="text-xl font-semibold mb-4">Recent Downloads</h2>
                <ul className="space-y-2">
                  {recentDownloads.map((download, index) => (
                    <li
                      key={index}
                      className={`p-3 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-50"} truncate`}
                    >
                      {download}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeDownloader;
import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../modules/firebase-modules/firestore"; // Ensure this points to your Firebase config
import { useParams } from "react-router-dom";

const AlbumPage = () => {
  const { items } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const docRef = doc(db, "albums", items); 
        const imageData = (await getDoc(docRef)).data();
        console.log(imageData.images);
        
        // Shuffle the images
        setImages(imageData.images);
        setLoading(false)
        
        // Fisher-Yates Shuffle Function
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1)); // Random index
                [array[i], array[j]] = [array[j], array[i]]; // Swap elements
            }
            return array;
        }
        
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [items]);

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
{!loading?    (<div className="p-6">
      <div className="md:columns-4 columns-2">
        {images.map((img, index) => (
          <div key={index} className="grid gap-4 py-2">
              <div key={index} onClick={() => handleImageClick(img)}>
                <img
                  className="skeleton-loading md:min-w-1/4 min-h-[10rem] h-auto max-w-full rounded-lg cursor-pointer"
                  src={img}
                  loading="lazy"
                  alt={`Image ${index + 1}`}
                />
              </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on image click
          >
            <img
              className="max-w-full max-h-screen object-contain"
              src={selectedImage}
              alt="Selected"
            />
            <button
              className="absolute top-0 right-0 text-white text-2xl font-bold p-4"
              onClick={handleCloseModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>): ( <section className="grid columns-4">
      Loading..
      <div className="skeleton-loading md:w-1/4 min-h-[10rem] h-auto max-w-full rounded-lg cursor-pointer">
        
      </div>
      <div className="skeleton-loading md:w-1/4 min-h-[10rem] h-auto max-w-full rounded-lg cursor-pointer">
        
      </div>
      <div className="skeleton-loading md:w-1/4 min-h-[10rem] h-auto max-w-full rounded-lg cursor-pointer">
        
      </div>
      <div className="skeleton-loading md:w-1/4 min-h-[10rem] h-auto max-w-full rounded-lg cursor-pointer">
        
      </div>
      <div className="skeleton-loading md:w-1/4 min-h-[10rem] h-auto max-w-full rounded-lg cursor-pointer">
        
      </div>
      <div className="skeleton-loading md:w-1/4 min-h-[10rem] h-auto max-w-full rounded-lg cursor-pointer">
        
      </div>
    </section>
    )}
    </>
  );
};

export default AlbumPage;

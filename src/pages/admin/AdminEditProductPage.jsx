import { db } from "../../modules/firebase-modules/firestore.js";
import ImageDropZone from "../../components/admin/ImageDropZone";
import TiptapEditor from "../../components/admin/TiptapEditor";
import ProductCard from "../../components/ProductCard.jsx";
import placeholderImg from "../../assets/placeholder-image-icon.webp";
import ProductPagePreview from "../../components/admin/ProductPagePreview.jsx";
import { MdOutlineArchive } from "react-icons/md";
import "rsuite/TagInput/styles/index.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { TagsInput } from "react-tag-input-component";
import InputField from "../../components/InputField.jsx";
import Swal from "sweetalert2";
import storage from "../../modules/firebase-modules/firestorage.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { GoGoal } from "react-icons/go";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getDocument } from "../../modules/firebase-modules/firestore";
import { GrUpdate } from "react-icons/gr";
import DatePicker from "../../components/DatePicker.jsx";
import { v4 as uuidv4 } from "uuid";

const AdminEditProductPage = () => {
  const navigate = useNavigate();
  const [isTitleAlreadyExisting, setIsTitleAlreadyExisting] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [primaryImg, setPrimaryImg] = useState(null);
  const [primaryImgBlob, setPrimaryImgBlob] = useState(null);
  const [initialPrimaryImg, setInitialPrimaryImg] = useState(null);
  const [initialSecondary1Img, setInitialSecondary1Img] = useState(null);
  const [initialSecondary2Img, setInitialSecondary2Img] = useState(null);
  const [secondary1Img, setSecondary1Img] = useState(null);
  const [secondary2Img, setSecondary2Img] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [comparePrice, setComparePrice] = useState(0);
  const [shippingFees, setShippingFees] = useState(300);
  const [discountExpiryDate, setDiscountExpiryDate] = useState(null);
  const [descriptionHtml, setDescriptionHtml] = useState("");
  const [initialHtml, setInitialHtml] = useState("");
  const [tags, setTags] = useState([]);
  const [productSavingType, setProductSavingType] = useState("publish");
  const [selectedTags, setSelectedTags] = useState([]);
  const FormRef = useRef(null);
  const [docId, setDocId] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [publishingMsg, setPublishingMsg] = useState("Publishing..");
  const placeholderImg =
    "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984";
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState({
    title: "Loading...",
    primaryImg:
      "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
    secondary_img_1:
      "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
    secondary_img_2:
      "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
    description: "Loading description...",
    price: "0.00",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id: productId } = useParams();
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const product = await getDocument("Products", productId);
        setData(product);
        console.log(product);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchDocument();
  }, [productId]);

  const [variants, setVariants] = useState([
    { name: "Default Variant", price: "", comparePrice: "" },
  ]);

  useEffect(() => {
    const updatedVariants = [...variants];
    updatedVariants[0].price = price;
    updatedVariants[0].comparePrice = comparePrice;
    console.log(updatedVariants);
  }, [price, comparePrice]);
  useEffect(() => {
    if (data && data.variants && data.variants.length > 1) {
      setVariants(data.variants);
    }
    if (data && data.tags && data.tags.length > 0) {
      console.log(data.tags);

      setSelectedTags(data.tags);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setTitle(data.title || ""); // Provide a default value if data.title is undefined
      setSubTitle(data.subTitle || "");
      setComparePrice(data.comparePrice || 0);
      setDescriptionHtml(data.descriptionHtml || "");
      setInitialHtml(data.descriptionHtml || "");
      setPrice(data.price || 0);
      setShippingFees(data.shippingFees);
      setDiscountExpiryDate(data.discountExpiryDate || null);
      // setSelectedTags(data.tags || []);
    }
    (async () => {
      console.log;
      if (data.primaryImg) {
        const primaryImgFile = await fileFromUrl(data.primaryImg, "primaryImg");
        setPrimaryImg(primaryImgFile);
        setInitialPrimaryImg(primaryImgFile);
      }
      if (data.secondary1Img) {
        const secondary1ImgFile = await fileFromUrl(
          data.secondary1Img,
          "secondary1Img"
        );
        setSecondary1Img(secondary1ImgFile);
        setInitialSecondary1Img(secondary1ImgFile);
      }
      if (data.secondary2Img) {
        const secondary2ImgFile = await fileFromUrl(
          data.secondary2Img,
          "secondary1Img"
        );
        setSecondary2Img(secondary2ImgFile);
        setInitialSecondary2Img(secondary2ImgFile);
      }
    })();
  }, [data]);

  async function fileFromUrl(url, fileName) {
    // Fetch the file data from the URL
    const response = await fetch(url);

    // Convert the response to a Blob
    const blob = await response.blob();

    // Create a File object from the Blob
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  }

  useEffect(() => {
    setDocId(title.toLowerCase().replace(/ /g, "-"));
    const checkForExistence = async () => {
      if (title.length) {
        try {
          if (title.toLowerCase().replace(/ /g, "-") == productId) return;
          const docRef = doc(
            db,
            "Products",
            title.toLowerCase().replace(/ /g, "-")
          ); // Specify the collection and document ID
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setIsTitleAlreadyExisting(true);
          } else {
            setIsTitleAlreadyExisting(false);
          }
        } catch (error) {
          console.error("Error checking document:", error);
        }
      } else {
        setIsTitleAlreadyExisting(false);
      }
    };
    checkForExistence();
  }, [title]);

  useEffect(() => {
    // Update the price of the default variant when `price` changes
    setVariants((prevVariants) => {
      const updatedVariants = [...prevVariants];
      updatedVariants[0].price = price;
      updatedVariants[0].comparePrice = comparePrice;
      return updatedVariants;
    });
  }, [price]);

  const [openTab, setOpenTab] = useState(1);

  const uploadImage = async (file, oldFileUrl) => {
    try {
      const uid = uuidv4();
      // Create a reference to the file in Firebase Storage
      const storageRef = ref(storage, `images/${uid}`);

      // If there's an old file URL, delete the old file
      if (oldFileUrl) {
        const oldFileRef = ref(storage, oldFileUrl);
        try {
          await deleteObject(oldFileRef);
          console.log(`Old file deleted: ${oldFileUrl}`);
        } catch (error) {
          console.error("Error deleting old file:", error);
        }
      }

      // Create an image element and canvas for resizing
      const img = document.createElement("img");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      return new Promise((resolve, reject) => {
        img.onload = async () => {
          // Upload the original image
          await uploadBytes(storageRef, file);
          const originalUrl = await getDownloadURL(storageRef);

          // Resize and upload thumbnails
          const sizes = [200, 400, 800];
          const thumbnailUrls = [];

          for (const size of sizes) {
            canvas.width = size;
            canvas.height = size;
            ctx.drawImage(img, 0, 0, size, size);

            // Convert canvas to blob
            canvas.toBlob(async (blob) => {
              try {
                const thumbnailRef = ref(
                  storage,
                  `thumbnails/${size}_${file.name}`
                );
                await uploadBytes(thumbnailRef, blob);
                const thumbnailUrl = await getDownloadURL(thumbnailRef);
                thumbnailUrls.push({ size, url: thumbnailUrl });

                // Resolve when all thumbnails are processed
                if (thumbnailUrls.length === sizes.length) {
                  resolve({ originalUrl, thumbnails: thumbnailUrls });
                }
              } catch (error) {
                console.error("Error uploading thumbnail:", error);
                reject(error);
              }
            }, "image/jpeg");
          }

          // Handle case where no thumbnails are generated
          if (sizes.length === 0) {
            resolve({ originalUrl, thumbnails: [] });
          }
        };

        img.onerror = (error) => {
          console.error("Error loading image:", error);
          reject(error);
        };

        img.src = URL.createObjectURL(file);
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await uploadImage(file);
    }
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        name: `${variants.length + 1} Variant Name `,
        price: 0,
        comparePrice: 0,
      },
    ]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index, key, value) => {
    setVariants((prevVariants) => {
      const updatedVariants = [...prevVariants];
      updatedVariants[index][key] = value;
      return updatedVariants;
    });
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setPublishing(true);
    setPublishingMsg("Getting Updated Data..");
    console.log("primary img updated", initialPrimaryImg !== primaryImg);
    console.log(
      "secondary 1 img updated",
      initialSecondary1Img !== secondary1Img
    );
    console.log(
      "secondary 2 img updated",
      initialSecondary2Img !== secondary2Img
    );
    const primaryImgUpdated =
      initialPrimaryImg === primaryImg
        ? data.primaryImg
        : await uploadImage(primaryImg, data.primaryImg);

    const secondary1ImgUpdated =
      initialSecondary1Img === secondary1Img
        ? data.secondary1Img
        : await uploadImage(secondary1Img, data.secondary1Img);

    const secondary2ImgUpdated =
      initialSecondary2Img === secondary2Img
        ? data.secondary2Img
        : await uploadImage(secondary2Img, data.secondary2Img);
    console.log(discountExpiryDate);
    const updatedData = {
      title,
      subTitle,
      descriptionHtml,
      price,
      comparePrice,
      discountExpiryDate,
      createdAt: data.createdAt,
      shippingFees,
      tags: data.tags,
      variants,
      primaryImg:
        primaryImg === initialPrimaryImg
          ? data.primaryImg
          : primaryImgUpdated.originalUrl,
      primaryImgThumbnails:
        primaryImg === initialPrimaryImg
          ? data.primaryImgThumbnails
          : primaryImgUpdated.thumbnails,
      secondary1Img:
        secondary1Img === initialSecondary1Img
          ? data.secondary1Img
          : secondary1ImgUpdated.originalUrl,
      secondary1ImgThumbnails:
        secondary1Img === initialSecondary1Img
          ? data.secondary1ImgThumbnails
          : secondary1ImgUpdated.thumbnails,
      secondary2Img:
        secondary2Img === initialSecondary2Img
          ? data.secondary2Img
          : secondary2ImgUpdated.originalUrl,
      secondary2ImgThumbnails:
        secondary2Img === initialSecondary2Img
          ? data.secondary2ImgThumbnails
          : secondary2ImgUpdated.thumbnails,
    };
    const docId =
      updatedData.title == data.title
        ? productId
        : title.toLowerCase().replace(/ /g, "-");
    console.log(updatedData);
    console.log("Primary Image Updated:", primaryImgUpdated);
    console.log("Updated Data:", updatedData);

    try {
      setPublishingMsg("Connecting to database..");
      const collectionName = "Products";
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, updatedData);
      setPublishingMsg("All Set !!");
      Swal.fire({
        text: "Product Updated",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "View Products",
        cancelButtonText: "Add a new Product",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/admin/products");
        } else {
          window.location.reload();
        }
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      setPublishing(false);
      toast.error("something went wrong!!");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Prevent form submission when Enter is pressed
      event.preventDefault();
    }
  };

  return (
    <>
      {publishing && (
        <div className="w-full h-screen fixed z-30 inset-0 bg-white flex items-center justify-center flex-col">
          <h1 className="text-black z-50 text-2xl">Updating Product</h1>
          <img
            src="https://cdnb.artstation.com/p/assets/images/images/028/712/381/original/tim-gilardi-bunny-loading-animation3.gif?1595286299"
            className="w-1/2 md:w-[15rem] mx-auto my-5"
            alt="Loading.."
          />
          <p>{publishingMsg}</p>
        </div>
      )}

      {!isLoading && (
        <main className="py-16 px-4 md:w-[80vw] w-screen p-4">
          <div className="w-full flex flex-col justify-center items-center mb-16">
            <h1 className="text-4xl text-left text-gray-800 ">
              Edit Details of the product
            </h1>
            <h3 className="text-xl text-left  text-gray-800 ">
              Edit any details you like and hit update
            </h3>
          </div>

          <section className="md:flex ">
            <form
              className="md:w-1/2 w-full md:px-10"
              onSubmit={handleFormSubmission}
              ref={FormRef}
              onKeyDown={handleKeyDown}
            >
              <div className="flex flex-col gap-4 ">
                <ImageDropZone
                  storeFileToUpload={setPrimaryImg}
                  displayImg={data.primaryImg}
                />
                <div className="w-full grid grid-cols-2 gap-4">
                  <ImageDropZone
                    storeFileToUpload={setSecondary1Img}
                    className={"w-1/2"}
                    displayImg={data.secondary1Img}
                  />
                  <ImageDropZone
                    storeFileToUpload={setSecondary2Img}
                    displayImg={data.secondary2Img}
                    className={"w-1/2"}
                  />
                </div>
                <InputField
                  inputName={"Title"}
                  inputType="text"
                  valueReturner={setTitle}
                  requiredInput={true}
                  inputValue={title}
                />

                <InputField
                  inputName={"Sub title (optional)"}
                  inputType="text"
                  valueReturner={setSubTitle}
                  requiredInput={false}
                  inputValue={subTitle}
                />

                <InputField
                  inputName={"Price"}
                  inputType="number"
                  valueReturner={setPrice}
                  requiredInput={true}
                  inputValue={price}
                />

                <InputField
                  inputName={"Compared Price (optional)"}
                  inputType="number"
                  valueReturner={setComparePrice}
                  requiredInput={false}
                  inputValue={comparePrice}
                />

                <DatePicker
                  dateReturner={setDiscountExpiryDate}
                  mode="datetime"
                  label="Discount Expire Time (optional - no expiry by default)"
                  initialDate={data.discountExpiryDate}
                />

                <InputField
                  inputName={"Shipping Fees"}
                  inputType="number"
                  valueReturner={setShippingFees}
                  requiredInput={true}
                  inputValue={shippingFees}
                />

                <div className="max-w-full">
                  <TiptapEditor
                    updateHtml={setDescriptionHtml}
                    initialHtml={initialHtml}
                  />
                </div>

                {/* Variants Management */}
                <div className="mt-6">
                  <h4 className="text-left text-lg">Add Variants:</h4>
                  <br />
                  <div className="flex py-3  border rounded-md border-b-0 items-center justify-between">
                    <p className=" font-semibold">Variant Name</p>
                    <p className=" font-semibold">Price</p>
                    <p className=" font-semibold">Compared Price</p>
                    <button
                      className={`p-2 bg-blue-500 text-white rounded-md `}
                      onClick={() => {
                        addVariant();
                      }}
                      type="button"
                    >
                      Add Variant
                    </button>
                  </div>
                  {variants.map((variant, index) => (
                    <div key={index} className="mb-4 p-4 border rounded-md">
                      <div className="flex items-center mb-2">
                        <input
                          type="text"
                          placeholder="Variant Name"
                          className="w-1/3 mr-2 p-2 border rounded-md"
                          value={variant.name}
                          onChange={(e) =>
                            updateVariant(index, "name", e.target.value)
                          }
                        />
                        <input
                          type="number"
                          placeholder="Price"
                          className="w-1/3 mr-2 p-2 border rounded-md"
                          {...(index == 0
                            ? { value: price, readOnly: true }
                            : { value: variant.price })}
                          onChange={(e) =>
                            updateVariant(
                              index,
                              "price",
                              parseFloat(e.target.value) || 0
                            )
                          }
                        />
                        <input
                          type="number"
                          placeholder="Compared Price (optional)"
                          className="w-1/3 mr-2 p-2 border rounded-md"
                          {...(index == 0
                            ? { value: comparePrice, readOnly: true }
                            : { value: variant.comparePrice })}
                          onChange={(e) =>
                            updateVariant(
                              index,
                              "comparePrice",
                              parseFloat(e.target.value) || 0
                            )
                          }
                        />
                        <button
                          {...(index == 0 ? { disabled: true } : {})}
                          className={`p-2 bg-red-500 text-white rounded-md ${
                            index == 0
                              ? "bg-red-200 cursor-not-allowed"
                              : "bg-red-500"
                          }`}
                          type="button"
                          onClick={() => {
                            if (index !== 0) {
                              removeVariant(index);
                            }
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-end gap-4 my-4 text-left flex-col ">
                    <div className="flex w-full items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="-mt-px h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p>
                        Default Variants Price is the default price of the
                        product.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <TagsInput
                  value={data.tags}
                  onChange={(tags) => {
                    if (tags) {
                      const processedTags = tags
                        .filter((tag) => typeof tag === "string") // Ensure only strings are processed
                        .map((tag) => tag.toLowerCase());
                      data.tags = processedTags;
                    }
                  }}
                  name="tags"
                  placeHolder="Enter Tags"
                  separators={["Enter", ",", " "]}
                />
                <em className="text-left">
                  Add tags to show them in relevant collections{" "}
                </em>
              </div>

              <div className="my-10 gap-4 flex ">
                <button
                  className="w-full justify-center align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
                  type="submit"
                  onClick={() => {
                    setProductSavingType("publish");
                  }}
                >
                  <GrUpdate className="text-2xl" />
                  Update Changes
                </button>
              </div>
            </form>

            <div className="md:w-1/2 md:m-0 my-10">
              <div className="md:sticky top-8 max-w-full">
                <div className="p-8 w-full">
                  <div className=" mx-auto">
                    <div className="mb-4 flex space-x-4 p-2 bg-white rounded-lg shadow-md">
                      <button
                        onClick={() => setOpenTab(1)}
                        className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                          openTab === 1 ? "bg-blue-600 text-white" : ""
                        }`}
                      >
                        Card Preview
                      </button>
                      <button
                        onClick={() => setOpenTab(2)}
                        className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                          openTab === 2 ? "bg-blue-600 text-white" : ""
                        }`}
                      >
                        Page Preview
                      </button>
                      <button
                        onClick={() => setOpenTab(3)}
                        className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                          openTab === 3 ? "bg-blue-600 text-white" : ""
                        }`}
                      >
                        Section 3
                      </button>
                    </div>

                    {openTab === 1 && (
                      <div className="w-full">
                        <ProductCard
                          className={"min-w-[20rem]"}
                          title={title ? title : "Product Name"}
                          price={price ? price : 100}
                          image1={
                            !isLoading && primaryImg == initialPrimaryImg
                              ? data.primaryImg
                              : URL.createObjectURL(primaryImg)
                          }
                          comparedPrice={comparePrice}
                        />
                      </div>
                    )}

                    {openTab === 2 && (
                      <ProductPagePreview
                        title={title ? title : "Product Name"}
                        price={price ? price : 100}
                        primaryImg={
                          !isLoading && primaryImg == initialPrimaryImg
                            ? data.primaryImg
                            : URL.createObjectURL(primaryImg)
                        }
                        comparedPrice={comparePrice ? comparePrice : 200}
                        secondary1Img={
                          !isLoading && secondary1Img == initialSecondary1Img
                            ? data.secondary1Img
                            : URL.createObjectURL(secondary1Img)
                        }
                        secondary2Img={
                          !isLoading && secondary2Img == initialSecondary2Img
                            ? data.secondary2Img
                            : URL.createObjectURL(secondary2Img)
                        }
                        descriptionHtml={descriptionHtml}
                        variants={variants}
                      />
                    )}

                    {openTab === 3 && (
                      <div className="transition-all duration-300 bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600">
                        <h2 className="text-2xl font-semibold mb-2 text-blue-600">
                          Section 3 Content
                        </h2>
                        <p className="text-gray-700">
                          Fusce hendrerit urna vel tortor luctus, nec tristique
                          odio tincidunt. Vestibulum ante ipsum primis in
                          faucibus orci luctus et ultrices posuere cubilia
                          Curae.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default AdminEditProductPage;

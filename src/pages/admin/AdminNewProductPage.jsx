import axios from "axios";
import { useState, useEffect } from "react";
import ImageDropZone from "../../components/admin/ImageDropZone";
import TiptapEditor from "../../components/admin/TiptapEditor";
import HtmlRenderer from "../../components/HtmlRenderer";
import ProductCard from "../../components/ProductCard.jsx";
import placeholderImg from "../../assets/placeholder-image-icon.webp";
import ProductPagePreview from "../../components/admin/ProductPagePreview.jsx";
ProductPagePreview;

const AdminNewProductPage = () => {
  const [primaryImg, setPrimaryImg] = useState(null);
  const [secondary1Img, setSecondary1Img] = useState(null);
  const [secondary2Img, setSecondary2Img] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [comparePrice, setComparePrice] = useState(0);
  const [descriptionHtml, setDescriptionHtml] = useState(null);

  const [openTab, setOpenTab] = useState(1);
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axios.post(
      "https://api.imgbb.com/1/upload?key=5d7edd7bd9bc6cbfa53d30c3e83e3970",
      formData
    );
    console.log(response.data);
    return response.data.data.url;
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await uploadImage(file);
    }
  };
  return (
    <>
      <main className="py-16 px-4 md:w-[80vw] w-screen p-4">
        <div className="w-full flex flex-col justify-center items-center mb-16">
          <h1 className="text-4xl text-left text-gray-800 ">Add a product </h1>
          <h3 className="text-xl text-left  text-gray-800 ">
            Let's create a masterpiece, together{" "}
          </h3>
        </div>

        <section className="md:flex ">
          <div className="md:w-1/2 w-full md:px-10">
            <h4 className="py-8 text-left">Add few details to get started</h4>

            <div className="flex flex-col gap-4">
              <ImageDropZone storeFileToUpload={setPrimaryImg} />
              <div className="w-full grid grid-cols-2 gap-4">
                <ImageDropZone
                  storeFileToUpload={setSecondary1Img}
                  className={"w-1/2"}
                />
                <ImageDropZone
                  storeFileToUpload={setSecondary2Img}
                  className={"w-1/2"}
                />
              </div>
              <div className="relative w-full min-w-[200px] h-11 ">
                <input
                  className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700 outline-none focus:outline-none focus:ring-0 focus:border-gray-900 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200"
                  placeholder=" "
                  type="text"
                  onInput={(e) => {
                    setTitle(e.target.value.trim());
                  }}
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Title
                </label>
              </div>

              <div className="relative w-full min-w-[200px] h-11 ">
                <input
                  className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700 outline-none focus:outline-none focus:ring-0 focus:border-gray-900 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200"
                  placeholder=" "
                  type="text"
                  onInput={(e) => {
                    setSubTitle(e.target.value.trim());
                  }}
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900 ">
                  Sub Title (optional)
                </label>
              </div>

              <div className="relative w-full min-w-[200px] h-11 ">
                <input
                  className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700 outline-none focus:outline-none focus:ring-0 focus:border-gray-900 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200"
                  placeholder=" "
                  type="numbers"
                  onInput={(e) => {
                    setPrice(e.target.value.trim());
                  }}
                />

                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Price
                </label>
              </div>

              <div className="relative w-full min-w-[200px] h-11 ">
                <input
                  className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700 outline-none focus:outline-none focus:ring-0 focus:border-gray-900 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200"
                  placeholder=" "
                  type="numbers"
                  onInput={(e) => {
                    setComparePrice(e.target.value.trim());
                  }}
                />

                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Compared Price (optional)
                </label>
              </div>

              <TiptapEditor updateHtml={setDescriptionHtml} />

              <div className="">
                <p className="text-left">Add Variants:</p>
                <button className="">
                  Add Variant
                </button>
              </div>
            </div>
          </div>

          <div
            className="md:w-1/2 w-full md:m-0 my-10
    "
          >
            <div className="md:sticky top-8">
              <div className="p-8">
                <div className="max-w-md mx-auto">
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
                    <ProductCard
                      title={title ? title : "Product Name"}
                      price={price ? price : 100}
                      image1={
                        primaryImg
                          ? URL.createObjectURL(primaryImg)
                          : placeholderImg
                      }
                      comparedPrice={comparePrice ? comparePrice : 200}
                    />
                  )}

                  {openTab === 2 && (
                    <ProductPagePreview
                      title={title ? title : "Product Name"}
                      price={price ? price : 100}
                      primaryImg={
                        primaryImg
                          ? URL.createObjectURL(primaryImg)
                          : placeholderImg
                      }
                      comparedPrice={comparePrice ? comparePrice : 200}
                      secondary1Img={
                        secondary1Img
                          ? URL.createObjectURL(secondary1Img)
                          : placeholderImg
                      }
                      secondary2Img={
                        secondary2Img
                          ? URL.createObjectURL(secondary2Img)
                          : placeholderImg
                      }
                    />
                  )}

                  {openTab === 3 && (
                    <div className="transition-all duration-300 bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600">
                      <h2 className="text-2xl font-semibold mb-2 text-blue-600">
                        Section 3 Content
                      </h2>
                      <p className="text-gray-700">
                        Fusce hendrerit urna vel tortor luctus, nec tristique
                        odio tincidunt. Vestibulum ante ipsum primis in faucibus
                        orci luctus et ultrices posuere cubilia Curae.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AdminNewProductPage;

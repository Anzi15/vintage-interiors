import axios from 'axios';
import { useState } from "react";
import ImageDropZone from "../../components/admin/ImageDropZone";

const AdminNewProductPage = () => {
  const [openTab, setOpenTab] = useState(1);
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await axios.post('https://api.imgbb.com/1/upload?key=5d7edd7bd9bc6cbfa53d30c3e83e3970', formData);
    console.log(response.data)
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
      <main className="py-16 px-4 w-[80vw]">
        <div className="w-full flex flex-col justify-center items-center mb-16">
          <h1 className="text-4xl text-left text-gray-800 ">Add a product </h1>
          <h3 className="text-xl text-left  text-gray-800 ">
            Let's create a masterpiece, together{" "}
          </h3>
        </div>

        <section className="flex">
          <div className="md:w-1/2 w-full md:px-10">
            <h4 className="py-8 text-left">Add few details to get started</h4>

            <div className="flex flex-col gap-4">
        <ImageDropZone />
              <div class="relative w-full min-w-[200px] h-11 ">
                <input
                  class="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Input Large
                </label>
              </div>
              <div class="relative w-full min-w-[200px] h-11 ">
                <input
                  class="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Input Large
                </label>
              </div>
              <div class="relative w-full min-w-[200px] h-11 ">
                <input
                  class="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Input Large
                </label>
              </div>
            </div>
          </div>

          <div
            className="w-1/2
    "
          >
            <div>
              <div className="p-8">
                <div className="max-w-md mx-auto">
                  <div className="mb-4 flex space-x-4 p-2 bg-white rounded-lg shadow-md">
                    <button
                      onClick={() => setOpenTab(1)}
                      className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                        openTab === 1 ? "bg-blue-600 text-white" : ""
                      }`}
                    >
                      Section 1
                    </button>
                    <button
                      onClick={() => setOpenTab(2)}
                      className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                        openTab === 2 ? "bg-blue-600 text-white" : ""
                      }`}
                    >
                      Section 2
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
                    <div className="transition-all duration-300 bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600">
                      <h2 className="text-2xl font-semibold mb-2 text-blue-600">
                        Section 1 Content
                      </h2>
                      <p className="text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam aliquam justo nec justo lacinia, vel ullamcorper
                        nibh tincidunt.
                      </p>
                    </div>
                  )}

                  {openTab === 2 && (
                    <div className="transition-all duration-300 bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600">
                      <h2 className="text-2xl font-semibold mb-2 text-blue-600">
                        Section 2 Content
                      </h2>
                      <p className="text-gray-700">
                        Proin non velit ac purus malesuada venenatis sit amet
                        eget lacus. Morbi quis purus id ipsum ultrices aliquet
                        Morbi quis.
                      </p>
                    </div>
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

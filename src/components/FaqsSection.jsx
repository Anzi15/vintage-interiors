import React, { useState } from 'react';

const FaqsSection = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(index === activeAccordion ? null : index);
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/3">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/vintage-interiors.appspot.com/o/assets%2Fhutomo-abrianto-X5BWooeO4Cw-unsplash%20(1).jpg?alt=media&token=2027fc66-e680-4155-b8b2-d3b53a2c7082"
              alt="FAQ tailwind section"
              draggable={false}
            onContextMenu={(e)=>{e.preventDefault()}}
              className="skeleton-loading max-h-[80vw] aspect-[9/16] w-full rounded-xl select-none object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-6 lg:mb-16">
                <h6 className="text-lg text-center font-medium text-brandRed mb-2 lg:text-left">
                  FAQs
                </h6>
                <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-left">
                  Looking for answers?
                </h2>
              </div>
              <div className="accordion-group text-left">
                {[
                  {
                    question: 'What kind of vintage furniture do you offer?',
                    answer: 'We specialize in high-quality, handpicked vintage furniture that ranges from mid-century modern to classic antique pieces. Our collection includes vintage sofas, dining tables, chairs, cabinets, and more to elevate your home décor.',
                  },
                  {
                    question: 'Do you offer customization for furniture?',
                    answer: 'Yes, we offer customization on select vintage furniture pieces. Whether it’s reupholstery, paint finishes, or minor structural changes, we can work with you to tailor the item to your taste.',
                  },
                  {
                    question: 'How can I place an order?',
                    answer: 'You can easily place an order through our website. Browse through our furniture and décor collections, add your desired items to your cart, and follow the checkout process. We also offer in-store consultations if you prefer.',
                  },
                  {
                    question: 'Do you provide interior design consultations?',
                    answer: 'Yes, we provide professional interior design consultations to help you style your space with our vintage furniture and décor items. Contact us to schedule an appointment with our design team.',
                  },
                  {
                    question: 'What is your return policy?',
                    answer: 'Due to the unique nature of vintage items, all sales are final. However, if an item arrives damaged or is not as described, we will work with you to resolve the issue and offer a return or exchange where applicable.',
                  },
                  {
                    question: 'Do you offer delivery or shipping services?',
                    answer: 'Yes, we offer delivery within the local area and can arrange shipping for customers outside of our delivery zone. For international shipping, please contact us to discuss the options and associated costs.',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`accordion py-8 border-b border-solid border-gray-200 ${activeAccordion === index ? 'active' : ''}`}
                  >
                    <button
                      className="accordion-toggle group inline-flex items-center justify-between md:text-xl text-lg font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-brandRed accordion-active:text-indigo-600 accordion-active:font-medium focus-within::text-brandRed"
                      onClick={() => toggleAccordion(index)}
                      aria-controls={`accordion-content-${index}`}
                    >
                      <h5>{item.question}</h5>
                      <svg
                        className={`text-gray-900 transition duration-500 group-hover:text-brandRed accordion-active:text-indigo-600 ${activeAccordion === index ? 'rotate-180' : ''}`}
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <div
                      id={`accordion-content-${index}`}
                      className={`accordion-content w-full px-0 overflow-hidden pr-4 ${activeAccordion === index ? 'max-h-40' : 'max-h-0'}`}
                      aria-labelledby={`accordion-heading-${index}`}
                    >
                      <p className="text-base text-gray-500 font-normal">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqsSection;

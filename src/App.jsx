import "./App.css";
import { useGetProductsQuery } from "./features/product/productSlice2";
import CardProduct from "./components/card/card-product";
import SkeletonCardProduct from "./components/card/skeleton-card-product";
import { NavLink } from "react-router";

function App() {
  const { data, isLoading } = useGetProductsQuery();
  const array = [1, 2, 3, 4, 5, 6, 7, 8];

  console.log("data from RTK Query", data);

  return (
    <>
      <div class="w-screen h-screen overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-30">
        <img
          src="https://img.freepik.com/premium-photo/sign-that-says-hotel-it_337384-106030.jpg"
          class="absolute top-0 left-0 min-h-full object-cover"
          alt=""
        />
        <div class="relative z-20 max-w-screen-lg mx-auto grid grid-cols-12 h-full items-center">
          <div class="col-span-6">
        
            <h1 class="text-white font-extrabold text-5xl mb-8">
              Quality products, unbeatable prices,everything you need in one place.
            </h1>
            <p class="text-stone-100 text-base">
              Increase Your Sales With Us
            </p>
            <button class="mt-8 text-white uppercase py-4 text-base font-light px-10 border border-white hover:bg-white hover:bg-opacity-10">
               BEAUTIFUL Clothes STARTS HERE
            </button>
          </div>
        </div>
      </div>
      {/* New Collection Section */}
      <section className="py-25 bg-white text-center dark:bg-gray-900">
        <div className="relative inline-block">
          <div className="absolute w-36 h-36 -top-4 left-1/2 transform -translate-x-1/2 rounded-full border-8 border-[#f2f2ff] dark:border-[#a4a4eb]" />
          <i className="fa-solid fa-caret-down text-[#0006ff] text-5xl absolute -top-4 left-1/2 transform -translate-x-1/2 mt-3"></i>

          <div className="mt-8">
            <h2 className="text-[25px] sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 relative z-10 dark:text-gray-100">
              New{" "}
              <i className="font-normal text-gray-700 dark:text-gray-300">
                Collections
              </i>{" "}
              Of Arrivals
            </h2>
            <p className="text-gray-900 relative z-10 dark:text-gray-200">
              Table, Chair, Lighting.....
            </p>
          </div>
        </div>
      </section>

      {/* Collection Cards */}
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 px-4">
          {/* Card 1 */}
          <div className="relative rounded-lg overflow-hidden group">
            <img
              src="https://media.ctmusicshop.com/wp-content/uploads/2020/02/29062543/Category_Headphone-Gadget.jpg"
              alt="HeadPhone"
              className="w-full h-[270px] object-cover object-top rounded-lg transform group-hover:scale-105 transition duration-300 ease-in-out"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg text-center shadow-md z-10 md:inset-0 md:flex md:flex-col md:justify-end md:p-6 md:text-black md:bg-transparent md:text-left">
              <p className="text-2xl font-bold mb-1">
                <span className="text-blue-600">HeadPhone</span>
              </p>
              <p className="text-sm font-semibold text-gray-800">NEW ARRIVALS</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-lg overflow-hidden group">
            <img
              src="https://static.wixstatic.com/media/613d6c_bf09c9f63fa743a3a0ddc59b1eecccf9~mv2.jpg/v1/fill/w_300,h_100,q_90,enc_avif,quality_auto/613d6c_bf09c9f63fa743a3a0ddc59b1eecccf9~mv2.jpg"
              alt="Tables"
              className="w-full h-[270px] object-cover rounded-lg transform group-hover:scale-105 transition duration-300 ease-in-out"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg text-center shadow-md z-10 md:inset-0 md:flex md:flex-col md:justify-end md:p-6 md:text-black md:bg-transparent md:text-left">
              <p className="text-2xl font-bold mb-1">
                <span className="text-blue-600">Tables</span>
              </p>
              <p className="text-sm font-semibold text-gray-800">NEW ARRIVALS</p>
            </div>
          </div>

          {/* Discount Banner */}
          <div className="sm:h-[200px] md:h-[260px] col-span-full bg-[#e7e7e7] rounded-lg p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-center text-[#eeeeee] text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-extrabold">
              DISCOUNT
            </div>
            <div className="relative z-10 mt-3">
              <p className="text-[20px] sm:text-[30px] md:text-[44px] font-bold text-red-600 mb-1">
                50% OFF ON{" "}
                <i className="text-purple-600 font-extralight">
                  ALL PRODUCTS
                </i>
              </p>
              <p className="text-gray-600 text-sm sm:text-lg">
                All the discounts you love, right in your pocket
              </p>
            </div>
          </div>
        </div>
      </section>
      

     
    </>
  );
}

export default App;

import React from 'react'
import toast from 'react-hot-toast';

const  Home = () => {
  return (
    <div>
      <div className="bg-amber-200 h-screen  font-bold flex justify-center items-center">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center md:text-6xl">
            Welcome to My App
          </h1>
          <div className="flex justify-center w-full">
            <button
              onClick={() => toast.success('Hello from toast!')}
              className="mt-4 bg-blue-600 text-white py-1 px-4 rounded cursor-pointer "
            >
              Show Toast
            </button>
          </div>
        </div>
      </div>
      <div className="bg-amber-400 h-screen text-6xl font-bold flex justify-center items-center">
        Div 2
      </div>
      <div className="bg-amber-600 h-screen text-6xl font-bold flex justify-center items-center">
        Div 3
      </div>
      <div className="bg-amber-800 h-screen text-6xl font-bold flex justify-center items-center">
        Div 4
      </div>
    </div>
  );
}

export default Home
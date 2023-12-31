import React from "react";

const Loading:React.FC = () => {
  return (
    <div>
      <div className="flex h-[84vh] items-center justify-center">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-tcolor hover:bg-cyan-400 transition ease-in-out duration-150 cursor-not-allowed"
        >
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </button>

        {/* <lord-icon
          src="https://cdn.lordicon.com/xjovhxra.json"
          trigger="loop"
          colors="primary:#16a9c7,secondary:#107c91"
          style={{ width: "150px", height: "150px" }}
        ></lord-icon> */}
      </div>
    </div>
  );
};

export default Loading;

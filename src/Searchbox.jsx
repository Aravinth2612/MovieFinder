import { useFormik } from "formik";
import { useEffect } from "react";

function Searchbox({ handleMovieSearch }) {
  const formik = useFormik({
    initialValues: {
      search: "",
      type: "",
    },
    validate: (values) => {
      let error = {};
      if (!values.search) {
        error.search = "Required";
      }
      return error;
    },
    onSubmit: (values) => {
      handleMovieSearch(values.search, values.type);
    },
  });

  useEffect(() => {
    if (formik.values.search) {
      handleMovieSearch(formik.values.search, formik.values.type);
    }
  }, [formik.values.type]);
  return (
    <div className="max-w-8xl mx-auto bg-gradient-to-b from-black via-gray-900 to-black px-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="max-w-2xl mx-auto flex items-center mt-6 bg-gray-900 rounded-full shadow-lg px-4 py-2 
                border border-gray-700 focus-within:border-red-500 transition">
          <input
            type="text"
            name="search"
            value={formik.values.search}
            onChange={(e) => {
              formik.handleChange(e);
              handleMovieSearch(e.target.value, formik.values.type); 
            }}
            placeholder="Search movies..."
            className="flex-1 bg-transparent focus:outline-none text-gray-200 placeholder-gray-500"
          />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="currentColor"
              className="w-5 h-5 text-gray-400 hover:text-red-500 transition cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 
             0 105.25 5.25a7.5 7.5 0 
             0011.4 11.4z"
              />
            </svg>
        </div>
        <select
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          className="bg-gray-800 text-gray-200 rounded px-2 mr-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
        >
          <option value="">All</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episodes">Episodes</option>
        </select>
      </form>
    </div>

  );
}

export default Searchbox;

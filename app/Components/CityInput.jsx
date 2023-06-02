export default function CityInput(props) {
  const { onSubmit, zipCode, setZipCode, onReset } = props;

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents page refresh
    onSubmit(zipCode); // Calls the parent component's function with the input data
  };

  const handleChange = (event) => {
    setZipCode(event.target.value); // Updates state when the input changes
  };

  return (
    <div className="flex flex-col items-center justify-center py-40 mx-auto bg-yellow-400 rounded-md shadow-md ">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="zipCode"
            className="block mb-2 text-xl font-bold text-black"
          >
            Enter your zip code
          </label>
          <input
            className="w-full p-2 transition-colors bg-white border-2 border-gray-200 rounded-md focus:border-blue-500"
            id="zipCode"
            type="text"
            value={zipCode}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-700"
        >
          Get Weather
        </button>
        <button
          type="button"
          onClick={onReset}
          className="w-full px-4 py-2 font-semibold text-white transition-colors bg-red-500 rounded-md hover:bg-red-700"
        >
          Reset
        </button>
      </form>
    </div>
  );
}

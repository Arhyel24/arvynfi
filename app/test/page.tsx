const App = async () => {
  return (
    <div
      className="flex flex-col items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://placehold.co/1080x1920?text=Background+Image')",
      }}
    >
      <div className="flex justify-between items-center w-full px-4 py-2">
        <div className="bg-teal-500 p-2 rounded-full">
          <i className="fas fa-wallet text-white"></i>
        </div>
        <div className="bg-gray-700 p-2 rounded-full">
          <i className="fas fa-globe text-white"></i>
        </div>
      </div>
      
      
      <div className="fixed bottom-0 w-full bg-gray-900 py-2 flex justify-around items-center">
        <i className="fas fa-wallet text-teal-500 text-2xl"></i>
        <i className="fas fa-rocket text-gray-400 text-2xl"></i>
        <i className="fas fa-cat text-gray-400 text-2xl"></i>
        <div className="bg-teal-500 p-4 rounded-full">
          <i className="fas fa-plus text-white text-2xl"></i>
        </div>
      </div>
    </div>
  );
};

export default App;

const Loading = () => {
  return (
    <div className="grid place-items-center h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-gray-700 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;

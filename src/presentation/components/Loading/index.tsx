function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex space-x-3">
        <span className="block w-3 h-3 bg-[#06be9e] rounded-full high-bounce" style={{ animationDelay: "0s" }} />
        <span className="block w-3 h-3 bg-gray-400 rounded-full high-bounce" style={{ animationDelay: "0.2s" }} />
        <span className="block w-3 h-3 bg-[#242621] rounded-full high-bounce" style={{ animationDelay: "0.4s" }} />
      </div>
    </div>
  );
}

export default Loading;

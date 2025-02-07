const LoadingPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-primary-light text-5xl font-bold">Загрузка...</h1>
      <p className="text-primary-light mt-4 text-xl">Пожалуйста, подождите</p>
      <div className="mt-8">
        <div className="border-t-primary-light aspect-square w-10 animate-spin rounded-full border-8 border-white"></div>
      </div>
    </div>
  );
};

export default LoadingPage;

import bg from '../../../assets/images/bg.png';

const GetStarted = () => {
  return (
    <div className="bg-cover bg-center w-full " style={{ backgroundImage: `url(${bg})` }}>
      <div className="flex flex-col h-full justify-center items-center py-12 md:py-32 bg-orange-300 bg-opacity-75">
        <h1 className="text-3xl md:text-5xl text-center font-bold mb-4">15% Discount<br />On All Products</h1>
        
        <h1 className="md:text-3xl mb-4">Offer Expires on</h1>

        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-3xl md:text-5xl">
              <span style={{ "--value": 15 }}></span>
            </span>
            days
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-3xl md:text-5xl">
              <span style={{ "--value": 10 }}></span>
            </span>
            hours
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-3xl md:text-5xl">
              <span style={{ "--value": 24 }}></span>
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-3xl md:text-5xl">
              <span style={{ "--value": 49 }}></span>
            </span>
            sec
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;

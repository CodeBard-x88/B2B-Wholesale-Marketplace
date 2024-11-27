import React, {useState, useEffect} from 'react';

export default function ProductDescription({images=['smart-led-bulb' , 'study-table-lamp'] ,name = "Name", desc="", price="10,000" 
    , ratings=5, hasFreeDelivery=true, minOrder = 100, stock = 110, storeId, storeName="A1 Decores", storeFollowers=0, storeLogo='temp-store-logo'})
    
    {
    const [orderAmount, setOrderAmount] = useState(minOrder);
    const [currentImage, setCurrentImage] = useState(0);

    function onIncreaseDecreaseAmount(action){
        if(action === 'decrease'){
            setOrderAmount(orderAmount - 1 >= minOrder? orderAmount - 1 : minOrder)
        }
        else if(action === 'increase'){
            setOrderAmount(orderAmount + 1 <= stock ? orderAmount + 1 : stock);
        }
    } 

    function ChangeImage(action){
        if(action === 'next'){
            setCurrentImage(currentImage+1 < images.length? currentImage + 1 : 0);
        }
        else if(action === 'prev'){
            setCurrentImage(currentImage-1 >= 0? currentImage - 1 : images.length - 1);
        }
    }

    function onAddToCartClick(){
        if(stock >= minOrder && orderAmount >= minOrder){
            //then store the product id and order amount and include it into the global state of the cart
        }
    }
    
    const [RatingStars, setRatingStars] = useState([
        '/star-empty.png',
        '/star-empty.png',
        '/star-empty.png',
        '/star-empty.png',
        '/star-empty.png',
      ]);
      
      useEffect(() => {
        const updatedStars = Array(5).fill('/star-empty.png');
    
        for (let i = 0; i < Math.floor(ratings); i++) {
          updatedStars[i] = '/star-filled.png';
        }
    
        if (ratings % 1 !== 0) {
          updatedStars[Math.floor(ratings)] = '/star-half-filled.png';
        }
    
        setRatingStars(updatedStars);
      }, [ratings]);
  
    return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
            <div>
                <h1 className="text-3xl font-bold">{name}</h1>
            </div>
          <div className="my-5 relative aspect-square">
            <img
              src={`/${images[currentImage]}.png`}
              alt="Wooden Frame"
              className="object-cover rounded-lg w-full h-full"
            />
          </div>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-lg"
            aria-label="Previous image"
            onClick={() => ChangeImage('prev')}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-lg"
            aria-label="Next image"
            onClick={() => ChangeImage('next')}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <img src={`/${storeLogo}.png`} alt={`${storeName} logo`}/>
                <div className='flex flex-col'>
                    <span className='text-center font-extrabold'>{storeName}</span>
                    <span>{storeFollowers} followers</span>
                 </div>
            </div>
            <div className='flex items-center justify-center space-x-4'>
                <button>
                    <img src='/follow-us-icon.png' alt='follow us' />
                </button>
                <button className='bg-[#34383A] text-white w-24 h-10'>
                    Visit Store!
                </button>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-6 my-10">
          <div>
            <p className="text-2xl font-bold text-primary mt-2">PKR {price}/-</p>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground">
              Enhance your living space with these minimalist triangle shelves. Crafted from high-quality natural wood, they feature a clean and modern design perfect for displaying plants, books, or small decorative items. Ideal for adding a stylish and functional element to your living room, bedroom, or office. Easy to mount and designed to bring a natural touch to any space.
            </p>
          </div>
          <div className='flex justify-between w-10/12'>
            <div className="flex ml-5 justify-start items-center space-x-1">
                {RatingStars.map((img, index) => (
                <img
                key={index}
                src={img}
                alt={`star ${index + 1}`}
                className="w-full h-auto"
                style={{ width: '30px', height: '30px' }}
              />
            ))}
            </div>
            <img
                  src="/free-shipping.png"
                  alt="free shipping available"
                  className={`${hasFreeDelivery ? 'visible' : 'hidden'} object-contain`}
                  style={{ width: '80px', height: '80px' }}
              />
            </div>

            <div className='flex justify-between items-center w-10/12 ml-5'>
                <div className='flex'>
                    <div className='w-24 h-12 bg-[#FA7E1E] rounded-l-lg flex items-center justify-center text-white '>Min Order</div>
                    <div className='w-24 h-12 bg-[#34383A] rounded-r-lg flex items-center justify-center text-white'>{minOrder} pieces</div>
                </div>
                <div className="flex items-center justify-between space-x-4 text-center bg-[#D9D9D9] rounded-full">
                    <button onClick={() => onIncreaseDecreaseAmount('decrease')}>
                        <img src="/minus-icon.png" alt="minus icon" style={{ width: "40px", height: "40px" }} />
                    </button>
                    <span className="text-lg font-semibold flex-1 text-center">{orderAmount}</span>
                    <button onClick={() => onIncreaseDecreaseAmount('increase')}>
                        <img src="/add-icon.png" alt="add icon" style={{ width: "40px", height: "40px" }} />
                    </button>
                </div>
            </div>

            <div className='flex justify-center items-center my-48'>
                <button className='w-96 h-10 bg-[#34383A] rounded-xl text-white' onClick={() => onAddToCartClick()}>Add to Cart</button>
            </div>
        </div>
      </div>
    </div>
  );
}


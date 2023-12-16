import HeroSection from "../components/herosection/HeroSection"
import book from "../assets/book.png"

function App() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Book Lists */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
        {[1,2,3,4,5].map(() => (
          <div className="border border-1 p-3">
            <img src={book} alt="" className=" w-full" />
            <div className="text-center space-y-2 mt-3">
              <h1>Book Title</h1>
              <p>Description</p>
              <div className="flex flex-wrap">
                {['travel','knowledge', 'travel','knowledge'].map(genre => (
                  <span className="mx-1 my-1 text-white px-2 py-1 bg-blue-500 text-sm rounded-lg">{genre}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App

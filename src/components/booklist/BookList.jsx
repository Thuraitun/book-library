import { Link } from "react-router-dom";
import bookimg from "../../assets/book.png"
import useFetch from "../../hooks/useFetch";

const BookList = () => {
    const { data : books, loading, error } = useFetch('http://localhost:3000/books')
    if(error) {
        return <p className="text-red-500">{error}</p>
    }
  return (
    <>
        {loading && <div>loading...</div>}
        {!!books && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
                {books.map(book => (
                <Link to={`/books/${book.id}`} className="border border-1 p-3" key={book.id}>
                    <img src={bookimg} alt="" className=" w-full" />
                    <div className="space-y-2 mt-3">
                        <div className="flex justify-between items-center">
                            <h1 className="text-gray-700">{book.title}</h1>
                            <p className="italic text-sm text-gray-500">Author By - {book.author}</p>
                        </div>
                        <div className="flex flex-wrap">
                            {book.categories.map((category, index) => (
                            <span key={index} className="mx-1 my-1 text-white px-2 py-1 bg-blue-500 text-sm rounded-lg">{category}</span>
                            ))}
                        </div>
                    </div>
                </Link>
                ))}
            </div>
        )}
    </>
  );
}

export default BookList;

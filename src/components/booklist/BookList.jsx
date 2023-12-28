import { Link, useLocation, useNavigate } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import trash from "../../assets/trash.svg"
import edit from "../../assets/edit.svg"
import useFirestore from "../../hooks/useFirestore";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const BookList = () => {
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const search = param.get("search");
  const navigate = useNavigate();

  const { user } = useContext(AuthContext)

  const { DeleteDocument, GetCollection } = useFirestore()
  let {error, data: books, loading } = GetCollection('books', [ 'uid', '==', user.uid ], search && { field: 'title', value: search})


  const handleDelete = async (e, id) => {
    e.preventDefault();

    await DeleteDocument('books', id)
  }
  
  

  if (error) {
    return <p className="text-red-500 my-10 text-[20px] text-center">{error}</p>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isDark } = useTheme();

  return (
    <>
      {!books && loading && <div>loading...</div>}
      
      {!!books && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4 z-30">
          {books.map((book) => (
            <Link
              to={`/books/${book.id}`}
              className={`border border-1 p-3 rounded-md ${
                isDark ? "bg-dcard border-primary" : ""
              }`}
              key={book.id}
            >
              <div className="overflow-hidden">
                <img
                  src={book.cover}
                  alt=""
                  className=" w-full h-[180px] md:h-[330px]"
                />
              </div>
              <div className="space-y-2 mt-3">
                <div className="md:flex md:justify-between md:items-center">
                  <h1
                    className={`text-gray-700 ${isDark ? "text-gray-200" : ""}`}
                  >
                    {book.title}
                  </h1>
                  <p className="italic text-sm text-gray-500">
                    Owner By - {book.author}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 space-y-2 md:space-y-0">
                  <div className="flex flex-wrap">
                    {book.categories.map((category, index) => (
                      <div key={index}>
                        <span
                          className=" mx-1 my-1 text-white px-2 py-1 bg-primary text-[12px] rounded-lg"
                        >
                          {category}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between md:justify-end space-x-1">
                    
                    <div className="">
                      <img src={edit} alt="" onClick={(e) => {
                        e.preventDefault();
                        navigate(`/edit/${book.id}`)
                      }} />
                    </div>
          
                    <div onClick={(e) => handleDelete(e, book.id)} className="">
                      <img src={trash} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {books && !books.length && (
        <p className="text-center text-red-500 text-2xl my-20">
          No Search Results Found
        </p>
      )}
    </>
  );
};

export default BookList;

import { useContext, useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase"
import { useNavigate, useParams } from "react-router-dom";
import close from "../assets/close.svg"
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "../contexts/AuthContext.jsx";


const Create = () => {

  const { id } = useParams()

  const [ title, setTitle ] = useState('') 
  const [ description, setDescription ] = useState('')
  const [ newCategory, setNewCategory ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ categories, setCategories ] = useState([])
  const [ isEdit, setIsEdit ] = useState(false)

  useEffect(() => {
    if(id) {
      setIsEdit(true)
      let ref = doc(db, 'books', id)
        getDoc(ref).then(doc => {
            if(doc.exists()) {
              let {title, description, categories, author }  =  doc.data();
              setTitle(title) 
              setDescription(description) 
              setCategories(categories) 
              setAuthor(author) 
            } 
        })
    } else {
      setIsEdit(false)
      setTitle('') 
      setDescription('') 
      setCategories([]) 
      setAuthor('') 
    }
  }, [id])

  const navigate = useNavigate()

  const { AddCollection, UpdateDocument } = useFirestore()

  const { user } = useContext(AuthContext)

  const addCategory = () => {

    if(newCategory && categories.includes(newCategory)) {
      alert('Your category is already')
      setNewCategory('')
      return;
    }

    if(newCategory.trim() === '') {
      alert('please fill category')
      return;
    } else {
      setCategories(prev => [ newCategory, ...prev ]);
      setNewCategory('')
    }
  }

  const submitForm = async (e) => {
    e.preventDefault();

    if (!title || !description || !categories.length || !author) {
      alert("Please fill in all the required fields.");
      return;
    }

    const data =  {
      title,
      description,
      categories,
      author,
      uid: user.uid,
    }

    if(isEdit) {
      await UpdateDocument('books', id, data)
    } else {
      // firebase create data 
       await AddCollection('books', data)

    }
    navigate('/');

  }
  
  const deleteCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  }

  const {isDark} = useTheme()
  return (
    <div className="h-screen">
      <div className="text-center my-4">
        <h1 className="text-[22px] text-primary font-bold">Book {isEdit ? 'Update':'Create'} Form</h1>
      </div>
      <form className="w-full max-w-lg mx-auto" onSubmit={submitForm}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-gray-100' : ''}`}>
              Book Title
            </label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter Book Title" />
          </div>

          <div className="w-full px-3">
            <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-gray-100' : ''}`}>
              Book Description
            </label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter Book Decription" />
          </div>

          <div className="w-full px-3">
            <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-gray-100' : ''}`}>
              Book Categries
            </label>
            <div className="flex items-center space-x-2">
              <input value={newCategory} onChange={e => setNewCategory(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter Book Categories" />
              <button type='button' onClick={addCategory} className="mb-3 bg-primary p-[11px] rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full px-3 flex flex-wrap gap-1 my-3">
            {categories.map((category, index) => (
              <div className="relative" key={index}>
                <span className="my-1 text-white px-2 py-1 bg-primary text-sm rounded-lg">{category}</span>
                <div className="absolute -top-2 right-0" onClick={() => deleteCategory(index)}>
                  <img src={close} alt="" className="w-[14px] bg-red-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          <div className="w-full px-3">
            <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-gray-100' : ''}`}>
              Book Author
            </label>
            <input value={author} onChange={e => setAuthor(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter Book Author" />
          </div>

          <div className="w-full px-3">
            <button className="text-white bg-primary px-3 py-2 rounded-xl flex justify-center items-center gap-1 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="">{isEdit ? 'Update':'Create'} Book</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;

import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";

const useFirestore = () => {
    const GetCollection = (colName, _q) => {

        const [ error , setError ] = useState('');
        const [ data, setData ] = useState([]);
        const [ loading, setLoading ] = useState(false);

        const qRef = useRef(_q).current;

        useEffect(() =>{
            setLoading(true);
            let ref = collection(db, colName);
            let queries = [];
            if(qRef) {
                queries.push(where(...qRef))
            }
            queries.push(orderBy('date', 'desc'));
            let q = query(ref, ...queries);
           
            onSnapshot(q, docs => {
        
              if(docs.empty) {
                setError('No documents found')
                setLoading(false);
              } else {
        
                let collectionDatas = [];
                docs.forEach(doc => {
                  let document = { id: doc.id, ...doc.data()}
                  collectionDatas.push(document);
                })
                setData(collectionDatas);
                setLoading(false);
                setError('')
        
              }
            })
          }, [colName, qRef])

          return { error, data, loading}
    }

    const GetDocument = (colName, id) => {
        
        const [ error , setError ] = useState('');
        const [ data, setData ] = useState(null);
        const [ loading, setLoading ] = useState(false);

        useEffect(() => {
            setLoading(true);
            let ref = doc(db, colName, id)
            onSnapshot(ref, doc => {
                if(doc.exists()) {
                    let document = {id: doc.id, ...doc.data()};
                    setData(document);
                    setLoading(false);
                    setError('')
                } else {
                    setError('no document found');
                    setLoading(false);
                }
                
            })
        }, [colName, id])

        return { error, data, loading }
    }

    const DeleteDocument = async (colName, id) => {
        let ref = doc(db, colName, id);
        alert("Deleted it")
        return deleteDoc(ref)
    }

    const AddCollection = async (colName, data) => {
        data.date = serverTimestamp()
        const ref = collection(db, colName)
        return addDoc(ref, data)
    }

    const UpdateDocument = async (colName, id, data, updateDate = true) => {
        if(updateDate) {
            data.date = serverTimestamp()
        }
        let ref = doc(db, colName, id);
        return updateDoc(ref, data)
    }
 
    return { GetCollection, GetDocument, DeleteDocument, AddCollection, UpdateDocument }
}

export default useFirestore;

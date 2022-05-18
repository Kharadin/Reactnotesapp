import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
// import notes from '../assets/data';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

import { useNavigate} from "react-router-dom"


const NotePage = ({history}) => {
  // let {id} = useParams();
 

  let noteId= useParams().id;
  
  const navigate = useNavigate()

  // useParams() Returns an object of key/value pairs of the dynamic params from the current URL that were matched by the route path.
  //console.log(props);
  //console.log(useParams);
   console.log(noteId);

  
  // let note = notes.find(note => note.id === Number(noteId));
  
  let [note, setNote] = useState (null)
  // useState should be set at the top level of the component and never inside the useEffect

   useEffect(() => {
    getNote()
     }, [])
     // was [noteId]

    
    let getNote = async () => {
      if (noteId === 'new') return
      let response = await fetch (`http://localhost:8000/notes/${noteId}`)
      console.log(response)
      let data =  await response.json()
      console.log('data from response: ', data)
       setNote(data)
      
    }
    
 // console.log(note)

  let createNote = async () => {
    await fetch(`http://localhost:8000/notes/`, {
      method: 'POST',
      headers: {
           'Content-type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date()})

    })
}

   let updateNote = async () => {
       await fetch(`http://localhost:8000/notes/${noteId}`, {
         method: 'PUT',
         headers: {
              'Content-type': 'application/json'
         },
         body: JSON.stringify({...note, 'updated': new Date()})

       })
   }

   let deleteNote = async (e) => {
        await fetch(`http://localhost:8000/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify(note)

        })
        // e.preventDefault()
        navigate('/')
   }

   let handleSubmit = (e) => {
    e.preventDefault()
     console.log("handlesubmit fired")
     //console.log ('id and body:', noteId, note.body)

     if (noteId ==='new' && note == null) {
       navigate('/')
       return
     } else if 
      (noteId === 'new' && note.body !==null){
       createNote();
       console.log('create')

      } else if (noteId !== 'new' && note.body === ''){
        deleteNote ();
        console.log('delete')
      } 
      else if (noteId !== 'new' && note.body !==null) {
        updateNote();
        console.log('update')
      }    
      
      console.log('out of ifs')
       navigate("/")
   }

  return (
    <div className='note'>

      <div className='note-header'>
         <h3>
            <Link to="">
              <ArrowLeft onClick={handleSubmit}/>
            </Link>

         </h3>
          {noteId !=='new' ? (
                <button onClick= {deleteNote}>Delete</button>
          ): ( 
                <button onClick ={handleSubmit}>Done</button>
          )}

      </div>
      <textarea value= {note?.body} onChange ={(e) => setNote({...note, 'body':e.target.value})}   >
      {/* // if there is... */}
        </textarea>
    </div>
  )
}

export default NotePage

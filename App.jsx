import React, { useState, useEffect  } from 'react';
import CreateArea from './CreateArea';
import Header from './Header'
import Footer from './Footer';
import Note from './Note';
import { dkeeper } from '../../../declarations/dkeeper';
function App() {
    const[notes, setNotes] = useState([]);
        //we are using note here and we are using useState here it means when my notes change it will re-render the component again
    //so how we can tap the moment when the first render is done when our website is first load up
    function addNote(newNotes) {
        setNotes((prevNotes) => {
            //in javascript we are going to have make sure that the order that we add in the arguments matches with the order of the motoko file 
           dkeeper.createNote(newNotes.title, newNotes.content)
        return [newNotes, ...prevNotes]
       });
    }
    //so mera console.log("useEffect Rendering"); screen mai render hone ke baad dikh rha hai to mai ab or it would be great if we could 
    //also pull out the array of notes from our motoko code 
    //and we are using fetchData() function because it is asynchronous and useEffect can't really turned into an asynchronous function itself
    useEffect(() => {
        console.log("useEffect Rendering");
        fetchData();
     },[])
    async function fetchData(){
        const notesArray = await dkeeper.readNote();
        setNotes(notesArray);
  //we are going to set everything to the new objects inside the notesArray and that is going to trigger a re-render because our state updated 
    }
    function deleteNote(id) {
        dkeeper.removeNote(id);
       setNotes((prev) => {
        return prev.filter((noteItem, index) => {
            return index != id;
        });
       });
    }
    return(
       <div>
        <Header />
        <CreateArea onAdd={addNote}   />
        {notes.map((noteItem, index) => {
            return(
                <Note 
                key={index}
                id={index}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNote}
                />
            );
        })}
        <Footer />
       </div>
    );
}

export default App;
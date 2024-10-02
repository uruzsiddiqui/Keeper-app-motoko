import React, { useState} from 'react';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { dkeeper } from '../../../declarations/dkeeper/index';

function CreateArea(props) {
    const [isExpanded, setExpanded] = useState(false);
    const [note, setNote] = useState({
        title: "",
        content: ""
    });
    function handleChange(e) {
        const {name, value} = e.target;
        setNote((prevNote) => {
            return{
                ...prevNote,
                [name]: value
            };
        });
    }
    
    function submitNote(e) {
        props.onAdd(note);
        setNote({
            title: "",
            content: ""
        });
        e.preventDefault();
    }
    function expand() {
        setExpanded(true);
    }
    return(
      <div>
        <form className="create-note" >
            <input
            name='title'
            value={note.title}
            //e.target.value is right but i want to hold my previous values also
            onChange={handleChange}
            placeholder='Title'
            />
            <textarea 
            name='content'
            value={note.content}
            onChange={handleChange}
            onClick={expand}
             placeholder="Take a note..."
            rows={isExpanded ? 3 : 1}
            />
            <Zoom in={isExpanded}>
            <Fab onClick={submitNote}>
                <AddIcon />
            </Fab>
            </Zoom>
        </form>
      </div>
    );
} 

export default CreateArea;
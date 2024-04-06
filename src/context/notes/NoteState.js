import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const host="http://localhost:5000"
    const notesInitial= []
      const [notes,setNotes]=useState(notesInitial);

     
      // Get All Notes
      const getNotes =async () =>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwNTE1YWU5YzVhMWQzZjc3OWE1ZmRlIn0sImlhdCI6MTcxMTY5MzQxNH0.to-C-uG5_JWugqLtWUZewvCMukHDL1lgDa4P8q_zpkg"
            }
          });
          const json=await response.json();
        //   console.log(json);
          setNotes(json)
      };
       //Add a Note
      const addNote =async (title,description,tag) =>{
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwNTE1YWU5YzVhMWQzZjc3OWE1ZmRlIn0sImlhdCI6MTcxMTY5MzQxNH0.to-C-uG5_JWugqLtWUZewvCMukHDL1lgDa4P8q_zpkg"
            },
            body: JSON.stringify({title,description,tag})
          });
          


        console.log("Adding a new Note");
        const note={
            "_id": "66079451a5b7544c24612393fe",
            "user": "660515ae9c5a1d3f779a5fde",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-03-30T04:25:53.733Z",
            "__v": 0
          };
        setNotes(notes.concat(note));
      };
      //Delete a Note
      const deleteNote =(id)=>{
        console.log("Deleted with id"+id);
        const newNotes=notes.filter((note)=> note._id!==id )
        setNotes(newNotes);
      }
      //Edit a Note
      const editNote =async (id,title,description,tag)=>{
        
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwNTE1YWU5YzVhMWQzZjc3OWE1ZmRlIn0sImlhdCI6MTcxMTY5MzQxNH0.to-C-uG5_JWugqLtWUZewvCMukHDL1lgDa4P8q_zpkg"
            },
            body: JSON.stringify({title,description,tag})
          });
          const json=await response.json();
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id===id) {
                element.title=title;
                element.description=description;
                element.tag=tag;
            }
        }
      }
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
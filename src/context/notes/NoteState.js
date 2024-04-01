import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const notesInitial= [
        {
          "_id": "6606715b16d464dcbc15c10b",
          "user": "660515ae9c5a1d3f779a5fde",
          "title": "My Title",
          "description": "Wake Up Sid",
          "tag": "personal",
          "date": "2024-03-29T07:44:27.928Z",
          "__v": 0
        },
        {
          "_id": "66079451a5b7544c246196fc",
          "user": "660515ae9c5a1d3f779a5fde",
          "title": "My Title2",
          "description": "Wake Up Sid2",
          "tag": "personal",
          "date": "2024-03-30T04:25:53.733Z",
          "__v": 0
        },
        {
          "_id": "66079451a5b7544c246196ff",
          "user": "660515ae9c5a1d3f779a5fde",
          "title": "My Title2",
          "description": "Wake Up Sid2",
          "tag": "personal",
          "date": "2024-03-30T04:25:53.733Z",
          "__v": 0
        },
        {
          "_id": "6606715b16d464dcbc15c10c",
          "user": "660515ae9c5a1d3f779a5fde",
          "title": "My Title",
          "description": "Wake Up Sid",
          "tag": "personal",
          "date": "2024-03-29T07:44:27.928Z",
          "__v": 0
        },
        {
          "_id": "66079451a5b7544c246196fd",
          "user": "660515ae9c5a1d3f779a5fde",
          "title": "My Title2",
          "description": "Wake Up Sid2",
          "tag": "personal",
          "date": "2024-03-30T04:25:53.733Z",
          "__v": 0
        },
        {
          "_id": "66079451a5b7544c246196fe",
          "user": "660515ae9c5a1d3f779a5fde",
          "title": "My Title2",
          "description": "Wake Up Sid2",
          "tag": "personal",
          "date": "2024-03-30T04:25:53.733Z",
          "__v": 0
        },
        {
          "_id": "66079451a5b7544c246193fe",
          "user": "660515ae9c5a1d3f779a5fde",
          "title": "My Title2",
          "description": "Wake Up Sid2",
          "tag": "personal",
          "date": "2024-03-30T04:25:53.733Z",
          "__v": 0
        }
      ]
      const [notes,setNotes]=useState(notesInitial);
    return (
        <NoteContext.Provider value={{notes,setNotes}} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
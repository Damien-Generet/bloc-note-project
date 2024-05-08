import React from "react";
import Markdown from "react-markdown";
import Showdown from "showdown";
const converter = new Showdown.Converter();

const Center = ({ activeNote, onUpdateNote }) => {

    const onEditField = (key, value) => {
        onUpdateNote({
            ...activeNote,
            [key]: value,
            lastModified: Date.now(),
        }
        );
    };

if(!activeNote){
    return <div className="no-active-note">No note selected</div>
}


  return (
    <>
      <div className="app-main">
        <div className="app-main-note-edit">
          <input type="text" id="title" value={activeNote.title} onChange={(e) => onEditField("title", e.target.value)} autoFocus />
          <textarea id="body" placeholder="Écris ta note ici..." value={activeNote.body} onChange={(e) => onEditField("body", e.target.value)} />
        </div>
        <div className="app-main-note-preview">
          <h1 className="preview-title">{activeNote.title}</h1>
          <div className="markdown-preview">
            <Markdown>
                {activeNote.body}
            </Markdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default Center;

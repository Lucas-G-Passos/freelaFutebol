import React from "react";
import './css/aluno.css';

export default function Aluno() {
    return (
        <div id="root">
            <input type="text" placeholder="Aluno"></input>
            <button type="button">Filter</button>
            <button type="submit">Submit</button>
        </div>

    )
}
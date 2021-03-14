import React, { useState } from 'react';
import './App.css';

export default function Letter(props) {
    const [letter, setLetter] = useState(props.item);

    return (
        <div className="letter">
            {letter}
        </div>
    );
}

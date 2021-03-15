import React, { useState } from 'react';
import './App.css';

export default function Letter({item, index}) {
    return (
        <div key={index} className="letter">
            {item}
        </div>
    );
}

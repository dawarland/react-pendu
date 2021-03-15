import React, { useState,useEffect } from 'react';
import Letter from "./Letter";

const MAX_LIFE = 10;

export default function PartyComponent({word , tries}) {
    const [triedLetter, setTriedLetter] = useState(null);
    const [heart, setHeart] = useState([]);
    const [end, setEnd] = useState(null);
    useEffect(() => {
        setTriedLetter(tries);

    }, [tries]);
    useEffect(() => {
        let newHeart = []
        if (triedLetter ){
            let lostLife =  [...triedLetter].filter(x=> !word.split('').includes(x)).length
            for (var i = 0; i < MAX_LIFE; i++) {
                if(i<lostLife )
                    newHeart.push(<div key={i}>♡</div>);
                else
                    newHeart.push(<div key={i}>♥</div>);
            }
            setHeart(newHeart);
            let win = word.split('').filter(x=> ! x.match(/['\s"]/) ).reduce((a,c)=> (triedLetter && [...triedLetter].includes(c) ) ? a && true : a && false ,true)
            if( win || lostLife >= MAX_LIFE){
                setEnd(win)
            }
        }

    }, [triedLetter,word]);

    function parseWord(w,tried){
        return w
            .split('')
            .map( (l) => (
                    l.match(/['\s"]/) ? l : tried.has(l) ? l : "_"
                )
            )
    }

    function renderParty(){
        return (
            <>
                { heart && <div className="hearts">{heart}</div>}
                <div className="party">
                    <div id="word" className="word">
                        { word && triedLetter && parseWord(word,triedLetter).map( (l,i) => (
                                <Letter item={l} index={i}/>
                            )
                        )}
                    </div>
                    <div className="tries">
                        <table cellSpacing="0" cellPadding="1" border="1" >
                            <thead>
                                <tr>
                                    <th>Mes essaies</th>
                                </tr>
                            </thead>
                            <tbody>
                                { triedLetter && [...triedLetter].map( letter => (
                                    <tr key={letter}>
                                        <td>{letter}</td>
                                    </tr>
                                ) ) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {end!=null ?
                <div>
                    <h2>{end ? 'Bravooo ' : 'Dommage '} ! La réponse était "{word}".</h2>
                    <button onClick={() => window.location.reload(false)}>Rejouer</button>
                </div> : renderParty()}
        </>
    );
}

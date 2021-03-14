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

    function renderParty(){
        return (
            <>
                { heart && <div className="hearts">{heart}</div>}
                <div className="party">
                    <div className="word">
                        { word && triedLetter && word.split('').map( (l,i) => (
                                <div key={i} className="letter">
                                    {l.match(/['\s"]/) ? l : triedLetter.has(l) ? l : "_" }
                                </div>
                            )
                        )}
                    </div>
                    <div className="tries">
                        <table cellSpacing="0" cellPadding="1" border="1" >
                            <tr>
                                <th>Mes essaies</th>
                            </tr>
                            { triedLetter && [...triedLetter].map( letter => (
                                <tr key={letter}>
                                    <td>{letter}</td>
                                </tr>
                            ) ) }
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

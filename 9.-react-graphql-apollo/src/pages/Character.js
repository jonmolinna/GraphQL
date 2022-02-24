import React from 'react';
import './Character.css';
import { useCharacter } from '../hooks/useCharacter';
import { useParams } from 'react-router-dom';

const Character = () => {
    const { id } = useParams();

    const { data, loading, error } = useCharacter(id);

    console.log({data, loading, error });

    if (error) return <div>something went wrong</div>

    if (loading) return <div>spinner...</div>

    return (
        <div className='Character'>
            <img src={data.character.image}  alt="" />
            <div className='Character-content'>
                <h1>{data.character.name}</h1>
                <p>{data.character.gender}</p>
                <div className='Character-episode'>
                    {
                        data.character.episode.map(episode => (
                            <div key={episode.episode}>
                                { episode.name } - <b>{ episode.episode }</b>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Character;
import React from 'react';
import './CharactersList.css';
import { useCharacters } from '../hooks/useCharacters';
import { Link } from 'react-router-dom';

const CharactersList = () => {
    const { error, loading, data } = useCharacters();

    if (loading) return <div>spinner...</div>

    if (error) return <div>something went wrong</div>

    return (
        <div className='CharacterList'>
            {
                data.characters.results.map(character => (
                    <Link key={character.id} to={`/${character.id}`}>
                        <img src={character.image} alt={character.name} />
                        <h2>{character.name}</h2>
                    </Link>
                ))
            }
        </div>
    )
}

export default CharactersList;
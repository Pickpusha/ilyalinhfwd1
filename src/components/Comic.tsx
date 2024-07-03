import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Comic } from '../types';
import Alt from './Alt';

dayjs.extend(relativeTime);

const ComicComponent: React.FC = () => {
    const [comic, setComic] = useState<Comic | null>(null);
    
    useEffect(() => {
        const fetchComic = async () => {
            const email = 'i.nguen@innopolis.university';
            const apiUrl = 'https://fwd.innopolis.university/api/hw2';
            const params = new URLSearchParams({ email });
            const response = await fetch(`${apiUrl}?${params}`);
            const comicId = await response.text();
            const comicResponse = await fetch(`https://fwd.innopolis.university/api/comic?id=${comicId}`);
            const comicData: Comic = await comicResponse.json();
            setComic(comicData);
        };

        fetchComic();
    }, []);

    
    if (!comic) {
        return <p>Failed to load comic.</p>;
    }

    const comicDate = new Date(Number(comic.year), Number(comic.month) - 1, Number(comic.day));
    const fromNowText = dayjs(comicDate).fromNow();

    return (
        <div id="comic-container">
            <h1>{comic.safe_title}</h1>
            <img src={comic.img} alt={comic.alt} />
            <p>{comicDate.toLocaleDateString()}</p>
            <Alt alt={comic.alt} />
            <p>Released {fromNowText}</p>
        </div>
    );
};

export default ComicComponent;

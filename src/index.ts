import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Comic } from './types';

dayjs.extend(relativeTime);

async function fetchComic(): Promise<void> {
    const email = 'i.nguen@innopolis.university';
    const apiUrl = 'https://fwd.innopolis.university/api/hw2';
    const params = new URLSearchParams({ email });
    const response = await fetch(`${apiUrl}?${params}`);
    const comicId = await response.text();
    const comicResponse = await fetch(`https://fwd.innopolis.university/api/comic?id=${comicId}`);
    const comicData: Comic = await comicResponse.json();

    document.getElementById('comic-title')!.textContent = comicData.safe_title;
    const comicImg = document.getElementById('comic-img') as HTMLImageElement;
    comicImg.src = comicData.img;
    comicImg.alt = comicData.alt;

    const comicDate = new Date(Number(comicData.year), Number(comicData.month) - 1, Number(comicData.day));
    document.getElementById('comic-date')!.textContent = comicDate.toLocaleDateString();
    document.getElementById('comic-alt')!.textContent = comicData.alt;

    const fromNowText = dayjs(comicDate).fromNow();
    const fromNowElement = document.createElement('p');
    fromNowElement.textContent = `Released ${fromNowText}`;
    document.getElementById('comic-container')!.appendChild(fromNowElement);
}

fetchComic();

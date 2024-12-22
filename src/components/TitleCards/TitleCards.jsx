import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.CSS'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'
const TitleCards = ({ title, category }) => {
	const [apiData, setApiData] = useState([]);
	const cardsRef = useRef();

	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTk4N2RkNWU5NGEyNWUxYTI5NzJmYWQwOGYxZDQxYiIsIm5iZiI6MTczNDY5MDIxMi45Niwic3ViIjoiNjc2NTQ1YTQ5MTkyODdlZjUzOTBjN2RiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.aFdXnwi49bp-aZXZvWBVfIqEBU2EC3sMFGdftv9mO0g'
		}
	};

	// const handleWheel = (event) => {
	// 	event.preventDefault(); 
	// 	cardsRef.current.scrollLeft += event.deltaY;
	// }

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/${category ? category :'now_playing'}?language=en-US&page=1`, options)
			.then(res => res.json())
			.then(res => setApiData(res.results))
			.catch(err => console.error(err));
		
		const currentCardsRef = cardsRef.current;

		const handleWheel = (event) => {
			currentCardsRef.scrollLeft += event.deltaY;
		};

		currentCardsRef.addEventListener('wheel', handleWheel, { passive: true });

		return () => {
			currentCardsRef.removeEventListener('wheel', handleWheel);
		};
	}, []);


	
	return (
		<div className='title-cards'>
			<h2>{title ? title : 'Popular on Netflix'}</h2>
			<div className="card-list" ref={cardsRef}>
				{
					apiData.map((card, index) => {
						return <Link to={`/player/${card.id}`} className="card" key={index}>
							<img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
							<p>{card.original_title }</p>
						</Link>
					})
				}
			</div>
		</div>
	)
}

export default TitleCards
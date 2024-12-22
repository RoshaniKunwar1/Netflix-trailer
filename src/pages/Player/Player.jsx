import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
	
	const { id } = useParams();
	const navigate = useNavigate();

	const [apiData, setApiData] = useState({
		name: '',
		key: "",
		published_at: '',
		type: ''
})

	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTk4N2RkNWU5NGEyNWUxYTI5NzJmYWQwOGYxZDQxYiIsIm5iZiI6MTczNDY5MDIxMi45Niwic3ViIjoiNjc2NTQ1YTQ5MTkyODdlZjUzOTBjN2RiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.aFdXnwi49bp-aZXZvWBVfIqEBU2EC3sMFGdftv9mO0g'
		}
	};

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
			.then(res => res.json())
			.then(res => setApiData(res.results[0]))
			.catch(err => console.error(err));
	}, [])

	return (
		<div className='player'>
			<img src={back_arrow_icon} alt="" onClick={() =>{navigate(-2)}}/>
			<iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' loading="lazy" allowFullScreen></iframe>
			<div className='player-info'>
				<p>{apiData.published_at}</p>
				<p>{apiData.name}</p>
				<p>{apiData.type}</p>
			</div>
		</div>
	)
}

export default Player
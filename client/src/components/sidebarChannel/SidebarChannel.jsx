import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChannelInfo } from '../../features/appSlice';
import "./SidebarChannel.css";
import axios from 'axios';
import { selectUser } from '../../features/userSlice';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const SidebarChannel = props => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const [channelName, setChannelName] = useState(props.channelName);

	const handleChangeChannelName = e => {
		e.preventDefault();
		axios.put(`http://localhost:8000/api/channel/${props.channelId}`, {name : channelName})
			.then( res => console.log(res), 
			dispatch(
				setChannelInfo({
					channelName: channelName
				})
			))
			.catch( errors => console.log(errors)
		);
	}
	
	const handleDeleteChannel = e => {
		e.preventDefault();
		axios.delete(`http://localhost:8000/api/channel/${props.channelId}`)
			.then( res => console.log(res))
			.catch( errors => console.log(errors)
		);
	}

	return (
		<div className="sidebarChannel"
			onClick={() =>
				dispatch(
					setChannelInfo({
						channelId: props.channelId,
						channelName: props.channelName,
					})
				)}
		>
			{ user._id === props.creatorID ? 
			<form onSubmit={handleChangeChannelName}>
				<h4>
					<span className="sidebarChannel_hash">#</span>
					<input className="channel_name" onChange={e => setChannelName(e.target.value)} value={channelName} />
					<button className="channel_inputButton" type="submit"></button>
					<DeleteForeverIcon onClick={handleDeleteChannel} />
				</h4>
			</form>
			: 
			<h4>
				<span className='sidebarChannel_hash'>#</span>{props.channelName}
			</h4>
			}
		</div>
	)
};

export default SidebarChannel;
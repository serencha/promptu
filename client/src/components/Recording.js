import React from 'react';
import { Recorder } from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css';
import { storage } from '../firebase';
// import { useHistory } from 'react-router-dom';
const { v4: uuidv4 } = require('uuid');

export class Recording extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			audioURL: null,
			audioDetails: {
				url: null,
				blob: null,
				chunks: null,
				duration: {
					h: 0,
					m: 0,
					s: 0,
				},
			},
		};
	}
	handleAudioStop(data) {
		console.log('stop');
		console.log(data);
		this.setState({ audioDetails: data });
		//console.log(data);
	}
	handleAudioUpload(file) {
		console.log('handleAudioUpload');
		// const blobUrl = this.state.audioDetails.url;
		const chunks = this.state.audioDetails.chunks;

		const uid = uuidv4();
		const audioRef = storage.ref(`audio_files/${uid}`);
		audioRef.put(chunks).then((snapshot) => {
			console.log('Uploaded an array!');
			window.location.href = '/explore';
		});

		// audioRef.putString(blobUrl, 'data_url').then((snapshot) => {
		// 	console.log('Uploaded a data_url string!');
		// });

		// console.log(file);
	}

	handleReset() {
		console.log('reset');
		// const reset = {
		// 	url: null,
		// 	blob: null,
		// 	chunks: null,
		// 	duration: {
		// 		h: 0,
		// 		m: 0,
		// 		s: 0,
		// 	},
		// };
		// this.setState({ audioDetails: reset });
	}
	render() {
		return (
			<div className='App'>
				<Recorder
					record={true}
					// title={'New recording'}
					audioURL={this.state.audioDetails.url}
					// showUIAudio
					handleAudioStop={(data) => this.handleAudioStop(data)}
					handleOnChange={(value) => this.handleOnChange(value, 'firstname')}
					handleAudioUpload={(data) => this.handleAudioUpload(data)}
					handleReset={() => this.handleReset()}
				/>
			</div>
		);
	}
}

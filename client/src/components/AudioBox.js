import { Box, Spinner, Heading } from '@chakra-ui/react';
import { storage } from '../firebase';
import React, { useEffect, useRef, useState } from 'react';
import { Wrapper } from './Wrapper';
import WaveSurfer from 'wavesurfer';

const formWaveSurferOptions = (ref) => ({
	container: ref,
	waveColor: '#eee',
	progressColor: 'OrangeRed',
	cursorColor: 'OrangeRed',
	barWidth: 3,
	barRadius: 3,
	responsive: true,
	height: 150,
	// If true, normalize by the maximum peak instead of 1.0.
	normalize: true,
	// Use the PeakCache to improve rendering speed of large waveforms.
	partialRender: true,
});

export default function Waveform({ url }) {
	const waveformRef = useRef(null);
	const wavesurfer = useRef(null);
	const [playing, setPlay] = useState(false);
	const [volume, setVolume] = useState(0.5);

	// create new WaveSurfer instance
	// On component mount and when url changes
	useEffect(() => {
		setPlay(false);

		const options = formWaveSurferOptions(waveformRef.current);
		wavesurfer.current = WaveSurfer.create(options);

		wavesurfer.current.load(url);

		wavesurfer.current.on('ready', function () {
			// https://wavesurfer-js.org/docs/methods.html
			// wavesurfer.current.play();
			// setPlay(true);

			// make sure object stillavailable when file loaded
			if (wavesurfer.current) {
				wavesurfer.current.setVolume(volume);
				setVolume(volume);
			}
		});

		// Removes events, elements and disconnects Web Audio nodes.
		// when component unmount
		return () => wavesurfer.current.destroy();
	}, [url]);

	const handlePlayPause = () => {
		setPlay(!playing);
		wavesurfer.current.playPause();
	};

	const onVolumeChange = (e) => {
		const { target } = e;
		const newVolume = +target.value;

		if (newVolume) {
			setVolume(newVolume);
			wavesurfer.current.setVolume(newVolume || 1);
		}
	};

	return (
		<div>
			<div id='waveform' ref={waveformRef} />
			<div className='controls'>
				<button onClick={handlePlayPause}>{!playing ? 'Play' : 'Pause'}</button>
			</div>
		</div>
	);
}

export const AudioBox = (props) => {
	// const url =
	//   "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3";
	const downloadUrlHeader = 'gs://promptu-1caad.appspot.com';

	const [urlString, setUrlString] = useState('');

	storage
		.refFromURL(`${downloadUrlHeader}/${props.link}`)
		.getDownloadURL()
		.then((url) => setUrlString(url))
		.catch((error) => {
			console.log('download error: ', error);
		});

	useEffect(() => {}, [urlString]);

	return (
		<Wrapper variant='small'>
			<Box>
				<Heading>{props.username}</Heading>
				{urlString ? <Waveform url={urlString} /> : <Spinner />}
			</Box>
		</Wrapper>
	);
};

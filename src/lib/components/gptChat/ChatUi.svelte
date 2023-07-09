<script>
	import ChatMessage from './ChatMessage.svelte';
	import TodayDivider from './TodayDivider.svelte';
	import Fa from 'svelte-fa';
	import {
		faUsers,
		faCompressArrowsAlt,
		faComments,
		faEnvelope
	} from '@fortawesome/free-solid-svg-icons';
	import { chatMessages, viewerLotes } from '/src/stores/toolStore.js';

	let nameMe = 'Me';
	let profilePicMe =
		'https://p0.pikist.com/photos/474/706/boy-portrait-outdoors-facial-men-s-young-t-shirt-hair-person-thumbnail.jpg';

	let nameChatPartner = 'Cris';
	let profilePicChatPartner = '/icons/robot.svg';
	let currentInput = '';

	//base mesage ui
	const baseM = {
		messageId: 0,
		message: '',
		timestamp: Date.now(),
		sentByMe: false,
		timeRead: 0
	};
	//chatMessages.set(messages);
	function addMessage() {
		//add new message to the store
		console.log(currentInput.value);
		if (currentInput.value) {
			const _baseM = { ...baseM };
			_baseM.message = currentInput.value;
			_baseM.sentByMe = true;
			chatMessages.update((messages) => [...messages, _baseM]);
			askBot();
		}
	}
	function askBot() {
		//create a fetch request to the api	/bimbot
		fetch('http://localhost:5173/api/bimbot', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ lotes: $viewerLotes, messages: $chatMessages })
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.message) {
					const _baseM = { ...baseM };
					_baseM.message = data.message.choices[0].message.content;
					_baseM.sentByMe = false;
					chatMessages.update((messages) => [...messages, _baseM]);
					console.log('Success-------------------------:', data.message.choices[0].message.content);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		//console.log('chattt messages', $chatMessages);
	}
	//$: console.log($chatMessages);
</script>

<div class="card-container">
	<div class="card-body">
		<div class="direct-chat-messages">
			{#each $chatMessages as message}
				<ChatMessage
					{nameMe}
					{profilePicMe}
					{nameChatPartner}
					{profilePicChatPartner}
					message={message.message}
					timestamp={message.timestamp}
					sentByMe={message.sentByMe}
					timeRead={message.timeRead}
				/>
			{/each}
		</div>
	</div>
	<div class="card-footer">
		<div class="input-group">
			<input
				bind:this={currentInput}
				type="text"
				placeholder="Type Message ..."
				class="form-control"
			/>
			<span class="input-group-append">
				<button type="button" class="btn-primary" on:click={addMessage}>Send</button>
			</span>
		</div>
	</div>
</div>

<style>
	.card-container {
		border-radius: 0.25rem;
		margin-bottom: 1rem;
		width: 100%;
		height: auto;
	}

	.card-header {
		padding: 0.75rem 1.25rem;
		background-color: #dc3545;
		color: #fff;
	}

	.card-tools {
		align-items: center;
	}

	.contacts-img {
		border-radius: 50%;
		width: 40px;
		height: 40px;
	}

	.contacts-name {
		margin-left: 15px;
		font-weight: 600;
	}

	.card-body {
		padding: 0;
		position: relative;
		overflow-x: hidden;
	}

	.direct-chat-messages {
		transform: translate(0, 0);
		height: 400px;
		overflow: auto;
		padding: 10px;
		transition: transform 0.5s ease-in-out;
	}

	.card-footer {
		padding: 0.75rem 1.25rem;
		background-color: #f8f9fa;
		border-top: 1px solid #dee2e6;
	}

	.form-control {
		display: block;
		width: 100%;
		height: calc(1.5em + 0.75rem + 2px);
		padding: 0.375rem 0.75rem;
		font-weight: 400;
		line-height: 1.5;
		font-size: 0.7rem;
		color: #495057;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		border-radius: 0.25rem;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	}

	.btn-primary {
		color: #fff;
		font-size: 0.7rem;
	}

	/* Add any additional custom styles as needed */
</style>

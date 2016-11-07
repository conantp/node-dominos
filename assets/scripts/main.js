		var socket = io();

		var dominos_client = {};

		dominos_client.active_player = false;
		dominos_client.error_message = false;

		dominos_client.debug = true;

		dominos_client.domino_template = $(".domino-template").remove();

		dominos_client.uiState = {};

		dominos_client.updateUI = function(){
			if(dominos_client.error_message){
				if($(".player-hand-container .error").length){
					$(".player-hand-container .error").remove();
					$(".player-hand-container").append("<div class='error'><h2>Error</h2>" + dominos_client.error_message + "</div>");
				}
				else{
					$(".player-hand-container").append("<div class='error'><h2>Error</h2>" + dominos_client.error_message + "</div>");
				}
			}
			else{
				$(".player-hand-container .error").fadeOut();
			}

			if(dominos_client.active_player){
				if(	! dominos_client.uiState.player || 
					dominos_client.uiState.player.id != dominos_client.active_player.id
				){
					// if($('.player-hand .domino').length){

					// }
					// $('.player-hand').fadeOut(function(){
						$(".active-player-name").html(dominos_client.active_player.player_name);

						// $(".step1").fadeOut();



						$('.player-hand').html("");
						if(dominos_client.active_player.hand.length){
							for(index in dominos_client.active_player.hand){
								bone = dominos_client.active_player.hand[index];
								console.log(bone);

								var template = dominos_client.domino_template.clone();

								template.find('.top').html(bone.top_number);
								template.find('.bottom').html(bone.bottom_number);
								template.attr('data-domino-index', index);

								$('.player-hand').append(template);
							}
						}

						$('.player-hand').fadeIn();


						dominos_client.uiState.player = dominos_client.active_player;
					// });


				}


			}
		};

		dominos_client.handlePlayError = function(error){
			console.log('play error', error);

			dominos_client.error_message = error;
			dominos_client.updateUI();
		};

		dominos_client.handlePlayerRefresh = function(player){
			console.log('refresh player', player);
			dominos_client.error_message = false;

			// if(! dominos_client.active_player){
				dominos_client.active_player = new Player();
			// }
			dominos_client.active_player.fromJSON(player);
			console.log('active player', dominos_client.active_player);

			dominos_client.updateUI();
		};

		dominos_client.handleDominoClick = function(event){
			var domino_index = $(this).attr('data-domino-index');
			
			socket.emit('domino-play', dominos_client.active_player, dominos_client.active_player.hand[domino_index]);


			// delete dominos_client.active_player.hand[domino_index];

			// dominos_client.updateUI();
		};  

		dominos_client.handlePlayerName = function(){
			var player_name = $('.player-name').val();
			$('.player-name').val("");

			console.log('player_name', player_name);

			var player = new Player(player_name);

			socket.emit('player-add', player);
			return false;
		};

		socket.on('player-refresh', dominos_client.handlePlayerRefresh);
		socket.on('domino-play-error', dominos_client.handlePlayError);
		socket.on('active-player-refresh', dominos_client.handlePlayerRefresh);

		$(document).on('submit', '.player-name-form', dominos_client.handlePlayerName);

		$(document).on('click', '.domino', dominos_client.handleDominoClick);

		$(document).ready(function(){
			dominos_client.updateUI();
		});

		

// Board Stuff
		dominos_board_client = {};
		dominos_board_client.active_board = false;
		dominos_board_client.error_message = false;

		dominos_board_client.updateUI = function(){
			if(dominos_board_client.error_message){
				$(".board").after("<div class='error'><h2>Error</h2>" + dominos_client.error_message + "</div>");
			}
			else{
				$(".board .error").fadeOut();
			}
			if(dominos_board_client.active_board){
				$('.board').html("");
				if(dominos_board_client.active_board.pieces_right.length){
					for(index in dominos_board_client.active_board.pieces_right){
						bone = dominos_board_client.active_board.pieces_right[index];
						console.log(bone);

						var template = dominos_client.domino_template.clone();

						template.find('.top').html(bone.top_number);
						template.find('.bottom').html(bone.bottom_number);
						template.attr('data-domino-index', index);

						if(bone.top_number == bone.bottom_number ){
							template.addClass('double');
						}

						$('.board').append(template);
					}
				}

				if(dominos_board_client.active_board.pieces_left.length){
					for(index in dominos_board_client.active_board.pieces_left){
						bone = dominos_board_client.active_board.pieces_left[index];
						console.log(bone);

						var template = dominos_client.domino_template.clone();

						template.find('.top').html(bone.top_number);
						template.find('.bottom').html(bone.bottom_number);
						template.attr('data-domino-index', index);

						
						if(bone.top_number == bone.bottom_number ){
							template.addClass('double');
						}

						$('.board').prepend(template);
					}
				}
			}
		};

		dominos_board_client.handleBoardRefresh = function(boardJSON){
			console.log('refresh board', boardJSON);
			dominos_board_client.error_message = false;

			if(! dominos_board_client.active_board){
				dominos_board_client.active_board = new Board();
			}
			dominos_board_client.active_board.fromJSON(boardJSON);
			console.log('active board', dominos_board_client.active_board);

			dominos_board_client.updateUI();
		};
		socket.on('board-refresh', dominos_board_client.handleBoardRefresh);

		dominos_board_client.handlePlayerScore = function(playerJSON, score){
			console.log('player score', playerJSON);
			dominos_board_client.error_message = false;

			var scorePlayer = new Player();
			scorePlayer.fromJSON(playerJSON);

			$(".score").html(scorePlayer.player_name  + " scored " + score + "!");

			dominos_board_client.updateUI();
		};
		socket.on('player-score', dominos_board_client.handlePlayerScore);
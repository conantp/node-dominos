
var player_list_client = {};

player_list_client.player_list = [];
player_list_client.active_player = false;

player_list_client.template = $('.player-template').remove();

player_list_client.updateUI = function(){
	$('.player-list').html("");
	if(player_list_client.player_list.length){
		for(var index in player_list_client.player_list){
			player = player_list_client.player_list[index];
			console.log(player);



			var template = player_list_client.template.clone();

			template.find('h2').html(player.player_name);
			template.find('.player-score').html(player.score);
			template.attr('data-player-id', index);

			if(player.id == player_list_client.active_player.id){
				template.css('border', '1px solid red');
			}

			$('.player-list').append(template);
		}
	}

	if(player_list_client.active_player){

	}
};
player_list_client.handlePlayerListRefresh = function(json){
	console.log('ehasd', json);
	player_list_client.player_list = [];

	for(var index in json){
		var playerJSON = json[index];
		var temp = new Player();
		console.log(playerJSON);
		temp.fromJSON(playerJSON);
		player_list_client.player_list.push(temp);
	}

	player_list_client.updateUI();
};

player_list_client.handleActivePlayerRefresh = function(json){
	console.log('ehasd', json);

	var temp = new Player();
	temp.fromJSON(json);
	console.log('active player update', temp);
	player_list_client.active_player = temp;

	player_list_client.updateUI();
};


player_list_client.handlePlayerClick = function(){
	var player_id = $(this).attr('data-player-id');
	console.log('player-id', player_id);
	if(player_id){
		dominos_client.active_player = player_list_client.player_list[player_id];
		dominos_client.updateUI();
	}
};

player_list_client.handleReset = function(){
	socket.emit('reset-game');
};

$(document).on('click', '#reset', player_list_client.handleReset);

$(document).on('click', '.player', player_list_client.handlePlayerClick);
socket.on('player-list', player_list_client.handlePlayerListRefresh);
socket.on('active-player-refresh', player_list_client.handleActivePlayerRefresh);




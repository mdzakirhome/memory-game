function generateLetters(){
	var array = [];
	var cols = Number($('.col').val()) || 4;
	var rows = Number($('.row').val()) || 4;

	if((cols*rows) % 2 === 0){

		$('.oddGridError').hide();

		var gridCellsCount = cols*rows;
		var letter = 65 + Math.round((gridCellsCount/2)), i, g = 2;
		while(g > 0){
			for(i=65;i<letter;i++){
				var _char = String.fromCharCode(i);
				array.push(_char);
			}
			g--;
		}

		arr = shuffle(array);
		generateGrid(arr, cols);

	} else {
		$('.oddGridError').show();
		return false;
	}
}

function generateGrid(arr, cols){
	var output = '<ul>', i;
	for ( i = 0; i < arr.length; i++) { 
	  output += "<li onclick='clickCard(this);'><span class='layer'></span>";
	  output += "<span class='alphabet'>"+arr[i]+"</span>";
	  output += "</li>";
	}
	output += "</ul>";
	var s = $('.gameWrapper').html(output);
	s.find("ul").width(($('li').width()+20)*cols);
	$("#container").html(s);
}

var clickCount = 0,
	matchCount = 0,
	cardCount = 0,
	check1 = '',
	check2 = '';

function clickCard(ele){
	if(!$(ele).find('.layer').hasClass('flipped') && !$(ele).find('.layer').hasClass('.matched') && cardCount < 2){
		clickCount++;
		
		cardCount++;
		$(ele).find('.layer').addClass('flipped');
	
		if(cardCount === 1){
			check1 = $(ele).find('.alphabet').text();
		}else{
			check2 = $(ele).find('.alphabet').text();

			if(check1 === check2){
				$('li').each(function(){
					if($(this).find('.alphabet').text() === check2){
						$(this).find('.layer').addClass('matched');
					}
				});
				matchCount++;
			} else{
				setTimeout(function() {
		          $(".layer").not(".matched").show();
		          $(".layer").not(".matched").removeClass("flipped");
		        }, 1000);
			}
			cardCount = 0;

		}
	}
	$('.clickCount').text(clickCount);
	$('.matchCount').text(matchCount);
}

$(function(){
	generateLetters();
});


function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}







// QUINTEN BATTERMAN
//EECS 368 project


let weight = 0;
let suits = ["S", "H", "D", "C"];
let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = new Array();

let score1 = 0;
let score2 = 0;
let wins = 0;
let losses = 0;

let player1 = new Array();
let player2 = new Array();
let hold;

function start()
{
	createDeck();
	
	document.getElementById("start").style.visibility = "hidden";
	document.getElementById("totals").style.visibility = "visible";

	reset();
	
}

function reset()
{
	document.getElementById("hit").disabled = true;
	document.getElementById("stay").disabled = true;
	
	score1 =0;
	player1 = new Array();
	hold = deck.pop();
	document.getElementById("player1").src = hold.Value.toString() + hold.Suit.toString() + ".jpg";
	playerScore();
	
	score2 = 0;
	player2 = new Array()
	hold = deck.pop();
	document.getElementById("player2").src = hold.Value.toString() + hold.Suit.toString() + ".jpg";
	computerScore();
	
	
	//delay laying players second card to show stacking
	setTimeout(function(){
	document.getElementById("hit").disabled = false;
	document.getElementById("stay").disabled = false;
	hold = deck.pop();
	document.getElementById("player1").src = hold.Value.toString() + hold.Suit.toString() + ".jpg";
	playerScore();
	if(score1 == 21)
		blackjack();
	}, 1000);
	
	
}

function blackjack()
{
	document.getElementById("stay").disabled = true;
	document.getElementById("player1").src = hold.Value.toString() + hold.Suit.toString() + ".jpg";
	setTimeout(function(){
	alert("BlackJack!!!");
	wins++;
	document.getElementById("totals").value = "games won: " + wins +" ... games lost: " + losses;

	score1 = 0;
	
		document.getElementById("player1").src = "Gray_back.jpg";
		document.getElementById("player2").src = "Gray_back.jpg";
		document.getElementById("playerScore").value = 0;
		document.getElementById("computerScore").value = 0;
	}, 750);
	
}

function playerScore()
{
	score1 = score1 + hold.Weight;
	player1.push(hold)
	document.getElementById("playerScore").value = score1;

	if(score1 > 21)
	{
		let ace = 0;
		score1 = 0;
		for (let i = 0; i < player1.length; i++)
		{
			if(player1[i].Value.toString() == "A")
			{
				ace++;
			}
			score1 = score1 + player1[i].Weight;
		}
		
		for(i = 0; i < ace; i++)
		{
			if(score1 > 21)
				score1 = score1 - 10;
		}
		document.getElementById("playerScore").value = score1;
		if(score1 > 21)
			playerBust();
	} 
	
	
}

function computerScore()
{
	score2 = score2 + hold.Weight;
	player2.push(hold)
	
	document.getElementById("computerScore").value = score2;

	if(score2 > 21)
	{
		let ace = 0;
		score2 = 0;
		for (let i = 0; i < player2.length; i++)
		{
			if(player2[i].Value.toString() == "A")
			{
				ace++;
			}
			score2 = score2 + player2[i].Weight;
		}
		
		for(i = 0; i < ace; i++)
		{
			if(score2 > 21)
				score2 = score2 - 10;
		}
		
		document.getElementById("computerScore").value = score2;

	} 
	
	//only possible after choosing stay
	setTimeout(function(){
	if(player2.length > 1 && score2 < 17)
	{
		stay();
	}
	else if (player2.length > 1)
	{
		findWinner();
	}
	}, 1000);
	
	
}

function playerBust()
{
	document.getElementById("stay").disabled = true;
	losses++;
	score1 = 0;
	document.getElementById("totals").value = "games won: " + wins +" ... games lost: " + losses;
	
	setTimeout(function(){
	document.getElementById("player1").src = "Gray_back.jpg";
	document.getElementById("player2").src = "Gray_back.jpg";
	
	
	
	document.getElementById("playerScore").value = 0;
	document.getElementById("computerScore").value = 0;
	alert("You busted, House wins!");
	}, 500);

	
}



function createDeck()
{
	deck = new Array();
	let weight;
	for (let x = 0 ; x < values.length; x++)
	{
		for(let y = 0; y < suits.length; y++)
		{
			if (values[x] == "J" || values[x] == "Q" || values[x] == "K")
				weight = 10;
			else if (values[x] == "A")
				weight = 11;
			else
				weight = parseInt(values[x]);
			let card = { Value: values[x], Suit: suits[y], Weight: weight };
			deck.push(card);
		}
	}
	shuffle();
}


function shuffle()
{
	for (let i = 0; i < 50000; i++)
	{
		let card1 = Math.floor((Math.random() * deck.length));
		let card2 = Math.floor((Math.random() * deck.length));
		let temp = deck[card1];

		deck[card1] = deck[card2];
		deck[card2] = temp;
	}
}		
		
		
function hit()
{
	if(deck.length == 0)
	{
		createDeck();
		alert("new deck put into play");
	}
	
	if(score1 == 0)
		reset();
	
	else
	{
		let pic = document.getElementById("player1");
		hold = deck.pop();

		pic.src = hold.Value.toString() + hold.Suit.toString() + ".jpg";
		playerScore();
	
	}


}


function stay()
{
	document.getElementById("hit").disabled = true;
	document.getElementById("stay").disabled = true;
	

		if(deck.length == 0)
		{
			createDeck();
			alert("new deck put into play");
		}
		
		let pic = document.getElementById("player2");
		hold = deck.pop();
		pic.src = hold.Value.toString() + hold.Suit.toString() + ".jpg";
		
		computerScore();


	


}

function findWinner()
{
	if (score2 >= 17 && score2 <= 21)
	{
		if(score2 > score1)
		{
			alert("The house wins!");
			losses++
		}

		else
		{
			wins++;
			alert("You win!");
		}
		
		
	}
	else
	{
		wins++;
		alert("the dealer busted, you win!")
	}
	
	score1 = 0;
	document.getElementById("totals").value = "games won: " + wins +" ... games lost: " + losses;
	
	setTimeout(function(){
	document.getElementById("player1").src = "Gray_back.jpg";
	document.getElementById("player2").src = "Gray_back.jpg";

	document.getElementById("playerScore").value = 0;
	document.getElementById("computerScore").value = 0;
	document.getElementById("hit").disabled = false;
	}, 750);
	
}
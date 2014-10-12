var yourMisfortunes = [];
var $misfortunesElement = $('#misfortunes');

var possibleMisfortunes = [
    {
        "amount": -45,
        "message": "You went over you cell phone bill usage and owe an additional $45.00."
    },
    {
        "amount": -600,
        "message": "You have to repair your car. You owe $600.00."
    },
    {
        "amount": 40,
        "message": "You get a scratch off lottery ticket and win $40.00."
    },
    {
        "amount": -60,
        "message": "You failed to stop at a stop sign and got a ticket. You owe $60.00"
    },
    {
        "amount": -200,
        "message": "You and a friend go out to dinner three times this month. You owe $200.00"
    },
    {
        "amount": -250,
        "message": "You have birthday parties to attend it costs you $250."
    },
    {
        "amount": 0,
        "message": "You decide this month you are going to be thrifty and spend no extra money."
    },
    {
        "amount": -80,
        "message": "You decide you want to go to a Katy Perry concert. It cost you $80.00."
    },
    {
        "amount": -175,
        "message": "You need to upgrade your wardrobe for work. It costs you $175.00."
    },
    {
        "amount": -150,
        "message": "You decide you want to join the gym for the year. You pay the total for the year. It costs you $150.00."
    },
    {
        "amount": 75,
        "message": "You decide that you are going to clip coupons and save $75.00 on your groceries."
    },
    {
        "amount": -175,
        "message": "You get a cavity and your insurance doesn't cover all of the cost.  You have to pay the deductible of $175.00."
    },
    {
        "amount": 50,
        "message": "You saved money on your electric bill by not keeping lights on, using large appliances when it was not a peak time, keeping your heat or AC low, and unplugging you electronics when you leave your house. You saved $50.00 on your bill."
    },
    {
        "amount": -180,
        "message": "You go out with friends which costs you $180.00."
    },
    {
        "amount": -50,
        "message": "It is a very hot/cold month.  Your electric bill is $50.00 more this month."
    },
    {
        "amount": -150,
        "message": "You go to a wedding and it costs you $150.00."
    }
];

function addMisfortune(misfortune) {
  var thisMisfortune = possibleMisfortunes[misfortune];
  yourMisfortunes.push(thisMisfortune);
  $misfortunesElement.append('<p><strong>' + (misfortune + 1) + '</strong>: ' + thisMisfortune.message + '</p>');
}
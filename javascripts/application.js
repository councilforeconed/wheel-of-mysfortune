var misfortunes = [];
var $misfortunesElement = $('#misfortunes');

function addMisfortune(misfortune) {
  misfortunes.push(misfortune);
  $misfortunesElement.append('<p>' + misfortune + '</p>');
}
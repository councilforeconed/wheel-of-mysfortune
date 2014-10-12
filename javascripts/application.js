var yourMisfortunes = [];
var $misfortunesElement = $('#misfortunes');

function addMisfortune(misfortune) {
  yourMisfortunes.push(misfortune);
  $misfortunesElement.append('<p>' + misfortune + '</p>');
}
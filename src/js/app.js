var Clipboard = require('clipboard');
var alertify = require('alertify.js');

function onReady() {
  var clipboard = new Clipboard('.button--clipboard');

  clipboard.on('success', function(event) {
    event.clearSelection();
    alertify.log('Link copied to clipboard.');
  });

  var statusSelect = document.getElementById('status-select');
  var customType = document.getElementById('custom-status');

  statusSelect.addEventListener('change', function(event) {
    console.log(event.target.value);
    if (event.target.value === 'custom') {
      customType.classList.remove('hide');
    } else {
      customType.classList.add('hide');
    }
  });
}

document.addEventListener('DOMContentLoaded', onReady, false);

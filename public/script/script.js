$(document).ready(function () {
  var request = new XMLHttpRequest();

  $('[data-toggle="tooltip"]').tooltip();

  $('#newProgressModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var goalId = button.data('goalid');
    var modal = $(this);
    modal.find('.modal-goalid').val(goalId);
  });
});

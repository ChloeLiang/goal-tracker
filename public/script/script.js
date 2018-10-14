$(document).ready(function () {
  var request = new XMLHttpRequest();

  $('[data-toggle="tooltip"]').tooltip();

  $('#newGoalModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    modal.find('.modal-start').on('change', function (event) {
      modal.find('.modal-end').attr('min', event.target.value);
    });
  });

  $('#updateProgressModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var goalId = button.data('goalid');
    var type = button.data('type');
    var modal = $(this);
    modal.find('.modal-goalid').val(goalId);
    modal.find('.modal-type').val(type);
  });

  $('#addProgressModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var goalId = button.data('goalid');
    var modal = $(this);
    modal.find('.modal-goalid').val(goalId);
    modal.find('.modal-type').val(type);
  });

  $('#editGoalModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var goalId = button.data('goalid');
    var title = button.data('title');
    var amount = button.data('amount');
    var unit = button.data('unit');
    var start = button.data('start');
    var end = button.data('end');
    var modal = $(this);

    modal.find('.modal-form').attr('action', `/goals/${goalId}?_method=PUT`);
    modal.find('.modal-title').attr('value', title);
    modal.find('.modal-amount').attr('value', amount);
    modal.find('.modal-unit').attr('value', unit);
    modal.find('.modal-start').attr('value', start);
    modal.find('.modal-start').attr('min', start);
    modal.find('.modal-end').attr('value', end);
    modal.find('.modal-end').attr('min', start);

    modal.find('.modal-start').on('change', function (event) {
      modal.find('.modal-end').attr('min', event.target.value);
    });
  });
});

/* globals numeral */

var $activity = $('#income, #activity');

var $setSalaryButton = $('#set-salary');
var $salaryInput = $('#salary');

$setSalaryButton.on('click', function () {
  var salary = parseInt($salaryInput.val(), 10);
  updateSalary(salary);
  $setSalaryButton.parent().html(['<p>',
                                  '<strong>Annual Salary: </strong>',
                                  '<span class="salary">',
                                  numeral(salary).format('$0,0.00'),
                                  '</span></p>'].join(''));
  $activity.fadeIn();
});

$salaryInput.keyup(function () {
  if ($salaryInput.val().match(/^\d{5,7}$/)) {
    $setSalaryButton.removeClass('deactivated');
  } else {
    $setSalaryButton.addClass('deactivated');
  }
});

var expectedEarnings = 500;
var taxes = 0;
var expenses = 0;

function updateSalary(salary) {
  taxes = calculateTaxes(salary);
  expenses = calculateExpenses(salary) / 2;
  expectedEarnings = ((salary - taxes) / 24) - expenses;
  $(".paycheck-income").text(numeral(salary / 24).format('$0,0.00'));
  $(".estimated-taxes").text(numeral(taxes / 24).format('$0,0.00'));
  $(".projected-expenses").text(numeral(expenses).format('$0,0.00'));
  $(".projected-savings").text(numeral(expectedEarnings).format('$0,0.00'));
}

function calculateTaxes(salary) {
  if (salary < 8925) { return salary * 0.1; }
  if (salary < 36250) { return salary * 0.15; }
  if (salary < 87850) { return salary * 0.23; }
  return salary * 0.30;
}

function calculateExpenses(salary) {
  if (salary < 24999) { return 1200; }
  if (salary < 39999) { return 1600; }
  if (salary < 54999) { return 2000; }
  if (salary < 69999) { return 2400; }
  if (salary < 84999) { return 2600; }
  if (salary < 99999) { return 3000; }
  if (salary < 119999) { return 3400; }
  return 3800;
}

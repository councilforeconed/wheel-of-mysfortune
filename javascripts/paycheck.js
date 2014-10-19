var $ledger = $('.ledger');

var Paycheck = Backbone.Model.extend({
  initialize: function () {
    this.set('expectedEarnings', 600);
  },
  
  actualEarnings: function () {
    return this.get('expectedEarnings') + this.get('misfortune').amount;
  },
  
  toJSON: function () {
    return {
      expectedEarnings: this.get('expectedEarnings'),
      misfortune: this.get('misfortune').amount,
      actualEarnings: this.actualEarnings()
    };
  },
  
  toHTML: function () {
    return ['<tr>',
            '<td class="paycheck"></td>',
            '<td>', numeral(this.get('expectedEarnings')).format('$0,0.00'), '</td>',
            '<td>', numeral(this.get('misfortune').amount).format('$0,0.00'), '</td>',
            '<td>', numeral(this.actualEarnings()).format('$0,0.00'), '</td>',
            '<td>', numeral(Paychecks.totalEarnings()).format('$0,0.00'), '</td>',
            '</tr>'
           ].join('');
  }
});

var Paychecks = new Backbone.Collection([], {
  model: Paycheck
});

Paychecks.rebuildLedger = function () {
  $ledger.empty();
  this.models.forEach(function (paycheck) {
    $ledger.append(paycheck.toHTML());
  });
};

Paychecks.totalEarnings = function () {
  return this.models.reduce(function (sum, paycheck) {
    return sum + paycheck.actualEarnings();
  }, 0);
};

Paychecks.on('add', function (paycheck) {
  $ledger.append(paycheck.toHTML());
  chart.addValue(Paychecks.totalEarnings());
});
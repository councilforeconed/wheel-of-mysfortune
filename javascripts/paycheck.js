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
    }
  },
  
  toHTML: function () {
    return ['<tr>',
            '<td class="paycheck"></td>',
            '<td>', numeral(this.get('expectedEarnings')).format('$0,0.00'), '</td>',
            '<td>', numeral(this.get('misfortune').amount).format('$0,0.00'), '</td>',
            '<td>', numeral(this.actualEarnings()).format('$0,0.00'), '</td>',
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
  })
};

Paychecks.chartData = function () {
  var data = [ { x: 0, y: 0 } ];
  this.models.forEach(function (paycheck, index) {
    var datum = paycheck.actualEarnings() + data.slice(-1)[0].y;
    data.push({ x: (index + 1) / 2, y: datum });
  });
  return data;
};

Paychecks.on('add', function (paycheck) {
  $ledger.append(paycheck.toHTML());
  graph.series[0].data = this.chartData();
  graph.update();
});
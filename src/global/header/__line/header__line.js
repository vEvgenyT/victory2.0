var navLine = new Vue ({
  el: '#js-nav-line',
  data: {
    isActive: {
      'header__line_about': false,
      'header__line_portfolio': false,
      'header__line_service': false,
      'header__line_contacts': false
    },
    lineConst: ''
  },
  methods: {
    click: function(el) {
      this.lineConst = el;
      this.clear();
      this.isActive[this.lineConst] = true;
    },
    hover: function(el) {
      this.clear();
      this.isActive[el] = true;
    },
    leave: function(){
      this.clear();
      this.isActive[this.lineConst] = true;
    },
    clear: function() {
      for (var key in this.isActive) {
        this.isActive[key] = false;
      };
    }
  }
});

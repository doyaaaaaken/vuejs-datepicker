/*!
 * vuejs-datepicker v0.9.29
 * (c) 2016-2018 Charlie Kassel
 * Released under the MIT License.
 */
var Language = function Language (language, months, monthsAbbr, days) {
  this.language = language;
  this.months = months;
  this.monthsAbbr = monthsAbbr;
  this.days = days;
  this.rtl = false;
  this.ymd = false;
};

var prototypeAccessors = { language: { configurable: true },months: { configurable: true },monthsAbbr: { configurable: true },days: { configurable: true } };

prototypeAccessors.language.get = function () {
  return this._language
};

prototypeAccessors.language.set = function (language) {
  if (typeof language !== 'string') {
    throw new TypeError('Language must be a string')
  }
  this._language = language;
};

prototypeAccessors.months.get = function () {
  return this._months
};

prototypeAccessors.months.set = function (months) {
  if (months.length !== 12) {
    throw new RangeError(("There must be 12 months for " + (this.language) + " language"))
  }
  this._months = months;
};

prototypeAccessors.monthsAbbr.get = function () {
  return this._monthsAbbr
};

prototypeAccessors.monthsAbbr.set = function (monthsAbbr) {
  if (monthsAbbr.length !== 12) {
    throw new RangeError(("There must be 12 abbreviated months for " + (this.language) + " language"))
  }
  this._monthsAbbr = monthsAbbr;
};

prototypeAccessors.days.get = function () {
  return this._days
};

prototypeAccessors.days.set = function (days) {
  if (days.length !== 7) {
    throw new RangeError(("There must be 7 days for " + (this.language) + " language"))
  }
  this._days = days;
};

Language.prototype.toJSON = function toJSON () {
  return {
    language: this.language,
    months: this.months,
    monthsAbbr: this.monthsAbbr,
    days: this.days,
    rtl: this.rtl,
    ymd: this.ymd
  }
};

Object.defineProperties( Language.prototype, prototypeAccessors );

var en = new Language(
  'English',
  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
)
// eslint-disable-next-line
;

var DateUtils = {

  /**
   * Validates a date object
   * @param {Date} date - an object instantiated with the new Date constructor
   * @return {Boolean}
   */
  isValidDate: function isValidDate (date) {
    if (Object.prototype.toString.call(date) !== '[object Date]') {
      return false
    }
    return !isNaN(date.getTime())
  },

  /**
   * Return abbreviated week day name
   * @param {Date}
   * @param {Array}
   * @return {String}
   */
  getDayNameAbbr: function getDayNameAbbr (date, days) {
    if (typeof date !== 'object') {
      throw TypeError('Invalid Type')
    }
    return days[date.getDay()]
  },

  /**
   * Return name of the month
   * @param {Number|Date}
   * @param {Array}
   * @return {String}
   */
  getMonthName: function getMonthName (month, months) {
    if (!months) {
      throw Error('missing 2nd parameter Months array')
    }
    if (typeof month === 'object') {
      return months[month.getMonth()]
    }
    if (typeof month === 'number') {
      return months[month]
    }
    throw TypeError('Invalid type')
  },

  /**
   * Return an abbreviated version of the month
   * @param {Number|Date}
   * @return {String}
   */
  getMonthNameAbbr: function getMonthNameAbbr (month, monthsAbbr) {
    if (!monthsAbbr) {
      throw Error('missing 2nd paramter Months array')
    }
    if (typeof month === 'object') {
      return monthsAbbr[month.getMonth()]
    }
    if (typeof month === 'number') {
      return monthsAbbr[month]
    }
    throw TypeError('Invalid type')
  },

  /**
   * Alternative get total number of days in month
   * @param {Number} year
   * @param {Number} m
   * @return {Number}
   */
  daysInMonth: function daysInMonth (year, month) {
    return /8|3|5|10/.test(month) ? 30 : month === 1 ? (!(year % 4) && year % 100) || !(year % 400) ? 29 : 28 : 31
  },

  /**
   * Get nth suffix for date
   * @param {Number} day
   * @return {String}
   */
  getNthSuffix: function getNthSuffix (day) {
    switch (day) {
      case 1:
      case 21:
      case 31:
        return 'st'
      case 2:
      case 22:
        return 'nd'
      case 3:
      case 23:
        return 'rd'
      default:
        return 'th'
    }
  },

  /**
   * Formats date object
   * @param {Date}
   * @param {String}
   * @param {Object}
   * @return {String}
   */
  formatDate: function formatDate (date, format, translation) {
    translation = (!translation) ? en : translation;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var str = format
      .replace(/dd/, ('0' + day).slice(-2))
      .replace(/d/, day)
      .replace(/yyyy/, year)
      .replace(/yy/, String(year).slice(2))
      .replace(/MMMM/, this.getMonthName(date.getMonth(), translation.months))
      .replace(/MMM/, this.getMonthNameAbbr(date.getMonth(), translation.monthsAbbr))
      .replace(/MM/, ('0' + month).slice(-2))
      .replace(/M(?!a|ä|e)/, month)
      .replace(/su/, this.getNthSuffix(date.getDate()))
      .replace(/D(?!e|é|i)/, this.getDayNameAbbr(date, translation.days));
    return str
  },

  /**
   * Creates an array of dates for each day in between two dates.
   * @param {Date} start
   * @param {Date} end
   * @return {Array}
   */
  createDateArray: function createDateArray (start, end) {
    var dates = [];
    while (start <= end) {
      dates.push(new Date(start));
      start = new Date(start).setDate(new Date(start).getDate() + 1);
    }
    return dates
  }

}
// eslint-disable-next-line
;

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
var DateInput = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{'input-group' : _vm.bootstrapStyling}},[(_vm.calendarButton)?_c('span',{staticClass:"vdp-datepicker__calendar-button",class:{'input-group-addon' : _vm.bootstrapStyling},style:({'cursor:not-allowed;' : _vm.disabledPicker}),on:{"click":_vm.showCalendar}},[_c('i',{class:_vm.calendarButtonIcon},[_vm._v(" "+_vm._s(_vm.calendarButtonIconContent)+" "),(!_vm.calendarButtonIcon)?_c('span',[_vm._v("…")]):_vm._e()])]):_vm._e(),_vm._v(" "),_c('input',{ref:_vm.refName,class:_vm.computedInputClass,attrs:{"type":_vm.inline ? 'hidden' : 'text',"name":_vm.name,"id":_vm.id,"open-date":_vm.openDate,"placeholder":_vm.placeholder,"clear-button":_vm.clearButton,"disabled":_vm.disabledPicker,"required":_vm.required,"readonly":"readonly"},domProps:{"value":_vm.formattedValue},on:{"click":_vm.showCalendar}}),_vm._v(" "),(_vm.clearButton && _vm.selectedDate)?_c('span',{staticClass:"vdp-datepicker__clear-button",class:{'input-group-addon' : _vm.bootstrapStyling},on:{"click":function($event){_vm.clearDate();}}},[_c('i',{class:_vm.clearButtonIcon},[(!_vm.clearButtonIcon)?_c('span',[_vm._v("×")]):_vm._e()])]):_vm._e()])},staticRenderFns: [],
  props: {
    selectedDate: Date,
    format: String,
    translation: Object,
    inline: Boolean,
    id: String,
    name: String,
    refName: String,
    openDate: Date,
    placeholder: String,
    inputClass: [String, Object],
    clearButton: Boolean,
    clearButtonIcon: String,
    calendarButton: Boolean,
    calendarButtonIcon: String,
    calendarButtonIconContent: String,
    disabledPicker: Boolean,
    required: Boolean,
    bootstrapStyling: Boolean
  },
  computed: {
    formattedValue: function formattedValue () {
      if (!this.selectedDate) {
        return null
      }
      return typeof this.format === 'function'
        ? this.format(this.selectedDate)
        : DateUtils.formatDate(new Date(this.selectedDate), this.format, this.translation)
    },

    computedInputClass: function computedInputClass () {
      var cssClass = [this.inputClass];
      if (this.bootstrapStyling) {
        cssClass.push('form-control');
      }
      return cssClass.join(' ')
    }
  },
  methods: {
    showCalendar: function showCalendar () {
      this.$emit('showCalendar');
    }
  }
}
// eslint-disable-next-line
;

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
var PickerDay = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showDayView),expression:"showDayView"}],class:[_vm.calendarClass, 'vdp-datepicker__calendar'],style:(_vm.calendarStyle)},[_c('header',[_c('span',{staticClass:"prev",class:{ 'disabled' : _vm.isRtl ? _vm.nextMonthDisabled(_vm.pageTimestamp) : _vm.previousMonthDisabled(_vm.pageTimestamp) },on:{"click":function($event){_vm.isRtl ? _vm.nextMonth() : _vm.previousMonth();}}},[_vm._v("<")]),_vm._v(" "),_c('span',{class:_vm.allowedToShowView('month') ? 'up' : '',on:{"click":_vm.showMonthCalendar}},[_vm._v(_vm._s(_vm.isYmd ? _vm.currYear : _vm.currMonthName)+" "+_vm._s(_vm.isYmd ? _vm.currMonthName : _vm.currYear))]),_vm._v(" "),_c('span',{staticClass:"next",class:{ 'disabled' : _vm.isRtl ? _vm.previousMonthDisabled(_vm.pageTimestamp) : _vm.nextMonthDisabled(_vm.pageTimestamp) },on:{"click":function($event){_vm.isRtl ? _vm.previousMonth() : _vm.nextMonth();}}},[_vm._v(">")])]),_vm._v(" "),_c('div',{class:_vm.isRtl ? 'flex-rtl' : ''},[_vm._l((_vm.daysOfWeek),function(d){return _c('span',{key:d.timestamp,staticClass:"cell day-header"},[_vm._v(_vm._s(d))])}),_vm._v(" "),(_vm.blankDays > 0)?_vm._l((_vm.blankDays),function(d){return _c('span',{key:d.timestamp,staticClass:"cell day blank"})}):_vm._e(),_vm._l((_vm.days),function(day){return _c('span',{key:day.timestamp,staticClass:"cell day",class:_vm.dayClasses(day),on:{"click":function($event){_vm.selectDate(day);}}},[_vm._v(_vm._s(day.date))])})],2)])},staticRenderFns: [],
  props: {
    showDayView: Boolean,
    selectedDate: Date,
    pageDate: Date,
    pageTimestamp: Number,
    fullMonthName: Boolean,
    allowedToShowView: Function,
    disabled: Object,
    highlighted: Object,
    calendarClass: String,
    calendarStyle: Object,
    translation: Object,
    isRtl: Boolean,
    mondayFirst: Boolean
  },
  computed: {
    /**
     * Returns an array of day names
     * @return {String[]}
     */
    daysOfWeek: function daysOfWeek () {
      if (this.mondayFirst) {
        var tempDays = this.translation.days.slice();
        tempDays.push(tempDays.shift());
        return tempDays
      }
      return this.translation.days
    },
    /**
     * Returns the day number of the week less one for the first of the current month
     * Used to show amount of empty cells before the first in the day calendar layout
     * @return {Number}
     */
    blankDays: function blankDays () {
      var d = this.pageDate;
      var dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
      if (this.mondayFirst) {
        return dObj.getDay() > 0 ? dObj.getDay() - 1 : 6
      }
      return dObj.getDay()
    },
    /**
     * @return {Object[]}
     */
    days: function days () {
      var this$1 = this;

      var d = this.pageDate;
      var days = [];
      // set up a new date object to the beginning of the current 'page'
      var dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
      var daysInMonth = DateUtils.daysInMonth(dObj.getFullYear(), dObj.getMonth());
      for (var i = 0; i < daysInMonth; i++) {
        days.push({
          date: dObj.getDate(),
          timestamp: dObj.getTime(),
          isSelected: this$1.isSelectedDate(dObj),
          isDisabled: this$1.isDisabledDate(dObj),
          isHighlighted: this$1.isHighlightedDate(dObj),
          isHighlightStart: this$1.isHighlightStart(dObj),
          isHighlightEnd: this$1.isHighlightEnd(dObj),
          isToday: dObj.toDateString() === (new Date()).toDateString(),
          isWeekend: dObj.getDay() === 0 || dObj.getDay() === 6,
          isSaturday: dObj.getDay() === 6,
          isSunday: dObj.getDay() === 0
        });
        dObj.setDate(dObj.getDate() + 1);
      }
      return days
    },

    currMonthName: function currMonthName () {
      var monthName = this.fullMonthName ? this.translation.months : this.translation.monthsAbbr;
      return DateUtils.getMonthNameAbbr(this.pageDate.getMonth(), monthName)
    },

    currYear: function currYear () {
      return this.pageDate.getFullYear()
    },

    isYmd: function isYmd () {
      return this.translation.ymd && this.translation.ymd === true
    }
  },
  methods: {
    selectDate: function selectDate (date) {
      if (date.isDisabled) {
        this.$emit('selectedDisabled', date);
        return false
      }
      this.$emit('selectDate', date);
    },
    /**
     * @return {Number}
     */
    getPageMonth: function getPageMonth () {
      return this.pageDate.getMonth()
    },
    /**
     * @return {Number}
     */
    getPageYear: function getPageYear () {
      return this.pageDate.getYear()
    },
    showMonthCalendar: function showMonthCalendar () {
      this.$emit('showMonthCalendar');
    },
    changeMonth: function changeMonth (incrementBy) {
      var date = this.pageDate;
      date.setMonth(date.getMonth() + incrementBy);
      this.$emit('changedMonth', date);
    },

    previousMonth: function previousMonth () {
      if (!this.previousMonthDisabled()) {
        this.changeMonth(-1);
      }
    },
    previousMonthDisabled: function previousMonthDisabled () {
      if (!this.disabled || !this.disabled.to) {
        return false
      }
      var d = this.pageDate;
      return this.disabled.to.getMonth() >= d.getMonth() &&
        this.disabled.to.getFullYear() >= d.getFullYear()
    },
    nextMonth: function nextMonth () {
      if (!this.nextMonthDisabled()) {
        this.changeMonth(+1);
      }
    },
    nextMonthDisabled: function nextMonthDisabled () {
      if (!this.disabled || !this.disabled.from) {
        return false
      }
      var d = this.pageDate;
      return this.disabled.from.getMonth() <= d.getMonth() &&
        this.disabled.from.getFullYear() <= d.getFullYear()
    },
    /**
     * Whether a day is selected
     * @param {Date}
     * @return {Boolean}
     */
    isSelectedDate: function isSelectedDate (dObj) {
      return this.selectedDate && this.selectedDate.toDateString() === dObj.toDateString()
    },
    /**
     * Whether a day is disabled
     * @param {Date}
     * @return {Boolean}
     */
    isDisabledDate: function isDisabledDate (date) {
      var disabled = false;

      if (typeof this.disabled === 'undefined') {
        return false
      }

      if (typeof this.disabled.dates !== 'undefined') {
        this.disabled.dates.forEach(function (d) {
          if (date.toDateString() === d.toDateString()) {
            disabled = true;
            return true
          }
        });
      }
      if (typeof this.disabled.to !== 'undefined' && this.disabled.to && date < this.disabled.to) {
        disabled = true;
      }
      if (typeof this.disabled.from !== 'undefined' && this.disabled.from && date > this.disabled.from) {
        disabled = true;
      }
      if (typeof this.disabled.ranges !== 'undefined') {
        this.disabled.ranges.forEach(function (range) {
          if (typeof range.from !== 'undefined' && range.from && typeof range.to !== 'undefined' && range.to) {
            if (date < range.to && date > range.from) {
              disabled = true;
              return true
            }
          }
        });
      }
      if (typeof this.disabled.days !== 'undefined' && this.disabled.days.indexOf(date.getDay()) !== -1) {
        disabled = true;
      }
      if (typeof this.disabled.daysOfMonth !== 'undefined' && this.disabled.daysOfMonth.indexOf(date.getDate()) !== -1) {
        disabled = true;
      }
      if (typeof this.disabled.customPredictor === 'function' && this.disabled.customPredictor(date)) {
        disabled = true;
      }
      return disabled
    },
    /**
     * Whether a day is highlighted (only if it is not disabled already except when highlighted.includeDisabled is true)
     * @param {Date}
     * @return {Boolean}
     */
    isHighlightedDate: function isHighlightedDate (date) {
      if (!(this.highlighted && this.highlighted.includeDisabled) && this.isDisabledDate(date)) {
        return false
      }

      var highlighted = false;

      if (typeof this.highlighted === 'undefined') {
        return false
      }

      if (typeof this.highlighted.dates !== 'undefined') {
        this.highlighted.dates.forEach(function (d) {
          if (date.toDateString() === d.toDateString()) {
            highlighted = true;
            return true
          }
        });
      }

      if (this.isDefined(this.highlighted.from) && this.isDefined(this.highlighted.to)) {
        highlighted = date >= this.highlighted.from && date <= this.highlighted.to;
      }

      if (typeof this.highlighted.days !== 'undefined' && this.highlighted.days.indexOf(date.getDay()) !== -1) {
        highlighted = true;
      }

      if (typeof this.highlighted.daysOfMonth !== 'undefined' && this.highlighted.daysOfMonth.indexOf(date.getDate()) !== -1) {
        highlighted = true;
      }

      if (typeof this.highlighted.customPredictor === 'function' && this.highlighted.customPredictor(date)) {
        highlighted = true;
      }

      return highlighted
    },
    dayClasses: function dayClasses (day) {
      return {
        'selected': day.isSelected,
        'disabled': day.isDisabled,
        'highlighted': day.isHighlighted,
        'today': day.isToday,
        'weekend': day.isWeekend,
        'sat': day.isSaturday,
        'sun': day.isSunday,
        'highlight-start': day.isHighlightStart,
        'highlight-end': day.isHighlightEnd
      }
    },
    /**
     * Whether a day is highlighted and it is the first date
     * in the highlighted range of dates
     * @param {Date}
     * @return {Boolean}
     */
    isHighlightStart: function isHighlightStart (date) {
      return this.isHighlightedDate(date) &&
        (this.highlighted.from instanceof Date) &&
        (this.highlighted.from.getFullYear() === date.getFullYear()) &&
        (this.highlighted.from.getMonth() === date.getMonth()) &&
        (this.highlighted.from.getDate() === date.getDate())
    },
    /**
     * Whether a day is highlighted and it is the first date
     * in the highlighted range of dates
     * @param {Date}
     * @return {Boolean}
     */
    isHighlightEnd: function isHighlightEnd (date) {
      return this.isHighlightedDate(date) &&
        (this.highlighted.to instanceof Date) &&
        (this.highlighted.to.getFullYear() === date.getFullYear()) &&
        (this.highlighted.to.getMonth() === date.getMonth()) &&
        (this.highlighted.to.getDate() === date.getDate())
    },
    /**
     * Helper
     * @param  {mixed}  prop
     * @return {Boolean}
     */
    isDefined: function isDefined (prop) {
      return typeof prop !== 'undefined' && prop
    }
  }
}
// eslint-disable-next-line
;

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
var PickerMonth = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showMonthView),expression:"showMonthView"}],class:[_vm.calendarClass, 'vdp-datepicker__calendar'],style:(_vm.calendarStyle)},[_c('header',[_c('span',{staticClass:"prev",class:{ 'disabled' : _vm.previousYearDisabled(_vm.pageTimestamp) },on:{"click":_vm.previousYear}},[_vm._v("<")]),_vm._v(" "),_c('span',{class:_vm.allowedToShowView('year') ? 'up' : '',on:{"click":_vm.showYearCalendar}},[_vm._v(_vm._s(_vm.getPageYear))]),_vm._v(" "),_c('span',{staticClass:"next",class:{ 'disabled' : _vm.nextYearDisabled(_vm.pageTimestamp) },on:{"click":_vm.nextYear}},[_vm._v(">")])]),_vm._v(" "),_vm._l((_vm.months),function(month){return _c('span',{key:month.timestamp,staticClass:"cell month",class:{'selected': month.isSelected, 'disabled': month.isDisabled},on:{"click":function($event){$event.stopPropagation();_vm.selectMonth(month);}}},[_vm._v(_vm._s(month.month))])})],2)},staticRenderFns: [],
  props: {
    showMonthView: Boolean,
    selectedDate: Date,
    pageDate: Date,
    pageTimestamp: Number,
    disabled: Object,
    calendarClass: String,
    calendarStyle: Object,
    translation: Object,
    allowedToShowView: Function
  },
  computed: {
    months: function months () {
      var this$1 = this;

      var d = this.pageDate;
      var months = [];
      // set up a new date object to the beginning of the current 'page'
      var dObj = new Date(d.getFullYear(), 0, d.getDate(), d.getHours(), d.getMinutes());
      for (var i = 0; i < 12; i++) {
        months.push({
          month: DateUtils.getMonthName(i, this$1.translation.months),
          timestamp: dObj.getTime(),
          isSelected: this$1.isSelectedMonth(dObj),
          isDisabled: this$1.isDisabledMonth(dObj)
        });
        dObj.setMonth(dObj.getMonth() + 1);
      }
      return months
    },
    /**
     * @return {Number}
     */
    getPageYear: function getPageYear () {
      return this.pageDate.getFullYear()
    }
  },
  methods: {
    selectMonth: function selectMonth (month) {
      if (month.isDisabled) {
        return false
      }
      this.$emit('selectMonth', month);
    },
    changeYear: function changeYear (incrementBy) {
      var date = this.pageDate;
      date.setYear(date.getFullYear() + incrementBy);
      this.$emit('changedYear', date);
    },
    previousYear: function previousYear () {
      if (!this.previousYearDisabled()) {
        this.changeYear(-1);
      }
    },
    previousYearDisabled: function previousYearDisabled () {
      if (!this.disabled || !this.disabled.to) {
        return false
      }
      return this.disabled.to.getFullYear() >= this.pageDate.getFullYear()
    },
    nextYear: function nextYear () {
      if (!this.nextYearDisabled()) {
        this.changeYear(1);
      }
    },
    nextYearDisabled: function nextYearDisabled () {
      if (!this.disabled || !this.disabled.from) {
        return false
      }
      return this.disabled.from.getFullYear() <= this.pageDate.getFullYear()
    },
    showYearCalendar: function showYearCalendar () {
      this.$emit('showYearCalendar');
    },
    /**
     * Whether the selected date is in this month
     * @param {Date}
     * @return {Boolean}
     */
    isSelectedMonth: function isSelectedMonth (date) {
      return (this.selectedDate &&
        this.selectedDate.getFullYear() === date.getFullYear() &&
        this.selectedDate.getMonth() === date.getMonth())
    },
    /**
     * Whether a month is disabled
     * @param {Date}
     * @return {Boolean}
     */
    isDisabledMonth: function isDisabledMonth (date) {
      var disabled = false;

      if (typeof this.disabled === 'undefined') {
        return false
      }

      if (typeof this.disabled.to !== 'undefined' && this.disabled.to) {
        if (
          (date.getMonth() < this.disabled.to.getMonth() && date.getFullYear() <= this.disabled.to.getFullYear()) ||
          date.getFullYear() < this.disabled.to.getFullYear()
        ) {
          disabled = true;
        }
      }
      if (typeof this.disabled.from !== 'undefined' && this.disabled.from) {
        if (
          this.disabled.from &&
          (date.getMonth() > this.disabled.from.getMonth() && date.getFullYear() >= this.disabled.from.getFullYear()) ||
          date.getFullYear() > this.disabled.from.getFullYear()
        ) {
          disabled = true;
        }
      }
      return disabled
    }
  }
}
// eslint-disable-next-line
;

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

















var PickerYear = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showYearView),expression:"showYearView"}],class:[_vm.calendarClass, 'vdp-datepicker__calendar'],style:(_vm.calendarStyle)},[_c('header',[_c('span',{staticClass:"prev",class:{ 'disabled' : _vm.previousDecadeDisabled(_vm.pageTimestamp) },on:{"click":_vm.previousDecade}},[_vm._v("<")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.getPageDecade))]),_vm._v(" "),_c('span',{staticClass:"next",class:{ 'disabled' : _vm.nextDecadeDisabled(_vm.pageTimestamp) },on:{"click":_vm.nextDecade}},[_vm._v(">")])]),_vm._v(" "),_vm._l((_vm.years),function(year){return _c('span',{key:year.timestamp,staticClass:"cell year",class:{ 'selected': year.isSelected, 'disabled': year.isDisabled },on:{"click":function($event){$event.stopPropagation();_vm.selectYear(year);}}},[_vm._v(_vm._s(year.year))])})],2)},staticRenderFns: [],
  props: {
    showYearView: Boolean,
    selectedDate: Date,
    pageDate: Date,
    pageTimestamp: Number,
    disabled: Object,
    highlighted: Object,
    calendarClass: String,
    calendarStyle: Object,
    translation: Object,
    allowedToShowView: Function
  },
  computed: {
    years: function years () {
      var this$1 = this;

      var d = this.pageDate;
      var years = [];
      // set up a new date object to the beginning of the current 'page'
      var dObj = new Date(Math.floor(d.getFullYear() / 10) * 10, d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());
      for (var i = 0; i < 10; i++) {
        years.push({
          year: dObj.getFullYear(),
          timestamp: dObj.getTime(),
          isSelected: this$1.isSelectedYear(dObj),
          isDisabled: this$1.isDisabledYear(dObj)
        });
        dObj.setFullYear(dObj.getFullYear() + 1);
      }
      return years
    },
    /**
     * @return {String}
     */
    getPageDecade: function getPageDecade () {
      var decadeStart = Math.floor(this.pageDate.getFullYear() / 10) * 10;
      var decadeEnd = decadeStart + 9;
      return (decadeStart + " - " + decadeEnd)
    }
  },
  methods: {
    selectYear: function selectYear (year) {
      if (year.isDisabled) {
        return false
      }
      this.$emit('selectYear', year);
    },
    changeYear: function changeYear (incrementBy) {
      var date = this.pageDate;
      date.setYear(date.getFullYear() + incrementBy);
      this.$emit('changedDecade', date);
    },
    previousDecade: function previousDecade () {
      if (this.previousDecadeDisabled()) {
        return false
      }
      this.changeYear(-10);
    },
    previousDecadeDisabled: function previousDecadeDisabled () {
      if (!this.disabled || !this.disabled.to) {
        return false
      }
      return Math.floor(this.disabled.to.getFullYear() / 10) * 10 >= Math.floor(this.pageDate.getFullYear() / 10) * 10
    },
    nextDecade: function nextDecade () {
      if (this.nextDecadeDisabled()) {
        return false
      }
      this.changeYear(10);
    },
    nextDecadeDisabled: function nextDecadeDisabled () {
      if (!this.disabled || !this.disabled.from) {
        return false
      }
      return Math.ceil(this.disabled.from.getFullYear() / 10) * 10 <= Math.ceil(this.pageDate.getFullYear() / 10) * 10
    },

    /**
     * Whether the selected date is in this year
     * @param {Date}
     * @return {Boolean}
     */
    isSelectedYear: function isSelectedYear (date) {
      return this.selectedDate && this.selectedDate.getFullYear() === date.getFullYear()
    },
    /**
     * Whether a year is disabled
     * @param {Date}
     * @return {Boolean}
     */
    isDisabledYear: function isDisabledYear (date) {
      var disabled = false;
      if (typeof this.disabled === 'undefined' || !this.disabled) {
        return false
      }

      if (typeof this.disabled.to !== 'undefined' && this.disabled.to) {
        if (date.getFullYear() < this.disabled.to.getFullYear()) {
          disabled = true;
        }
      }
      if (typeof this.disabled.from !== 'undefined' && this.disabled.from) {
        if (date.getFullYear() > this.disabled.from.getFullYear()) {
          disabled = true;
        }
      }

      return disabled
    }
  }
}
// eslint-disable-next-line
;

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=".rtl { direction: rtl; } .vdp-datepicker { position: relative; text-align: left; } .vdp-datepicker * { box-sizing: border-box; } .vdp-datepicker__calendar { position: absolute; z-index: 100; background: #fff; width: 300px; border: 1px solid #ccc; } .vdp-datepicker__calendar header { display: block; line-height: 40px; } .vdp-datepicker__calendar header span { display: inline-block; text-align: center; width: 71.42857142857143%; float: left; } .vdp-datepicker__calendar header .prev, .vdp-datepicker__calendar header .next { width: 14.285714285714286%; float: left; text-indent: -10000px; position: relative; } .vdp-datepicker__calendar header .prev:after, .vdp-datepicker__calendar header .next:after { content: ''; position: absolute; left: 50%; top: 50%; -webkit-transform: translateX(-50%) translateY(-50%); transform: translateX(-50%) translateY(-50%); border: 6px solid transparent; } .vdp-datepicker__calendar header .prev:after { border-right: 10px solid #000; margin-left: -5px; } .vdp-datepicker__calendar header .prev.disabled:after { border-right: 10px solid #ddd; } .vdp-datepicker__calendar header .next:after { border-left: 10px solid #000; margin-left: 5px; } .vdp-datepicker__calendar header .next.disabled:after { border-left: 10px solid #ddd; } .vdp-datepicker__calendar header .prev:not(.disabled), .vdp-datepicker__calendar header .next:not(.disabled), .vdp-datepicker__calendar header .up:not(.disabled) { cursor: pointer; } .vdp-datepicker__calendar header .prev:not(.disabled):hover, .vdp-datepicker__calendar header .next:not(.disabled):hover, .vdp-datepicker__calendar header .up:not(.disabled):hover { background: #eee; } .vdp-datepicker__calendar .disabled { color: #ddd; cursor: default; } .vdp-datepicker__calendar .flex-rtl { display: -webkit-box; display: -ms-flexbox; display: flex; width: inherit; -ms-flex-wrap: wrap; flex-wrap: wrap; } .vdp-datepicker__calendar .cell { display: inline-block; padding: 0 5px; width: 14.285714285714286%; height: 40px; line-height: 40px; text-align: center; vertical-align: middle; border: 1px solid transparent; } .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year { cursor: pointer; } .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover { border: 1px solid #4bd; } .vdp-datepicker__calendar .cell.selected { background: #4bd; } .vdp-datepicker__calendar .cell.selected:hover { background: #4bd; } .vdp-datepicker__calendar .cell.selected.highlighted { background: #4bd; } .vdp-datepicker__calendar .cell.highlighted { background: #cae5ed; } .vdp-datepicker__calendar .cell.highlighted.disabled { color: #a3a3a3; } .vdp-datepicker__calendar .cell.grey { color: #888; } .vdp-datepicker__calendar .cell.grey:hover { background: inherit; } .vdp-datepicker__calendar .cell.day-header { font-size: 75%; white-space: no-wrap; cursor: inherit; } .vdp-datepicker__calendar .cell.day-header:hover { background: inherit; } .vdp-datepicker__calendar .month, .vdp-datepicker__calendar .year { width: 33.333%; } .vdp-datepicker__clear-button, .vdp-datepicker__calendar-button { cursor: pointer; font-style: normal; } .vdp-datepicker__clear-button.disabled, .vdp-datepicker__calendar-button.disabled { color: #999; cursor: default; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
var Datepicker = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vdp-datepicker",class:[_vm.wrapperClass, _vm.isRtl ? 'rtl' : '']},[_c('date-input',{attrs:{"selectedDate":_vm.selectedDate,"format":_vm.format,"translation":_vm.translation,"inline":_vm.inline,"id":_vm.id,"name":_vm.name,"refName":_vm.refName,"openDate":_vm.openDate,"placeholder":_vm.placeholder,"inputClass":_vm.inputClass,"clearButton":_vm.clearButton,"clearButtonIcon":_vm.clearButtonIcon,"calendarButton":_vm.calendarButton,"calendarButtonIcon":_vm.calendarButtonIcon,"calendarButtonIconContent":_vm.calendarButtonIconContent,"disabledPicker":_vm.disabledPicker,"required":_vm.required,"bootstrapStyling":_vm.bootstrapStyling},on:{"showCalendar":_vm.showCalendar}}),_vm._v(" "),(_vm.allowedToShowView('day'))?_c('picker-day',{attrs:{"pageDate":_vm.pageDate,"selectedDate":_vm.selectedDate,"showDayView":_vm.showDayView,"fullMonthName":_vm.fullMonthName,"allowedToShowView":_vm.allowedToShowView,"disabled":_vm.disabled,"highlighted":_vm.highlighted,"calendarClass":_vm.calendarClass,"calendarStyle":_vm.calendarStyle,"translation":_vm.translation,"pageTimestamp":_vm.pageTimestamp,"isRtl":_vm.isRtl,"mondayFirst":_vm.mondayFirst},on:{"changedMonth":_vm.setPageDate,"selectDate":_vm.selectDate,"showMonthCalendar":_vm.showMonthCalendar,"selectedDisabled":function($event){_vm.$emit('selectedDisabled');}}}):_vm._e(),_vm._v(" "),(_vm.allowedToShowView('month'))?_c('picker-month',{attrs:{"pageDate":_vm.pageDate,"selectedDate":_vm.selectedDate,"showMonthView":_vm.showMonthView,"allowedToShowView":_vm.allowedToShowView,"disabled":_vm.disabled,"calendarClass":_vm.calendarClass,"calendarStyle":_vm.calendarStyle,"translation":_vm.translation},on:{"selectMonth":_vm.selectMonth,"showYearCalendar":_vm.showYearCalendar,"changedYear":_vm.setPageDate}}):_vm._e(),_vm._v(" "),(_vm.allowedToShowView('year'))?_c('picker-year',{attrs:{"pageDate":_vm.pageDate,"selectedDate":_vm.selectedDate,"showYearView":_vm.showYearView,"allowedToShowView":_vm.allowedToShowView,"disabled":_vm.disabled,"calendarClass":_vm.calendarClass,"calendarStyle":_vm.calendarStyle,"translation":_vm.translation},on:{"selectYear":_vm.selectYear,"changedDecade":_vm.setPageDate}}):_vm._e()],1)},staticRenderFns: [],
  components: {
    DateInput: DateInput,
    PickerDay: PickerDay,
    PickerMonth: PickerMonth,
    PickerYear: PickerYear
  },
  props: {
    value: {
      validator: function (val) {
        return val === null || val instanceof Date || typeof val === 'string' || typeof val === 'number'
      }
    },
    name: String,
    refName: String,
    id: String,
    format: {
      type: [String, Function],
      default: 'dd MMM yyyy'
    },
    language: {
      type: Object,
      default: function () { return en; }
    },
    openDate: {
      validator: function (val) {
        return val === null || val instanceof Date || typeof val === 'string' || typeof val === 'number'
      }
    },
    fullMonthName: Boolean,
    disabled: Object,
    highlighted: Object,
    placeholder: String,
    inline: Boolean,
    calendarClass: [String, Object],
    inputClass: [String, Object],
    wrapperClass: [String, Object],
    mondayFirst: Boolean,
    clearButton: Boolean,
    clearButtonIcon: String,
    calendarButton: Boolean,
    calendarButtonIcon: String,
    calendarButtonIconContent: String,
    bootstrapStyling: Boolean,
    initialView: String,
    disabledPicker: Boolean,
    required: Boolean,
    minimumView: {
      type: String,
      default: 'day'
    },
    maximumView: {
      type: String,
      default: 'year'
    }
  },
  data: function data () {
    var startDate = this.openDate ? new Date(this.openDate) : new Date();
    return {
      /*
       * Vue cannot observe changes to a Date Object so date must be stored as a timestamp
       * This represents the first day of the current viewing month
       * {Number}
       */
      pageTimestamp: startDate.setDate(1),
      /*
       * Selected Date
       * {Date}
       */
      selectedDate: null,
      /*
       * Flags to show calendar views
       * {Boolean}
       */
      showDayView: false,
      showMonthView: false,
      showYearView: false,
      /*
       * Positioning
       */
      calendarHeight: 0
    }
  },
  watch: {
    value: function value (value$1) {
      this.setValue(value$1);
    },
    openDate: function openDate () {
      this.setPageDate();
    },
    initialView: function initialView () {
      this.setInitialView();
    }
  },
  computed: {
    computedInitialView: function computedInitialView () {
      if (!this.initialView) {
        return this.minimumView
      }

      return this.initialView
    },
    pageDate: function pageDate () {
      return new Date(this.pageTimestamp)
    },

    translation: function translation () {
      return this.language
    },

    calendarStyle: function calendarStyle () {
      return {
        position: this.isInline ? 'static' : undefined
      }
    },
    isOpen: function isOpen () {
      return this.showDayView || this.showMonthView || this.showYearView
    },
    isInline: function isInline () {
      return !!this.inline
    },
    isRtl: function isRtl () {
      return this.translation.rtl === true
    }
  },
  methods: {
    /**
     * Close all calendar layers
     */
    close: function close (full) {
      this.showDayView = this.showMonthView = this.showYearView = false;
      if (!this.isInline) {
        if (full) { this.$emit('closed'); }
        document.removeEventListener('click', this.clickOutside, false);
      }
    },
    resetDefaultDate: function resetDefaultDate () {
      if (this.selectedDate === null) {
        this.setPageDate();
        return
      }
      this.setPageDate(this.selectedDate);
    },
    /**
     * Effectively a toggle to show/hide the calendar
     * @return {mixed} [description]
     */
    showCalendar: function showCalendar () {
      if (this.disabledPicker || this.isInline) {
        return false
      }
      if (this.isOpen) {
        return this.close(true)
      }
      this.setInitialView();
      if (!this.isInline) {
        this.$emit('opened');
      }
    },
    setInitialView: function setInitialView () {
      var initialView = this.computedInitialView;

      if (!this.allowedToShowView(initialView)) {
        throw new Error(("initialView '" + (this.initialView) + "' cannot be rendered based on minimum '" + (this.minimumView) + "' and maximum '" + (this.maximumView) + "'"))
      }

      switch (initialView) {
        case 'year':
          this.showYearCalendar();
          break
        case 'month':
          this.showMonthCalendar();
          break
        default:
          this.showDayCalendar();
          break
      }
    },
    allowedToShowView: function allowedToShowView (view) {
      var views = ['day', 'month', 'year'];
      var minimumViewIndex = views.indexOf(this.minimumView);
      var maximumViewIndex = views.indexOf(this.maximumView);
      var viewIndex = views.indexOf(view);

      return viewIndex >= minimumViewIndex && viewIndex <= maximumViewIndex
    },
    showDayCalendar: function showDayCalendar () {
      if (!this.allowedToShowView('day')) {
        return false
      }
      this.close();
      this.showDayView = true;
      this.addOutsideClickListener();
    },
    showMonthCalendar: function showMonthCalendar () {
      if (!this.allowedToShowView('month')) {
        return false
      }
      this.close();
      this.showMonthView = true;
      this.addOutsideClickListener();
    },
    showYearCalendar: function showYearCalendar () {
      if (!this.allowedToShowView('year')) {
        return false
      }
      this.close();
      this.showYearView = true;
      this.addOutsideClickListener();
    },
    addOutsideClickListener: function addOutsideClickListener () {
      var this$1 = this;

      if (!this.isInline) {
        setTimeout(function () {
          document.addEventListener('click', this$1.clickOutside, false);
        }, 100);
      }
    },
    setDate: function setDate (timestamp) {
      var date = new Date(timestamp);
      this.selectedDate = new Date(date);
      this.setPageDate(date);
      this.$emit('selected', new Date(date));
      this.$emit('input', new Date(date));
    },
    clearDate: function clearDate () {
      this.selectedDate = null;
      this.$emit('selected', null);
      this.$emit('input', null);
      this.$emit('cleared');
    },
    /**
     * @param {Object} day
     */
    selectDate: function selectDate (day) {
      this.setDate(day.timestamp);
      if (!this.isInline) {
        this.close(true);
      }
    },
    /**
     * @param {Object} month
     */
    selectMonth: function selectMonth (month) {
      var date = new Date(month.timestamp);
      if (this.allowedToShowView('day')) {
        this.setPageDate(date);
        this.$emit('changedMonth', month);
        this.showDayCalendar();
      } else {
        this.setDate(date);
        if (!this.isInline) {
          this.close(true);
        }
      }
    },
    /**
     * @param {Object} year
     */
    selectYear: function selectYear (year) {
      var date = new Date(year.timestamp);
      if (this.allowedToShowView('month')) {
        this.setPageDate(date);
        this.$emit('changedYear', year);
        this.showMonthCalendar();
      } else {
        this.setDate(date);
        if (!this.isInline) {
          this.close(true);
        }
      }
    },
    /**
     * Set the datepicker value
     * @param {Date|String|Number|null} date
     */
    setValue: function setValue (date) {
      if (typeof date === 'string' || typeof date === 'number') {
        var parsed = new Date(date);
        date = isNaN(parsed.valueOf()) ? null : parsed;
      }
      if (!date) {
        this.setPageDate();
        this.selectedDate = null;
        return
      }
      this.selectedDate = date;
      this.setPageDate(date);
    },
    /**
     * Sets the date that the calendar should open on
     */
    setPageDate: function setPageDate (date) {
      if (!date) {
        if (this.openDate) {
          date = new Date(this.openDate);
        } else {
          date = new Date();
        }
      }
      this.pageTimestamp = (new Date(date)).setDate(1);
    },
    /**
     * Close the calendar if clicked outside the datepicker
     * @param  {Event} event
     */
    clickOutside: function clickOutside (event) {
      if (this.$el && !this.$el.contains(event.target)) {
        if (this.isInline) {
          return this.showDayCalendar()
        }
        this.resetDefaultDate();
        this.close(true);
        document.removeEventListener('click', this.clickOutside, false);
      }
    },

    init: function init () {
      if (this.value) {
        this.setValue(this.value);
      }
      if (this.isInline) {
        this.setInitialView();
      }
    }
  },
  mounted: function mounted () {
    this.init();
  }
}
// eslint-disable-next-line
;

export default Datepicker;
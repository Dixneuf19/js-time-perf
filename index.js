const { PerformanceObserver, performance } = require('perf_hooks');

// HOW TO USE

// Initiate the class before any measure

// const TimePerf = require('../time_perf');
// const timePerf = new TimePerf();
// timePerf.observe();

// Place some marks in the code

// timePerf.mark('A')
// Some code and function
// timePerf.mark('B')
// Some other stuff
// timePerf.mark('C')

// Measures 'A to B' and 'B to C' will be automatically created and logged

class TimePerf {
  constructor() {
    this.marks = [];
  }

  mark(name) {
    performance.mark(name);
    this.marks.push(name);
    if (this.marks.length > 1) {
      const start = this.marks[this.marks.length - 2];
      const end = this.marks[this.marks.length - 1];
      performance.measure(`${start} to ${end}`, start, end);
    }
  }

  observe() {
    this.obs = new PerformanceObserver(items => {
      console.log(items.getEntries()[0]);
    });
    this.obs.observe({ entryTypes: ['measure'] });
  }
}

// Know issues :
// - if you reuse within the same process, can create measure C to A, which corresponds to the time between to perf test
// - if you reuse within the same process, create duplicate A to B, B to C, ... each time you launch the process

module.exports = TimePerf;

//
// Thanks, https://github.com/GrouchPotato/js_humanized_time_span/blob/master/humanized_time_span.js
//
// Copyright (C) 2011 by Will Tomlins
//
// Github profile: http://github.com/layam
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


export function humanized_time_span(
    date: Date,
    refDate: Date = new Date(),
    dateFormats?: any,
    timeUnits?: any,
): string  {
  // Date Formats must be be ordered smallest -> largest and must end in a format with ceiling of null
  dateFormats = dateFormats || {
    past: [
      { ceiling: 60, text: '$seconds seconds ago' },
      { ceiling: 3600, text: '$minutes minutes ago' },
      { ceiling: 86400, text: '$hours hours ago' },
      { ceiling: 2629744, text: '$days days ago' },
      { ceiling: 31556926, text: '$months months ago' },
      { ceiling: null, text: '$years years ago' },
    ],
    future: [
      { ceiling: 60, text: 'in $seconds seconds' },
      { ceiling: 3600, text: 'in $minutes minutes' },
      { ceiling: 86400, text: 'in $hours hours' },
      { ceiling: 2629744, text: 'in $days days' },
      { ceiling: 31556926, text: 'in $months months' },
      { ceiling: null, text: 'in $years years' },
    ],
  };
  // Time units must be be ordered largest -> smallest
  timeUnits = timeUnits || [
    [31556926, 'years'],
    [2629744, 'months'],
    [86400, 'days'],
    [3600, 'hours'],
    [60, 'minutes'],
    [1, 'seconds'],
  ];

  let secondsDifference = (refDate.getTime() - date.getTime()) / 1000;

  let tense = 'past';
  if (secondsDifference < 0) {
    tense = 'future';
    secondsDifference = 0 - secondsDifference;
  }

  function getFormat() {
    // for (let i = 0; i < dateFormats[tense].length; i++) {
    for (const i in dateFormats[tense]) {
      if (dateFormats[tense][i].ceiling === null || secondsDifference <= dateFormats[tense][i].ceiling) {
        return dateFormats[tense][i];
      }
    }
    return null;
  }

  function getTimeBreakdown() {
    const breakdown: any = {};
    let seconds = secondsDifference;
    timeUnits.forEach((timeUnit: any) => {
      const occurencesOfUnit = Math.floor(seconds / timeUnit[0]);
      seconds = seconds - (timeUnit[0] * occurencesOfUnit);
      breakdown[timeUnit[1]] = occurencesOfUnit;
    });
    return breakdown;
  }

  function renderDate(dateFormat?: any) {
    const breakdown = getTimeBreakdown();
    const timeAgoText = dateFormat.text.replace(/\$(\w+)/g, function r2() {
      return breakdown[arguments[1]];
    });
    return depluralizeTimeAgoText(timeAgoText, breakdown);
  }

  function depluralizeTimeAgoText(timeAgoText: string, breakdown: any) {
    for (const i in breakdown) {
      if (breakdown[i] === 1) {
        const regexp = new RegExp('\\b' + i + '\\b');
        timeAgoText = timeAgoText.replace(regexp, function r() {
          return arguments[0].replace(/s\b/g, '');
        });
      }
    }
    return timeAgoText;
  }

  return renderDate(getFormat());
}

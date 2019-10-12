module.exports = function multiply(a, b) {
  if (a == 0 || b == 0) return '0';
  if (a.length < 8 && b.length < 8) return a * b + '';

  var n = Math.ceil(Math.max(a.length, b.length) / 2);
  var x1 = a.substring(0, a.length - n);
  var x2 = a.substring(a.length - n);
  var y1 = b.substring(0, b.length - n);
  var y2 = b.substring(b.length - n);
  var c1 = multiply(x1, y1);
  var c3 = multiply(x2, y2);
  var c2 = longSum(longSum(multiply(longSum(x1, x2, '+'), longSum(y1, y2, '+')), c1, '-'), c3, '-');
  return longSum(longSum(addZeros(c1, n * 2), addZeros(c2, n), '+'), c3, '+');

  function longSum(a, b, operator) {
    if (a.length < 15 && b.length < 15) {
      if (operator == '+') return a * 1 + b * 1 + '';
      return a - b + '';
    }
    if (a == b && operator == '-') return 0;
    var length = Math.max(a.length, b.length)
    var sum = '';
    var remainder = 0;
    for (var i = 1; i <= length; i++) {
      var aDigit = i <= a.length ? +a.charAt(a.length - i) : 0;
      var bDigit = i <= b.length ? +b.charAt(b.length - i) : 0;
      var temp;
      if (operator == '-') {
        temp = 10 + aDigit - bDigit - remainder;
        remainder = temp >= 10 ? 0 : 1
      } else {
        temp = aDigit + bDigit + remainder;
        remainder = Math.floor(temp / 10)
      }
      sum = temp % 10 + sum;
    }
    if (remainder) sum = remainder + sum;

    return sum.replace(/^0+/, '');
  }

  function addZeros(num, count) {
    if (num == 0) return '';
    for (var i = 0; i < count; i++) num += '0'
    return num
  }
}

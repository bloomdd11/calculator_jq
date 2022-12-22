$(document).ready(function () {
  let value, msgObj, temp_value = [], calculationArray = [null, null, null];

  $('.input input').removeAttr('placeholder');

  $('.num-child').bind('click', function (e) {
    $('.answer').css('color', '#888');
    value = e.target.dataset.value
    !parseInt(value) ? msgObj = { msg: 'not integer', success: false } : msgObj = { msg: 'integer', success: true };
    setNotiVal()
    filterVal(value)
  });

  const setNotiVal = () => {
    let notiId = setTimeout(() => {
      $('.noti').addClass('hide');
      $('.noti').removeClass(className);
    }, 1000);
    const { msg, success } = msgObj
    success ? className = 'success' : className = 'fail'
    $('.noti').removeClass('hide');
    $('.noti').addClass(className);
    $('.noti').text(msg)
    clearTimeout = notiId
  }

  const setInputVal = (value) => {
    validValue = value.join('')
    let finalValue = validValue;
    $('.input input').val(finalValue);
  }

  const filterVal = (value) => {
    //  calculationArray = [null, null, 1]
    //  calculationArray = [1, '*', 2]

    const setFirstNum = (num) => calculationArray[0] = parseInt(num)
    const setSecondNum = (num) => calculationArray[2] = parseInt(num)
    const setOperator = (op) => calculationArray[1] = op
    let isEnter = false

    function valuePush(value) {
      temp_value.push(value)
      let val = temp_value.join('')
      calculationArray[1] === null ? setFirstNum(val) : setSecondNum(val)
    }

    if (!isNaN(value)) {
      valuePush(value)
    } else if (value === 'enter') {
      isEnter = true
      const checkIsNull = calculationArray.every((item) => item !== null)
      const isCalculate = checkIsNull && isEnter
      isCalculate ? calculate(calculationArray) : null;
      calculationArray[0] === null ? null : display(calculationArray[0])
      cleanValue()
    } else if (value === 'ac') {
      cleanValue(value)
    } else if (value === '%') {
      console.log('%');
    } else {
      temp_value = []
      setOperator(value)
    }
    setInputVal(calculationArray)
    console.log(calculationArray);
  }

  const calculate = (array) => {
    let [n1, op, n2] = array
    let calculateValue;
    switch (op) {
      case '+':
        calculateValue = n1 + n2
        break
      case '-':
        calculateValue = n1 - n2
        break
      case '*':
        calculateValue = n1 * n2
        break
      case '/':
        calculateValue = n1 / n2
        break
    }
    cleanValue()
    display(calculateValue)
  }
  const display = (value) => {
    console.log(value ? 'display\n' + value : null);
    $('.answer').text(value);
    $('.answer').css('color', 'white');
  }

  const cleanValue = () => {
    calculationArray = [null, null, null]
    temp_value = []
  }


});

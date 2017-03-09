/**
 * 动画效果
 */

// 展示数字
function showNumberWithAnimation(i, j, randNumber) {
  var numberCell = $('#number-cell-'+i+'-'+j);
  numberCell.css('background-color', getNumberBgColor(randNumber));
  numberCell.css('color', getNumberColor(randNumber));
  numberCell.text(randNumber);
  numberCell.animate({
    width: cellSideLength,
    height: cellSideLength,
    top: getPosTop(i, j),
    left: getPosLeft(i, j),
  },50)
}

// 移动函数
function showMoveAnimation(fromx, fromy, tox, toy) {
  var numberCell = $('#number-cell-' + fromx + '-' + fromy);
  numberCell.animate({
    top: getPosTop(tox, toy),
    left: getPosLeft(tox, toy)
  }, 170);
}

// 更新分数
function updateScore(score) {
  $('#score').text(score);
}
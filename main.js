/**
 * 主逻辑
 */

var board = [];   // 主界面格子
var score = 0;    //分数
var hasConflicted = [];    // 判断是否本次操作已发生合并

// 触摸事件参数
var startx = 0,
    starty = 0,
    endx = 0,
    endy = 0;

var newGameBtn = document.getElementById('newGameBtn');
newGameBtn.addEventListener('click', newGame);

document.addEventListener('touchmove', function (event) {
  // 防止滑动时网页移动
  // 判断默认行为是否可以被禁用
  if (event.cancelable) {
    // 判断默认行为是否已经被禁用
    if (!event.defaultPrevented) {
      event.preventDefault();
    }
  }
});
document.addEventListener('touchstart', function (event) {
  startx = event.touches[0].pageX;
  starty = event.touches[0].pageY;
});
document.addEventListener('touchend', function (event) {
  endx = event.changedTouches[0].pageX;
  endy = event.changedTouches[0].pageY;

  var deltax = endx - startx;
  var deltay = endy - starty;

  if (Math.abs(deltax) < 0.1 * screenWidth && Math.abs(deltay) < 0.1 * screenWidth) {
    return;
  }

  // 判断横纵
  if (Math.abs(deltax) > Math.abs(deltay)) {
    if (deltax > 0) {
      // right
      if (moveRight()) {
        setTimeout(generateOneNumber, 210);
        setTimeout(isGameOver, 300);
      }
    } else {
      // left
      if (moveLeft()) {
        setTimeout(generateOneNumber, 210);
        setTimeout(isGameOver, 300);
      }
    }
  } else {
    if (deltay > 0) {
      // down
      if (moveDown()) {
        setTimeout(generateOneNumber, 210);
        setTimeout(isGameOver, 300);
      }
    } else {
      // up
      if (moveUp()) {
        setTimeout(generateOneNumber, 210);
        setTimeout(isGameOver, 300);
      }
    }
  }
});

$(document).ready(function () {
  prepareForMobile();
  newGame();
});

function prepareForMobile() {
  // PC端避免全屏
  if (screenWidth > 600) {
    gridContainerWidth = 500;
    cellSpace = 20;
    cellSideLength = 100;
  }

  $('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
  $('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
  $('#grid-container').css('padding', cellSpace);
  $('#grid-container').css('border-radius', 0.02 * gridContainerWidth);

  $('.grid-cell').css('width', cellSideLength);
  $('.grid-cell').css('height', cellSideLength);
  $('.grid-cell').css('border-radius', 0.02 * cellSideLength);
}

function newGame() {
  init();
  generateOneNumber();
  generateOneNumber();
}

// 初始化
function init() {
  for (var i = 0; i < 4; i ++) {
    for (var j = 0; j < 4; j ++) {
      var gridCell = $('#grid-cell-' + i + '-' + j);
      gridCell.css('top', getPosTop(i, j));
      gridCell.css('left', getPosLeft(i, j));
    }
  }

  for (var i = 0; i < 4; i ++) {
    board[i] = [];
    hasConflicted[i] = [];
    for (var j = 0; j < 4; j ++) {
      board[i][j] = 0;
      hasConflicted[i][j] = false;
    }
  }

  updateBoardView();

  score = 0;
  updateScore(score);
}

// 更新数据
function updateBoardView() {
  $(".number-cell").remove();
  for (var i = 0; i < 4; i ++) {
    for (var j = 0; j < 4; j ++) {
      $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
      var theNumberCell = $('#number-cell-'+i+'-'+j);

      if (board[i][j] == 0) {
        theNumberCell.css('width', '0px');
        theNumberCell.css('height', '0px');
        theNumberCell.css('font-size', getFontSize(board[i][j]));
        theNumberCell.css('top', getPosTop(i ,j) + cellSideLength / 2);
        theNumberCell.css('left', getPosLeft(i ,j) + cellSideLength / 2);
        theNumberCell.css('border-radius', 0.02 * cellSideLength);
      } else {
        theNumberCell.css('width', cellSideLength);
        theNumberCell.css('height', cellSideLength);
        theNumberCell.css('top', getPosTop(i ,j));
        theNumberCell.css('left', getPosLeft(i ,j));
        theNumberCell.css('font-size', getFontSize(board[i][j]));
        theNumberCell.css('border-radius', 0.02 * cellSideLength);
        theNumberCell.css('background-color', getNumberBgColor(board[i][j]));
        theNumberCell.css('color', getNumberColor(board[i][j]));
        theNumberCell.text(board[i][j]);
      }
      hasConflicted[i][j] = false;
    }
  }
  $(".number-cell").css('line-height', cellSideLength + 'px');
}

// 随机生成数字
function generateOneNumber() {
  if (noSpace(board)) {
    return false;
  }
  // 取得可选空位置
  var emptyBoard = [];
  for (var i = 0; i < 4; i ++) {
    for (var j = 0; j < 4; j ++) {
      if (board[i][j] == 0) {
        emptyBoard.push({ri: i, rj: j});
      }
    }
  }
  // 随机位置
  var randIndex = Math.floor((Math.random() * emptyBoard.length));
  var randx = emptyBoard[randIndex].ri;
  var randy = emptyBoard[randIndex].rj;
  // 随机数字
  var randNumber = Math.random() < 0.5 ? 2 : 4;
  // 随机位置显示随机数字
  board[randx][randy] = randNumber;
  showNumberWithAnimation(randx, randy, randNumber);
  return true;
}

$(document).keydown(function (event) {
  switch (event.keyCode) {
    case 37: // left
      event.preventDefault();
      if (moveLeft()) {
        setTimeout(generateOneNumber, 210);
        setTimeout(isGameOver, 300);
      }
      break;
    case 38: // up
      event.preventDefault();
      if (moveUp()) {
        setTimeout(generateOneNumber, 210);
        setTimeout(isGameOver, 300);
      }
      break;
    case 39: // right
      event.preventDefault();
      if (moveRight()) {
        setTimeout(generateOneNumber, 210);
        setTimeout(isGameOver, 300);
      }
      break;
    case 40: // down
      event.preventDefault();
      if (moveDown()) {
        setTimeout(generateOneNumber, 210);
        setTimeout(isGameOver, 300);
      }
      break;
    default: break;
  }
});

function isGameOver() {
  if (noSpace(board) && noMove(board)) {
    gameover();
  }
}

function gameover() {
  alert('游戏结束，你的分数为：' + score);
}

function moveLeft() {
  if (canMoveLeft(board)) {
    for (var i = 0; i < 4; i ++) {
      for (var j = 1; j < 4; j ++) {
        if (board[i][j] != 0) {
          for (var k = 0; k < j; k++) {
            if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
              // move
              // i,j -> i,k
              showMoveAnimation(i, j, i, k);
              board[i][k] = board[i][j];
              board[i][j] = 0;
              continue;
            } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
              // 判断加分
              score += board[i][k];
              updateScore(score);

              showMoveAnimation(i, j, i, k);
              board[i][k] += board[i][j];
              board[i][j] = 0;

              hasConflicted[i][k] = true;
              continue;
            }
          }
        }
      }
    }
    // 防止运算过快导致的页面刷新看不到动画效果
    setTimeout(updateBoardView, 170);
    return true;
  } else {
    return false;
  }
}
function moveRight() {
  if (canMoveRight(board)) {
    for (var i = 0; i < 4; i ++) {
      for (var j = 2; j >= 0; j --) {
        if (board[i][j] != 0) {
          for (var k = 3; k > j; k--) {
            if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
              showMoveAnimation(i, j, i, k);
              board[i][k] = board[i][j];
              board[i][j] = 0;
              continue;
            } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
              score += board[i][k];
              updateScore(score);

              showMoveAnimation(i, j, i, k);
              board[i][k] += board[i][j];
              board[i][j] = 0;

              hasConflicted[i][k] = true;
              continue;
            }
          }
        }
      }
    }
    // 防止运算过快导致的页面刷新看不到动画效果
    setTimeout(updateBoardView, 170);
    return true;
  } else {
    return false;
  }
}
function moveUp() {
  if (canMoveUp(board)) {
    for (var j = 0; j < 4; j ++) {
      for (var i = 1; i < 4; i ++) {
        if (board[i][j] != 0) {
          for (var k = 0; k < i; k++) {
            if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
              showMoveAnimation(i, j, k, j);
              board[k][j] = board[i][j];
              board[i][j] = 0;
              continue;
            } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
              score += board[k][j];
              updateScore(score);

              showMoveAnimation(i, j, k, j);
              board[k][j] += board[i][j];
              board[i][j] = 0;

              hasConflicted[k][j] = true;
              continue;
            }
          }
        }
      }
    }
    // 防止运算过快导致的页面刷新看不到动画效果
    setTimeout(updateBoardView, 170);
    return true;
  } else {
    return false;
  }
}
function moveDown() {
  if (canMoveDown(board)) {
    for (var j = 0; j < 4; j ++) {
      for (var i = 2; i >= 0; i --) {
        if (board[i][j] != 0) {
          for (var k = 3; k > i; k--) {
            if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
              showMoveAnimation(i, j, k, j);
              board[k][j] = board[i][j];
              board[i][j] = 0;
              continue;
            } else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
              score += board[k][j];
              updateScore(score);

              showMoveAnimation(i, j, k, j);
              board[k][j] += board[i][j];
              board[i][j] = 0;

              hasConflicted[k][j] = true;
              continue;
            }
          }
        }
      }
    }
    // 防止运算过快导致的页面刷新看不到动画效果
    setTimeout(updateBoardView, 170);
    return true;
  } else {
    return false;
  }
}
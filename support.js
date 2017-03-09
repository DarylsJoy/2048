/**
 * 底层支撑
 */
var screenWidth = window.screen.availWidth;
var gridContainerWidth = 0.92 * screenWidth,
    cellSideLength = 0.18 * screenWidth,
    cellSpace = 0.04 * screenWidth;

// 取得位置
function getPosTop(i, j) {
  return cellSpace + i * (cellSpace + cellSideLength);
}
function getPosLeft(i, j) {
  return cellSpace + j * (cellSpace + cellSideLength);
}

// 取得背景色
function getNumberBgColor(number) {
  switch (number) {
    case 2: return '#eee4da';break;
    case 4: return '#ede0c8';break;
    case 8: return '#f2b179';break;
    case 16: return '#f59563';break;
    case 32: return '#f67c5f';break;
    case 64: return '#f65e3b';break;
    case 128: return '#edcf72';break;
    case 256: return '#edcc61';break;
    case 512: return '#99cc00';break;
    case 1024: return '#33b5e5';break;
    case 2048: return '#0099cc';break;
    case 4096: return '#aa66cc';break;
    case 8192: return '#9933cc';break;
    default: return '#ff00ef';break;
  }
}

// 取得数字颜色
function getNumberColor(number) {
  if (number <= 4) {
    return '#776e65';
  } else {
    return '#ffffff';
  }
}

// 取得字体大小
function getFontSize(number) {
  if (number < 100) {
    return 0.5 * cellSideLength + 'px';
  } else if (number < 1000 && number > 100) {
    return 0.4 * cellSideLength + 'px';
  } else if (number > 1000) {
    return 0.3 * cellSideLength + 'px';
  }
}

// 判断是否有空位
function noSpace(board) {
  for (var i = 0; i < 4; i ++) {
    for (var j = 0; j < 4; j ++) {
      if (board[i][j] == 0) {
        return false;
      }
    }
  }
  return true;
}

// 判断是否可移动
function noMove(board) {
  if (canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)) {
    return false;
  } else {
    return true;
  }
}

// 是否可左移
function canMoveLeft(board) {
  for (var i = 0; i < 4; i ++) {
    for (var j = 1; j < 4; j ++) {
      if (board[i][j] != 0) {
        if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}
// 是否可上移
function canMoveUp(board) {
  for (var j = 0; j < 4; j ++) {
    for (var i = 1; i < 4; i ++) {
      if (board[i][j] != 0) {
        if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}
// 是否可右移
function canMoveRight(board) {
  for (var i = 0; i < 4; i ++) {
    for (var j = 2; j >= 0; j --) {
      if (board[i][j] != 0) {
        if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}
// 是否可下移
function canMoveDown(board) {
  for (var j = 0; j < 4; j ++) {
    for (var i = 2; i >= 0; i --) {
      if (board[i][j] != 0) {
        if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}

// row行由col1到col2路径上是否有障碍
function noBlockHorizontal(row, col1, col2, board) {
  for (var i = col1 + 1; i < col2; i ++) {
    if (board[row][i] != 0) {
      return false;
    }
  }
  return true;
}
// clo列由row1到row2路径上是否有障碍
function noBlockVertical(col, row1, row2, board) {
  for (var i = row1 + 1; i < row2; i ++) {
    if (board[i][col] != 0) {
      return false;
    }
  }
  return true;
}
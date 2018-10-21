var COLS = 10, ROWS = 20; // 横と縦
var board = []; // 盤面の情報
var lose; // 上まで到達判定
var interval; // タイマー保持の変数
var current; //　今のブロックの形
var currentX, currentY; // 今のブロックの位置


// 操作するブロックのパターン
var shapes = [
	[1,1,1,1],
	[1,1,1,0,1],
	[1,1,1,0,0,0,1],
	[1,1,0,0,1,1],
	[1,1,0,0,0,1,1],
	[0,1,1,0,1,1],
	[0,1,0,0,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[0,1,0,0,0,1,1,1,1,1,1,0,0,0,1,0],
	[0,1,1,1,1,1,1,0]
	];
	
// ブロックの色
var colors = [
	'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple', 'teal', 'olive', 'maroon'
	];

	
// 盤面を空に
// 盤面上での0は何もない、1～はブロックを表している。それぞれの番号は色に該当
// y,xは左上が(0,0)を表す。yの正負が高校数学とは逆に書かれる
function init(){
	for(var y = 0; y < ROWS; ++y){
		board[y] = [];
		for(var x = 0; x < COLS; ++x){
			board[y][x] = 0;
		}
	}
}

// shapesからランダムにブロックのパターンを出力、盤面の一番上にセットする
// shapesからcurrentへコピーを行う
// 操作ブロックは4✕4マスの中で表される
// 空のマスは0 色のマスは1以上(色により変化)
function newShape(){
	// ランダムにインデックスを出す
	var id = Math.floor(Math.random() * shapes.length );
	var shape = shapes[id];
	
	// パターンを操作ブロックへセット
	current = [];
	for(var y = 0; y < 4; ++y){
		current[y] = [];
		for(var x = 0; x < 4; ++x){
			var i = 4 * y + x;
			if(typeof shape[i] != 'undefined' && shape[i]){
				current[y][x] = id + 1;
			} else {
				current[y][x] = 0;
			}
		}
	}
	// ブロックを盤面上へセット
	currentX = 5;
	currentY = 0;
}


// ゲーム開始後250秒ごとに呼び出される関数
// 操作ブロックを下へ1つずらす、着地したら消去処理やゲームオーバー判定をする

function tick(){
	// 1つ下へ移動する
	if(valid(0,1)){
		++currentY;
	}
	//　着地していたとき
	else{
		freeze(); // 操作ブロックを盤面に固定
		clearLines(); // ライン消去処理
		if(lose){
			// ゲームオーバーなら最初から始める
			newGame();
			return false;
		}
		// 新しい操作ブロックをセット
		newShape();
	}
}


// 操作ブロックがその方向に移動できるか判定
// Offsetの方向に動いたらどうかを判定している
// 移動先が盤面の外、もしくは色マスがあった場合falseになる
// 操作ブロックが盤面の上にあったらゲームオーバーになる

function valid(offsetX,offsetY,newCurrent){
	offsetX = offsetX || 0;
	offsetY = offsetY || 0;
	offsetX = currentX + offsetX;
	offsetY = currentY + offsetY;
	newCurrent = newCurrent || current;
	for(var y = 0; y < 4; ++y){
		for(var x = 0; x < 4; ++x){
			if(newCurrent[y][x]){
				if(typeof board[y + offsetY] == 'undefined'
					|| typeof board[y + offsetY][x + offsetX] == 'undefined'
					|| board[y + offsetY][x + offsetX]
					|| x + offsetX < 0
					|| y + offsetY >= ROWS
					|| x + offsetX >= COLS){
						if(offsetY == 1 && offsetX - currentX == 0 && offsetY - currentY == 1){
							console.log('game over');
							lose = true; // 操作ブロックが画面上にあったらゲームオーバー
						}
						return false;
					}
			}
		}
	}
	return true;
}


// 操作ブロックを盤面にセットする
function freeze(){
	for(var y = 0; y < 4; ++y){
		for(var x = 0; x < 4; ++x){
			if(current[y][x]){
				board[y + currentY][x + currentX] = current[y][x];
			}
		}
	}
}


// 一行ブロックが揃っているかを確認、揃っていたら消す
function clearLines(){
	for(var y = ROWS - 1; y >= 0; --y){
		var rowFilled = true;
		// 一行揃っているか調べる
		for(var x = 0; x < COLS; ++x){
			if(board[y][x] == 0){
				rowFilled = false;
				break;
			}
		}
		// 一行揃っていたらサウンドを鳴らして消す
		if(rowFilled){
			document.getElementById('clearsound').play(); // 消滅サウンド
			// 上のブロックを落とす
			for(var yy = y; yy > 0; --yy){
				for(var x = 0; x < COLS; ++x){
					board[yy][x] = board[yy - 1][x];
				}
			}
			++y; // 一行落としたのでチェック処理をひとつ下へ送る
		}
	}
}


// キーボードが押されたときの処理
// 上が押された時は回転、それ以外の時はブロックをずらす

function keyPress(key){
	switch(key){
		case 'left':
		if (valid(-1)){
			--currentX; // 左に一つずらす
		}
		break;
		case 'right':
		if(valid(1)){
			++currentX; // 右に一つずらす
		}
		break;
		case 'down':
		if(valid(0,1)){
			++currentY; // 下に一つずらす
		}
		break;
		case 'rotate': // ブロックを回す
		var rotated = rotate(current);
		if(valid(0,0,rotated)){
			current = rotated; // 回した後の状態でブロックをセット
		}
		break;
	}
}


// 操作ブロックの回転処理
// newCurrent[y][x] = current[3 - x][y]と処理を行っている	
	
function rotate(current){
	var newCurrent = [];
	for(var y = 0; y < 4; ++y){
		newCurrent[y] = [];
		for(var x = 0; x < 4; ++x){
			newCurrent[y][x] = current[3 - x][y];
		}
	}
	return newCurrent;
}	
	
	
	
	
	
	
	
	
	
	
	


// 以下コードは必ずtetris.jsの一番下にする
// 初めに読み込まれたとき、ゲームオーバーになったときにnewGame関数を呼ぶ
// tick関数が250ミリ秒ごとに呼ばれる
// 新しくゲームを始める時はtickを呼び出しているintervalをクリア

function newGame(){
	clearInterval(interval); // ゲームタイマーのクリア
	init(); // 盤面のリセット
	newShape(); // 操作ブロックのセット
	lose = false; // ゲームオーバーのフラグ
	interval = setInterval(tick, 250); // 250ミリ秒ごとにtickという関数を呼ぶ
}

newGame();
















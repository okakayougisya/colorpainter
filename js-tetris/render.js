
// 現在の盤面の状態を描画する
var canvas = document.getElementsByTagName('canvas')[0]; // キャンバス
var ctx = canvas.getContext('2d'); // コンテクスト
var W = 300, H = 600; // キャンバスサイズ
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS; // マスの幅



// x,yの部分に1マス分だけマスを描画する
function drawBlock(x,y){
	ctx.fillRect(BLOCK_W * x,BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
	ctx.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
}



// 盤面と操作ブロックを描画する、30ms毎に呼び出される
// キャンバスをまっさらにしてから盤面を描画し、操作ブロックを描画する流れ
// マスが空白の部分は0で指定、色マスはプラス1されて色を読み込むときに-1する

function render(){
	ctx.clearRect(0,0,W,H); // キャンバスをまっさらに
	ctx.strokeStyle = 'black'; // ブロックの縁の色を黒にする

	
	// 盤面の描画
	for(var x = 0; x < COLS; ++x){
		for(var y = 0; y < ROWS; ++y){
			if(board[y][x]){ // マスが空、0でなかったら
				ctx.fillStyle = colors[board[y][x] - 1]; // マスの種類に合わせて塗り潰す色の設定
				drawBlock(x,y); // マスを描画
			}
		}
	}
	
	// 操作ブロックを描画する
	for(var y = 0; y < 4; ++y){
		for(var x = 0; x < 4; ++x){
			 if ( current[ y ][ x ] ) {
				ctx.fillStyle = colors[current[y][x] - 1]; // マスの種類に合わせて塗り潰す色の設定
				drawBlock(currentX + x, currentY + y); // マスを描画
			}
		}
	}
}

// 30ミリ秒ごとに状態描画する関数を呼び出す
setInterval(render, 30);
































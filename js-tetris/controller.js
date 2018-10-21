// document.body.onkeydownに関数を指定するとキーボードが押された場合に呼び出される
//　押されたキーボードは数字としてe.KeyCodeに代入

document.body.onkeydown = function(e){
	// キーに名前をセット
	var keys = {
		37: 'left',
		39: 'right',
		40: 'down',
		38: 'rotate'
	};
	
	if(typeof keys[e.keyCode] != 'undefined'){
		// セットされたキーの場合、tetris.jsに記述された処理を呼び出す
		keyPress(keys[e.keyCode]);
		// 描画処理
		render();
	}
};

// 操作が処理を終えた後、描画関数を呼び出して画面を更新する






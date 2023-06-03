//ファイルをロード
var wordFile = document.getElementById('getFile');
var words = document.getElementById('displayWords');
var reader = new FileReader(); //FileReaderのインスタンスを作成
window.onload = function() {
    //ファイルが選択されたらFileReaderオブジェクトにファイルをテキストとして保存
    wordFile.addEventListener('change', function(e) {
        var result = e.target.files[0];
        reader.readAsText(result); //読み込んだファイルの中身を取得
        //ファイルの読み込みが完了後に内容を表示
        reader.addEventListener('load', function() {
            stringJson = reader.result;
            convertedIntoJson = JSON.parse(stringJson);
            reloadQuestions();
        })
    })
}

//問題の再読み込み処理
function reloadQuestions() {
    words.textContent = "";

    //答え合わせ機能をOFF
    checkTheAnswer.checked = false;
    checkTheAnswer.value = "off";
    document.getElementById("checkTheAnswerIndicator").textContent = "OFF";

    //selectの値で条件分岐
    switch (testFormat.value) {
        case '英日':
            for (var i in convertedIntoJson) {
                words.textContent += i + ". " + convertedIntoJson[i].en + "\n";
            }
            break;
        case '日英':
            for (var i in convertedIntoJson) {
                words.textContent += i + ". " + convertedIntoJson[i].jp + "\n";
            }
            break;
        case '和英対照':
            for (var i in convertedIntoJson) {
                words.textContent += i + ". " + convertedIntoJson[i].en + "　" 
                    + convertedIntoJson[i].jp + "\n";
            }
            break;
    }
}

//問題をシャッフル
function shuffleQuestions() {
    shuffleWords(convertedIntoJson);
    reloadQuestions();
}

//答え合わせON/OFF処理
function processCheckTheAnswer() {
    words.textContent = "";
    if (checkTheAnswer.value == "off") {
        checkTheAnswer.value = "on";
        document.getElementById("checkTheAnswerIndicator").textContent = "ON";
        for (var i in convertedIntoJson) {
            words.textContent += i + ". " + convertedIntoJson[i].en + "　" 
                + convertedIntoJson[i].jp + "\n";
        }
    } else {
        reloadQuestions()
    }
}

//シャッフル関数
function shuffleWords(array) {
    for (var i = (array.length - 1); 0<i; i--) {
        var j = Math.floor(Math.random()*(i+1));
        var rm = array[i];
        array[i] = array[j];
        array[j] = rm;
    }
    return array;
}
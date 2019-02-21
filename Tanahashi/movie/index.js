$(function(){
  let saveStorage = function(key,val){
    localStorage.setItem(key, JSON.stringify(val));
  };

  let getStorage = function(key){
    let obj = localStorage.getItem(key);
    return JSON.parse(obj);
  };

  let add = function(){
    let ttl = $("#box #title").val();
    date = $("#box #date").val();
    points = $("#box #points").val();
    memo = $("#box #memo").val();
    addMemo(ttl,date,points,memo);
    saveMemo(ttl,date,points,memo);
  };

  let addMemo = function(ttl,date,points,memo){
    let template =
      '<p>Date:</p><input type="date" name="" id="date" value="%s" readonly="readonly">'+
      '<p id="p">Score:</p><input type="number" name="points" id="points" placeholder="0~100点" min="0" max="100" value="%s" readonly="readonly"><br>'+
      '<p>Title:</p><textarea id="title" placeholder="title" cols="14" rows="3" readonly="readonly">%s</textarea>'+
      '<p>Comment:</p><textarea id="memo" placeholder="感想を入力してください。" readonly="readonly">%s</textarea><hr>';
    template = template.replace('%s',date).replace('%s',points).replace('%s',ttl).replace('%s',memo);

    $("#history").append(template);

    $("#box #title").val('');
    $("#box #date").val('');
    $("#box #points").val('');
    $("#box #memo").val('');
  }

  memoArr = [];
  let storageKey = 'memoObj';

  var saveMemo = function(ttl,date,points,memo){
    let memoObj = {
      ttl : ttl,
      date : date,
      points : points,
      memo : memo
    };
    memoArr.push(memoObj);
    saveStorage(storageKey,memoArr);
  }

  let resetMemo = function(){
    $("#history").children().remove();
    window.localStorage.clear();
  }

  let readMemo = function(){
    let memoObjs = getStorage(storageKey);
    if(memoObjs == null) return;
    for (let i = 0; i < Object.keys(memoObjs).length; i ++) {
      memoObj = memoObjs[i];
      ttl = memoObj.ttl;
      date = memoObj.date;
      points = memoObj.points;
      memo = memoObj.memo;

      memoObj = {
        ttl : ttl,
        date : date,
        points : points,
        memo : memo
      };
      memoArr.push(memoObj);
      saveStorage(storageKey,memoArr);
      addMemo(ttl,date,points,memo);
    }
  };

  //ページ読込み時にメモ復帰
  readMemo();

  $("#btnAdd").on('click',add);
  $("#btnReset").on('click',resetMemo);

});

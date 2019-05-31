;(function () {
  let $input = $('.input');
  let $list = $('.list');
  let data = [];
  let index = 0;

  $input.keyup(function (e) {
    if (e.keyCode === 13 && $input.val()) {
      data.unshift({
        id: index++,
        value: $input.val().trim(),
        status: 'active',
        checked: 'unchecked'
      });
      createList();
      $input.val('');
    }
  });
  
  function listenChecked() {
    $('.checkbox').change(function () {
      let id = $(this).parent().attr('data-index');
      let index = data.findIndex(item => item.id == id);
      if($(this).is(':checked')) {
        data[index].status = 'completed';
        data[index].checked = 'checked'
      } else {
        data[index].status = 'active';
        data[index].checked = 'unchecked'
      }
      createList(data);
    });
  }

  function listenDelete() {
    $('.del').click(function () {
      let id = $(this).parent().attr('data-index');
      data.splice(data.findIndex(item => item.id == id), 1);
      createList();
    });
  }

  function listenLeft() {
    let len = $('.list > .completed').length;
    $('.features > .left > span').text(len);
  }

  function clearCompleted() {
    $('.clear').click(function () {
      data = data.filter(item => item.status === 'active');
      createList();
    });
  }

  function createList() {
    let len = data.length;
    $list.html('');
    for(let i=0; i<len; i++) {
      $list.append(createItem(data[i]));
    }
    listenChecked();
    listenDelete();
    listenLeft();
    clearCompleted();
  }

  function createItem(list) {
    let item = 
      `<div class="item ${list.status}" data-index="${list.id}">
      <input class="checkbox" type="checkbox" ${list.checked}>
      <label>${list.value}</label>
      <button class="del">x</button>
      </div>`;
    return $(item);
  }
})();
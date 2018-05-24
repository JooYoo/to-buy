
$(document).ready(function () {
    var noteList = function () {
        // define variable 
        var $notepad = $('.notepad'),
            $noteList = $('.notepad__list')
        $noteListItem = $('.notepad__list-item'),
            $noteForm = $('.notepad__form'),
            $noteFormInput = $('.notepad__form-input'),
            $clearList = $('.notepad__clear'),
            clearListDisplay = 'notepad__clear--display',
            noteCount = 0;


        function displayNotes() { // 显示“本地存储”里的所有条目
            for (noteCount = 0; noteCount < localStorage.length; noteCount++) {
                var noteID = 'task-' + noteCount;
                // todo: refresh build button too
                // build note list: 在DOM里面找到notepad__list，加上列表的项目。该项目包括id号，还有从本地存储里读取出来的项内容
                $noteList.append("<li class='notepad__list-item' id='" + noteID + "'>" + localStorage.getItem(noteID) + "</li>");
                // ？ show reset button: 无法理解
                $clearList.addClass(clearListDisplay);
            }
        }

        function storeNote() { //把条目存储到“本地存储”
            // 如果文本输入框中的值不为null，那么
            if ($noteFormInput.val() !== '') {
                // 定义变量
                // 确认todo项的ID是多少；确认todo项的内容是什么
                var noteID = 'task-' + noteCount,
                    // task = $('#' + noteID), 
                    taskMessage = $noteFormInput.val();

                // 将数据存储到“本地存储”中
                // 参数需要一个ID，当然也需要内容
                localStorage.setItem(noteID, taskMessage);

                // 添加列表项内容：条目；按键
                $noteList.append(
                    "<li class='notepad__list-item' id='" + noteID + "'>"
                    + taskMessage +
                    "<button class='btnDele' id=deleID'" + noteID + "'>" +
                    "X" +
                    "</button>" +
                    "</li>");

                // 侦察DOM里的“clearAllBt”是否被注册了html class “clearListDisplay”
                // 如果没有就加上这个类标签在该按钮上
                if (!$clearList.hasClass(clearListDisplay)) {
                    $clearList.addClass(clearListDisplay);
                }

                // 重置输入框里的内容为空
                $noteFormInput.val('');
                noteCount++;
            }
        }

        function clearNotes() { // 清除所有条目
            //升级DOM
            $noteList.empty();
            $clearList.removeClass(clearListDisplay);

            //清楚“本地存储”
            localStorage.clear();
            noteCount = 0;
        }

        function bindEvents() { // 把上面的方法连起来用。这是每次打开应用都会执行的一系列动作
            // 显示存储在“本地存储”的所有条目
            displayNotes();

            //创建新条目
            $noteForm.on('submit', function () {
                storeNote();
                return false;
            });

            // 清除所有条目
            $clearList.on('click', function () {
                clearNotes();
            });
        }

        bindEvents();
    }; // noteList
    noteList();

    function strikeSwitch(element) { //点按列表项目添加或去除删除线
        if (element.parent().is("strike")) {
            element.unwrap();
        }
        else {
            element.wrap("<strike></strike>");
        }
    }

    function deleteItem(clickedEle) {
        if ((clickedEle.parentElement.parentElement.id).indexOf("task") >= 0) { // check if the parent has id contains "task"
            document.getElementById(clickedEle.parentElement.parentElement.id).remove();
            // delete in storage
            var deleteThing = clickedEle.parentElement.parentElement.id;
            localStorage.removeItem(deleteThing);
        }
    }

    function getElement(element) { //找到目标元素，以供之后jQuery使用
        var targetID = element.target.id;
        console.log(targetID);
        var targetEle = document.getElementById(targetID);

        return targetEle;
    }

    // 删除线
    $('.notepad__list').on('click', function (e) {
        var item = $(getElement(e));
        strikeSwitch(item);
    });

    // 删除列表项
    $('.notepad__list').on('click', function (e) {
        // capture clicked element by id
        var targetEle = getElement(e);

        // 找到ID包含有 "item" 的项目，并且删除
        deleteItem(targetEle);
    });

});// A page can't be manipulated safely until the document is "ready." 

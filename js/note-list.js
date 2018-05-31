$(document).ready(function () {
    var noteList = function () {
        // define variable 
        var $notepad = $('.notepad'),
            $noteList = $('.notepad__list'),
        $noteListItem = $('.notepad__list-item'),
            $noteForm = $('.notepad__form'),
            $noteFormInput = $('.notepad__form-input'),
            $clearList = $('.notepad__clear'),
            clearListDisplay = 'notepad__clear--display',
            noteCount = 0,
            items = [];

        function displayNotes() { // 显示“本地存储”里的所有条目
            // 创建日期
            document.getElementById("h1Title").innerHTML = createWeekDay();
            // 获取内存里的List<item>
            let loadItems = JSON.parse(localStorage.getItem("items"));
            //console.log("DisplayNotes: "+loadItems.length);
            for (var a in loadItems) { // 遍历内存里的所有元素
                if (a === "length") // 在js会遍历出包括元素长度等信息，当侦测到时length时就不遍历了
                    break;

                console.log(a, ' = ', loadItems[a]);

                var noteID = a;
                //todo: 
                $noteList.append( // 创建表格
                    "<li class='notepad__list-item' id='" + noteID + "'>" +
                    loadItems[a].message +
                    "<button class='btnDele' id=deleID'" + noteID + "'>" +
                    "X" +
                    "</button>" +
                    "</li>");

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

                items[noteCount] = {
                    id: noteID,
                    message:taskMessage,
                    isDone: false
                }

                // 将数据存储到“本地存储”中
                // 参数需要一个ID，当然也需要内容
                // localStorage.setItem(noteID, taskMessage);
                localStorage.setItem("items",JSON.stringify(items));

                // 添加列表项内容：条目；按键
                $noteList.append(
                    "<li class='notepad__list-item' id='" + noteID + "'>" +
                    taskMessage +
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

        function createWeekDay() { // 创建日期
            var date = new Date();

            const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'
            ];

            return dayOfWeek[date.getDay()];
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
        } else {
            element.wrap("<strike></strike>");
        }
    }

    // todo: 这里不起作用了
    function deleteItem(clickedEle) {
            console.log("clicked: "+clickedEle);
            

        if ((clickedEle.parentElement.parentElement.id).indexOf("task") >= 0) { // check if the parent has id contains "task"
            document.getElementById(clickedEle.parentElement.parentElement.id).remove();
            // delete in storage
            var deleteId = clickedEle.parentElement.parentElement.id;
            

            items.remove(deleteId);
            console.log("RightNow: "+items);
            
            //localStorage.removeItem(items[deleteId]);
        }
    }

    function getElement(element) { //找到目标元素，以供之后jQuery使用
        var targetID = element.target.id;
        console.log("getElement01: "+targetID);
        var targetEle = document.getElementById(targetID);
        console.log("getElement02: "+targetEle);
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
        //var targetEle = getElement(e);
       console.log("DianLe:"+e.targetID); 
       //console.log("zhe li shi Items: "+items[e.target.id])
    //    let targetId = e.target.id;
    //let loadItems = JSON.parse(localStorage.getItem("items"));
       console.log("loadItems:"+ loadItems[0].message);
      
       console.log("beforeDelete: "+ loadItems.length);
       loadItems.splice(1,1);
     console.log("AfterDelet: "+loadItems.length);
     localStorage.clear();
     //localStorage.setItem('loadItems', JSON.stringify(loadItems));

        // 找到ID包含有 "item" 的项目，并且删除
        //deleteItem(targetEle);
    });

}); // A page can't be manipulated safely until the document is "ready."
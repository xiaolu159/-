$(function() {
    load();
    $("#title").on("keydown", function() {
        if (event.keyCode === 13) {
            if ($(this).val() === " ") {
                alert("请输入要输入的内容!")
            } else {
                //先读取本地存储原本的数据
                var local = getDate();
                //把local数组进行更新数据 把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                //把这个数组local 存储给本地存储
                saveDate(local);
                //2.todolist 本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }

        }
    });

    //todolist删除操作
    $("ol").on("click", "a", function() {
        //先获得本地存储
        var data = getDate();
        //修改数据
        var index = $(this).attr("id");
        data.splice(index, 1);
        //保存到本地存储
        saveDate(data);
        //重新渲染到页面
        load();
    });
    //未完成和已完成操作
    $("ol ,ul").on("click", "input", function() {
        //获得本地存储
        var data = getDate();
        //修改数据
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        saveDate(data);
        load();
    })

    //读取本地存储的数据
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    //保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    //渲染加载数据
    function load() {
        //读取本地存储的数据
        var data = getDate();
        //遍历之前先要清空ol里面的元素内容
        $("ol").empty();
        $("ul").empty();
        var todoCount = 0;
        var doneCount = 0;
        //遍历这个数据
        $.each(data, function(i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'> <p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a> </li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'> <p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a> </li>");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})
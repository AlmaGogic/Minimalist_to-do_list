document.addEventListener("DOMContentLoaded", function () {

    'use strict';

    var addNew = document.getElementById('addNew');
    var newItem = document.getElementById('newItem');
    var exportTodo = document.getElementById('export');
    var importTodo = document.getElementById('importFile');
    var items = document.getElementById('items');
    var todoList = [];

    function init(todoList) {
        var text = localStorage.getItem("testJSON");
        todoList = JSON.parse(text);
        todoList
            .map(function (e, i) {
                items.appendChild(createItem(e.text, e.checked));
            });
    } 

    function createItem(text, checked, del) {
        var item = document.createElement('tr');
        var value = newItem.value;
        var status = checked ? "checked" : "";
        var html =
            '<td><div class="itemText">' + text + '</div></td>' +
            '<td><input class="itemStatus" type="checkbox"' + status + '/></td>' +
            '<td><div class="deleteItem"><span class="glyphicon glyphicon-trash"></span></div></td>'; 
        
        item.innerHTML = html;

        item.querySelector(".itemStatus").addEventListener("CheckboxStateChange", function(){
           if(this.checked){
              item.setAttribute("style", "background-color:lightcyan");
           }else
               item.setAttribute("style", "background-color:white");
           walkItems();
     	   saveLocal();
        }); 

        item.querySelector('.deleteItem').addEventListener('click', function () {
            item.remove();
            walkItems();
            saveLocal();
        });
 
        if(checked==true){
              item.setAttribute("style", "background-color:lightcyan");
           }else
               item.setAttribute("style", "background-color:white");
        

        item.setAttribute('class', 'item');
 
        return item;
    }

    addNew.addEventListener('click', function () {
        var value = newItem.value;
        if (!value.length) {
            return;
        }
        var item = createItem(value, false);
        var nodes = items.querySelectorAll('.item');
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node != null){
           
		  if(node.querySelector('.itemText').innerText == newItem.value){
                     return;
                  }
            }
        }
        items.appendChild(item);
        newItem.value = '';

	walkItems();
        saveLocal();
    });


    function walkItems() {
        todoList = [];
        var nodes = items.querySelectorAll('.item');
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node != null){
           
		    var element = {};
		    element.text = node.querySelector('.itemText').innerText;
                    element.checked = node.querySelector('.itemStatus').checked;

		    todoList.push(element);
            }
        }
    } 

    function saveLocal(){
        var myJSON = JSON.stringify(todoList);
        localStorage.setItem("testJSON", myJSON);
    }

    function exportDataToFile(){
	var text = localStorage.getItem("testJSON");

	var element = exportTodo;
	  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	  element.setAttribute('download', 'todoList.txt');
    }

    exportTodo.addEventListener('click', function () {
         exportDataToFile();
    });

    function importDataFromFile(event){
	 
	 var file = event.target.files[0];
	  var reader = new FileReader();
	  reader.onload = function(event) {
	    // The file's text will be printed here

            todoList = JSON.parse(event.target.result);
            todoList
                .map(function (e, i) {
                items.appendChild(createItem(e.text, e.checked));
	        });
          }

	  reader.readAsText(file);
    }

    importTodo.addEventListener('change', importDataFromFile, false);

   init(); 

});

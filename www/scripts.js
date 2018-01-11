// This is a JavaScript file
var todo = {
        filterFlag : 'all'    
    };

document.addEventListener('init', function(event){
    var view = event.target.id || "list";
        switch(view){
          
            // case "menu":
            //    todo.menuInit(event.target);
            //    break;

            case "list":
             todo.listInit(event.target);
             break;

             default: 
               return new Error();
        }
}, false);

todo.listInit = function(target){    
    this.list = document.querySelector('#todo-list');
    
    target.querySelector('#splitter-toggle').addEventListener('click', function(){
            document.querySelector('#splitter-menu').open();
        });
        
    target.querySelector('#add').addEventListener('click', this.addItemPromt.bind(this ));
   
   todoStorage.init();
   
   this.refresh();
    
};
todo.addItemPromt = function(){
    ons.notification.prompt({message: 'Enter To-Do item',
        title : 'New Item',
        cancellable : true,
        
        callback : function(label){
            if (label === '' || label === null) {
                return;
            }             

            if (todoStorage.add(label)) {
                this.refresh();
            }else{
                ons.notification.alert('Fail to add new item on to-do list ');
            }
        }.bind(this)
        
    });
}
todo.refresh = function(){
    var items = todoStorage.filter(this.filterFlag);
    
    this.list.innerHTML = items.map(function(item, i){
        var listItem = document.querySelector('#todo-list-item').innerHTML;
        
        console.log(i);
       
        if(listItem === null){
          return new Error("No Items to add");
       } 
       return listItem
        .replace('{‌{label}}', item.label)
        .replace('{‌{checked}}', item.status === 'completed'? 'checked' : '');
    }).join('');
    
    var children = this.list.children;
    
    
 
    items.forEach(function(item, i){
        event = {
          element: children[i].querySelector('ons-checkbox'),
          function: this.toggleStatus.bind(this, item.label)
        };
        this.events.push(event);
        event.element.addEventListener('click', event.function);
        
        event = {
            element: children[i].querySelector('ons-icon'),
            function: this.removeItemPrompt.bind(this, item.label)
        };
        this.events.push(event);
        event.element.addEventListener('click', event.function);
    }.bind(todo));   
    
    
    this.events = [];
    var event = {};
    

    this.events.forEach(function(event, i){
       event.element.removeEventListener('click', event.function); 
    });
    
};

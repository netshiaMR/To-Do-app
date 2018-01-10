// This is a JavaScript file
var todo = {
        fliterFlag : 'all'    
    };

document.addEventListener('init', function(event){
    var view = event.target.id;
        if (view === 'menu' || view === 'list') {
            todo[view + 'Init'](event.target);
        }
}, false);

todo.listInit = function(target){    
    this.list = document.querySelector('#todo-list');
    
    target.querySelector('#splitter-toggle').addEventListener('click', function(){
            document.querySelector('#splitter-menu').open();
        });
        
    target.querySelector('#add').addEventListener('click', this.addItemPromt.bind(this));
   
   todoStorage.init();
   
   this.refresh();
    
};
todo.addItemPromt = function(){
    ons.notification.prompt ({message: 'Enter To-Do item',
        title : 'New Item',
        cancallabel : true,
        
        callback : function(label){
            if (label === '' || label === null) {
                return;
            }             
            if (todoStorage.add()) {
                ons.notification.alert('Sucessful added ');
                this.refresh();
            }else{
                ons.notification.alert('Fail to add new item on to-do list ');
            }
        }.bind(this)
        
    });
}
todo.refresh = function(){
    var items = todoStorage.filter(this.filterFlag);
    
    this.list.innerHTML = items.map(function(item){
       return document.querySelector('#todo-list-item').innerHTML
        .replace('{‌{label}}', item.label)
        .replace('{‌{checked}}', item.status === 'completed'? 'checked' : '');
    }).join('');
    
    var children = this.list.children;
    
    this.events = [];
     
    this.events.forEach(function (event, i) {
       event.element.removeEventListener('click', event.function); 
    });    
    
   
    var event = {};
    
    items.forEach(function(item, i){
        event = {
          element: children[i].querySelector('ons-input'),
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
};
todo.toggleStatus = function(label) {
    if(todoStorage.toggleStatus(label)){
        this.refresh();
    } else {
        ons.notification.alert('Failed to change the status of the selected item!');
    }
}
todo.removeItemPrompt = function(label){
    ons.notification.confirm('are you sure you would like to remove this item ' + label +' from the list',{
        title : 'Remove an item',
        
        callback : function(answer){
            if (answer === 1) {
                if (todoStorage.remove(label)) {
                    this.refresh();
                } else {  
                    ons.notification.alert('Failed to Remove the item from To-Do list!');
                }                    
            }            
        }.bind(this)   
    });
    
}
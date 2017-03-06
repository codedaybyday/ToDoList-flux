var ToDoDispatcher = require('../dispatcher/ToDoDispatcher');
var ToDoConstants = require('../constants/ToDoConstants');
var assign = require('object-assign');
var ToDoActions = require('../actions/ToDoActions');
var data = require('../data/data');
var emitter = require('../eventEmitter/emitter');
var ToDoStore = assign({},{
    imcompleted_create:function(text){
        //console.log('flux:',text);
        data.undo.push(text)
        //return data.undo;
    },
    imcompleted_update:function(text){
        //var list = data.undo;
        if(text){
            data.undo.push(text);
        }
        //return data.undo;
    },
    imcompleted_delete:function (index) {
        return data.undo.splice(index,1);
    },
    completed_create:function(text){
        //console.log('flux:',text);
        data.do.push(text)
        //return data.undo;
    },
    completed_update:function (text) {
        if(text){
            data.do.push(text);
        }
    },
    toggle_completed:function(index){
        var last = this.imcompleted_delete(index);
        this.completed_create(last);
    },
    toggle_imcompleted:function(index){
        var last = this.completed_delete(index);
        this.imcompleted_create(last);
    },
    completed_delete:function(index){
        return data.do.splice(index,1);
    }
});
ToDoDispatcher.register(function(action){
    //console.log('register');
    switch(action.actionType){
        case ToDoConstants.actionType.IMCOMPLETED_CREATE:
            ToDoStore.imcompleted_create(action.text);
            //console.log('create',list);
            emitter.emit(ToDoConstants.eventType.IMCOMPLETED_UPDATE,data.undo);
            break;
        case ToDoConstants.actionType.IMCOMPLETED_UPDATE:
            ToDoStore.imcompleted_update();
            //console.log('store',list);
            emitter.emit(ToDoConstants.eventType.IMCOMPLETED_UPDATE,data.undo);
            break;
        case ToDoConstants.actionType.IMCOMPLETED_DELETE:
            ToDoStore.imcompleted_delete(action.index);
            emitter.emit(ToDoConstants.eventType.IMCOMPLETED_UPDATE,data.undo);
            break;
        case ToDoConstants.actionType.COMPLETED_UPDATE:
            ToDoStore.completed_update();
            emitter.emit(ToDoConstants.eventType.COMPLETED_UPDATE,data.do);
            break;
        case ToDoConstants.actionType.TOGGLE_COMPLETED:
            ToDoStore.toggle_completed(action.index);
            emitter.emit(ToDoConstants.eventType.COMPLETED_UPDATE,data.do);
            emitter.emit(ToDoConstants.eventType.IMCOMPLETED_UPDATE,data.undo);
            break;
        case ToDoConstants.actionType.TOGGLE_IMCOMPLETED:
            ToDoStore.toggle_imcompleted(action.index);
            emitter.emit(ToDoConstants.eventType.COMPLETED_UPDATE,data.do);
            emitter.emit(ToDoConstants.eventType.IMCOMPLETED_UPDATE,data.undo);
            break;
        case ToDoConstants.actionType.COMPLETED_DELETE:
            ToDoStore.completed_delete(action.index);
            emitter.emit(ToDoConstants.eventType.COMPLETED_UPDATE,data.do);
            break;
    }
});
module.exports = ToDoStore;
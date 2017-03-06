/**
 * Created by liubeijing on 16/8/13.
 */
var ToDoDispatcher = require('../dispatcher/ToDoDispatcher');
var ToDoConstant = require('../constants/ToDoConstants');
var actions = {
    imcompleted_create:function(text){
        //console.log(text,ToDoDispatcher);
        ToDoDispatcher.dispatch({
            actionType:ToDoConstant.actionType.IMCOMPLETED_CREATE,
            text:text
        });
    },
    imcompleted_update:function(text){
        console.log('update')
        ToDoDispatcher.dispatch({
            actionType:ToDoConstant.actionType.IMCOMPLETED_UPDATE,
            text:text
        });
    },
    imcompleted_delete:function(index){
        ToDoDispatcher.dispatch({
            actionType:ToDoConstant.actionType.IMCOMPLETED_DELETE,
            text:index
        });
    },
    completed_update:function(){
        ToDoDispatcher.dispatch({
            actionType:ToDoConstant.actionType.COMPLETED_UPDATE
            //text:index
        });
    },
    toggle_completed:function(index){
        ToDoDispatcher.dispatch({
            actionType:ToDoConstant.actionType.TOGGLE_COMPLETED,
            index:index
        });
    },
    completed_delete:function(index){
        ToDoDispatcher.dispatch({
            actionType:ToDoConstant.actionType.COMPLETED_DELETE,
            index:index
        });
    },
    toggle_imcompleted:function(index){
        ToDoDispatcher.dispatch({
            actionType:ToDoConstant.actionType.TOGGLE_IMCOMPLETED,
            index:index
        });
    }
};
module.exports = actions;
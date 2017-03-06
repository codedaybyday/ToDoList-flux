var React = require('react');
var react_dom = require('react-dom');
var emitter = require('../eventEmitter/emitter');
var actions = require('../actions/ToDoActions');
var ToDoConstant = require('../constants/ToDoConstants');
var store = require("../stores/ToDoStore");
require("./../style/index.less");

var ToDoList = React.createClass({
    /*getInitialState:function(){
        return {
            finished:[],//完成列表
            unfinished:[]//未完成
        };
    },*/
    render:function(){
        return (
            <div>
                <Header/>
                <div className="content">
                    <IncompletedList/>
                    <CompletedList/>
                </div>
                <Footer/>
            </div>
        );
    }
});
//页头
var Header = React.createClass({
    getInitialState:function () {
        return {
            text:''
        };
    },
    handleSubmit:function(event){
        event.preventDefault();
        //console.log(this);
        if(this.state.text.trim() === ''){
            alert('表单不能为空!');
            return;
        }
        actions.imcompleted_create(this.state.text);
        //emitter.emit('submit',this.state.text);
        this.setState({text:''});
        //console.log('clear',this.state.text);
    },
    handleChange:function(event){
        this.setState({text:event.target.value});
    },
    render:function(){
        return (
            <div className="header">
                <section>
                    <babel>ToDoList</babel>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="添加todo" onChange={this.handleChange} value={this.state.text}/>
                    </form>
                </section>
            </div>
        );
    }
});
//正在进行列表
var IncompletedList = React.createClass({
    getInitialState:function(){
        return {
            list:[],
            last:''
        };
    },
    removeItem:function(index){
        var listArr = this.state.list;
        //listArr.splice(index,1);
        //this.setState({list:listArr});
        actions.imcompleted_delete(index);
    },
    removeAndAdd:function(index){
        //console.log('remove');
        this.state.last = this.state.list[index];
        //this.removeItem(index);
        //emitter.emit('done',this.state.last);//触发完成列表的事件
        actions.toggle_completed(index);
    },
    render:function(){
        //var count = this.state.list;
        //console.log("list ", this.state.list);
        var _this = this;
        return (
            <div className="incompleted-list">
                <Title text="正在进行" count={this.state.list.length}/>
                <ul>
                    {
                        this.state.list.map(function(item,index){
                            return <ListItem text={item} removeFn={_this.removeItem} index={index} doneFn={_this.removeAndAdd}/>;
                        })
                    }
                </ul>
            </div>
        );
    },
    componentDidMount:function () {
        var _this = this;
        var listArr = this.state.list;
        emitter.on('submit',function(text){
            listArr.push(text);
            //console.log(listArr,text);
            _this.setState({
                list: listArr
            });
            //console.log(text, _this.state.list);
        });
        //emitter.on(ToDoConstant.eventType.IMCOMPLETED_CREATE,function(text){

        //});
        emitter.on(ToDoConstant.eventType.IMCOMPLETED_UPDATE,function(list){
            console.log('data',list);
            _this.setState({list:list});
        });
        actions.imcompleted_update();
    },
    componentWillUnmount:function(){
        emitter.removeListener('submit');
        emitter.removeListener(TodoConstant.eventType.UPDATE);
    }
});
//已经完成列表
var CompletedList = React.createClass({
    getInitialState:function(){
        return {
            list:[],
            last:''
        };
    },
    removeItem:function(index){
        /*var listArr = this.state.list;
        listArr.splice(index,1);
        this.setState({list:listArr});*/
        actions.completed_delete(index);
    },
    removeAndAdd:function(index){
        //this.state.last = this.state.list[index];
        //this.removeItem(index);
        //emitter.emit('submit',this.state.last);//触发完成列表的事件
        actions.toggle_imcompleted(index);
    },
    render:function(){
        var  _this = this;
        return (
            <div className="completed-list">
                <Title text="已经完成" count={this.state.list.length}/>
                <ul>
                    {
                        this.state.list.map(function(item,index){
                            return <ListItemDone index={index} text={item} removeFn={_this.removeItem} unfinishedFn={_this.removeAndAdd}/>;
                        })
                    }
                </ul>
            </div>
        );
    },
    componentDidMount:function () {
        var _this = this;
        emitter.on('done',function(item){
            //console.log('done');
            var listArr = _this.state.list;
            listArr.push(item);
            _this.setState({
                list:listArr
            });
        });
        emitter.on(ToDoConstant.eventType.COMPLETED_UPDATE,function(list){
            _this.setState({list:list});
        });
        actions.completed_update();
    },
    componentWillUnmount:function(){
        emitter.removeListener('done');
    }
});
//列表标题
var Title = React.createClass({
    render:function () {
        return (
            <h2 className="title">
                <span className="fl">{this.props.text}</span>
                <span className="count fr">{this.props.count}</span>
            </h2>
        );
    }
});
//列表项
var ListItem = React.createClass({
    remove:function(){
        //console.log(this.props.removeFn);
        this.props.removeFn(this.props.index);
    },
    handleChange:function(){
        this.props.doneFn(this.props.index);
    },
    render:function(){
        return (
            <li className="item">
                <input type="checkbox" className="fl" onChange={this.handleChange}/>
                <span className="fl">{this.props.text}</span>
                <a href="javascript:void(0)" className="fr" onClick={this.remove}>-</a>
            </li>
        );
    }
});
//未完成列表项
var ListItemDone = React.createClass({
    remove:function(){
        this.props.removeFn(this.props.index);
    },
    handleChange:function(){
        this.props.unfinishedFn(this.props.index);
    },
    render:function(){
        return (
            <li className="done-item">
                <input type="checkbox" className="fl" checked="checked" onChange={this.handleChange}/>
                <span className="fl">{this.props.text}</span>
                <a href="javascript:void(0)" className="fr" onClick={this.remove}>-</a>
            </li>
        );
    }
});
//页尾
var Footer = React.createClass({
    render:function () {
        return (<div className="footer">copyright@2016,<a href="">一键清空</a></div>);
    }
});
react_dom.render(<ToDoList/>,document.getElementById('container'));
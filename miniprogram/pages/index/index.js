const DB = wx.cloud.database().collection("timeblock")
var app = getApp()

Page({
  data: {
    str_openid:'',
    year: '',
    month: '',
    day: '',
    days: '',
    date: '',
    List_left: [['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],], 
    List_right: [['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],['#f6f6f6','','点击修改备注'],],    
    calendarshow: '',
    value: '点击修改备注',
    inputvalue:'点击修改备注',
    remark_left: '',
    remark_right: '',
    remarkShow: '',
    inputshow: '',
    _id: 'openid',
  },
/*
  var data = {}
  data[i] = '#666666'
  this.setData(data)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${days}`;
        console.log(res.data.List_right)
      console.log(123)
      var List_right = []
      var List_left = []
      List_left = res.data.List_left
      List_right = res.data.List_right
      console.log(this.data.List_right)
      
      //this.setData({List_left:List_right})
      //this.setData({List_right:List_right})
*/
 onConfirm:function(event){
  var List_left = this.data.List_left
  var List_right = this.data.List_right
  for(var i = 0; i < this.data.List_right.length;i++){
    if(this.data.List_right[i][0]!='#f6f6f6'){
      this.data.List_right[i][0] = '#f6f6f6'
      this.data.List_right[i][1] = ''
      this.data.List_right[i][2] = '点击修改备注'
      var List_right = this.data.List_right
      this.setData({List_right:List_right})
    }    
  }
for(var i = 0; i < this.data.List_left.length;i++){
  if(this.data.List_left[i][0]!='#f6f6f6'){
    this.data.List_left[i][0] = '#f6f6f6'
    this.data.List_left[i][1] = ''
    this.data.List_left[i][2] = '点击修改备注'
    var List_left = this.data.List_left
    this.setData({List_left:List_left}) 
    }
  }
  var date = new Date(event.detail);
  var days = date.getDay()
  switch(days) {
    case 1: days = '星期一'; break
    case 2: days = '星期二'; break
    case 3: days = '星期三'; break
    case 4: days = '星期四'; break
    case 5: days = '星期五'; break
    case 6: days = '星期六'; break
    case 0: days = '星期日'; break
}
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  this.setData({
    year:year,
    month:month,
    day:day,
    days:days,
    calendarshow: false
  })
  var _id = this.data._id
  DB.doc(_id).get().then(res=>{
    var name_left = year + "/" + month + "/" + day + "/left"
    var name_right = year + "/" + month + "/" + day + "/right"
    if(res.data[`${name_left}`]){
      this.setData({
        List_left: res.data[`${name_left}`],
        List_right: res.data[`${name_right}`]
      })
    }else{
      DB.doc(_id).update({
        data:{
          [name_left]:List_left,
          [name_right]:List_right
        }
      })
    }
  })
},

onLoad: function(){
  var that = this
  //获取openid
  app.wxlogin(function(res){
    console.log('获取openid:'+res)
    if(res){
      that.setData({
        str_openid:res
      })
      //逻辑处理
    }
  })
  /*wx.getSetting({
    success:function(res){
      console.log(res.authSetting['scope.userInfo'])
      if(res.authSetting['scope.userInfo']){
        console.log('yes')
      }else{
        console.log('no')
        wx.authorize({
          scope: 'scope.userInfo',
          success: function(){
            console.log('获取用户信息:授权成功')
          }
        })
      }
    }
  })*/
},

onShow: function() {
  var _id = this.data._id
  var myDate = new Date()
  var year = myDate.getFullYear()
  var month = myDate.getMonth() + 1
  var day = myDate.getDate()
  var days = myDate.getDay()
  var data = this.data
  switch(days) {
    case 1: days = '星期一'; break
    case 2: days = '星期二'; break
    case 3: days = '星期三'; break
    case 4: days = '星期四'; break
    case 5: days = '星期五'; break
    case 6: days = '星期六'; break
    case 0: days = '星期日'; break
  }
  DB.doc(_id).update({data:{
    month: month,
    day: day,
    days: days,
  }})
  this.setData({year:year,
    month:month,
    day:day,
    days:days
  })
  var name_left = year + "/" + month + "/" + day + "/left"
  var name_right = year + "/" + month + "/" + day + "/right"
  var List_left = this.data.List_left
  var List_right = this.data.List_right
  DB.doc(_id).get().then(res=>{
    if(res.data[`${name_left}`]){      
      this.setData({List_left: res.data[`${name_left}`],
      List_right: res.data[`${name_right}`]
    })
    }else{
      DB.doc(_id).update({
        data:{
          [name_left]:List_left,
          [name_right]:List_right
        }
      })
    }
  })
},


PlanUpDate: function(){
  var name_left = this.data.year + "/" + this.data.month + "/" + this.data.day + "/left"
  var name_right = this.data.year + "/" + this.data.month + "/" + this.data.day + "/right"
  var List_left = this.data.List_left
  var List_right = this.data.List_right
  this.setData({
    [name_left]:List_left,
    [name_right]:List_right
  })
  var _id = this.data._id
  DB.doc(_id).update({
    data:{
      [name_left]:List_left,
      [name_right]:List_right
    }
  })
},

addData: function(){
  var data = this.data
  DB.add({data})
},

/* 关闭备注栏 */
  remarkClose: function(){
    this.setData({
      remark_left: '',
      remark_right: '',
      remarkShow: false
    })
  },

  delplan: function (){
    if (String(this.data.remark_left) != '') {
      var left = this.data.remark_left
      this.data.List_left[left][0] = '#f6f6f6'
      this.data.List_left[left][1] = ''
      this.data.List_left[left][2] = '点击修改备注'
      var List_left = this.data.List_left
      this.setData({
        List_left:List_left,
        remark_left: '',
        remarkShow: false
      })
    }else if(String(this.data.remark_right) != '') {
      var right = this.data.remark_right      
      this.data.List_right[right][0] = '#f6f6f6'
      this.data.List_right[right][1] = ''
      this.data.List_right[right][2] = '点击修改备注'
      var List_right = this.data.List_right      
      this.setData({List_right:List_right,
        remark_right: '',
        remarkShow: false
      })
    }
    this.PlanUpDate()
  },

 remarkChange: function(event){
  // event.detail 为当前输入的值
  var inputvalue = event.detail
  if (inputvalue == '') {
    inputvalue = '点击修改备注'
  }
  this.setData({
    inputvalue : inputvalue
  })
},
  /*新的修改备注*/
  modify: function(){
    var inputvalue = this.data.inputvalue
    this.setData({value:inputvalue})    
    if (String(this.data.remark_left) != '') {
      var left = this.data.remark_left
      this.data.List_left[left][2] = this.data.value
      var List_left = this.data.List_left
      this.setData({List_left:List_left})
    }else if(String(this.data.remark_right) != '') {
      var right = this.data.remark_right
      this.data.List_right[right][2] = this.data.value
      var List_right = this.data.List_right
      this.setData({List_right:List_right})
    }
    this.setData({
      inputshow: false,
      remarkShow: true
    })
    /*更新数据库*/
    this.PlanUpDate()
  },

inputshow: function(){
  this.setData({
    remarkShow: false,
    inputshow: true
  })
},

inputclose: function(){
  this.setData({
    inputshow: false,
    remarkShow: true
  })
},

  focus_left: function(e){
    var idx = parseInt(e.currentTarget.id);
    if(this.data.List_left[idx][0]=='#f6f6f6'){
      this.data.List_left[idx][0] = '#98dbff'
      var List_left = this.data.List_left
      this.setData({List_left:List_left})
    }else if(this.data.List_left[idx][0]=='#98dbff'){
      this.data.List_left[idx][0] = '#f6f6f6'
      var List_left = this.data.List_left
      this.setData({List_left:List_left})
    }else{
      var value = this.data.List_left[idx][2]
      this.setData({
        value:value,
        remark_left: idx,
        remarkShow: true
      })
    }
  },

  focus_right: function(e){
    var idx = parseInt(e.currentTarget.id);
    if(this.data.List_right[idx][0]=='#f6f6f6'){
      this.data.List_right[idx][0] = '#98dbff'
      var List_right = this.data.List_right
      this.setData({List_right:List_right})
    }else if(this.data.List_right[idx][0]=='#98dbff'){
      this.data.List_right[idx][0] = '#f6f6f6'
      var List_right = this.data.List_right
      this.setData({List_right:List_right})
    }else{
      var value = this.data.List_right[idx][2]
      this.setData({
        value:value,
        remark_right: idx,
        remarkShow: true
      })
    }
  },

working: function(){
  for(var i = 0; i < this.data.List_right.length;i++){
    if(this.data.List_right[i][0]=='#98dbff'){
      this.data.List_right[i][1] = '工作'
      this.data.List_right[i][0] = '#FF3A30'
      var List_right = this.data.List_right
      this.setData({List_right:List_right})
    }    
  }
for(var i = 0; i < this.data.List_left.length;i++){
  if(this.data.List_left[i][0]=='#98dbff'){
    this.data.List_left[i][0] = '#FF3A30'
    this.data.List_left[i][1] = '工作'
    var List_left = this.data.List_left
    this.setData({List_left:List_left}) 
    }
  }
  this.PlanUpDate()
},

learning: function(){
  for(var i = 0; i < this.data.List_right.length;i++){
    if(this.data.List_right[i][0]=='#98dbff'){
      this.data.List_right[i][0] = '#FD8244'
      this.data.List_right[i][1] = '学习'
      var List_right = this.data.List_right
      this.setData({List_right:List_right})
    }
  }
for(var i = 0; i < this.data.List_left.length;i++){
  if(this.data.List_left[i][0]=='#98dbff'){
    this.data.List_left[i][0] = '#FD8244'
    this.data.List_left[i][1] = '学习'
    var List_left = this.data.List_left
    this.setData({List_left:List_left}) 
    }
  }
  this.PlanUpDate()
},

shopping: function(){
  for(var i = 0; i < this.data.List_right.length;i++){
    if(this.data.List_right[i][0]=='#98dbff'){
      this.data.List_right[i][0] = '#FDB844'
      this.data.List_right[i][1] = '购物'
      var List_right = this.data.List_right
      this.setData({List_right:List_right})
    }
  }
for(var i = 0; i < this.data.List_left.length;i++){
  if(this.data.List_left[i][0]=='#98dbff'){
    this.data.List_left[i][0] = '#FDB844'
    this.data.List_left[i][1] = '购物'
    var List_left = this.data.List_left
    this.setData({List_left:List_left}) 
    }
  }
  this.PlanUpDate()
},

housework: function(){
  for(var i = 0; i < this.data.List_right.length;i++){
    if(this.data.List_right[i][0]=='#98dbff'){
      this.data.List_right[i][0] = '#E2CB00'
      this.data.List_right[i][1] = '家务'
      var List_right = this.data.List_right
      this.setData({List_right:List_right})
    }
  }
for(var i = 0; i < this.data.List_left.length;i++){
  if(this.data.List_left[i][0]=='#98dbff'){
    this.data.List_left[i][0] = '#E2CB00'
    this.data.List_left[i][1] = '家务'
    var List_left = this.data.List_left
    this.setData({List_left:List_left}) 
    }
  }
  this.PlanUpDate()
},

TV: function(){
  for(var i = 0; i < this.data.List_right.length;i++){
    if(this.data.List_right[i][0]=='#98dbff'){
      this.data.List_right[i][0] = '#67d033'
      this.data.List_right[i][1] = '看电视'
      var List_right = this.data.List_right
      var data = {List_right}
      this.setData({List_right:List_right})
    }
  }
for(var i = 0; i < this.data.List_left.length;i++){
  if(this.data.List_left[i][0]=='#98dbff'){
    this.data.List_left[i][0] = '#67d033'
    this.data.List_left[i][1] = '看电视'
    var List_left = this.data.List_left
    this.setData({List_left:List_left}) 
    }
  }
  this.PlanUpDate()
},

mobilephone: function(){
  for(var i = 0; i < this.data.List_right.length;i++){
    if(this.data.List_right[i][0]=='#98dbff'){
      this.data.List_right[i][0] = '#48F9A7'
      this.data.List_right[i][1] = '玩手机'
      var List_right = this.data.List_right
      this.setData({List_right:List_right})
    }
  }
for(var i = 0; i < this.data.List_left.length;i++){
  if(this.data.List_left[i][0]=='#98dbff'){
    this.data.List_left[i][0] = '#48F9A7'
    this.data.List_left[i][1] = '玩手机'
    var List_left = this.data.List_left
    this.setData({List_left:List_left}) 
    }
  }
  this.PlanUpDate()
},

game: function(){
  for(var i = 0; i < this.data.List_right.length;i++){
    if(this.data.List_right[i][0]=='#98dbff'){
      this.data.List_right[i][0] = '#48F9EE'
      this.data.List_right[i][1] = '玩游戏'
      var List_right = this.data.List_right
      this.setData({List_right:List_right})
    }
  }
for(var i = 0; i < this.data.List_left.length;i++){
  if(this.data.List_left[i][0]=='#98dbff'){
    this.data.List_left[i][0] = '#48F9EE'
    this.data.List_left[i][1] = '玩游戏'
    var List_left = this.data.List_left
    this.setData({List_left:List_left}) 
    }
  }
  this.PlanUpDate()
},

sports: function(){
  for(var i = 0; i < this.data.List_right.length;i++){
    if(this.data.List_right[i][0]=='#98dbff'){
      this.data.List_right[i][0] = '#487FF9'
      this.data.List_right[i][1] = '运动'
      var List_right = this.data.List_right
      this.setData({List_right:List_right})
    }
  }
for(var i = 0; i < this.data.List_left.length;i++){
  if(this.data.List_left[i][0]=='#98dbff'){
    this.data.List_left[i][0] = '#487FF9'
    this.data.List_left[i][1] = '运动'
    var List_left = this.data.List_left
    this.setData({List_left:List_left}) 
    }
  }
  this.PlanUpDate()
},

party: function(){
  for(var i = 0; i < this.data.List_right.length;i++){
    if(this.data.List_right[i][0]=='#98dbff'){
      this.data.List_right[i][0] = '#BB48F9'
      this.data.List_right[i][1] = '聚会'
      var List_right = this.data.List_right
      this.setData({List_right:List_right})
    }
  }
for(var i = 0; i < this.data.List_left.length;i++){
  if(this.data.List_left[i][0]=='#98dbff'){
    this.data.List_left[i][0] = '#BB48F9'
    this.data.List_left[i][1] = '聚会'
    var List_left = this.data.List_left
    this.setData({List_left:List_left}) 
    }
  }
  this.PlanUpDate()
},

sleeping: function(){
  for(var i = 0; i < this.data.List_right.length;i++){
    if(this.data.List_right[i][0]=='#98dbff'){
      this.data.List_right[i][0] = '#666666'
      this.data.List_right[i][1] = '睡觉'
      var List_right = this.data.List_right
      this.setData({List_right:List_right})
    }
  }
for(var i = 0; i < this.data.List_left.length;i++){
  if(this.data.List_left[i][0]=='#98dbff'){
    this.data.List_left[i][0] = '#666666'
    this.data.List_left[i][1] = '睡觉'
    var List_left = this.data.List_left
    this.setData({List_left:List_left}) 
    }
  }
  this.PlanUpDate()
},


  calendarshowPopup: function(){
    this.setData({ calendarshow: true });
  },

  calendaronClose: function(){
    this.setData({ calendarshow: false });
  },
});
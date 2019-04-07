define(['mui'], function(mui) {

	let [a,b]=[[],[]];//瀑布流
	let parentdiv = [...document.querySelectorAll('.parent>div')];
	
	var index = 0;
	//初始化
	function init() {
		mui.init();
ajaxs()
		tab();
	}
function ajaxs(){
		mui.ajax('/api/list', {
		success: function(rs) {
	   if (rs.code === 1) {
		      pul(rs.data)
			}
		},
	
	});
}
//2瀑布流
function fullrender(data){
	
	//第一要forEach
	data.forEach(function(item,i){
		//第二不判断a 的长度
		if(!a.length){
			a.push(item);
			return;
		}
		if(!b.length){
			b.push(item);
			return;
		}
		if(a.reduce((s,v)=>s+v.height,0)<b.reduce((s,v)=>s+v.height,0)){
			a.push(item);
		}else{
			b.push(item);
		}	
	})
		
	return [a,b];
}


//3
	function  pul(data) {
       var pbldata= fullrender(data); //pubuliu 
	   pbldata.forEach(function(item,i){
		    parentdiv[i].innerHTML = data.map(function(v, i) {
		   	return `<dl>
		   				<dt><img src="images/${v.img}" width="100%" style:"height:${v.height}px"></dt>
		   				<dd>
		   				<p>${v.the}</p>
		   					<p>${v.title}</p>
		   				</dd>
		   			</dl>`
		   }).join('');
	   })
	  }

//tab切换
function tab() {
var spans = document.querySelectorAll('.nav span');
mui('#nav').on('tap', 'span', function() {
		spans[index].className = '';
		this.className = 'active';
		index = this.id;
		//渲染时为空
		[a,b]=[[],[]];
		parentdiv.forEach(item=>{
			item.innerHTML='';
		})
		
		if(this.id==='0'){
		ajaxs()
		}else if(this.id==='1'){
		ajaxs()
		}else if(this.id==='2'){
		ajaxs()
		}else{
			ajaxs()
		}
		
	})
}
init()
})

var TINY={};

function $T(i){return document.getElementById(i)}
function $$T(e,p){p=p||document; return p.getElementsByTagName(e)}

TINY.slideshow=function(n){
	this.infoSpeed=this.imgSpeed=this.speed=10;
	this.thumbOpacity=this.navHover=70;
	this.navOpacity=25;
	this.scrollSpeed=5;
	this.letterbox='#000';
	this.n=n;
	this.c=0;
	this.a=[]
};

TINY.slideshow.prototype={
	init:function(s,z,b,f,q,v){
		s=$T(s);
		var m=$$T('li',s), i=0, w=0;
		this.l=m.length;
		this.q=$T(q);
		this.f=$T(z);
		this.r=$T(this.info);
		this.iw=parseInt(TINY.style.val(z,'width'));
		this.ih=parseInt(TINY.style.val(z,'height'));
		this.pw=parseInt(TINY.style.val(v,'width'));
		if(this.thumbs){
			var u=$T(this.left), r=$T(this.right);
			u.onmouseover=new Function('TINY.scroll.init("'+this.thumbs+'",-1,'+this.scrollSpeed+')');
			u.onmouseout=r.onmouseout=new Function('TINY.scroll.cl("'+this.thumbs+'")');
			r.onmouseover=new Function('TINY.scroll.init("'+this.thumbs+'",1,'+this.scrollSpeed+')');
			this.p=$T(this.thumbs)
		}
		for(i;i<this.l;i++){
			this.a[i]={};
			var h=m[i], a=this.a[i], a0=$$T('a',h)[0],img=$$T('img',h),p=img[0],g;
			if (p.className=='thumbnail'){p=img[1];g=img[0];}
			else{p=img[0];g=img[1];}
			a.t=$$T('h3',h)[0].innerHTML;
			a.d=$$T('p',h)[0].innerHTML;
			a.l=a0?a0.href:'';
			a.p=p.src;
			if(this.thumbs && g){
				this.p.appendChild(g);
				w+=parseInt(g.offsetWidth);
				if(i!=this.l-1){
					g.style.marginRight=this.spacing+'px';
					w+=this.spacing
				}
				this.p.style.width=w+'px';
				g.style.opacity=this.thumbOpacity/100;
				g.style.filter='alpha(opacity='+this.thumbOpacity+')';
				g.onmouseover=new Function('TINY.alpha.set(this,100,5)');
				g.onmouseout=new Function('TINY.alpha.set(this,'+this.thumbOpacity+',5)');
				g.onclick=new Function(this.n+'.pr('+i+',1)')
			}
		}
		if(b&&f){
			b=$T(b);
			f=$T(f);
			b.style.opacity=f.style.opacity=this.navOpacity/100;
			b.style.filter=f.style.filter='alpha(opacity='+this.navOpacity+')';
			b.onmouseover=f.onmouseover=new Function('TINY.alpha.set(this,'+this.navHover+',5)');
			b.onmouseout=f.onmouseout=new Function('TINY.alpha.set(this,'+this.navOpacity+',5)');
			b.onclick=new Function(this.n+'.mv(-1,1)');
			f.onclick=new Function(this.n+'.mv(1,1)')
		}
		this.auto?this.is(0,0):this.is(0,1)
	},
	mv:function(d,c){
		var t=this.c+d;
		this.c=t=t<0?this.l-1:t>this.l-1?0:t;
		this.pr(t,c)
	},
	pr:function(t,c){
		clearTimeout(this.lt);
		if(c){
			clearTimeout(this.at)
		}
		this.c=t;
		this.is(t,c)
	},
	is:function(s,c){
		if(this.info){
			TINY.height.set(this.r,1,this.infoSpeed/2,-1)
		}
		var i=new Image();
		i.style.opacity=0;
		i.style.filter='alpha(opacity=0)';
		this.i=i;
		i.onload=new Function(this.n+'.le('+s+','+c+')');
		i.src=this.a[s].p;
		if(this.thumbs){
			var a=$$T('img',this.p), l=a.length, x=0;
			var ol = this.p.offsetLeft + a[s].offsetLeft;
			var or = ol + a[s].offsetWidth;
			if(ol<0){
				this.p.style.left=-a[s].offsetLeft+'px';
			}else if(or>this.pw){
				this.p.style.left=(this.pw-or+this.p.offsetLeft)+'px';
			}
			for(x;x<l;x++){
				a[x].style.borderColor=x!=s?'':this.active
			}
		}
	},
	le:function(s,c){
		this.f.appendChild(this.i);
		var w=this.iw-parseInt(this.i.offsetWidth);
		if(w>0){
			this.i.style.borderLeft=this.i.style.borderRight=Math.floor(w/2)+'px solid '+this.letterbox;
		}
		var h=this.ih-parseInt(this.i.offsetHeight);
		if(h>0){
			this.i.style.borderTop=this.i.style.borderBottom=Math.floor(h/2)+'px solid '+this.letterbox;
		}
		TINY.alpha.set(this.i,100,this.imgSpeed);
		var n=new Function(this.n+'.nf('+s+')');
		this.lt=setTimeout(n,this.imgSpeed*100);
		if(!c){
			this.at=setTimeout(new Function(this.n+'.mv(1,0)'),this.speed*1000)
		}
		if(this.a[s].l!=''){
			this.q.onclick=new Function('window.location="'+this.a[s].l+'"');
			this.q.onmouseover=new Function('this.className="'+this.link+'"');
			this.q.onmouseout=new Function('this.className=""');
			this.q.style.cursor='pointer'
		}else{
			this.q.onclick=this.q.onmouseover=null;
			this.q.style.cursor='default'
		}
		var m=$$T('img',this.f);
		if(m.length>2){
			this.f.removeChild(m[0])
		}
	},
	nf:function(s){
		if(this.info){
			s=this.a[s];
			$$T('h3',this.r)[0].innerHTML=s.t;
			$$T('p',this.r)[0].innerHTML=s.d;
			this.r.style.height='auto';
			var h=parseInt(this.r.offsetHeight);
			this.r.style.height=0;
			TINY.height.set(this.r,h,this.infoSpeed,0)
		}
	}
};

TINY.scroll=function(){
	return{
		init:function(e,d,s){
			e=typeof e=='object'?e:$T(e); var p=e.style.left||TINY.style.val(e,'left'); e.style.left=p;
			var l=d==1?parseInt(e.offsetWidth)-parseInt(e.parentNode.offsetWidth):0; e.si=setInterval(function(){TINY.scroll.mv(e,l,d,s)},20)
		},
		mv:function(e,l,d,s){
			var c=parseInt(e.style.left);
			if(c>=l){TINY.scroll.cl(e)}else{var i=Math.abs(l+c); i=i<s?i:s; var n=c-i*d; e.style.left=n+'px'}
		},
		cl:function(e){e=typeof e=='object'?e:$T(e); clearInterval(e.si)}
	}
}();

TINY.height=function(){
	return{
		set:function(e,h,s,d){
			e=typeof e=='object'?e:$T(e); var oh=e.offsetHeight, ho=e.style.height||TINY.style.val(e,'height');
			ho=oh-parseInt(ho); var hd=oh-ho>h?-1:1; clearInterval(e.si); e.si=setInterval(function(){TINY.height.tw(e,h,ho,hd,s)},20)
		},
		tw:function(e,h,ho,hd,s){
			var oh=e.offsetHeight-ho;
			if(oh==h){clearInterval(e.si)}else{if(oh!=h){e.style.height=oh+(Math.ceil(Math.abs(h-oh)/s)*hd)+'px'}}
		}
	}
}();

TINY.alpha=function(){
	return{
		set:function(e,a,s){
			e=typeof e=='object'?e:$T(e); var o=e.style.opacity||TINY.style.val(e,'opacity'),
			d=a>o*100?1:-1; e.style.opacity=o; clearInterval(e.ai); e.ai=setInterval(function(){TINY.alpha.tw(e,a,d,s)},20)
		},
		tw:function(e,a,d,s){
			var o=Math.round(e.style.opacity*100);
			if(o==a){clearInterval(e.ai)}else{var n=o+Math.ceil(Math.abs(a-o)/s)*d; e.style.opacity=n/100; e.style.filter='alpha(opacity='+n+')'}
		}
	}
}();

TINY.style=function(){return{val:function(e,p){e=typeof e=='object'?e:$T(e); return e.currentStyle?e.currentStyle[p]:document.defaultView.getComputedStyle(e,null).getPropertyValue(p)}}}();

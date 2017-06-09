function E_book() {
	this.nowFontsize = $(".js_now_fontsize");
}

$.extend(E_book.prototype, {
	init: function(){
		this.restoreUserInfo();
		this.bindEvents();
	},
	
	restoreUserInfo: function() {
		try{
			if(window.localStorage) {
				var userInfo = {};
				if(window.localStorage.userInfo) {
					var userInfo = JSON.parse(window.localStorage.userInfo);
				}
				if(userInfo.bgColor){
					$("body").attr("class", userInfo.bgColor)
				}
				if(userInfo.fontSize){
					$(".js_content p").css({"font-size": userInfo.fontSize+"px"});
					this.nowFontsize.text(userInfo.fontSize)
				}
			}
		}catch(e) {};
	},
	
	bindEvents: function() {
		$(".js_choice_color li").on("click", this.handleChangeBgClick);
		$(".js_add_fontsize").on("click", $.proxy(this.handleAddfontsizeClick, this));
		$(".js_ninus_fontsize").on("click", $.proxy(this.handleMinusfontsizeClick, this));
	},
	
	handleChangeBgClick: function() {
		var userInfo = {
			fontSize: $(".js_now_fontsize").text(),
			bgColor: $(this).attr("class")
		};
		userInfo = JSON.stringify(userInfo);
		try{
			if (window.localStorage) {
				window.localStorage.userInfo = userInfo;
			};
		}catch(e){};
		$("body").attr("class", $(this).attr("class"));
	},
	
	handleAddfontsizeClick: function() {
		fontSize: this.nowFontsize.text(parseInt(this.nowFontsize.text()) + 2)
			if(parseInt(this.nowFontsize.text()) >= 50){
				this.nowFontsize.text(50);
			};
		this.fontSize();
	},
	
	handleMinusfontsizeClick: function() {
		fontSize: this.nowFontsize.text(parseInt(this.nowFontsize.text()) - 2)
		if(parseInt(this.nowFontsize.text()) <= 8){
			this.nowFontsize.text(8);
		};
		this.fontSize();
	},
	
	fontSize: function() {
		var userInfo = {
			bgColor: $("body").attr("class"),
			fontSize: this.nowFontsize.text()
		};
		userInfo = JSON.stringify(userInfo);
		try{
			if (window.localStorage) {
				window.localStorage.userInfo = userInfo;
			};
		}catch(e) {};
		$(".js_content p").css({"font-size": parseInt(this.nowFontsize.text()) + "px"});
	}
})	

var e_book = new E_book();
e_book.init();


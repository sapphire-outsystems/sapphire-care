var localHostUrl = 'https://localhost:3000/dev.app.css';
var cdnUrl ="https://cdn.jsdelivr.net/gh/sapphire-outsystems/sapphire-care/dist/prod.app.css";

var add = (function() {
	return {
		checkLocalHost: function(params) {
			var _this = this;

			fetch(localHostUrl, { mode: 'no-cors', })
				.then(function(response) {
					var checkIfExists = _this.getStyleSheet(localHostUrl);

					if (checkIfExists) {
						_this.localHostDev();
					}

					return;
				})
				.catch(function(error) {
					console.log('Error: ', error);
				});
		},
		getStyleSheet: function(unique_url) {
			let query= document.querySelectorAll('style,link[rel="stylesheet"]');
			let devLink = Array.from(query).filter(link=>link.href===unique_url);
			if (devLink.length!==0){
				return false;
			}
			else{
				return true;
			}
			
		},
		removeCss: function() {
			document.querySelectorAll('style,link[rel="stylesheet"]').forEach(function(item) {
				return item.remove();
			});
		},
		localHostDev: function() {
			var fileref=document.createElement("link")
			fileref.setAttribute("rel", "stylesheet")
			fileref.setAttribute("type", "text/css")
			fileref.setAttribute("href", localHostUrl)
			
			return document.getElementsByTagName("head")[0].appendChild(fileref)
			// return (document.head.innerHTML +=
			// 	`<link rel="stylesheet" type="text/css" href=${localHostUrl}/>`);
		},
	};
})();

add.checkLocalHost();

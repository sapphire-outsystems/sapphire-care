var localHostUrl = 'https://localhost:3000/dev.app.css';

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
			return (document.head.innerHTML +=
				`<link rel="stylesheet" type="text/css" href=${localHostUrl}/>`);
		},
	};
})();

add.checkLocalHost();

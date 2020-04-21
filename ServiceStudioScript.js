var localHostUrl = 'https://localhost:3000/dev.app.css';

var add = (function() {
	return {
		checkLocalHost: function(params) {
			this.removeCss();
			this.localHostDev();
		},

		removeCss: function() {
			document.querySelectorAll('style,link[rel="stylesheet"]').forEach(function(item) {
				return item.remove();
			});
		},
		localHostDev: function() {
			return (document.head.innerHTML +=
				'<link rel="stylesheet" type="text/css" href="https://localhost:3000/dev.app.css" />');
		},
	};
})();

add.localHostDev();

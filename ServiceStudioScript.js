document.addEventListener('DOMContentLoaded', function() {
	function localHostDev() {
		return (document.head.innerHTML +=
			'<link rel="stylesheet" type="text/css" href="https://localhost:3000/dev.app.css" />');
	}
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
		return;
	} else {
		localHostDev();
	}
});
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOMContentLoaded');
	if (window.device) {
		console.log('Window.Device');
		return;
	} else {
		console.log('after WindowDevice');
		function localHostDev() {
			return (document.head.innerHTML +=
				'<link rel="stylesheet" type="text/css" href="https://localhost:3000/dev.app.css" />');
		}
		localHostDev();
	}
});

var add = (function() {
	return {
		localHostDev: function() {
			return (document.head.innerHTML +=
				'<link rel="stylesheet" type="text/css" href="https://localhost:3000/dev.app.css" />');
		},
	};
})();

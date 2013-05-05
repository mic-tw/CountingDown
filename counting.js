(function(){
	var recount = function(){
		var year = document.getElementById("year").value || 0;
		var month = document.getElementById("month").value || 0;
		var day = document.getElementById("day").value || 0;
		var hour = document.getElementById("hour").value || 0;
		var min = document.getElementById("min").value || 0;
		
		if(year > 0 && month > 0 && day > 0){
			var to = new Date(year, month-1, day, Math.max(hour, 0), Math.max(min, 0), 0, 0);
			var from = new Date();
			var sign = to < from;
			var diff = sign ? from.getTime() - to.getTime() : to.getTime() - from.getTime();
			var diffHours = Math.floor(diff / (1000*60*60));			
			var diffMins = Math.floor(diff / (1000*60)) - diffHours * 60;			
			var diffSeconds = Math.floor(diff / 1000) - diffMins * 60 - diffHours * 60 * 60;
			document.getElementById("hour-last").innerHTML = diffHours;
			document.getElementById("min-last").innerHTML = diffMins;
			document.getElementById("second-last").innerHTML = diffSeconds;
			document.getElementById("sign").className = (sign ? "sign" : "not-sign");
			
			if(chrome && chrome.storage){
				chrome.storage.sync.set({'year': year, 'month': month, 'day': day, 'hour': hour, 'min': min});
			}
		}
	};
	setInterval(recount, 1000);
	
	if(chrome && chrome.storage){
		chrome.storage.sync.get("year", function(obj){
			document.getElementById("year").value = obj.year || "";
		});
		chrome.storage.sync.get("month", function(obj){
			document.getElementById("month").value = obj.month || "";
		});
		chrome.storage.sync.get("day", function(obj){
			document.getElementById("day").value = obj.day || "";
		});
		chrome.storage.sync.get("hour", function(obj){
			document.getElementById("hour").value = obj.hour || "";
		});
		chrome.storage.sync.get("min", function(obj){
			document.getElementById("min").value = obj.min || "";
		});
	}
})();

/*
Ryan Cantone
ASDI 1401
Project Week 2

*/

$("#json").on("click", function(){
	$("#xhr").empty();
	$.ajax({
			type     : "GET",
			url      : "xhr/data.json",
			dataType : "json",
			success  : function(result){
			console.log(result);
				for(var i in result.members){
					var items = result.members[i];
					$("#xhr").append($("<p><ul>" + 
					"<li>" + items.alias[0] + " " + items.alias[1] + "</li>" +
					"<li>" + items.fName[0] + " " + items.fName[1] + "</li>" +
					"<li>" + items.lName[0] + " " + items.lName[1] + "</li>" +
					"<li>" + items.eMail[0] + " " + items.eMail[1] + "</li>" +
					"<li>" + items.bDay[0] + " " + items.bDay[1] + "</li>" +
					"<li>" + items.language[0] + " " + items.language[1] + "</li>" +
					"<li>" + items.skill[0] + " " + items.skill[1] + "</li>" +
					"<li>" + items.sex[0] + " " + items.sex[1] + "</li>" +
					"<li>" + items.pro[0] + " " + items.pro[1] + "</li>" +
					"<li>" + items.division[0] + " " + items.division[1] + "</li>" +
					"<li>" + items.league[0] + " " + items.league[1] + "</li>" +
					"<li>" + items.notes[0] + " " + items.notes[1] + "</li>" +
					"<ul></p>"));
				}
			},
			error	: function(error){
				console.log("AJAX - JSON error: " + error);
			}
		});
 				$("#xhr").listview();
      			$("#xhr").listview("refresh");
});

$("#xml").on("click", function(){
	$("#xhr").empty();
	$.ajax({
	  type: "GET",
	  url: "xhr/data.xml",
	  dataType: "xml",
	  error	: function(error){
		console.log("AJAX - XML error: " + error);
	  },
	  success: function(data){
	  console.log(data);
		  $(data).find("member").each(function(){
             $("#xhr").append($(" " +
                 "<ul>" +
                     "<li>Account: " + $(this).find("alias").text() + "</li>" +
                     "<li>First Name: " + $(this).find("fname").text() + "</li>" +
                     "<li>Last Name: " + $(this).find("lname").text() + "</li>" +
                     "<li>Email: " + $(this).find("email").text() + "</li>" + 
                     "<li>Birthdate: " + $(this).find("birthday").text() + "</li>" +
                     "<li>Skill: " + $(this).find("skill").text() + "</li>" +
                     "<li>Gender: " + $(this).find("gender").text() + "</li>" +
                     "<li>Professional: " + $(this).find("professional").text() + "</li>" +
                     "<li>Division: " + $(this).find("division").text() + "</li>" +
                     "<li>League: " + $(this).find("league").text() + "</li>" +
                     "<li>Notes: " + $(this).find("notes").text() + "</li>" +  
				 "</ul>"));
	
	 });
	 		$("#xhr").listview();
	      	$("#xhr").listview("refresh");
		  }
	});
});

$("#csv").on("click", function(){
	$("#xhr").empty();
	$.ajax({
		type: "GET",
		url: "xhr/data.csv",
		dataType: "text",
		error: function(error){
			console.log("AJAX - CSV Error: " + error);
		},
		success: function(csvData){
		console.log(csvData);
			var list = csvData.split("\n");
			for(var i = 1; i < list.length; i++){
				var items = list[i];
				var data = items.split(",");
				$("#xhr").append("<p>");
				for(var n = 0; n < data.length; n++){
					$("#xhr").append("<li>" + data[n] + "</li>");
				}
	
		
				}
		}
		});	
			$("#xhr").listview();
	      	$("#xhr").listview("refresh");
});
$('#home').on('pageinit', function(){
        //code needed for home page goes here
});        

$('#viewMembers').on('pageinit', function(){
        getData(data);
});        
                
$('#addItem').on('pageinit', function(){
delete $.validator.methods.date;
        var myForm = $('#formAddMember');
    myForm.validate({
                invalidHandler: function(form, validator) {
        },
        submitHandler: function() {
                var data = myForm.serializeArray();
                storeData(this.key);
        }
});
        
        //any other code needed for addItem page goes here
        
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

function getX(parameter){
                var theElement = document.getElementById(parameter);
                return theElement;
};

var autoFillData = function(){
        for(var n in json){
                var id = Math.floor(Math.random()*1010101010);
                localStorage.setItem(id, JSON.stringify(json[n]));
        }
};




        /*
        getX DATA <DIV>
        makeDataList <UL>
                setAttribute ["data-role", "list-view"  "data-filter", "true"]
        imageLi <LI>
        newImage <IMG> SET ATT SRC IMAGES images        
        makeDataLi <LI>
                makeDataSubList <UL>
        Linkli <LI>
                makeSubLi <LI>
        
        
        */
        

var getData = function(data){
        var getImage = function(imageName, makeDataSubList){
                var imageLi = document.createElement("li");
                makeDataSubList.appendChild(imageLi);
                var newImage = document.createElement("img");
                var setSrc = newImage.setAttribute("src", "images/" + imageName + ".png");
                imageLi.appendChild(newImage);
        }
        var makeDataDiv = getX("data");
        var makeDataList = document.createElement("ul");
        makeDataList.setAttribute("data-role", "list-view");
        makeDataList.setAttribute("data-filter", "true");
        makeDataDiv.appendChild(makeDataList);        
        for(var i=0, len=localStorage.length; i<len; i++){
                var makeDataLi = document.createElement("li");
                var linksLi = document.createElement("li");
                makeDataList.appendChild(makeDataLi);
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var obj = JSON.parse(value);
                var makeDataSubList = document.createElement("ul");
                makeDataLi.appendChild(makeDataSubList);
                getImage(obj.league[1], makeDataSubList);
                for (var n in obj){
                        var makeSubLi = document.createElement("li");
                        makeDataSubList.appendChild(makeSubLi);
                        var optSubText = obj[n][0]+" "+obj[n][1];
                        makeSubLi.innerHTML = optSubText;
                        makeSubLi.appendChild(linksLi);
                }
                makeItemLinks(localStorage.key(i), linksLi);
        }
        
};                                                        

var makeItemLinks = function(key, makeDataSubList){
        var editLink = document.createElement("a");
        editLink.setAttribute("data-role", "button");
        editLink.href = "#addItem";
        editLink.key = key;
        var editText = "Edit Member";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        makeDataSubList.appendChild(editLink);
        
        var deleteLink = document.createElement("a");
        deleteLink.setAttribute("data-role", "button");
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Member";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        makeDataSubList.appendChild(deleteLink);
};

var storeData = function(key){
        if(key == undefined || key == "null"){
                var key = Math.floor(Math.random()*1010101010);
        }
                var id = key;
                var item                         = {};
                        item.alias                = ["Social Account:", $("#alias").val()];
                        item.fName                 = ["First Name:", $("#fName").val()];
                        item.lName                 = ["Last Name:", $("#lName").val()];
                        item.eMail                 = ["E-mail:", $("#eMail").val()];
                        item.bDay                 = ["Birth-Day:", $("#bDay").val()];
                        item.language        = ["Language:", $("#language").val()];
                        item.skill                = ["Social Skill:", $("#skill").val()];
                        
                        var sexValue;
                        if($("#male").checked){
                                sexValue = "Male";
                        }else if($("#female").checked){
                                sexValue = "Female";
                        }
                        console.log(sexValue);
                        item.sex                  = ["Gender:",  sexValue];
                        
                        var proValue;
                        if($("#pro").checked){
                                proValue = "Yes";
                        }else{
                                proValue = "No";
                        }
                        item.pro                 = ["Business Account:", proValue];
                        
                        item.division         = ["Location:", $("#division").val()];
                        item.league          = ["Member Number:", $("#league").val()];
                        item.notes                = ["Notes:", $("#notes").val()];
                localStorage.setItem(id, JSON.stringify(item));
                alert("Member has been Added! With a key: " + key);
                

        viewLink();
        return key;
}; 

var        deleteItem = function(){
        var ask = confirm("Are you sure you want to delete this member?")
        if (ask){
                localStorage.removeItem(this.key);
                alert("Contact was deleted.")
        }else{
                alert("Contact was NOT deleted.")
        }
        viewLink();                                
};


var editItem = function(){

        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        console.log(item);
        $("#alias").val(item.alias[1]);
        $("#fName").val(item.fName[1]);
        $("#lName").val(item.lName[1]);
        $("#eMail").val(item.eMail[1]);
        $("#bDay").val(item.bDay[1]);
        $("#language").val(item.language[1]);
        $("#skill").val(item.skill[1]);
        $('#addItem').page();
        $('#skill').val(item.skill[1]);
        $('#skill').slider('refresh');
        
        if(item.sex[1] == "Male"){
                $("#female").attr("checked",false).checkboxradio("refresh");
                $("#male").attr("checked",true).checkboxradio("refresh");
        }else if(item.sex[1] == "Female"){
                $("#male").attr("checked",false).checkboxradio("refresh");
                $("#female").attr("checked",true).checkboxradio("refresh");
        }
        
        if (item.pro[1] == "Yes"){
                $("input[type='checkbox']:first").attr("checked",true).checkboxradio("refresh");
        }else{
                $("input[type='checkbox']:first").attr("checked",false).checkboxradio("refresh");
        }
        
        $("#division").value = item.division[1];
        $("select").selectmenu('refresh', true);

        $("#league").val = item.league[1];
        $("select").selectmenu('refresh', true);

        $("#notes").val = item.notes[1];
        
        
        saveButton.removeEventListener("click");
        var editSubmit = getX("submit");
        editSubmit.addEventListener("click");
        editSubmit.key = this.key;
        $("#submit").value = "Save Changes";
        $("#submit").button('refresh');
        
        localStorage.removeItem(this.key);
};
                                
var clearLocal = function(){
        if (localStorage.length === 0){
                alert("There is no data to clear!")
        }else{
                var askDelete = confirm("Would you like to clear LocalStorage?");
                if(askDelete){
                        localStorage.clear();
                        alert("Local Storage Data has been deleted.")
                        window.location.reload();
                }
                return false;
        }
};

var viewLink = function(){
        var        link = $('#viewLink');
        link.click();
        window.location.reload();
        
};

var popJSON = function(){
        if(localStorage.length === 0){
                var askAutoFill = confirm("There is no Local Storage Data to display! Auto Populate Data from JSON file?");
                if(askAutoFill === true){
                        autoFillData();        
                }
        }
};




var displayLink = getX("displayLink");
displayLink.addEventListener("click", popJSON);

var clearLink = getX("clearLink");
clearLink.addEventListener("click", clearLocal);

var saveButton = getX("submit");
saveButton.addEventListener("click");
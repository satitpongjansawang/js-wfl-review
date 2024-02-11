
function inputBtn(limit){
  var td = new Date();
  var seq = ""+td.getFullYear() + td.getMonth() + td.getDate() + td.getHours() +  td.getMinutes() +  td.getSeconds();
  var aa = document.querySelectorAll('input[id^="attFile"]').length;

   if (aa < limit ) {
   var input=document.createElement('input');
   input.type="file";
   input.id = "attFile"+seq;
   input.name = "attFile"+seq;
   input.style.width = "500px";
   input.style.margin = "0px";
   input.style.color = "#4787ed";
   input.onchange = function() {
   CheckFileAttach(this);
   };

   
   var btn=document.createElement('a');
   //btn.type="button";
    btn.id = "rem_att"+seq;
    btn.name = ""+seq;
    btn.innerHTML = "Remove"
    btn.onclick = function() {
       RemoveFileAttach(this);
   };
   //without this next line, you'll get nuthin' on the display
   var lbl=document.createElement('label');
   lbl.id = "lbl"+seq;
   lbl.name = ""+seq;
   lbl.innerHTML = ""+(aa+1)+")&nbsp;"
   
   var hr=document.createElement('hr');
   hr.id = "hr"+seq;
   hr.name = ""+seq;
   
   document.getElementById('target_div').appendChild(lbl);
   document.getElementById('target_div').appendChild(input);
   document.getElementById('target_div').appendChild(btn);
   document.getElementById('target_div').appendChild(hr);
   
       //input.change = CheckFileAttach(this);
   setTimeout(function(){
       $(input).click();
   },200);
   
   } else {
    alert('You can\'t attach more than '+limit+ ' files.');
   }
//    $("#attFile"+(aa+1)).on('change',CheckFileAttach(this)); 
//   document.getElementById('target_div').append('<input type="file" id="attFile'+ aa +'" name="attFile[]" onchange="CheckFileAttach(this)" style="width:500px;">')
//    setTimeout(function(){
//        $("#attFile"+(aa+1)).click();
//    },200);
}
function RemoveFileAttach(e) {
// remove ------------
 var att = document.getElementById('attFile'+e.name);
 var lbl = document.getElementById('lbl'+e.name);
 var hr = document.getElementById('hr'+e.name);
 document.getElementById('target_div').removeChild(att);
 document.getElementById('target_div').removeChild(lbl);
 document.getElementById('target_div').removeChild(hr);
 document.getElementById('target_div').removeChild(e);

  var elements3 = document.querySelectorAll('label[id^="lbl"]');

  for (var i = 0; i < elements3.length; i++) {
       elements3[i].innerHTML = (i+1)+")&nbsp;";
  }

}
function RemoveRt(i,obj){
            var st =document.getElementById("STreviewLevel"+i).value;
            if (st==1) {
            document.getElementById('reviewLevel'+i).style.color = "white";
            document.getElementById('CommentreviewLevel'+i).readOnly = false;
            document.getElementById("STreviewLevel"+i).value = '0';
            document.getElementById('BTreviewLevel'+i).clascopyDataDbSheetist.add("create");
            /*
            var value = document.getElementById('applicationAdminCC').value;
            value = value.replace(document.getElementById('reviewLevel'+i).value,'');
            value = value.replace(/,,,/ig,',').replace(/,,/ig,',');
            document.getElementById('applicationAdminCC').value=value;
            */
           
            } else {
            document.getElementById('reviewLevel'+i).style.color = "black";
            document.getElementById('CommentreviewLevel'+i).value = '';
            document.getElementById('CommentreviewLevel'+i).readOnly = true;
            document.getElementById("STreviewLevel"+i).value = '1';
            document.getElementById('BTreviewLevel'+i).classList.remove("create");
            /*
            document.getElementById('applicationAdminCC').value=document.getElementById('applicationAdminCC').value+','+document.getElementById('reviewLevel'+i).value;
            */
            }
       }
function doAction(e) {

   //var d =new Date()
   //document.getElementsByName('txtDate').value = d;
   //alert(document.getElementsByName('txtDate').value);
   //return;
   //alert('OK');
   //return
   
   document.getElementById('txtDate').value=new Date();
   document.body.scrollTop = 0; // For Safari
   document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
 
   var param = new Object();
   
   //alert("submit form!!!");
   
   if (document.getElementsByName('txtIssueBy')[0].value == "") { 
      alert("Please Input Issue Person!!");
      document.getElementsByName("txtIssueBy")[0].focus();
      return;
   }
   
   if (document.getElementsByName('priority')[1].checked==true ) {
      if (document.getElementsByName('txtRef3_')[0].value == "") { 
          alert("Please Input Priority Reason!!");
          document.getElementsByName("txtRef3_")[0].focus();
          return;
     }
   }


   if (inpCheck(document.getElementsByName('chkCompany'),"Please Choose Company!!") == "") { 
         document.getElementsByName('chkCompany')[0].focus();
        //document.getElementsByName('chkCompany')[0].checked = true;
        //getCompanyDept(document.getElementsByName('chkCompany')[0].value);
        return; 
   }
   //if (inpCheck(document.getElementsByName('chkMaster'),"Please Choose Company!!") == "") { return; } //ORIGINAL
   
   //ADDED FOR V2
   if (ddlCheck(document.getElementsByName('txtMaster')[0],"Please Choose Application!!") == "") { return; }
   if (ddlCheck(document.getElementsByName('txtDepartment')[0],"Please Choose Department!!") == "") { return; }
   if (ddlCheck(document.getElementsByName('finalApprove')[0],"Please Choose At Least 1 Reviewer/Approver!!") == "") { return; }
   //END OF V2 ADDED
   
   if (document.getElementsByName("docFile")[0].value == "") { 
      alert("Please choose file excel form!!");
      return;
   } else {
       var extall="xlsm";
   file = document.getElementsByName("docFile")[0].value;
   ext = file.split('.').pop().toLowerCase();
   if(parseInt(extall.indexOf(ext)) < 0)
   {
     alert("*WFL will support with file [XLSM] only format to process on workflow *");
     return false;
   }
   }
   var attf_len = document.querySelectorAll('input[id^="attFile"]').length;
   var attf_chk = false;
     for (var i = 0; i < attf_len; i++) {
       if (document.querySelectorAll('input[id^="attFile"]')[i].value !=="") {attf_chk =true;break;}
    }	 
    //  return "result :"+attf_chk;
    //  if (document.getElementsByName("attFile1")[0].value == "") { 
      if (attf_chk==false) { 
           if (confirm("!!!Warning-Submit Without Support Document!!!\r\n Are you want to Submit this Form?")) {
           //increase
                  //document.querySelector('#ul_message').textContent = "WFL Start to check master template.";
                  //google.script.run.withSuccessHandler(checkFileUpload).withFailureHandler(onFailure).withUserObject(e).submitFormV2(e);
           // old
                  google.script.run.withSuccessHandler(onSuccess1).withFailureHandler(onFailure).submitForm(e); //ADDED FOR V2
                  //document.querySelector('#ul_message').textContent = "Submitting… Please Wait.";
                  document.querySelector('#ul_message').innerHTML = "<div id=\"uploading\" class=\"material-icons\" style=\"font-size: 16px;\" ></div>&nbsp;Submitting… Please Wait.";
                  animeicon('uploading','&#xe2bd;','&#xe2c3;','&#xe2bd;','&#xe2c3;'); 
                  setInterval(animeicon, 5000,'uploading','&#xe2bd;','&#xe2c3;','&#xe2bd;','&#xe2c3;');
           }
    } else {
        if (confirm("Submit OK? \r\nPlease do not close window until process has been completed.")) {
        // google.script.run.withSuccessHandler(onSuccess1).withFailureHandler(onFailure).insertData(e); //ORIGINAL
              google.script.run.withSuccessHandler(onSuccess1).withFailureHandler(onFailure).withUserObject(e).submitForm(e); //ADDED FOR V2
        //document.querySelector('#ul_message').textContent = "Submitting… Please Wait.";
              document.querySelector('#ul_message').innerHTML = "<div id=\"uploading\" class=\"material-icons\" style=\"font-size: 16px;\" ></div>&nbsp;Submitting… Please Wait.";
              animeicon('uploading','&#xe2bd;','&#xe2c3;','&#xe2bd;','&#xe2c3;'); 
                  setInterval(animeicon, 5000,'uploading','&#xe2bd;','&#xe2c3;','&#xe2bd;','&#xe2c3;');
        }
    }
}
function checkFileUpload(e){
   document.querySelector('#ul_message').textContent = "WFL Start to convert file excel.";
   google.script.run.withSuccessHandler(onSuccess1).withFailureHandler(onFailure).CheckfileUpload(e);
   document.querySelector('#ul_message').textContent = "WFL start to convert file excel.";
}
function doAction2(e,a,m,rpt,pid) {


/// ---------------------   

//Logger.log("doAction2");
  
   var param = new Object();
   var msg;
   //if (document.getElementsByName('priority')[1].checked==true ) {
      if (document.getElementsByName('txtRef3_')[0].value == "" && document.querySelector('#prireason').style.visibility == 'visible' ) { 
      //'
          alert("Please Input Priority Reason!!");
          document.getElementsByName("txtRef3_")[0].focus();
          return;
     }
  // }
   document.body.scrollTop = 0; // For Safari
   document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

   if($('#IesigFile').length>0){
     if (document.getElementsByName("IesigFile")[0].value == "") { 
           alert("Please set e-sign Doc Excel [XLSM] Form!!");
           return;
     } 
} else {
   //alert("Element does not exist");
}

   document.getElementById('txtJudge').value = a;
   if (a == 'r') {
      if (document.getElementsByName('txtComment')[0].value == "") { 
         alert("Please Input Comment!!");
         document.getElementsByName('txtComment').focus();
         return;
      }
   }   

   if (a == 'u') {
      if (confirm(m + " OK? \r\nPlease do not close window until process has been completed.")) {
      //document.querySelector('#ul_message').textContent = "Re-routing… Please Wait.";
      google.script.run.withSuccessHandler(onSuccess1).withFailureHandler(onFailure).rerouting(e); //ADDED FOR V2
      
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////ADDED BY WP 202109 FOR CANCEL APPROVAL BY PDT//////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
/*
      document.querySelector('#ul_message').textContent = "";
      document.querySelector('#ul_message2').textContent = "";
      document.querySelector('#ul_message').innerHTML = "<div id=\"approving\" class=\"material-icons\" style=\"font-size: 16px;\" ></div>&nbsp;Document Re-routing     … Please Wait.";
*/
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////END OF ADDED BY WP 202109 FOR CANCEL APPROVAL BY PDT//////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////       
/*
       document.querySelector('#ul_message').innerHTML = "<div id=\"approving\" class=\"material-icons\" style=\"font-size: 16px;\" ></div>&nbsp;Re-routing… Please Wait.";
                  animeicon('approving','&#xe2bd;','&#xe2c3;','&#xe2bd;','&#xe2c3;'); 
                  setInterval(animeicon, 5000,'uploading','&#xe2bd;','&#xe2c3;','&#xe2bd;','&#xe2c3;');
      /// Lock Button After Click Submit
      document.getElementById("btnReroute").disabled = true;
      document.getElementById("btnSign").disabled = true;
      document.getElementById("btnReject").disabled = true;
*/
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////ADDED BY WP 202109 FOR CANCEL APPROVAL BY PDT//////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
      //document.getElementById("btnCancelApprove").hidden = true; //ADDED BY WP 20210914   
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////END OF ADDED BY WP 202109 FOR CANCEL APPROVAL BY PDT///////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////         

       return;
      }
   }  
   //変更 Change 2017-11-27
   //if (confirm(m + " OK? \r\nPlease do not close window until process has been completed.")) {
   if (true) {
      //google.script.run.withSuccessHandler(onSuccess1).withFailureHandler(onFailure).insertData2(e); //ORIGINAL
      //alert("Submit?");
      //document.querySelector('#ul_message').textContent = "Submitting… Please Wait.";
      google.script.run.withSuccessHandler(onSuccess1).withFailureHandler(onFailure).approveForm(e); //ADDED FOR V2

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////ADDED BY WP 202109 FOR CANCEL APPROVAL BY PDT//////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
/*
      if (a == 'c') { // IN CASE CANCEL ACTION
          
             document.querySelector('#ul_message2').textContent = "";
             document.querySelector('#ul_message2').innerHTML = "<div id=\"approving\" class=\"material-icons\" style=\"font-size: 16px;\" ></div>&nbsp;&nbsp;&nbsp;Action Cancelling … Please Wait.";
                  animeicon('approving','&#xe2bd;','&#xe2c3;','&#xe2bd;','&#xe2c3;'); 
                  setInterval(animeicon, 5000,'uploading','&#xe2bd;','&#xe2c3;','&#xe2bd;','&#xe2c3;');
             //document.getElementById("btnCancelApprove").disabled = true; //ADDED BY WP 20210914   
      
      } else {
      
            document.querySelector('#ul_message').textContent = "";
            document.querySelector('#ul_message2').textContent = "";
            document.querySelector('#ul_message').innerHTML = "<div id=\"approving\" class=\"material-icons\" style=\"font-size: 16px;\" ></div>&nbsp;Document Submitting     … Please Wait.";
                  animeicon('approving','&#xe2bd;','&#xe2c3;','&#xe2bd;','&#xe2c3;'); 
                  setInterval(animeicon, 5000,'uploading','&#xe2bd;','&#xe2c3;','&#xe2bd;','&#xe2c3;');
            document.getElementById("btnCancelApprove").disabled = false; //ADDED BY WP 20210914     
                  
      }
*/
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////END OF ADDED BY WP 202109 FOR CANCEL APPROVAL BY PDT///////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////// 
      
      /// Lock Button After Click Submit
      document.getElementById("btnReroute").disabled = true;
      document.getElementById("btnSign").disabled = true;
      document.getElementById("btnReject").disabled = true;            
       //document.querySelector('#ul_message').textContent = window.location;
   }
}

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////ADDED BY WP 202109 FOR CANCEL APPROVAL BY PDT//////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
/*
function doAction3() {

       var urlText = document.getElementById('txtURL').value;
       alert('This will reload the page ' + urlText);
       //document.querySelector('#ul_message').textContent = "";
       google.script.run.withSuccessHandler(function(urlText){window.open(urlText,'_top');}).getScriptURL(urlText);

}
*/
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////END OF ADDED BY WP 202109 FOR CANCEL APPROVAL BY PDT///////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////// 

function inpCheck(pValue,pErrMessage)  {
   var txtWork ="";
   var j = (pValue.length) - 1;
   for (var i = 0;i <= j ; i++) {
       if (pValue[i].checked == true) {
          txtWork = txtWork + pValue[i].value + ",";
       }
   }
   if (txtWork == "") {
      alert(pErrMessage);
      return txtWork;
   }
}
function onSuccess1(result){
   document.body.scrollTop = 0; // For Safari
 document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
 
   if (result==2) {
   var txt = "Re-routing Completed!! \r\nPlease close window.";
   document.querySelector('#ul_message').textContent = txt;
   alert(txt);
  document.getElementById("btnReroute").disabled = true;
  document.getElementById("btnSign").disabled = true;
  document.getElementById("btnReject").disabled = true;
   //parent.parent.window.location.replace(document.getElementById('txtURL').value);
   return;
   }
 
   if (result==1) {
   var txt = "Completed!! \r\nPlease close window.";
   document.querySelector('#ul_message').textContent = txt;
   alert(txt);
  document.getElementById("btnReroute").disabled = true;
  document.getElementById("btnSign").disabled = true;
  document.getElementById("btnReject").disabled = true;
   //parent.parent.window.location.replace(document.getElementById('txtURL').value);
   //google.script.run.doGet(e);
   //window.top.location.href = document.getElementById('txtURL').innerHTML;
   return;
   }
   if (result==3) {
    var txt = "File Excel Form is not lasted version or Not Correct Form :\r\n" 
           + "You can download  the latest version or Correct Form in WFL download link. ";
    document.querySelector('#ul_message').textContent = txt;
    document.getElementById('docFile_label').innerHTML = txt;
     alert(txt);
     return;
   }
   if (result==31) {
    var txt = "File Excel Form is not lasted version or Not Correct Form :\r\n" 
           + "Please check the company of Document not matching with WFL request. ";
    document.querySelector('#ul_message').textContent = txt;
    document.getElementById('docFile_label').innerHTML = txt;
     alert(txt);
     return;
   }
   if (result==4) {
    var txt = "File Excel Form is not signed by Issued Person :\r\n" 
           + "You will signed and upload again. ";
    document.querySelector('#ul_message').textContent = txt;
    document.getElementById('docFile_label').innerHTML = txt;
     alert(txt);
     return;
   }
   if (result==5) {
    var txt = "Can't Not Found \"History Sheet\" in document.\r\n Please contact IT or administrator.";
    document.querySelector('#ul_message').textContent = txt;
    document.getElementById('docFile_label').innerHTML = txt;
     alert(txt);
     return;
   }
   if (result==6) {
    var txt = "Please put e-signature in the application sheet before submit.";
    document.querySelector('#ul_message').textContent = txt;
    document.getElementById('docFile_label').innerHTML = txt;
     alert(txt);
     return;
   }
   if (result==7) {
     var txt = "Now, You will open application form. ";
     //document.querySelector('#ul_message').innerHTML = "";
     //alert(txt);
     return;
   }
   
   if (result==8) {
     var txt = "Now Upload Data Finished.";
     document.querySelector('#ul_message').textContent = txt;
     alert(txt);
     return;
   }
   
    if (result==9) {
     var txt = "WFL can't record data on server.";
     document.querySelector('#ul_message').textContent = txt;
     alert(txt);
     return;
   }
   
   
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////ADDED BY WP 202109 FOR CANCEL APPROVAL BY PDT//////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////   
/*    
      var currentdate = new Date(); //ADDED BY WP 20210914  
      var vdatetime = //ADDED BY WP 20210914  
               currentdate.getUTCFullYear() + "/" +
               ("0" + (currentdate.getUTCMonth()+1)).slice(-2) + "/" +
               ("0" + currentdate.getUTCDate()).slice(-2) + " " +
               ("0" + currentdate.getUTCHours()).slice(-2) + ":" +
               ("0" + currentdate.getUTCMinutes()).slice(-2) + ":" +
               ("0" + currentdate.getUTCSeconds()).slice(-2);
      var vdatetime = currentdate.toLocaleDateString() + " " + currentdate.toLocaleTimeString()    


///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////// 
   

 if (result==98) { //IN CASE REJECT
   
   
       var txt = "Reject Completed!! :: " + vdatetime;
       
       document.querySelector('#ul_message').textContent = txt;
       
       // Lock Button 
       document.getElementById("btnReroute").disabled = true;
       document.getElementById("btnSign").disabled = true;
       document.getElementById("btnReject").disabled = true;
       document.getElementById("btnCancelApprove").disabled = false;  //ADDED BY WP 20210914    
       
       //Refresh Page
       //parent.parent.window.location.replace(document.getElementById('txtURL').value);
       
       return;
       
   }
   
   if (result==99) { //IN CASE CANCEL ACTION
   
   
       var txt = "Action Cancelled!! :: " + vdatetime;
       
       document.querySelector('#ul_message2').textContent = txt;
       
       // Lock Button 
       document.getElementById("btnReroute").disabled = true;
       document.getElementById("btnSign").disabled = true;
       document.getElementById("btnReject").disabled = true;
       document.getElementById("btnCancelApprove").disabled = true;  //ADDED BY WP 20210914    
       
       //doAction3();
       
       //Refresh Page
       //parent.parent.window.location.replace(document.getElementById('txtURL').value);
       
       //alert("This page need to be reloaded to update the status.");
       
       return;
       
   }
   
   if (result==100) { //IN CASE APPROVED
   
   
       var txt = "Approve Completed!! :: " + vdatetime;
       
       document.querySelector('#ul_message').textContent = txt;
       
       // Lock Button 
       document.getElementById("btnReroute").disabled = true;
       document.getElementById("btnSign").disabled = true;
       document.getElementById("btnReject").disabled = true;
       document.getElementById("btnCancelApprove").disabled = false;  //ADDED BY WP 20210914    
       
       //Refresh Page
       //parent.parent.window.location.replace(document.getElementById('txtURL').value);
       
       return;
       
   }
   
   
*/ 
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////END OF ADDED BY WP 202109 FOR CANCEL APPROVAL BY PDT///////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////// 
   
   
   
   
   
   
 
  if (result==10) {
   var txt = "Completed!! \r\nPlease close window.";

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////// 
   //var txt = "Re-Route Completed!! :: " + vdatetime; //ADDED BY WP 20210914 
///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////// 
   
  document.querySelector('#ul_message').textContent = txt;
  
  // Lock Button 
  document.getElementById("btnReroute").disabled = true;
  document.getElementById("btnSign").disabled = true;
  document.getElementById("btnReject").disabled = true;

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////// 
  //document.getElementById("btnCancelApprove").disabled = true;  //ADDED BY WP 20210914  
///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////// 

  //Refresh Page
   //parent.parent.window.location.replace(document.getElementById('txtURL').value);

   return;
   }
   
   
   if (result==11) {
   return;
   }
   
   document.querySelector('#ul_message').textContent = result;
   alert(result);
  
//   if(!!document.getElementById('txtComment')) {
//     document.getElementsByName('txtComment')[0].value = "";
//   }
//   if(!!document.getElementById('txtRemark')) {
//     document.getElementsByName('txtRemark')[0].value = "";
//   }
//   document.getElementsByName("docFile")[0].value = "";
  

}
function onFailure(error) {
 document.body.scrollTop = 0; // For Safari
 document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
   alert(error.message);
   document.querySelector('#ul_message').textContent = error.message;
}
function ddlCheck(pObj,pErrMessage)  {

   if (pObj.value == "") {
      alert(pErrMessage);
      return "";
   }
}
function setValueToText(pValue, pTargetObj) {

//alert(pValue);

//alert(document.getElementsByName(pTargetObj)[0].value);

document.getElementsByName(pTargetObj)[0].value = pValue;
setRoutingName(document.getElementById('inp'));

}
function setRegisterName(pSeledtedMaster,pSelectedCom) {

document.getElementsByName('txtMaster')[0].value = pSeledtedMaster;
setRoutingName(document.getElementById('inp'));

}
function changepriority(e) {
//
  if (document.getElementsByName('priority')[1].checked) {
         //alert('Urgent');
         if (document.getElementById("txtPriority").value == "0" )
         {
         //alert('Not');
         //document.getElementById("prireason").removeClass();
         document.getElementById("txtRef3_").value ="";
         document.getElementById("txtRef3_").disabled = true
         document.getElementById("prireason").style.visibility = 'hidden'
         document.getElementById("prireason").style.height ='0px'
         //element.style.visibility = 'hidden';
         //element.style.visibility = 'visible';
         } else {
         //alert('Change');
         //onst element =  document.querySelector('.my-element')
         //document.getElementById("prireason").classList.add('animated', 'fadeIn');
         document.getElementById("prireason").style.visibility = 'visible'
         document.getElementById("prireason").style.height ='94px'
         document.getElementById("txtRef3_").disabled = false
         document.getElementById("txtRef3_").value ="";
         document.getElementById("txtRef3_").focus();
         }

  } 
  if (document.getElementsByName('priority')[0].checked) {
         //alert('Normal');
         if (document.getElementById("txtPriority").value == "1" )
         {
         //alert('Not');
         document.getElementById("txtRef3_").value =""
         document.getElementById("txtRef3_").disabled = true
         document.getElementById("prireason").style.visibility = 'hidden'
         document.getElementById("prireason").style.height ='0px'
         } else {
         //alert('Change');
         document.getElementById("prireason").style.visibility = 'visible'
         document.getElementById("prireason").style.height ='94px'
         document.getElementById("txtRef3_").disabled = false
         document.getElementById("txtRef3_").value =""
         document.getElementById("txtRef3_").focus();
         }

  } 
document.getElementById("txtRef3").value =""
//   if (document.getElementsByName('priority')[1].checked) {
//          //
//          if (typeof(document.getElementById("txtRef3")) != 'undefined' && document.getElementById("txtRef3") != null)
//          {
//          document.getElementById("txtRef3").disabled = false
//          document.getElementById("txtRef3").value =""
//          }
//          if (typeof(document.getElementById("txtRef3_")) != 'undefined' && document.getElementById("txtRef3_") != null)
//          {
//          document.getElementById("txtRef3_").disabled = false
//          }
//
//   } else {
//          if (typeof(document.getElementById("txtRef3")) != 'undefined' && document.getElementById("txtRef3") != null)
//          {
//          document.getElementById("txtRef3").disabled = true
//          document.getElementById("txtRef3").value =""
//          }
//          if (typeof(document.getElementById("txtRef3_")) != 'undefined' && document.getElementById("txtRef3_") != null)
//          {
//          document.getElementById("txtRef3_").disabled = true
//          }
//   }
//   document.getElementById("txtRef3").value ="" 
}
function getCompanyDept(pCompany) { 

document.getElementsByName('txtCompany')[0].value = pCompany;

var elements = document.getElementsByTagName("select");

for (var i = 0; i < elements.length; i++) {
   if (elements[i].name.match(pCompany)) {
  // alert(elements[i].name);
   elements[i][0].value = true;

   }
   if (elements[i].name.match(pCompany)) {
   elements[i][0].value = true;
   }
}

//document.getElementsByTagName("input")
var elements2 = document.getElementsByTagName("input");
for (var i = 0; i < elements2.length; i++) {
  if (elements2[i].name.match(/^reviewLevel.*.$/)) {
   elements2[i].value = "";
   //alert(elements2[i].name);
   }
   if (elements2[i].name.match(/^finalApprove.*.$/)) {
   elements2[i].value = "";
   //alert(elements2[i].name);
   }
   if (elements2[i].name.match(/^applicationAdmin.*.$/)) {
   elements2[i].value = "";
   //alert(elements2[i].name);
   }
}
var elements3 = document.querySelectorAll('div[name^="chk"][name$="DepartmentDiv"]');
for (var i = 0; i < elements3.length; i++) {
     if (elements3[i].outerHTML.indexOf("chk"+pCompany+"DepartmentDiv")>0 ){
            elements3[i].style.display = null;
            elements3[i].style.width = "557px"; //width: 557px;
   } else {
            elements3[i].style.display = "none";
            elements3[i].style.width = "557px";
   }
}
var elements4 = document.querySelectorAll('div[name^="chk"][name$="MasterDiv"]');
for (var i = 0; i < elements4.length; i++) {
     if (elements4[i].outerHTML.indexOf("chk"+pCompany+"MasterDiv")>0 ){
            elements4[i].style.display = null;
            elements4[i].style.width = "557px";
   } else {
            elements4[i].style.display = "none";
            elements4[i].style.width = "557px";
   }
}
}
function setRoutingName(e) {

var dept, selDept, selApp, selComp, str, allDept, arrNames;
var app = document.getElementsByName('chkMaster')[0];
var comp = document.getElementsByName('txtCompany')[0];

//RESENT ALL VALUES FIRST
document.getElementsByName('reviewLevel1')[0].value = "";
document.getElementsByName('reviewLevel2')[0].value = "";
document.getElementsByName('reviewLevel3')[0].value = "";
document.getElementsByName('reviewLevel4')[0].value = "";
document.getElementsByName('reviewLevel5')[0].value = "";
document.getElementsByName('reviewLevel6')[0].value = "";
document.getElementsByName('reviewLevel7')[0].value = "";
document.getElementsByName('finalApprove')[0].value = "";
document.getElementsByName('applicationAdmin')[0].value = "";
document.getElementsByName('applicationAdminCC')[0].value = "";
//END OF RESET ALL VALUES

selComp = comp.value;

dept = document.getElementsByName('chk'+selComp+'Department')[0];
app = document.getElementsByName('chk'+selComp+'Master')[0];

selDept = dept.options[dept.selectedIndex].text;
selApp = app.options[app.selectedIndex].text;

if (selDept == '-- Please Select --') { alert('Please Choose Department.'); return; }

if (selApp == '-- Please Select --') { alert('Please Choose Application Request.'); return; }

try { 

document.getElementsByName('listAllRouting')[0].value = selComp+"|"+selDept.split(' - ')[1]+"|"+selApp;

allDept = document.getElementsByName('listAllRouting')[0];

arrNames = allDept.options[allDept.selectedIndex].text.split("|");

document.getElementsByName('reviewLevel1')[0].value = arrNames[0];
document.getElementsByName('reviewLevel2')[0].value = arrNames[1];
document.getElementsByName('reviewLevel3')[0].value = arrNames[2];
document.getElementsByName('reviewLevel4')[0].value = arrNames[3];
document.getElementsByName('reviewLevel5')[0].value = arrNames[4];
document.getElementsByName('reviewLevel6')[0].value = arrNames[8];
document.getElementsByName('reviewLevel7')[0].value = arrNames[9];
document.getElementsByName('finalApprove')[0].value = arrNames[5];
document.getElementsByName('applicationAdmin')[0].value = arrNames[6];
document.getElementsByName('applicationAdminCC')[0].value = ('|'+arrNames[0]+','+
arrNames[1]+','+arrNames[2]+','+arrNames[3]+','+arrNames[4]+','+arrNames[6]+','+arrNames[7]+','+arrNames[8]+','+arrNames[9]+'|')
.replace(/,,,/gim,",")
.replace(/,,/gim,",")
.replace(/\|,/gim,"")
.replace(/,,\|/gim,"")
.replace(/,\|/gim,"")
.replace(/\|/gim,"")
;

}
catch(err) {

alert('Approval Route Not Found.\r\n[' + selDept + '] has no autorized to request [' + selApp + ']'); 

}
    
}

function enablebutton(link_url) {
  //alert("WFL will Prepare DBSheet please waiting ....");
         // document.querySelector('#ul_message').innerHTML = "<div id=\"approving\" class=\"material-icons\" style=\"font-size: 16px;\" ></div>&nbsp;Preparing Documents… Please Wait.";
         //         animeicon('approving','&#xe2bd;','&#xe2c3;','&#xe2bd;','&#xe2c3;'); 
         //         setInterval(animeicon, 5000,'uploading','&#xe2bd;','&#xe2c3;','&#xe2bd;','&#xe2c3;');
  var today  = new Date();
  //alert('Open File...');
  setTimeout(function(){window.open( ''+link_url ,'_blank'); },1000);
  //google.script.run.withSuccessHandler(onSuccess1).withFailureHandler(onFailure).startlog(today.toJSON());
  google.script.run.withSuccessHandler(onSuccess1).withFailureHandler(onFailure).copyDataDbSheet( document.getElementById("txtTempFileId").value);
  document.getElementById("btnReroute").disabled = false;
  document.getElementById("btnSign").disabled = false;
  document.getElementById("btnReject").disabled = false;

 // return
 
  
}
function enableRe_Routing(bEnable) {

  enableDisable(bEnable, 'selreroute');
  enableHidden(bEnable, 'btnSign')
  enableHidden(bEnable, 'btnReject')
  enableHidden(!bEnable, 'btnReroute')
}
function enableDisable(bEnable, textBoxID){
        document.getElementById(textBoxID).disabled = !bEnable;
}
function enableHidden(bEnable, textBoxID){
        if (bEnable==true) {
            document.getElementById(textBoxID).hidden = "hidden";
        } else {
            document.getElementById(textBoxID).hidden = "";
        }
}
function CheckFileAttach(input) { 

var ext = input.value.split('.'); 
    ext = ext[ext.length-1].toLowerCase();     
var arrayExtensions = ['pdf','xlsx','xls','xlsm','xlsb','doc','docx','docm','dotm','odt','rtf','xml','ppt','pptx','tif','tiff','gif','jpeg','jpg','png','eps','bmp','img','emf','txt','csv']; 
if (arrayExtensions.lastIndexOf(ext) == -1) { 
      document.getElementById('attFile_label').innerHTML = '*WFL will support with file [PDF,EXCEL,WORD,POWERPOINT,IMAGE] format to preview document attach on workflow *';
      input.value='';
      input.style.color = 'rgb(71, 135, 237)';
      //input.style.color = '#e6071a';
      alert('*WFL will support with file [PDF,EXCEL,WORD,POWERPOINT,IMAGE] format to preview document attach on workflow *');
} 
else { 
       //const fi = input; 
       // Check if any file is selected. 
       if (input.files.length > 0) { 
          // for (const i = 0; i <= input.files.length - 1; i++) { 
 
               const fsize = input.files[0].size; 
               const file = Math.round((fsize / 1024)); 
               // The size of the file. 
               if (file >= 10240) { 
                     document.getElementById('attFile_label').innerHTML = '* WFL will support with file attach not over 10 MB *';
                     input.value='';
                     input.style.color = 'rgb(71, 135, 237)';
                     //input.style.color = '#e6071a';
                     alert('* WFL will support with file attach not over 10 MB *');
               } 
          // } 
       }
       else {
                     document.getElementById('attFile_label').innerHTML = '';
                     input.style.color = 'rgb(71, 135, 237)';
       }
     }
//        if (fileSize < maxFileSize) {
//                      document.getElementById('attFile_label').innerHTML = '* WFL will support with file attach not over 10 MB *';
//                      input.value='';
//                      input.style.color = 'rgb(71, 135, 237)';
//                      //input.style.color = '#e6071a';
//                      alert('* WFL will support with file attach not over 10 MB *');
//        } else {
//                      document.getElementById('attFile_label').innerHTML = '';
//                      input.style.color = 'rgb(71, 135, 237)';
//        
//        }
//        
//
// } 

}
function CheckFileUpload(input) { 
var ext = input.value.split('.'); 
    ext = ext[ext.length-1].toLowerCase();     
var arrayExtensions = ['xlsm']; 
if (arrayExtensions.lastIndexOf(ext) == -1) { 
      document.getElementById('docFile_label').innerHTML = '*WFL will support with file [XLSM] only format to process on workflow *';
} 
else { 
      document.getElementById('docFile_label').innerHTML = '';
}
} 
function removeattach(input) { 
if (confirm("!!!WARNING can't recovery file when you remove attach file .!!!\r\n Are you want to Remove this Attachment File ?")) {
              document.querySelector('#ul_message').textContent = "Removing File Attached… Please Wait.";
              google.script.run.withSuccessHandler(onSuccess1).withFailureHandler(onFailure).removefile(input); //ADDED FOR V2
              //alert(input);
              parent.parent.window.location.replace(document.getElementById('txtURL').value);
}
return;
} 

function createInputForm(pId, pRt, pFr,viewer) {

  var strHTML,strRoute,title,FolderattId;
  var ss1 = SpreadsheetApp.openByUrl(DATA_SPREADSHEET);
  var strformTitle = "<div class=\"inp_form\"><div class=\"form_title\">@title</div>";
  user_email = Session.getActiveUser().getEmail();
//Logger.log(pId);
  docPID = pId; //PID CONTROLLED BY SYSTEM
  docPidExcel = Number(pId) - 1; //PIC PLUS ONE FOR HEADER FOR DATABASE ACCESSS
  
 // -----------Read Parameter-------------
  var para_config = ss1.getSheetByName("Config").getRange("B:B");
  var rw_para_config = para_config.getLastRow(); // Get Last Rows
  var data_config = ss1.getSheetByName("Config").getRange("A1:D" + (rw_para_config)).getValues().filter(function (dataRow) {return dataRow[1] !="";}); // [A]-Application Name,[B]-Company
  // Start of Set config
  var p_Qty_Atttach_File = data_config.filter(function(dt) { return dt[1] == 'Qty_Atttach_File';})[0][2]; // Define Maximum for Attach File.
  version_wfl = data_config.filter(function(dt) { return dt[1] == 'version_wfl';})[0][2]; // Define Maximum for Attach File.
  
  // End of set config
 //-------------------------

  strRoute = "";
  if (pRt != "1") { //HIDE FROM SUBMIT FROM (INITIAL)
      strRoute = getHistoryLog((docPidExcel + 1)); //docPidExcel to get Route Status
  }

strHTML = "<ul id=\"ul_message\">Now loading...</ul><ul id=\"ul_message2\"></ul>"  // MODIFY BY WP 20210916
       //+ "<script>window.onload = function() {google.script.run.withSuccessHandler(onSuccess1).withFailureHandler(onFailure).test();}</script>"
       + HtmlService.createHtmlOutputFromFile('JavaScript').getContent() // Add Javascript from JavaScript.Html
       + HtmlService.createHtmlOutputFromFile('StyleSheet').getContent() // Add StyleSheet from StyleSheet.Html
       + "<link rel=\"stylesheet\" href=\"//ssl.gstatic.com/docs/script/css/add-ons.css\">" // add Css same bootrap
       + "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">"
       + "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.js\"></script>" // add ajax code
       + "<script src=\"https://apis.google.com/js/platform.js\" async defer></script>"
       + "<link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\">"
       + "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css\">"
       //+ "<div id=\"preloader\"></div>"
       + "<div id=\"tab1\" class=\"tab animated  fadeInLeft faster \" >"
       + "<tbody>"
       + "<form id=\"inp\">"; // start form
  /*-------------- Create Header By Route -----------------------  */
       // Check Route from URL for select render form
       if (pRt != null) {
           // Has Route
           var form_typ = pRt.substring(0, 1);var form_ln = pRt.length;
       } else {
           // Hasn't Route
           var form_typ = "";var form_ln = "";
       }
  // GENERATE HEADER WEB PAGE
  switch ("" + form_typ + form_ln) {
  case "11":
      // Issue Form
      strHTML = strHTML + "<div><div id=\"charging\" class=\"material-icons\" style=\"color: #357ae8;\"></div><font size=\"5\" class=\"animated  fadeInLeft delay-1s\" >WorkFlow Launcher - Issue Application</font></div>";
      break;
  case "12":
  case "21":
  case "22":
      // Review Form
      strHTML = strHTML + "<div id=\"charging\" class=\"material-icons\" style=\"color: #357ae8;\"></div><font size=\"5\" class=\"animated  fadeInLeft delay-1s\">WorkFlow Launcher</font><div><font color=green size=\"3\" class=\"animated  fadeInLeft delay-1s\">" + ss1.getSheetByName(INPUT_DATA).getRange("D" + docPID).getValue() + " Request - Review Form </font></div>";
      break;
  case "31":
      // Approve Form
      strHTML = strHTML + "<div id=\"charging\" class=\"material-icons\" style=\"color: #357ae8;\"></div><font size=\"5\" class=\"animated  fadeInLeft delay-1s\">WorkFlow Launcher</font><div><font color=green size=\"3\" class=\"animated  fadeInLeft delay-1s\">" + ss1.getSheetByName(INPUT_DATA).getRange("D" + docPID).getValue() + " Request - Final Approve Form </font></div>";
      break;
  case "41":
      // Register Form
      strHTML = strHTML + "<div id=\"charging\" class=\"material-icons\" style=\"color: #357ae8;\"></div><font size=\"5\" class=\"animated  fadeInLeft delay-1s\">WorkFlow Launcher</font><div><font color=green size=\"3\" class=\"animated  fadeInLeft delay-1s\">" + ss1.getSheetByName(INPUT_DATA).getRange("D" + docPID).getValue() + " Request - Application Admin Form</font></div>";
      break;
  default: 
      // Other Form
      strHTML = strHTML + "<div id=\"charging\" class=\"material-icons\" style=\"color: #357ae8;\"></div><div><font size=\"5\" class=\"animated  fadeInLeft delay-1s\">WorkFlow Launcher - Issue Application</font></div>";
      break;
  }
  // GENERATE VERSION WEB PAGE
  strHTML = strHTML + "<font color=\"#80aaDD\" class=\"animated  fadeInUp delay-3s\" >" + version_wfl + "</font>"; // version WFL
  /*-------------- END Create Header By Route -----------------------  */


  /*-------------- Create Form By Route -----------------------  */
  // Issue Application
  if ("" + form_typ + form_ln == "11") {

      // Issue Date - Text Input
      strHTML += strformTitle.replace(/@title/g, "Issue Date")
      strHTML += "<div class=\"form_inp\">" + putInputTag("text", "txtIssueDate", "value=\"" + Utilities.formatDate(new Date(), "GMT+7", "yyyy/MM/dd") + "\"  readonly=\"readonly\"") + "</div>"
      strHTML += "</div>"

      // Issue By - Text Input
      strHTML += strformTitle.replace(/@title/g, "Issue By")
      strHTML += "<div class=\"form_inp\">" + putInputTag("text", "txtIssueBy", "value=\"" + user_email + "\"  readonly=\"readonly\" style=\"width:557px;color:#431AE6;\" ") + "</div>"
      strHTML += "</div>"
      
      // Urgent - Text Input
      strHTML += strformTitle.replace(/@title/g, "Priority")
      strHTML += "<div class=\"form_inp\">" +" <label class=\"cls_chkCompany\" ><input type=\"radio\" name=\"priority\" title=\"Priority : Normal \" class=\"required\" value=\"1\" onchange=\"changepriority(this.value)\" checked>Normal</label> <label class=\"cls_chkCompany\"><input type=\"radio\" name=\"priority\" title=\"Priority  : Urgent \"  class=\"required\" value=\"0\" onchange=\"changepriority(this.value)\" > <span class=\"attributecolor\" style=\"color:red;font-weight: bold;\">Urgent </span></label>" 
      //strHTML +=  putInputTag("text", "txtRef3_", "value=\"" + "\" style=\"width: 395px;\"   disabled") + "</div>"
      strHTML += "</div>"
      
       strHTML += "<div id='prireason' style=\"visibility: hidden; height: 0px;\" >" +strformTitle.replace(/@title/g, "Priority Reason")
      //<textarea id=\"txtComment\" name=\"txtComment\" rows=\"5\" cols=\"80\" style=\"width: 558px;\" " + (status_wfl == true ? "" : "disabled=\"disabled\"") + "></textarea>
      //strHTML +=  "<div class=\"form_inp\">"+putInputTag("textarea", "txtRef3_", "value=\""  + "\" style=\"width: 407px;\" "+reason_chk) + "</div>"
      strHTML +=  "<div class=\"form_inp\"><textarea id=\"txtRef3_\" name=\"txtRef3_\" rows=\"5\" cols=\"80\" style=\"width: 558px; \"  ></textarea></div>"
      strHTML += "</div></div>"
      
      // Issue Company  - Radio Check box
      strHTML += strformTitle.replace(/@title/g, "Company")
      strHTML += "<div class=\"form_inp\"><div class=\"chk_block\">" + createRadio("Company", "chkCompany", "onChange=\"getCompanyDept(this.value)\"") + "</div></div>"
      strHTML += "</div>"
       //Logger.log('Step 1'); 
      // Issue Form  - Dropdown
      strHTML += strformTitle.replace(/@title/g, "Application Sheet");
      /* Form WFL List with Company  */
      //get Data master Form from Sheet [Master]
      var rg_req = ss1.getSheetByName("Routing").getRange("D:D");
      var rows_req = rg_req.getLastRow(); // Get Last Rows
      var data_req = ss1.getSheetByName("Routing").getRange("B1:D" + (rows_req)).getValues().filter(function (dataRow) {return dataRow[0] !="";}); // [A]-Application Name,[B]-Company
      var newData = new Array();
    var alen=data_req.length
    var adjlen=0 //alen-15
    for(i=adjlen;i<alen;i++){
      var row = data_req[i];
      var duplicate = false;
      for(j in newData){
        if(row[0] == newData[j][0]  && row[2] == newData[j][2]){ //changed to compare col A&B
         duplicate = true;
        }
      }
      if(!duplicate){
        newData.push(row);
      }
    }
    data_req = newData.sort();
      //Generate Form Name By Company
      for (i = 1; i < companys.length ; i++) {
              strHTML += "<div name=\"chk" + companys[i][0] + "MasterDiv\" style=\"display: none;\" class=\"form_inp\"><div class=\"chk_block\">" + getMasterListDropdown(companys[i][0], "Application Sheet", "chk" + companys[i][0] + "Master", data_req) + "  [ <a target=\"_blank\" href=\""+ url_form +"\">Download Latest Forms</a> ]</div></div>"
      }
      strHTML += "</div>";
      /* End Form WFL List with Company  */

      /* Department List with Company  */
      var data_dep = ss1.getSheetByName("Department").getRange("A:C").getValues().filter(function (dataRow) {return dataRow[0] !="";});
      strHTML += strformTitle.replace(/@title/g, "Department")
      for (i = 1; i < companys.length ; i++) {
              strHTML += "<div name=\"chk" + companys[i][0] + "DepartmentDiv\" style=\"display: none;\" class=\"form_inp\"><div class=\"chk_block\">" + getDepartmentListDropdown(companys[i][0], "Entertain Expense", "chk" + companys[i][0] + "Department", data_dep) + "</div></div>"
      }
      //var t_1d_e = new Date();
      //SpreadsheetApp.openById(Sheet_Test).getSheetByName(Sheet_Test_Name).appendRow([user_email, "2D", t_1d_s, t_1d_e, t_1d_e - t_1d_s, version_wfl, "render data Master Department", "Issue Application"]);
      
      //var t_1e_s = new Date();
      strHTML += "<div name=\"AllDepartmentDiv\" style=\"display: none;\" class=\"form_inp\"><div class=\"chk_block\">" + setRoutingNames("listAllRouting") + "</div></div>"
      //var t_1e_e = new Date();
      //SpreadsheetApp.openById(Sheet_Test).getSheetByName(Sheet_Test_Name).appendRow([user_email, "2E", t_1e_s, t_1e_e, t_1e_e - t_1e_s, version_wfl, "render data Master Route", "Issue Application"]);

      strHTML += "</div>"
      /* End Department List with Company  */

      // Remark for Issue
      strHTML += strformTitle.replace(/@title/g, "Remark")
      strHTML += "<div class=\"form_inp\">" + "<textarea id=\"txtRemark\" name=\"txtRemark\" rows=\"5\" cols=\"80\" style=\"width: 558px;\"></textarea>" + "</div>"
      strHTML += "</div>"

      // File Excel Form
      strHTML += strformTitle.replace(/@title/g, "File Excel Form")
      strHTML += "<div class=\"form_inp\">" + putInputTag("file", "docFile", "onchange=\"CheckFileUpload(this)\" style=\"width:500px;\" ") + "<label id=\"docFile_label\" for=\"docFile\" style=\"color:#e6071a;\" >File Type *.xlsm Only</label></div>"
      strHTML += "</div>"

      // File Attach Form
      //strHTML += strformTitle.replace(/@title/g, "+Support Doc.")
      strHTML += "<div class=\"inp_form\"><div class=\"form_title\">+Support Doc.</div><div class=\"form_inp\">"
      strHTML += "<a  class=\"buttona addico\" onclick=\"inputBtn("+p_Qty_Atttach_File+");\">Add Attach File.</a><hr>"
     // <input type="file" id="attFile" name="attFile" onchange="CheckFileAttach(this)" style="width:500px;">
      strHTML += "<div id=\"target_div\">" 
      strHTML += "<label id=\"lbl1\">1)&nbsp;</label><input type=\"file\" id=\"attFile1\" name=\"attFile1\" style=\"width: 500px; margin: 0px; color: rgb(71, 135, 237);\" onchange=\"CheckFileAttach(this);\"  ><a id=\"rem_att1\" name=\"1\" onclick='RemoveFileAttach(this);' >Remove</a><hr id=\"hr1\">"
      //+ putInputTag("file", "attFile", "onchange=\"CheckFileAttach(this)\" style=\"width:500px;\" ") + "</div>
      strHTML += "</div>"
      strHTML += "<label id=\"attFile_label\" for=\"attFile\" style=\"color:#e6071a;\" >File Support (*PDF,EXCEL,WORD,POWERPOINT,IMAGE*) Not over 10MB</label>"
      strHTML += "</div></div>"

      // Reference #1,#2,#3
      strHTML += strformTitle.replace(/@title/g, "Reference Info.")
      strHTML += " <div class=\"form_inp\"><b>#1&nbsp;</b>" + putInputTag("text", "txtRef1", "value=\"" + "\" style=\"width: 344px;\" ") + "</div>"
      strHTML += " <div class=\"form_inp\"><b>#2&nbsp;</b>" + putInputTag("text", "txtRef2", "value=\"" + Utilities.formatDate(new Date(), "GMT+7", "yyyy/MM/dd") + "\"  ") + "</div>"

      strHTML += "</div>"
      // Button Generate Email List
      strHTML += putInputTag("button", "btnGetList", "class=\"green\" value=\"Get Approve List\" onclick=\"setRoutingName(document.getElementById('inp'));\"")

      /*--------------Dynamic email route------------------*/
      // Reviewer e-mail route
      var review_num = 7;
      strHTML += "<table>"
      for (i = 1; i < review_num + 1; i++) {
          strHTML += "<tr>" +
          "<td><div style=\"display: block;\">Reviewer #" + i + "</td>" +
          "<td><input size=45 readonly type=\"text\" id=\"reviewLevel" + i + "\" " +
          "name=\"reviewLevel" + i + "\" value=\"\">" +
          "</div><button id =\"BTreviewLevel" + i + "\" type=\"button\" " + "onClick=\"RemoveRt(" + i + ")\">Remove</button>" +
          // " Comment : " +
          "<input size=45 readonly type=\"text\" id=\"CommentreviewLevel" + i + "\" style=\"display: none;\"  " +
          "name=\"CommentreviewLevel" + i + "\" value=\"\">" +
          "<input type=\"hidden\" id=\"STreviewLevel" + i + "\" name=\"STreviewLevel" + i + "\" value=\"1\">" +
          "</td>" +
          "</tr>"
      }
      // Reviewer e-mail route
      strHTML += "<tr><td><div style=\"display: block;\">Final Approve </td><td><input size=45 readonly type=\"text\" id=\"finalApprove\" name=\"finalApprove\" value=\"\"></div></div></td></tr>"
      // Reviewer e-mail route
      strHTML += "<tr><td><div style=\"display: block;\">Application Admin</td><td><input size=45 readonly type=\"text\" id=\"applicationAdmin\" name=\"applicationAdmin\" value=\"\">"
      // Reviewer e-mail route
      strHTML += " CC <input size=35 readonly type=\"text\" id=\"applicationAdminCC\" name=\"applicationAdminCC\" value=\"\"></div><!--<button type=\"button\" onClick=\"document.getElementById('applicationAdmin').value = ''; document.getElementById('applicationAdminCC').value = '';\">Remove</button>--></td></tr>"
      strHTML += "</table>"
      /*--------------End Dynamic email route------------------*/

      // DYNAMIC ROUNTING FOR EACH COMPANY --- hidden --- get value
      strHTML += "<div style=\"display: none;\" class=\"form_inp\">"
      strHTML += "<div style=\"display: none;\"><input size=35 readonly type=\"text\" id=\"txtRegister\"   name=\"txtRegister\"   value=\"\"></div>"
      strHTML += "<div style=\"display: none;\"><input size=35 readonly type=\"text\" id=\"txtCompany\"    name=\"txtCompany\"    value=\"\"></div>"
      strHTML += "<div style=\"display: none;\"><input size=35 readonly type=\"text\" id=\"txtDepartment\" name=\"txtDepartment\" value=\"\"></div>"
      strHTML += "<div style=\"display: none;\"><input size=35 readonly type=\"text\" id=\"txtMaster\"     name=\"txtMaster\"     value=\"\"></div>"
      strHTML += putInputTag("hidden", "txtPriority", "value=\"1\"")
      strHTML += "</div>"
      // DYNAMIC ROUNTING FOR EACH COMPANY

      //END ADDED FOR V2 -- Submit
       + putInputTag("button", "btnIns", "class=\"action\" onclick=\" return doAction(document.getElementById('inp'));\" value=\"Submit\"");
  }
//Logger.log('Step 2'); 
  //END SUBMIT FORM

  //REVIEW AND APPROVE FORM
  if ("" + form_typ + form_ln > "11") {
  strHTML = strHTML;
  // Check Template for User
  var FolderTemplateID = "10BdH3hyLje-7yc3NRAl9W3jpfbCAKBCN";
  var FolderTempID = "1T0JMNMr4Bw94RMcu8TFkZl6K_B4HH37S";
  //var User_Email = user_email;
  var FolderTempUser = DriveApp.getFolderById(FolderTempID);
  var FolderTempUserEmail;
  if  (FolderTempUser.getFoldersByName(user_email).hasNext()==false) {
    FolderTempUserEmail = FolderTempUser.createFolder(user_email)
  } else {
    FolderTempUserEmail =  FolderTempUser.getFoldersByName(user_email).next();
  }
    
   // read data from Sheet
   var test = ss1.getSheetByName(INPUT_DATA).getRange("A" + docPID+":CK"+docPID).getValues();
   var doc_name = test[0][0];
   var com_type = test[0][1];
   var doc_type = test[0][3];  
   var doc_idi  = test[0][8]; 
   var doc_urli = test[0][7];
    // Urgent Case
   var urgent_flg = test[0][88];
   var urgent_reason = test[0][59];
    
    urgent_chk =""
    normal_chk =""
    reason_chk =""
    if (urgent_flg==0) {
       urgent_chk="checked"
       normal_chk=""
    } else if (urgent_flg==1) {
       urgent_chk=""
       normal_chk="checked"
       reason_chk ="disabled"
       urgent_reason="";
    }
//Logger.log('Step 3'); 
    if (FolderTempUserEmail.getFilesByName(doc_type).hasNext()==false) { //IF DOES NOT HAS TEMPLATE FILE, COPY FROM TEMPLATE MASTER FOLDER
      
      //var check1_ts =new Date();
      // get master template from id
      var master_form = ss1.getSheetByName("Master").getDataRange().getValues().filter(function (dataRow) {return dataRow[0] == doc_type && dataRow[1] == com_type;});
      
       //Browser.msgbox("Loading...  " + doc_type +  " " + com_type);
       //Logger.log("Loading...  " + doc_type + " " + com_type);
      
      var master_template_id = master_form[0][8];
      if (master_template_id==null) {return "Can't Found Master Template Please Check."}
      var master_template_file = DriveApp.getFileById(master_template_id);
      var master_template_name = master_template_file.getName();
      
      //return master_template_name;
      //var check2_ts =new Date();
      //strHTML += " Check Master Template : " + (check2_ts - check1_ts) + "MilliSec";
      
      //If not have template in folder user
      //var check3_ts =new Date();
      var file_temp,sht_temp;
      
      if (FolderTempUserEmail.getFilesByName(master_template_name).hasNext()==false) {
        
        //Browser.msgBox("Now Copy Form");
        //Browser.inputBox("Test")
        //strHTML += "<script>window.onload = function() {google.script.run.withSuccessHandler(onSuccess1).withFailureHandler(onFailure).test();}</script>"
        file_temp = master_template_file.makeCopy(master_template_name, FolderTempUserEmail).setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.NONE);
        sht_temp = SpreadsheetApp.open(file_temp).insertSheet("Parameter")
        sht_temp.protect();
        sht_temp.hideSheet();
        SpreadsheetApp.open(file_temp).addEditors([user_email,"admin@ngkntk-asia.com"]);
        
      } else { 
        
        file_temp =FolderTempUserEmail.getFilesByName(master_template_name).next();
        file_temp.setName(doc_type);
        sht_temp =SpreadsheetApp.open(file_temp).getSheetByName("Parameter")
        
      } 
      
    } else { //IF TEMPLATE ALREADY EXISTS IN USER FOLDER
          
          file_temp = FolderTempUserEmail.getFilesByName(doc_type).next();
          sht_temp = SpreadsheetApp.open(file_temp).getSheetByName("Parameter")
          
    }

    // Set Parameter in Sheet Parameter
    //var check5_ts =new Date();
    var doc_i = SpreadsheetApp.open(file_temp);
    var sheets_c = doc_i.getSheets();
              for (var i = 0; i < sheets_c.length ; i++ ) {
                    sheets_c[i].clearContents();
               }
    
    if (sht_temp != null) { //ADDED BY WNP 20210524 FIX BUG FOUND BY KUNITAKE-SAN
       sht_temp.clear() //REPLATED BY WNP
       sht_temp.getRange(1,1,6,2).setValues([["Status",""],["ID",docPID],["SheetID" ,doc_idi],["SheetURL",doc_urli],["SheetName",doc_name],["TemplateID",file_temp.getId()]]);

    }
//Logger.log('Step 4');
    TEMPLATE_ID = sht_temp.getRange('B6').getValue(); //PJA 20210820
    
       //var check6_ts =new Date();
       //strHTML += "| Copy Data : " + (check6_ts - check5_ts) + "MilliSec";

          // Company
       strHTML += strformTitle.replace(/@title/g, "Company") + "<div class=\"form_txt\">"
       strHTML += putInputTag("text", "txtCompany", "value=\"" + com_type + "\"  readonly=\"readonly\"") + "</div>"

       ///////////////////////////////DEBUG TEMPLATE ID
       /////////////////////////////////////////////////
       //strHTML += "<font color=#FFFFFF>" + doc_type + " " + com_type + " " + master_template_id + "</font></div>" 
       ///////////////////////////////END OF DEBUG TEMPLATE ID
       
       strHTML += "</div>"
          // Form Name
       strHTML += strformTitle.replace(/@title/g, "Application Sheet") + "<div class=\"form_txt\">"
       strHTML += putInputTag("text", "txtMaster", "value=\"" + doc_type + "\"    readonly=\"readonly\" style=\"width:577px;\" ") + "</div>"
       strHTML += "</div>"
                   // Urgent - Text Input
//        strHTML += strformTitle.replace(/@title/g, "Priority")
//        strHTML += "<div class=\"form_inp\">" +"<label class=\"cls_chkCompany\"><input type=\"radio\" name=\"priority\" title=\"Priority  : Urgent \"  class=\"required\" value=\"0\" " + urgent_chk + "> <span class=\"attributecolor\" style=\"color:red;font-weight: bold;\">Urgent </span></label> <label class=\"cls_chkCompany\" ><input type=\"radio\" name=\"priority\" title=\"Priority : Normal \" class=\"required\" value=\"1\" "+ normal_chk +">Normal</label>" + "</div>"
//        strHTML += "</div>"
       visi ="";
       if (pRt == "4") {
         //visi = "style=\"visibility:hidden\"";
//           if (urgent_flg==0) {
//                        normal_chk = "disabled";
//                        //urgent_chk = "disabled";
//                        reason_chk = "disabled";
//           }  else if (urgent_flg==1) {
//                        //normal_chk = "disabled";
//                        urgent_chk = "disabled";
//                        reason_chk = "disabled";
//                        urgent_reason="";
//           }
       }
    reason_chk = "disabled";
    // if (typeof(urgent_reason) == "undefined"   ) { urgent_reason=""}
      strHTML += strformTitle.replace(/@title/g, "Priority")
      strHTML += "<div class=\"form_inp\" "+ visi +" >" +" <label class=\"cls_chkCompany\" ><input type=\"radio\" name=\"priority\" title=\"Priority : Normal \" class=\"required\" value=\"1\" onchange=\"changepriority(this.value)\" "+ normal_chk +">Normal</label> <label class=\"cls_chkCompany\"><input type=\"radio\" name=\"priority\" title=\"Priority  : Urgent \"  class=\"required\" value=\"0\" onchange=\"changepriority(this.value)\" " + urgent_chk + " > <span class=\"attributecolor\" style=\"color:red;font-weight: bold;\">Urgent </span></label>" 
      //strHTML +=  putInputTag("text", "txtRef3_", "value=\"" + urgent_reason + "\" style=\"width: 407px;\" "+reason_chk) + "</div>"
      strHTML += "</div>"
      strHTML += "<div id='prireason' style=\"visibility: hidden; height: 0px;\" >" +strformTitle.replace(/@title/g, "Priority Reason")
      //<textarea id=\"txtComment\" name=\"txtComment\" rows=\"5\" cols=\"80\" style=\"width: 558px;\" " + (status_wfl == true ? "" : "disabled=\"disabled\"") + "></textarea>
      //strHTML +=  "<div class=\"form_inp\">"+putInputTag("textarea", "txtRef3_", "value=\""  + "\" style=\"width: 407px;\" "+reason_chk) + "</div>"
      strHTML +=  "<div class=\"form_inp\"><textarea id=\"txtRef3_\" name=\"txtRef3_\" rows=\"5\" cols=\"80\" style=\"width: 558px;\" " + reason_chk + "></textarea></div>"
      strHTML += "</div></div>"
        // }
          /* ------------ Excel Form --------------- */
      strHTML += strformTitle.replace(/@title/g, "Application sheet");
      // Check Autorize for Excel Form
      //var t_3b_s = new Date();
//Logger.log('Step 5');
      // Link Form Excel
      var link_url = doc_i.getUrl();
      strHTML += "<div class=\"form_inp\"><a id =\"link_form\" onclick=\"enablebutton('" + link_url + "');\">" + doc_name + "</a></div></div>";
     //window.open($('#target_link').attr('href'), '_blank');
    //enablebutton();setTimeout(function()    {        window.location = $('link_form').get('href');    },1800);
      if ((doc_urli.indexOf("#gid") == -1)) {
          //strHTML +="OK"
          // File attach upload
          if (status_wfl == true) {
              strHTML += strformTitle.replace(/@title/g, "+E-sign Doc.*")
               + "<div class=\"form_inp\">" + putInputTag("file", "IesigFile", "onchange=\"CheckFileAttach(this)\" style=\"width:500px;\" ") + "<label id=\"attFile_label\" for=\"IesigFile\" style=\"color:#e6071a;\" > Please..download from file form [XLSM] and Please upload again.</label></div>"
               + "</div>"
          }
      }
      // } else {
      //   strHTML = strHTML + "<font color=\"red\">This document is already singed OR you may not authorized to view attachement in this step</font></div>";
      // }
      /* ------------  End Excel Form --------------- */
      //var t_3b_e = new Date();
    /*  
    if ((pRt == "1A") || (pRt == "1B") || (pRt == "1C") || (pRt == "1D") || (pRt == "2") || (pRt == "2A") || (pRt == "2B")) {
          SpreadsheetApp.openById(Sheet_Test).getSheetByName(Sheet_Test_Name).appendRow([user_email, "3B", t_3b_s, t_3b_e, t_3b_e - t_3b_s, version_wfl, "render url link form", "[" + docPID + "][Review][" + link_url + "]"]);
      }
      if ((pRt == "3")) {
          SpreadsheetApp.openById(Sheet_Test).getSheetByName(Sheet_Test_Name).appendRow([user_email, "4B", t_3b_s, t_3b_e, t_3b_e - t_3b_s, version_wfl, "render url link form", "[" + docPID + "][Approved][" + link_url + "]"]);
      }
      if ((pRt == "4")) {
          SpreadsheetApp.openById(Sheet_Test).getSheetByName(Sheet_Test_Name).appendRow([user_email, "5B", t_3b_s, t_3b_e, t_3b_e - t_3b_s, version_wfl, "render url link form", "[" + docPID + "][Register][" + link_url + "]"]);
      }
*/
      //var t_3d_s = new Date();
      /* ------------ Attach File --------------- */
      strHTML += strformTitle.replace(/@title/g, "Attachment");
      // Check Autorize for Excel Form
      //if ((getCurrentAuthorize(docPID,pRt) == Session.getActiveUser().getEmail()) || (admin_viewer==1)) {
      /*----------  Show Attach file--------------*/
      strHTML += "<div class=\"form_inp\">";

      var fo1 = DriveApp.getFolderById(ATTACH_FOLDER);
      var fo_att = fo1.getFoldersByName(doc_name);
      if (fo_att.hasNext()) {
          var files = fo_att.next().getFiles();
          var i_ = 1;
          if (files.hasNext()) { // has Found file attach
              strHTML += "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" >";
              while (files.hasNext()) {
                  var file = files.next();
                  // Link attach file
                if (file.getName().indexOf("Delete")==-1) {
                  strHTML += "<tr><td style=\"width:470px;padding: 0px 0;\" >" + i_ + ") <a href=\"" + file.getUrl() + "\" target=\"_blank\" >" + file.getName() + "</a></td>";
                  if (viewer ==1)  {
                      status_wfl = false
                  }
                  if (status_wfl == true) {
                      strHTML += "<td style=\"width: 97px;padding: 0px 0;text-align: right;\"><a id =\"rem_" + i_ + "\"   onclick=\"removeattach('" + file.getId() + "')\">Remove</a></td></tr>";
                  }
                  i_++;
                }
              }
          } 
          if (i_ == 1){
              // If not found attach file
              strHTML += " <tr><td><label style=\"color:red;\">-.none attach file.- </label><br></td></tr>";
          }
          strHTML += "</table>";
      } else {
          strHTML += "<label style=\"color:red;\">-.none fould folder attach file.- </label><br>";
      }
    
       
//Logger.log('Step 6');  
      strHTML += "</div>";
      strHTML += "</div>";
      /*---------- End Show Attach file--------------*/
      //var t_3d_e = new Date();
    /*  
    if ((pRt == "1A") || (pRt == "1B") || (pRt == "1C") || (pRt == "1D") || (pRt == "2") || (pRt == "2A") || (pRt == "2B")) {
          SpreadsheetApp.openById(Sheet_Test).getSheetByName(Sheet_Test_Name).appendRow([user_email, "3D", t_3d_s, t_3d_e, t_3d_e - t_3d_s, version_wfl, "render url link attach file"]);
      }
      if ((pRt == "3")) {
          SpreadsheetApp.openById(Sheet_Test).getSheetByName(Sheet_Test_Name).appendRow([user_email, "4D", t_3d_s, t_3d_e, t_3d_e - t_3d_s, version_wfl, "render url link attach file"]);
      }
      if ((pRt == "4")) {
          SpreadsheetApp.openById(Sheet_Test).getSheetByName(Sheet_Test_Name).appendRow([user_email, "5D", t_3d_s, t_3d_e, t_3d_e - t_3d_s, version_wfl, "render url link attach file"]);
      }
      */
      // Get id for increase file attach upload

      //FolderattId = fo_att.getId();
    try {
         FolderattId = fo1.getFoldersByName(doc_name).next().getId()
    } catch (e) {
           strHTML = HtmlService.createHtmlOutputFromFile('LoadingPage').getContent();
          //strHTML.getContent().toString().replace("llink", "xx"); // WEB_PATH +"?id="+pId+"&rt="+pRt +"&fr="+ pFr+"&viewer="+viewer);  
          //return strHTML;
      
//           strHTML = "<ul id=\"ul_message\">Please wait, WorkFlow Luancher is now processing <br>Please try again in Later "
//           
//          //  parent.parent.window.location.replace(s_url); 
//           //pId, pRt, pFr,viewer
//           strHTML += "<br><a id=\"ll\" href=\"#\" onClick=\"parent.parent.window.location.replace('"+ WEB_PATH +"?id="+pId+"&rt="+pRt +"&fr="+ pFr+"&viewer="+viewer+"');\" >Refresh</a> </ul>"
         strHTML += "<script>setTimeout(function() {  parent.parent.window.location.replace('"+ WEB_PATH +"?id="+pId+"&rt="+pRt +"&fr="+ pFr+"&viewer="+viewer+"');;}, 7000);"
         strHTML += "x=10;setInterval(function() { document.getElementById(\"ll\").innerHTML='Refresh in ..'+(x)+' Sec' ;x-=1;}, 1000);"
         strHTML += "function refresh_libk(){parent.parent.window.location.replace('"+ WEB_PATH +"?id="+pId+"&rt="+pRt +"&fr="+ pFr+"&viewer="+viewer+"');}"
         strHTML += "</script>"
//Logger.log(strHTML);
         return strHTML;
         
    }
//Logger.log("Step 6-2");
      // File attach upload
      if ((status_wfl == true && viewer != 1 && (getCurrentAuthorize(docPID, pRt) == user_email)) || (admin_viewer == 1)) {
            // File Attach Form
      //strHTML += strformTitle.replace(/@title/g, "+Support Doc.")
      strHTML += "<div class=\"inp_form\"><div class=\"form_title\">+Support Doc.</div><div class=\"form_inp\">"
      strHTML += "<a  class=\"buttona addico\" onclick=\"inputBtn("+ p_Qty_Atttach_File + ");\">Add attach file.</a><hr>"
     // <input type="file" id="attFile" name="attFile" onchange="CheckFileAttach(this)" style="width:500px;">
      strHTML += "<div id=\"target_div\">" 
      strHTML += "<label id=\"lbl1\">1)&nbsp;</label><input type=\"file\" id=\"attFile1\" name=\"attFile[]\" style=\"width: 500px; margin: 0px; color: rgb(71, 135, 237);\" onchange=\"CheckFileAttach(this);\"     ><a id=\"rem_att1\" name=\"1\" onclick='RemoveFileAttach(this);' >Remove</a><hr id=\"hr1\">"
      //+ putInputTag("file", "attFile", "onchange=\"CheckFileAttach(this)\" style=\"width:500px;\" ") + "</div>
      strHTML += "</div>"
      strHTML += "<label id=\"attFile_label\" for=\"attFile\" style=\"color:#e6071a;\" >File Support (*PDF,EXCEL,WORD,POWERPOINT,IMAGE*) Not over 10MB</label>"
      strHTML += "</div></div>"
     
      strHTML += "<div class=\"form_inp\">" + strformTitle.replace(/@title/g, "Comment")
      strHTML += "<div class=\"form_inp\">" + "<textarea id=\"txtComment\" name=\"txtComment\" rows=\"2\" cols=\"80\" style=\"width: 558px;\" " + (status_wfl == true ? "" : "disabled=\"disabled\"") + "></textarea>" + "</div>"
      strHTML += "</div>"
      }
      if ((status_wfl == true) && (pRt!= "4") && viewer != 1 && (getCurrentAuthorize(docPID, pRt) == user_email)) {
          // Re-route dropdown
          strHTML += strformTitle.replace(/@title/g, "Re-Routing")
          strHTML += "<div class=\"form_inp\"><input type=\"checkbox\" id=\"chk_rt\" onclick=\"enableRe_Routing(this.checked)\">"
          strHTML += "<select  id=\"selreroute\" name=\"selreroute\" style=\"width:559px;\" disabled>"
          strHTML += " <option value=\"\">-</option>"
          strHTML += txt_rt // Gen email re-route in function get HistoryLog
          strHTML += "</select></div></div>";
      }
    
//Logger.log('Step 7');
     ////////////////////////////////////////////////////////START APPROVE-REJECT-REGISTER BUTTONS
     if (viewer == 1)  {
                    
      } else {
      if ((getCurrentAuthorize(docPID, pRt) == user_email) || (admin_viewer == 1)) {
          // [u]--> Re-route,[a]-->approve,[r]-->Reject
          if ((pRt == "1A") || (pRt == "1B") || (pRt == "1C") || (pRt == "1D") || (pRt == "2") || (pRt == "2A") || (pRt == "2B")) { //AND REVIEW BUTTON
              strHTML = strHTML
                   + putInputTag("button", "btnReroute", "class=\"action\" onclick=\"return doAction2(document.getElementById('inp'),'u','Re-Route','" + pRt + "','" + docPID + "');\" value=\"Re-Route\"  hidden=\"hidden\" disabled ")
                   + " "
                   + putInputTag("button", "btnSign", "class=\"action\" onclick=\"return doAction2(document.getElementById('inp'),'a','Review Sign','" + pRt + "','" + docPID + "');\" value=\"Review Sign\" disabled")
                   + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "
                   + putInputTag("button", "btnReject", "class=\"action\" onclick=\"return doAction2(document.getElementById('inp'),'r','Reject','" + pRt + "','" + docPID + "');\" value=\"Reject\"  disabled");
          }
          if ((pRt == "3")) { //and FINAL REVIEW BUTTON
              strHTML = strHTML
                   + putInputTag("button", "btnReroute", "class=\"action\" onclick=\"return doAction2(document.getElementById('inp'),'u','Re-Route','" + pRt + "','" + docPID + "');\" value=\"Re-Route\"  hidden=\"hidden\" disabled")
                   + " "
                   + putInputTag("button", "btnSign", "class=\"action\" onclick=\"return doAction2(document.getElementById('inp'),'a','Approve','" + pRt + "','" + docPID + "');\" value=\"Approve\" disabled")
                   + " "
                   + putInputTag("button", "btnReject", "class=\"action\" onclick=\"return doAction2(document.getElementById('inp'),'r','Reject','" + pRt + "','" + docPID + "');\" value=\"Reject\"  disabled")
            
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////ADDED BY WP 202109 FOR CANCEL APPROVAL BY PDT//////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////    

                   + " "
                   + putInputTag("button", "btnCancelApprove", "class=\"action\" onclick=\"if (confirm('This will reset the document to previous state and your signature will be removed, Continue?')) { return doAction2(document.getElementById('inp'),'c','CancelApprove','" + pRt + "','" + docPID + "');}\" value=\"Cancel Action\" disabled")
            
                   + " "
                   + putInputTag("button", "btnReloadPage", "class=\"action\" onclick=\"if (confirm('This will reload the page, Continue?')) { parent.parent.window.location.replace(document.getElementById(\'txtURL\').value);}\" value=\"Reload\" disabled");
           
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////END OF ADDED BY WP 202109 FOR CANCEL APPROVAL BY PDT///////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////       

          }
          if ((pRt == "4")) { // REGISTER ACTION BUTTON
              strHTML = strHTML
                   + putInputTag("button", "btnReroute", "class=\"action\" onclick=\"return doAction2(document.getElementById('inp'),'u','Re-Route','" + pRt + "','" + docPID + "');\" value=\"Re-Route\"  hidden=\"hidden\" disabled")
                   + " "
                   + putInputTag("button", "btnSign", "class=\"action\" onclick=\"return doAction2(document.getElementById('inp'),'a','Register','" + pRt + "','" + docPID + "');\" value=\"Register\" disabled");
          }

      } else {
          if (status_wfl == true) {
              strHTML = strHTML + "<br><br><font color=\"red\">This document is already Signed OR you may not authorized to perform action in this step.</font>";
          } else {
              strHTML = strHTML + "<br><br><font color=\"red\">This document is already Rejected. </font>";
                   //+ "<H4>You can cancel the previous action and reset document stage back to before Final Approve/Reject.</H4><H5>(For Final Approver Only. System will keep this action to Log.)</H5>"
                   //+ putInputTag("button", "btnCancelApprove", "class=\"action\" onclick=\"return doAction2(document.getElementById('inp'),'c','CancelApprove','" + pRt + "','" + docPID + "');\" value=\"Cancel Action\"");
          }
      }
      }
  }
  //END OF START APPROVE-REJECT-REGISTER BUTTONS
  // Input Hidden fied for use
  strHTML = strHTML
       + putInputTag("hidden", "txtId", "value=\"" + docPID + "\"")
       + putInputTag("hidden", "txtRt", "value=\"" + pRt + "\"")
       + putInputTag("hidden", "txtJudge", "value=\"\"")
       + putInputTag("hidden", "txtFolderattId", "value=\"" + FolderattId + "\"")
       + putInputTag("hidden", "txtURL", "value=\"" + WEB_PATH + "?id=" + pId + "&rt=" + pRt + "&fr=" + pFr + "\"")
       + putInputTag("hidden", "txtDate", "value=\"\"")
       + putInputTag("hidden", "txtTempFileId", "value=\""+(doc_i != null?doc_i.getId():"")+"\"")
       + putInputTag("hidden", "txtPriority", "value=\""+urgent_flg+"\"")
       + "</div>";

  //END HISTORY LOG
  　strHTML = strHTML + "</form>" + strRoute + "</form>"
       + "</tbody>"
       + "<script>"
       + "document.querySelector('#ul_message').textContent = '';"
       + "document.querySelector('#ul_message2').textContent = '';" //ADDED BY WP 20210916 TO SEPARATE MSG OF CANCEL AND APPROVE/REJECT/REROUTE
       + "function animeicon(id,p1,p2,p3,p4) {"
       + "var a;"
       + "a = document.getElementById(id);"
       + "a.innerHTML = p1; "
       + "setTimeout(function () {"
       + "  a.innerHTML = p1;"
       + "}, 1000); "
       + "setTimeout(function () { "
       + "  a.innerHTML = p2;"
       + "}, 2000); "
       + "setTimeout(function () { "
       + "  a.innerHTML = p3; "
       + " }, 3000); "
       + "setTimeout(function () { "
       + "  a.innerHTML = p4; "
       + "}, 4000); "
       + "} "
       
       + "animeicon('charging','&#xe5dd;','&#xe5cc;','&#xe5dd;','&#xe5cc;'); "
       + "setInterval(animeicon, 5000,'charging','&#xe5dd;','&#xe5cc;','&#xe5dd;','&#xe5cc;'); "
       + "</script>";

  //T2_inputform = new Date();
  return strHTML;

}
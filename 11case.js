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
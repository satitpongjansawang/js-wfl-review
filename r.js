function doGet(event) {
        // WFL Page
      var output,gen_html,viewer=0; // Set Variable
      user_email = Session.getActiveUser().getEmail(); // Get Email Session
      // ----- Check parameter from URL (Get) --------
      if (typeof(event.parameter.admin) != "undefined") { admin_viewer = 1; }
      if (typeof(event.parameter.view) != "undefined") { viewer = 1; }
      if (typeof(event.parameter.id) == "undefined"   ) { 
          gen_html = createInputForm("", "1", "0",viewer);  // Call Issue Page
      } else { 
          var p = findRow(event.parameter.id); // change RecID 220818
          //Logger.log(p);
          gen_html = createInputForm(p, event.parameter.rt, event.parameter.fr,viewer);  // Call Reviewer Page // change RecID 220818
      }
      // ----- End of Check parameter from URL (Get) --------
      if (admin_viewer == 1 && Tracking_status==1) {
          gen_html += "<hr>"
      }
    
      output = HtmlService.createHtmlOutput(gen_html)
      output.setTitle("WorkFlowLauncher " + version_wfl);
      return output;
  //  } // END IF
  }
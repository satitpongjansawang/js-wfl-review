function getHistoryLog(pid) {
  //console.log(pid);
  //event.parameter.id
  //event.parameter.rt
  var status,
    j,
    nxt,
    plus,
    pmsg,
    pstatus,
    paction,
    ss,
    rg,
    rg_pos,
    rg_dept,
    strHTML,
    rows,
    values;

  //pid = "DB_PDOKD18062301:TNGK_PU_DB Sheet - Items_180627130751"
  //JOE-----------
  strHTML = '';
  //var t1_check = new Date();
  //Joe-----------

  ss = SpreadsheetApp.openByUrl(DATA_SPREADSHEET);
  rg = ss.getSheetByName(INPUT_DATA).getRange(pid + ':' + pid);

  rows = rg.getLastRow();
  values = rg.getValues();

  rg_dept = ss.getSheetByName('Department');
  var dept = rg_dept
    .getRange('A:C')
    .getValues()
    .filter(function (row) {
      if (
        row[0] === values[0][1] &&
        row[1] === values[0][0].toString().split('_')[2]
      ) {
        return row;
      }
    });
  dept = typeof dept != 'undefined' ? dept : [];
  //return JSON.stringify(dept)
  rg_pos = ss.getSheetByName('Routing-Pos');
  var pos = rg_pos
    .getRange('A:N')
    .getValues()
    .filter(function (row) {
      if (
        row[1] === values[0][1] &&
        row[2] === dept[0][2] &&
        row[3] === values[0][3]
      ) {
        return row;
      }
    });
  pos = typeof pos != 'undefined' ? pos : [];
  //return JSON.stringify(pos)

  var timezone_ = ss
    .getSheetByName('Timezone')
    .getRange('A:C')
    .getValues()
    .filter(function (dataRow) {
      return dataRow[0] == values[0][1];
    });
  timezone_ = timezone_
    ? timezone_
    : ss
        .getSheetByName('Timezone')
        .getRange('A:C')
        .getValues()
        .filter(function (dataRow) {
          return dataRow[0] == 'DEFAULT';
        });
  strHTML +=
    '<div  class="animated  fadeInLeft delay-1s " ><I><B><br>Request ID# <span style="background-color:#f3fe0063">[' +
    values[0][85] +
    ']</span> - ' +
    values[0][0] +
    '</B></I><br><br><TABLE bgcolor="#e8f8f5" width="100%">';
  strHTML =
    strHTML +
    "<tr><th width='2%'>Step</th>" +
    "<th width='25%' >&nbsp;&nbsp;E-Mail</th>" +
    "<th width='15%' >Action</th>" +
    "<th width='7%'  >Date/Time</th>" +
    '<th>Comment/Urgent Reason</th></tr>';
  j = 0;
  //(parseInt(pid)) for line 1785
  nxt = j;
  //j++;
  pmsg = '((Pending))';

  pstatus = 'Issued';

  if (j < 1) {
    nxt++;
    strHTML = strHTML + '<tr><td>' + nxt + '</td>';
    strHTML =
      strHTML +
      '<td>' +
      values[0][5]
        .replace(/\"/gim, '"')
        .replace(/\</gim, '&lt;')
        .replace(/\>/gim, '&gt;')
        .replace(/\r\n/gim, '<br>')
        .replace(/\n/gim, '<br>') +
      '</td>';
    ////Logger.log(values[0][5])
    if (values[0][6] != '') {
      strHTML = strHTML + '<td>' + pstatus + '</td>';
    } else {
      strHTML = strHTML + '<td> ((Pending)) </td>';
    }
    if (values[0][9] != '') {
      strHTML =
        strHTML +
        '<td>' +
        Utilities.formatDate(values[0][9], timezone_[0][2], 'dd-MMM-yy HH:mm') +
        '</td>';
    } else {
      strHTML = strHTML + '<td> - </td>';
    }
    strHTML =
      strHTML +
      '<td>' +
      values[0][4].replace(/\r\n/gim, '<br>').replace(/\n/gim, '<br>') +
      '</td>';
    strHTML = strHTML + '</tr>';
  }

  //pstatus = tvalues[pid][2];

  paction = values[0][2].indexOf('Rejected by Reviewer1');
  if (paction > -1) {
    status_wfl = false;
  }

  if (paction == -1) {
    pstatus = 'Signed By Reviewer';
  } else {
    pstatus = 'Rejected by Reviewer';
  }

  //if  ((paction > -1) && ((i+1) == j) ) { pstatus = values[pid][2] + nxt; } else {  pstatus = "Signed By Reviewer"; }

  if (j < 2 && values[0][27] != '') {
    nxt++;
    strHTML = strHTML + '<tr><td>' + nxt + '</td>';
    strHTML =
      strHTML +
      '<td>' +
      (typeof pos[0] != 'undefined'
        ? pos[0][4] != ''
          ? pos[0][4] + ' - '
          : ''
        : '') +
      values[0][27]
        .replace(/\"/gim, '"')
        .replace(/\</gim, '&lt;')
        .replace(/\>/gim, '&gt;')
        .replace(/\r\n/gim, '<br>')
        .replace(/\n/gim, '<br>') +
      '</td>';

    if (status_wfl == true) {
      if (values[0][27] != '') {
        pmsg = '<td><font color=red> ((Pending Review)) </font></td>';
      } else {
        pmsg = '<td> - </td>';
      }
    } else {
      pmsg = '<td></td>';
    }
    if (values[0][26].indexOf('Remove-') > -1) {
      strHTML =
        strHTML +
        '<td>Skip By Issuer (' +
        values[0][26]
          .replace(/\"/gim, '"')
          .replace(/\</gim, '&lt;')
          .replace(/\>/gim, '&gt;')
          .replace(/\r\n/gim, '<br>')
          .replace(/\n/gim, '<br>') +
        ') </td>';
      //
    } else {
      if (values[0][30] != '') {
        strHTML = strHTML + '<td>' + pstatus + '1</td>';
      } else {
        strHTML = strHTML + pmsg;
      }
    }
    if (values[0][30] != '') {
      strHTML =
        strHTML +
        '<td>' +
        Utilities.formatDate(
          values[0][30],
          timezone_[0][2],
          'dd-MMM-yy HH:mm'
        ) +
        '</td>';
    } else {
      strHTML = strHTML + pmsg;
    }
    if (values[0][26].indexOf('Remove-') > -1) {
      strHTML = strHTML + '<td></td>';
    } else {
      strHTML =
        strHTML +
        '<td>' +
        values[0][26]
          .replace(/\"/gim, '"')
          .replace(/\</gim, '&lt;')
          .replace(/\>/gim, '&gt;')
          .replace(/\r\n/gim, '<br>')
          .replace(/\n/gim, '<br>') +
        '</td>';
    }
    strHTML = strHTML + '</tr>';
    var dd = '';
    var dis_rt = 'disabled';
    if (values[0][30] != '' && values[0][26].indexOf('Remove-') < 0) {
      ////Logger.log(values[0][26].indexOf("Remove-"))
      dd = Utilities.formatDate(values[0][30], timezone_[0][2], 'dd/MM/yy');
      dis_rt = '';
      txt_rt +=
        '<option value="1A" ' +
        dis_rt +
        ' >[Reviewer1]  - ' +
        values[0][27] +
        ' - ' +
        dd +
        '</option>';
    }
  }
  paction = values[0][2].indexOf('Rejected by Reviewer2');
  if (paction > -1) {
    status_wfl = false;
  }

  if (paction == -1) {
    pstatus = 'Signed By Reviewer';
  } else {
    pstatus = 'Rejected by Reviewer';
  }
  if (j < 3 && values[0][32] != '') {
    nxt++;
    strHTML = strHTML + '<tr><td>' + nxt + '</td>';
    strHTML =
      strHTML +
      '<td>' +
      (typeof pos[0] != 'undefined'
        ? pos[0][5] != ''
          ? pos[0][5] + ' - '
          : ''
        : '') +
      values[0][32]
        .replace(/\"/gim, '"')
        .replace(/\</gim, '&lt;')
        .replace(/\>/gim, '&gt;')
        .replace(/\r\n/gim, '<br>')
        .replace(/\n/gim, '<br>') +
      '</td>';

    if (status_wfl == true) {
      if (values[0][32] != '') {
        pmsg = '<td><font color=red> ((Pending Review))</font></td>';
      } else {
        pmsg = '<td> - </td>';
      }
    } else {
      pmsg = '<td></td>';
    }
    //strHTML = strHTML + "<td>Review</td>";
    if (values[0][31].indexOf('Remove-') > -1) {
      strHTML =
        strHTML +
        '<td>Skip By Issuer(' +
        values[0][31]
          .replace(/\"/gim, '"')
          .replace(/\</gim, '&lt;')
          .replace(/\>/gim, '&gt;')
          .replace(/\r\n/gim, '<br>')
          .replace(/\n/gim, '<br>') +
        ') </td>';
    } else {
      if (values[0][35] != '') {
        strHTML = strHTML + '<td>' + pstatus + '2</td>';
      } else {
        strHTML = strHTML + pmsg;
      }
    }
    if (values[0][35] != '') {
      strHTML =
        strHTML +
        '<td>' +
        Utilities.formatDate(
          values[0][35],
          timezone_[0][2],
          'dd-MMM-yy HH:mm'
        ) +
        '</td>';
    } else {
      strHTML = strHTML + pmsg;
    }
    if (values[0][31].indexOf('Remove-') > -1) {
      strHTML = strHTML + '<td></td>';
    } else {
      strHTML =
        strHTML +
        '<td>' +
        values[0][31]
          .replace(/\"/gim, '"')
          .replace(/\</gim, '&lt;')
          .replace(/\>/gim, '&gt;')
          .replace(/\r\n/gim, '<br>')
          .replace(/\n/gim, '<br>') +
        '</td>';
    }
    strHTML = strHTML + '</tr>';

    var dd = '';
    var dis_rt = 'disabled';
    if (values[0][35] != '' && values[0][31].indexOf('Remove-') < 0) {
      dd = Utilities.formatDate(values[0][35], timezone_[0][2], 'dd/MM/yy');
      dis_rt = '';
      txt_rt +=
        '<option value="1B" ' +
        dis_rt +
        ' >[Reviewer2]  - ' +
        values[0][32] +
        ' - ' +
        dd +
        '</option>';
    }
  }
  paction = values[0][2].indexOf('Rejected by Reviewer3');
  if (paction > -1) {
    status_wfl = false;
  }

  if (paction == -1) {
    pstatus = 'Signed By Reviewer';
  } else {
    pstatus = 'Rejected by Reviewer';
  }
  if (j < 4 && values[0][37] != '') {
    nxt++;
    strHTML = strHTML + '<tr><td>' + nxt + '</td>';
    strHTML =
      strHTML +
      '<td>' +
      (typeof pos[0] != 'undefined'
        ? pos[0][6] != ''
          ? pos[0][6] + ' - '
          : ''
        : '') +
      values[0][37]
        .replace(/\"/gim, '"')
        .replace(/\</gim, '&lt;')
        .replace(/\>/gim, '&gt;')
        .replace(/\r\n/gim, '<br>')
        .replace(/\n/gim, '<br>') +
      '</td>';

    if (status_wfl == true) {
      if (values[0][37] != '') {
        pmsg = '<td><font color=red> ((Pending Review)) </font></td>';
      } else {
        pmsg = '<td> - </td>';
      }
    } else {
      pmsg = '<td></td>';
    }
    //strHTML = strHTML + "<td>Review</td>";
    if (values[0][36].indexOf('Remove-') > -1) {
      strHTML =
        strHTML +
        '<td>Skip By Issuer (' +
        values[0][36]
          .replace(/\"/gim, '"')
          .replace(/\</gim, '&lt;')
          .replace(/\>/gim, '&gt;')
          .replace(/\r\n/gim, '<br>')
          .replace(/\n/gim, '<br>') +
        ') </td>';
    } else {
      if (values[0][40] != '') {
        strHTML = strHTML + '<td>' + pstatus + '3</td>';
      } else {
        strHTML = strHTML + pmsg;
      }
    }
    if (values[0][40] != '') {
      strHTML =
        strHTML +
        '<td>' +
        Utilities.formatDate(
          values[0][40],
          timezone_[0][2],
          'dd-MMM-yy HH:mm'
        ) +
        '</td>';
    } else {
      strHTML = strHTML + pmsg;
    }
    if (values[0][36].indexOf('Remove-') > -1) {
      strHTML = strHTML + '<td></td>';
    } else {
      strHTML =
        strHTML +
        '<td>' +
        values[0][36]
          .replace(/\"/gim, '"')
          .replace(/\</gim, '&lt;')
          .replace(/\>/gim, '&gt;')
          .replace(/\r\n/gim, '<br>')
          .replace(/\n/gim, '<br>') +
        '</td>';
    }
    // strHTML = strHTML + "<td>" + values[0][36].replace(/\"/gim, '\"').replace(/\</gim, '&lt;').replace(/\>/gim, '&gt;') + "</td>";
    strHTML = strHTML + '</tr>';

    var dd = '';
    var dis_rt = 'disabled';
    if (values[0][40] != '' && values[0][36].indexOf('Remove-') < 0) {
      dd = Utilities.formatDate(values[0][40], timezone_[0][2], 'dd/MM/yy');
      dis_rt = '';
      txt_rt +=
        '<option value="1C" ' +
        dis_rt +
        ' >[Reviewer3]  - ' +
        values[0][37] +
        ' - ' +
        dd +
        '</option>';
    }
  }
  paction = values[0][2].indexOf('Rejected by Reviewer4');
  if (paction > -1) {
    status_wfl = false;
  }

  if (paction == -1) {
    pstatus = 'Signed By Reviewer';
  } else {
    pstatus = 'Rejected by Reviewer';
  }
  if (j < 5 && values[0][42] != '') {
    nxt++;
    strHTML = strHTML + '<tr><td>' + nxt + '</td>';
    strHTML =
      strHTML +
      '<td>' +
      (typeof pos[0] != 'undefined'
        ? pos[0][7] != ''
          ? pos[0][7] + ' - '
          : ''
        : '') +
      values[0][42]
        .replace(/\"/gim, '"')
        .replace(/\</gim, '&lt;')
        .replace(/\>/gim, '&gt;')
        .replace(/\r\n/gim, '<br>')
        .replace(/\n/gim, '<br>') +
      '</td>';

    if (status_wfl == true) {
      if (values[0][42] != '') {
        pmsg = '<td><font color=red> ((Pending Review)) </font></td>';
      } else {
        pmsg = '<td> - </td>';
      }
    } else {
      pmsg = '<td></td>';
    }
    //strHTML = strHTML + "<td>Review</td>";
    if (values[0][41].indexOf('Remove-') > -1) {
      strHTML =
        strHTML +
        '<td>Skip By Issuer (' +
        values[0][41]
          .replace(/\"/gim, '"')
          .replace(/\</gim, '&lt;')
          .replace(/\>/gim, '&gt;')
          .replace(/\r\n/gim, '<br>')
          .replace(/\n/gim, '<br>') +
        ') </td>';
    } else {
      if (values[0][45] != '') {
        strHTML = strHTML + '<td>' + pstatus + '4</td>';
      } else {
        strHTML = strHTML + pmsg;
      }
    }
    if (values[0][45] != '') {
      strHTML =
        strHTML +
        '<td>' +
        Utilities.formatDate(
          values[0][45],
          timezone_[0][2],
          'dd-MMM-yy HH:mm'
        ) +
        '</td>';
    } else {
      strHTML = strHTML + pmsg;
    }
    if (values[0][41].indexOf('Remove-') > -1) {
      strHTML = strHTML + '<td></td>';
    } else {
      strHTML =
        strHTML +
        '<td>' +
        values[0][41]
          .replace(/\"/gim, '"')
          .replace(/\</gim, '&lt;')
          .replace(/\>/gim, '&gt;')
          .replace(/\r\n/gim, '<br>')
          .replace(/\n/gim, '<br>') +
        '</td>';
    }
    //strHTML = strHTML + "<td>" + values[0][41].replace(/\"/gim, '\"').replace(/\</gim, '&lt;').replace(/\>/gim, '&gt;') + "</td>";
    strHTML = strHTML + '</tr>';

    var dd = '';
    var dis_rt = 'disabled';
    if (values[0][45] != '' && values[0][41].indexOf('Remove-') < 0) {
      dd = Utilities.formatDate(values[0][45], timezone_[0][2], 'dd/MM/yy');
      dis_rt = '';
      txt_rt +=
        '<option value="1D" ' +
        dis_rt +
        ' >[Reviewer4]  - ' +
        values[0][42] +
        ' - ' +
        dd +
        '</option>';
    }
  }
  paction = values[0][2].indexOf('Rejected by Reviewer5');
  if (paction > -1) {
    status_wfl = false;
  }

  if (paction == -1) {
    pstatus = 'Signed By Reviewer';
  } else {
    pstatus = 'Rejected by Reviewer';
  }
  if (j < 6 && values[0][11] != '') {
    nxt++;
    strHTML = strHTML + '<tr><td>' + nxt + '</td>';
    strHTML =
      strHTML +
      '<td>' +
      (typeof pos[0] != 'undefined'
        ? pos[0][8] != ''
          ? pos[0][8] + ' - '
          : ''
        : '') +
      values[0][11]
        .replace(/\"/gim, '"')
        .replace(/\</gim, '&lt;')
        .replace(/\>/gim, '&gt;')
        .replace(/\r\n/gim, '<br>')
        .replace(/\n/gim, '<br>') +
      '</td>';

    if (status_wfl == true) {
      if (values[0][11] != '') {
        pmsg = '<td><font color=red> ((Pending Review)) </font></td>';
      } else {
        pmsg = '<td> - </td>';
      }
    } else {
      pmsg = '<td></td>';
    }
    //strHTML = strHTML + "<td>Approve</td>";
    if (values[0][10].indexOf('Remove-') > -1) {
      strHTML =
        strHTML +
        '<td>Skip By Issuer (' +
        values[0][10]
          .replace(/\"/gim, '"')
          .replace(/\</gim, '&lt;')
          .replace(/\>/gim, '&gt;')
          .replace(/\r\n/gim, '<br>')
          .replace(/\n/gim, '<br>') +
        ') </td>';
    } else {
      if (values[0][14] != '') {
        strHTML = strHTML + '<td>' + pstatus + '5</td>';
      } else {
        strHTML = strHTML + pmsg;
      }
    }
    if (values[0][14] != '') {
      strHTML =
        strHTML +
        '<td>' +
        Utilities.formatDate(
          values[0][14],
          timezone_[0][2],
          'dd-MMM-yy HH:mm'
        ) +
        '</td>';
    } else {
      strHTML = strHTML + pmsg;
    }
    if (values[0][10].indexOf('Remove-') > -1) {
      strHTML = strHTML + '<td></td>';
    } else {
      strHTML =
        strHTML +
        '<td>' +
        values[0][10]
          .replace(/\"/gim, '"')
          .replace(/\</gim, '&lt;')
          .replace(/\>/gim, '&gt;')
          .replace(/\r\n/gim, '<br>')
          .replace(/\n/gim, '<br>') +
        '</td>';
    }
    // strHTML = strHTML + "<td>" + values[0][10].replace(/\"/gim, '\"').replace(/\</gim, '&lt;').replace(/\>/gim, '&gt;') + "</td>";
    strHTML = strHTML + '</tr>';

    var dd = '';
    var dis_rt = 'disabled';
    if (values[0][14] != '' && values[0][10].indexOf('Remove-') < 0) {
      dd = Utilities.formatDate(values[0][14], timezone_[0][2], 'dd/MM/yy');
      dis_rt = '';
      txt_rt +=
        '<option value="2" ' +
        dis_rt +
        ' >[Reviewer5]  - ' +
        values[0][11] +
        ' - ' +
        dd +
        '</option>';
    }
  }

  /******************************************************************/
  paction = values[0][2].indexOf('Rejected by Reviewer6');
  if (paction > -1) {
    status_wfl = false;
  }

  if (paction == -1) {
    pstatus = 'Signed By Reviewer';
  } else {
    pstatus = 'Rejected by Reviewer';
  }
  if (j < 7 && values[0][48] != '') {
    nxt++;
    strHTML = strHTML + '<tr><td>' + nxt + '</td>';
    strHTML =
      strHTML +
      '<td>' +
      (typeof pos[0] != 'undefined'
        ? pos[0][12] != ''
          ? pos[0][12] + ' - '
          : ''
        : '') +
      values[0][48]
        .replace(/\"/gim, '"')
        .replace(/\</gim, '&lt;')
        .replace(/\>/gim, '&gt;')
        .replace(/\r\n/gim, '<br>')
        .replace(/\n/gim, '<br>') +
      '</td>';

    if (status_wfl == true) {
      if (values[0][48] != '') {
        pmsg = '<td><font color=red> ((Pending Review)) </font></td>';
      } else {
        pmsg = '<td> - </td>';
      }
    } else {
      pmsg = '<td></td>';
    }
    //strHTML = strHTML + "<td>Final Approve</td>";
    if (values[0][47].indexOf('Remove-') > -1) {
      strHTML =
        strHTML +
        '<td>Skip By Issuer (' +
        values[0][47]
          .replace(/\"/gim, '"')
          .replace(/\</gim, '&lt;')
          .replace(/\>/gim, '&gt;')
          .replace(/\r\n/gim, '<br>')
          .replace(/\n/gim, '<br>') +
        ') </td>';
    } else {
      if (values[0][51] != '') {
        strHTML = strHTML + '<td>' + pstatus + '6</td>';
      } else {
        strHTML = strHTML + pmsg;
      }
    }
    if (values[0][51] != '') {
      strHTML =
        strHTML +
        '<td>' +
        Utilities.formatDate(
          values[0][51],
          timezone_[0][2],
          'dd-MMM-yy HH:mm'
        ) +
        '</td>';
    } else {
      strHTML = strHTML + pmsg;
    }
    if (values[0][47].indexOf('Remove-') > -1) {
      strHTML = strHTML + '<td></td>';
    } else {
      strHTML =
        strHTML +
        '<td>' +
        values[0][47]
          .replace(/\"/gim, '"')
          .replace(/\</gim, '&lt;')
          .replace(/\>/gim, '&gt;')
          .replace(/\r\n/gim, '<br>')
          .replace(/\n/gim, '<br>') +
        '</td>';
    }
    //strHTML = strHTML + "<td>" + values[0][47].replace(/\"/gim, '\"').replace(/\</gim, '&lt;').replace(/\>/gim, '&gt;') + "</td>";
    strHTML = strHTML + '</tr>';

    var dd = '';
    var dis_rt = 'disabled';
    if (values[0][51] != '' && values[0][47].indexOf('Remove-') < 0) {
      dd = Utilities.formatDate(values[0][51], timezone_[0][2], 'dd/MM/yy');
      dis_rt = '';
      txt_rt +=
        '<option value="2A" ' +
        dis_rt +
        ' >[Reviewer6]  - ' +
        values[0][48] +
        ' - ' +
        dd +
        '</option>';
    }
  }
  paction = values[0][2].indexOf('Rejected by Reviewer7');
  if (paction > -1) {
    status_wfl = false;
  }

  if (paction == -1) {
    pstatus = 'Signed By Reviewer';
  } else {
    pstatus = 'Rejected by Reviewer';
  }
  if (j < 8 && values[0][53] != '') {
    nxt++;
    strHTML = strHTML + '<tr><td>' + nxt + '</td>';
    strHTML =
      strHTML +
      '<td>' +
      (typeof pos[0] != 'undefined'
        ? pos[0][13] != ''
          ? pos[0][13] + ' - '
          : ''
        : '') +
      values[0][53]
        .replace(/\"/gim, '"')
        .replace(/\</gim, '&lt;')
        .replace(/\>/gim, '&gt;')
        .replace(/\r\n/gim, '<br>')
        .replace(/\n/gim, '<br>') +
      '</td>';

    if (status_wfl == true) {
      if (values[0][53] != '') {
        pmsg = '<td><font color=red> ((Pending Review)) </font></td>';
      } else {
        pmsg = '<td> - </td>';
      }
    } else {
      pmsg = '<td></td>';
    }
    //strHTML = strHTML + "<td>Final Approve</td>";
    if (values[0][52].indexOf('Remove-') > -1) {
      strHTML =
        strHTML +
        '<td>Skip By Issuer (' +
        values[0][52]
          .replace(/\"/gim, '"')
          .replace(/\</gim, '&lt;')
          .replace(/\>/gim, '&gt;')
          .replace(/\r\n/gim, '<br>')
          .replace(/\n/gim, '<br>') +
        ') </td>';
    } else {
      if (values[0][56] != '') {
        strHTML = strHTML + '<td>' + pstatus + '7</td>';
      } else {
        strHTML = strHTML + pmsg;
      }
    }
    if (values[0][56] != '') {
      strHTML =
        strHTML +
        '<td>' +
        Utilities.formatDate(
          values[0][56],
          timezone_[0][2],
          'dd-MMM-yy HH:mm'
        ) +
        '</td>';
    } else {
      strHTML = strHTML + pmsg;
    }
    if (values[0][52].indexOf('Remove-') > -1) {
      strHTML = strHTML + '<td></td>';
    } else {
      strHTML =
        strHTML +
        '<td>' +
        values[0][52]
          .replace(/\"/gim, '"')
          .replace(/\</gim, '&lt;')
          .replace(/\>/gim, '&gt;')
          .replace(/\r\n/gim, '<br>')
          .replace(/\n/gim, '<br>') +
        '</td>';
    }
    //strHTML = strHTML + "<td>" + values[0][52].replace(/\"/gim, '\"').replace(/\</gim, '&lt;').replace(/\>/gim, '&gt;') + "</td>";
    strHTML = strHTML + '</tr>';

    var dd = '';
    var dis_rt = 'disabled';
    if (values[0][56] != '' && values[0][52].indexOf('Remove-') < 0) {
      dd = Utilities.formatDate(values[0][56], timezone_[0][2], 'dd/MM/yy');
      dis_rt = '';
      txt_rt +=
        '<option value="2B" ' +
        dis_rt +
        ' >[Reviewer7]  - ' +
        values[0][53] +
        ' - ' +
        dd +
        '</option>';
    }
  }

  /******************************************************************/
  paction = values[0][2].indexOf('Rejected by Final Approver');
  if (paction > -1) {
    status_wfl = false;
  }
  if (paction == -1) {
    pstatus = 'Final Approved';
  } else {
    pstatus = values[0][2];
  }

  if (j < 9 && values[0][16] != '') {
    nxt++;
    strHTML = strHTML + '<tr><td>' + nxt + '</td>';
    strHTML =
      strHTML +
      '<td>' +
      (typeof pos[0] != 'undefined'
        ? pos[0][9] != ''
          ? pos[0][9] + ' - '
          : ''
        : '') +
      values[0][16]
        .replace(/\"/gim, '"')
        .replace(/\</gim, '&lt;')
        .replace(/\>/gim, '&gt;')
        .replace(/\r\n/gim, '<br>')
        .replace(/\n/gim, '<br>') +
      '</td>';

    if (status_wfl == true) {
      if (values[0][16] != '') {
        pmsg = '<td><font color=red> ((Pending Final Approve)) </font></td>';
      } else {
        pmsg = '<td> - </td>';
      }
    } else {
      pmsg = '<td></td>';
    }
    //strHTML = strHTML + "<td>Final Approve</td>";
    if (values[0][19] != '') {
      strHTML = strHTML + '<td>' + pstatus + '</td>';
    } else {
      strHTML = strHTML + pmsg;
    }
    if (values[0][19] != '') {
      strHTML =
        strHTML +
        '<td>' +
        Utilities.formatDate(
          values[0][19],
          timezone_[0][2],
          'dd-MMM-yy HH:mm'
        ) +
        '</td>';
    } else {
      strHTML = strHTML + pmsg;
    }
    strHTML =
      strHTML +
      '<td>' +
      values[0][15]
        .replace(/\"/gim, '"')
        .replace(/\</gim, '&lt;')
        .replace(/\>/gim, '&gt;')
        .replace(/\r\n/gim, '<br>')
        .replace(/\n/gim, '<br>') +
      '</td>';
    strHTML = strHTML + '</tr>';

    var dd = '';
    var dis_rt = 'disabled';
    if (values[0][19] != '') {
      dd = Utilities.formatDate(values[0][19], timezone_[0][2], 'dd/MM/yy');
      dis_rt = '';
      txt_rt +=
        '<option value="3" ' +
        dis_rt +
        ' >[Approver]  - ' +
        values[0][16] +
        ' - ' +
        dd +
        '</option>';
    }
  }

  if (j < 10 && values[0][21] != '') {
    nxt++;
    strHTML = strHTML + '<tr><td>' + nxt + '</td>';
    strHTML =
      strHTML +
      '<td>' +
      values[0][21]
        .replace(/\"/gim, '"')
        .replace(/\</gim, '&lt;')
        .replace(/\>/gim, '&gt;')
        .replace(/\r\n/gim, '<br>')
        .replace(/\n/gim, '<br>') +
      '</td>';
    if (status_wfl == true) {
      if (values[0][21] != '') {
        pmsg = '<td><font color=red> ((Pending Register)) </font></td>';
      } else {
        pmsg = '<td> - </td>';
      }
    } else {
      pmsg = '<td></td>';
    }

    //strHTML = strHTML + "<td>Register</td>";
    if (values[0][24] != '') {
      strHTML = strHTML + '<td>Completed</td>';
    } else {
      strHTML = strHTML + pmsg;
    }
    if (values[0][24] != '') {
      strHTML =
        strHTML +
        '<td>' +
        Utilities.formatDate(
          values[0][24],
          timezone_[0][2],
          'dd-MMM-yy HH:mm'
        ) +
        '</td>';
    } else {
      strHTML = strHTML + pmsg;
    }
    strHTML =
      strHTML +
      '<td>' +
      values[0][20]
        .replace(/\"/gim, '"')
        .replace(/\</gim, '&lt;')
        .replace(/\>/gim, '&gt;')
        .replace(/\r\n/gim, '<br>')
        .replace(/\n/gim, '<br>') +
      '</td>';
    strHTML = strHTML + '</tr>';

    var dd = '';
    var dis_rt = 'disabled';
    if (values[0][24] != '') {
      dd = Utilities.formatDate(values[0][24], timezone_[0][2], 'dd/MM/yy');
      dis_rt = '';
      txt_rt +=
        '<option value="4" ' +
        dis_rt +
        ' >[Register]  - ' +
        values[0][21] +
        ' - ' +
        dd +
        '</option>';
    }
  }

  //END OF  NEXT PROCESSES (IN CASE PENDING APPROVE)

  strHTML = strHTML + '</TABLE></div>';

  //strHTML.replace("@Reroute",reroute);
  return strHTML;
}

function sample() {
    var id = "###"; // File ID of Zip file.
    var pass = ""; // Password.
    var theFolder = DriveApp.getFolderById('1I65p1vdoiZQXA4ibvojlw8Wmp7vAO6Ao');
    var theFile = theFolder.getFilesByName('PU-2020-02-011_Change address of FedEx.zip');
    var blob = theFile.next().getBlob().setContentType("application/zip");
    //var blob = DriveApp.getFileById(id).getBlob();
    var res = UnzipGs.unzip(blob); // or UnzipGs.unzip(blob);
    res.forEach(function(e) {
      Logger.log(
        "filename: %s, mimeType: %s, size: %s",
        e.getName(),
        e.getContentType(),
        e.getBytes().length
      );
    });
  }
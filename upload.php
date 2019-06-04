<?php

$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileUpload"]["name"]);
$uploadOk = 1;
$uploadFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileUpload"]["tmp_name"]);
    if($check !== false) {
        // echo "File Accepted! - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        // echo "File is not an image. ";
        $uploadOk = 0;
    }
}
// Check if file already exists NOT NECESSARY
// if (file_exists($target_file)) {
//     echo "Sorry, file already exists.";
//     $uploadOk = 0;
// }
// Check file size
if ($_FILES["fileUpload"]["size"] > 25000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($uploadFileType != "csv") {
    echo "Sorry, only CSV (Comma-Separated Values) files are allowed. ";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded. ";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileUpload"]["name"]). " has been uploaded. ";
    } else {
        echo "Sorry, there was an error uploading your file. ";
    }
}

////
// if (isset($_POST['submit'])){
//     $file = $_FILES['file'];


//     $fileName = $_FILES['file']['name'];
//     $fileTmpName = $_FILES['file']['tmp_name'];
//     $fileSize = $_FILES['file']['size'];
//     $fileError = $_FILES['file']['error'];
//     $fileType = $_FILES['file']['type'];


//     // $fileEXT = explode('.', $fileName);
//     // $fileActualExt = strtolower(end($fileExt)); 

//     // $allowed = array('jpg', 'jpeg', 'png', 'pdf', 'csv');
    
//     // if (in_array($fileActualExt, $allowed)) {
//             if ($fileError ===0) {
//                 if($fileSize < 1000000000) {
//                         $fileNameNew = uniqid('',true).".".$fileActualExt;
//                         $fileDestination = 'uploaded/'.$fileNameNew; // OLD: 'https://github.com/Dragos-MIHAI/2IOA0-2018-4-DBL-HTI-Webtech/upload/master'
//                         move_uploaded_file($fileTmpName, $fileDestination);
//                         header("Location: index.php?uploadsucess");
//                 }else {
//                     echo "Your file is too big!";
//                 }


//             }else {
//                 echo "There was an error uploading your file!"; 
//             }

//     // }
//     // else {
//     //     echo "You cannot upload files of this type!";
//     // }

// }

?>
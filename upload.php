<?php 
if (isset($_POST['submit])){
    $file = $FILES['file'];


    $fileName = $_FILES['file']['name'];
    $fileTmpName = $_FILES['file']['tmp_name'];
    $fileSize = $_FILES['file']['size'];
    $fileError = $_FILES['file']['error'];
    $fileType = $_FILES['file']['type'];


    $fileEXT = explode('.', fileName);
    ]fileActualExt = strtolower(end($fileExt)); 

    $allowed = array('jpg', 'jpeg', 'png', 'pdf', 'csv');
    
    if (in_array($fileActualExt, $allowed)) {
            if ($fileError ===0) {

            }else {
                echo "There was an error uploading your file!"; 
            }

    }else {
        echo "You cannot upload files of this type!";
    }

}

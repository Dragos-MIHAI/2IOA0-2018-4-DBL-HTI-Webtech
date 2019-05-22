<?php
if (isset($_POST['submit])){
    $file = $FILES['file'];


    $fileName = $_FILES['file']['name'];
    $fileTmpName = $_FILES['file']['tmp_name'];
    $fileSize = $_FILES['file']['size'];
    $fileError = $_FILES['file']['error'];
    $fileType = $_FILES['file']['type'];


    $fileEXT = explode('.', fileName);
    $fileActualExt = strtolower(end($fileExt)); 

    $allowed = array('jpg', 'jpeg', 'png', 'pdf', 'csv');
    
    if (in_array($fileActualExt, $allowed)) {
            if ($fileError ===0) {
                if($fileSize < 1000000) {
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $fileDestination = 'https://github.com/Dragos-MIHAI/2IOA0-2018-4-DBL-HTI-Webtech/tree/a861e0e8b1b546cb6eccc64926e27b7cee98b72e/'.$fileNameNew;
                        move_uploaded_file($fileTmpName, $fileDestination);
                        header("Location: index.php?uploadsucess");
                }else {
                    echo "Your file is too big!"
                }


            }else {
                echo "There was an error uploading your file!"; 
            }

    }else {
        echo "You cannot upload files of this type!";
    }

}


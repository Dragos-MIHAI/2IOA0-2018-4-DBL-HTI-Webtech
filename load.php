<?php
        # pentru fiecare fisier incarcat, fac o verificare dupa status code
        if( !empty( $_FILES ) )
        foreach ($_FILES["pictures"]["error"] as $key => $error) {
          if ($error > 0) { # echivalent cu ( $_FILES["pictures"]["error"][$key] > 0 )
            print "Eroare cu fisierul {$_FILES["pictures"]["tmp_name"][$key]}!";
          } else {
            $tmp_name = $_FILES["pictures"]["tmp_name"][$key];
            $name = $_FILES["pictures"]["name"][$key];
            # mut fisierul din locatia temporara in directorul curent (acelasi
            # director in care se afla scriptul PHP)
            move_uploaded_file($tmp_name, "$name");
          }
        }
        ?>
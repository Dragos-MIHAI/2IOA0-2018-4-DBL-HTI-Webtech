<?php
# se verifica daca fisierul incarcat a depasit dimensiunea maxima acceptata
# daca acest lucru se intampla, variabilele $_POST si $_FILES se golesc automat
if( empty( $_POST ) && empty( $_FILES ) ) {
	# a fost facut un POST sau nu?
	if( isset( $_SERVER['CONTENT_LENGTH'] ) ) {
		# atunci cand se trimit date prin post variabila $_SERVER['CONTENT_LENGTH']
		# contine valoarea dimensiunii datelor
		$POST_MAX_SIZE = ini_get('post_max_size');
		if( !empty( $POST_MAX_SIZE ) ) {
			# determin limita maxima (care poate fi in KB, MB sau GB
			$mul = substr($POST_MAX_SIZE, -1);
			$mul = ($mul == 'M' ? 1048576 :(
				$mul == 'K' ? 1024 :($mul == 'G' ? 1073741824 : 1)));
			if ( $_SERVER['CONTENT_LENGTH'] > $mul*(int)$POST_MAX_SIZE && 
			     $POST_MAX_SIZE ) {
				print "Fisier prea mare! Ati depasit limita maxima permisa";
			}
		} else {
			print "Eroare nespecificata (probabil fisierul este prea mare)";
		}
	} else {
		# nu s-a facut inca submit la fisier, afisez un mesaj
		print "Apasati pe 'Trimite fisier' pentru a face upload!";
	}
} else {
	# $_POST si $_FILES sunt setate; verific alte erori ce pot sa apara
	if( $_FILES['fisier']['error'] > 0 ) {
		print "A intervenit o eroare (#{$_FILES['fisier']['error']})";
	} else {
		# fisierul uploadat va fi pus in subfolderul 'upload' (care trebuie sa 
		# existe deja in aceeasi locatie ca si fisierul upload.php
		$uploaddir = dirname( __FILE__ ). DIRECTORY_SEPARATOR . 
					'upload' . DIRECTORY_SEPARATOR;
		$uploadfile = $uploaddir . basename($_FILES['fisier']['name']);
 
		if (move_uploaded_file($_FILES['fisier']['tmp_name'], $uploadfile)) {
			print "Fisier incarcat cu succes!";
		} else {
			print "Nu s-a putut incarca fisierul";
		}
	}
}
?>
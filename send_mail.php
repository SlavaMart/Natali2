<?php
$headers = 'From: Путишествие в Тайланд <tailand_trip_ukraine@ukr.net>' . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=utf-8\n";

$headers2 = 'From: Заявка от клиента <tailand_trip_ukraine@ukr.net>' . "\r\n";
$headers2 .= "MIME-Version: 1.0\r\n";
$headers2 .= "Content-Type: text/html; charset=utf-8\n";
	if(isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email']) && filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL) ){

			$send = mail('takeyourdream1@gmail.com', 'Новая заявка', '<h1 style="text-align: center;">Новая заявка от клиента</h1><p>Имя - '.$_POST['name'].'</p><p>Номер телефона - '.$_POST['phone'].'</p><p>Email - '.$_POST['email'].'</p>', $headers2);
			mail($_POST['email'], 'Заявка принята', '<h1 style="text-align: center;">Ваша заявка принята</h1><p>Мы свяжемся с Вами как можно быстрее </p><p>С уважением </p>', $headers);
			if($send){
				
				echo "ok";
			} else {
				echo "wrong";
			}	

	} else {
		echo "email is not valid";
		
	}

?>
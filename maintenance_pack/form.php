<?php
if ( isset( $_POST[ 'mailto_20154414064435' ] ) ) {
	// Simple trim
	function trimData( $data )
	{
		return trim( strip_tags( $data ) );
	}

	$separator = md5( time() );

	$name    = trimData( $_POST[ 'subscribe_email' ] );
	$to      = "alicelfdev@gmail.com, cibulnicoleg@gmail.com";
	$subject = 'Subscription to bluesite, sended by ' . $name;

	$headers = "MIME-Version: 1.0" . PHP_EOL;
	$headers .= "Content-type: text/html; charset=utf-8; boundary=\"" . $separator . "\"" . PHP_EOL;
	$headers .= "From: " . $name . PHP_EOL;
	$headers .= "Reply-To: " . $name . PHP_EOL;
	$headers .= "Return-Path: " . $name . PHP_EOL;
	$headers .= "\r\n";

	$message = "<!doctype html><html lang='en-US'><head><title>$subject</title></head><body><div id='message-container'><h2>$subject</h2><p>From site: {$_SERVER['SERVER_NAME']}</p><p>email: $name</p></div></body></html>
	";
	mail( $to, $subject, $message, $headers );
	echo "success";
	die;
}

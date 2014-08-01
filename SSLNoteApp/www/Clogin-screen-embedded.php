<? session_start();

session_destroy();


header("Acces-Control-Allow-Origin: *");

//error_reporting(E_ALL);
//ini_set('display_errors', 1);

include 'include/dbopen.php';	

//////////////////////////////////////////////////////////////////////////////////////

// take form input $pid

$ipaddress = $_SERVER['REMOTE_ADDR'];


$loginpid = $_REQUEST["loginpid"];
$_SESSION['loginpid'] = $loginpid;

$id = substr($loginpid, 0, 4);
$_SESSION['id'] = $id;

$gid = substr($loginpid, 0, 2);
$_SESSION['gid'] = $gid;

$pid = substr($loginpid, 2, 2);
$_SESSION['pid'] = $pid;

$passinput = substr($loginpid, 4);
$_SESSION['passinput'] = $passinput;


$sql1=mysql_query("SELECT * FROM `pids` WHERE `gid` = '$gid' AND `pid` = '$pid' AND `random` = '$passinput' AND `settpass` = '1'")or die(mysql_error());

$totalq = mysql_num_rows($sql1);

if ($totalq == "1" ) 
{

	echo "<script>";
    echo "window.location.href= '". $site ."/apps/settpass'";
echo "</script>";
 exit;   
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// compare password
$sql2 = mysql_query("SELECT * FROM `pids` WHERE `gid` = '$gid' AND `pid` = '$pid' ");

$total = mysql_num_rows($sql2);

if ($total == "0" ) {

$_SESSION['msg'] = "<span class='msg'>** User don't exist **</span>";	


		 
		 }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$sql3 = mysql_query("SELECT * FROM `pids` WHERE `gid` = '$gid' AND `pid` = '$pid'");

	while($q3=mysql_fetch_object($sql3)){
		 
		 $pass = $q3 -> pass;
		 $salt = $q3 -> salt;
		 $settpass = $q3 -> settpass;
		 $nick = $q3 -> nick;
		 $active = $q3 -> active;
		 $account_id = $q3 -> account_id;
		 
		 $logins = $q3 -> logins;
		 
		 //// temp
		$_SESSION['pass'] = $pass;
		 $_SESSION['salt'] = $salt;
		 $_SESSION['nick'] = $nick;
		 $_SESSION['active'] = $active;
		$_SESSION['settpass'] = $settpass;
		$_SESSION['account_id'] = $account_id;
		
		$_SESSION['logins'] = $logins;
		
		
		 //// temp
	
    $pass1 = sha1($salt.$pass);
	$_SESSION['pass1'] = $pass1;
	
	$pass2 = sha1($salt.$passinput);
$_SESSION['pass2'] =  $pass2;
	/// temp
	
    // If the password they give maches
//if($pass == sha1($salt.$passinput))

if ( $logins >= "5") {
	
	$_SESSION['msg'] = "<span class='msg'>** BLOCKED **</span>";
	

	
}

/////////////////////////////////////////////////////////////////////////
  
  if (($_SESSION['pass']) == ($_SESSION['pass2'])) 
    {
		 
$_SESSION['passcorrect'] = "YES";

if (($active == "1") && ($settpass == "0")) {
	
	$_SESSION['login'] = "1";
	
	
/// update last active time

mysql_query("UPDATE pids SET `active_last`= (now()+INTERVAL -1 HOUR)  WHERE `gid` = '$gid' AND `pid` = '$pid' ") or die(mysql_error()); 	

//mysql_query("UPDATE pids SET `active_last`= (now()+INTERVAL 7 HOUR)  WHERE `gid` = '$gid' AND `pid` = '$pid' ") or die(mysql_error());
// set login attempts to 0

mysql_query("UPDATE pids SET `logins`= '0'  WHERE `gid` = '$gid' AND `pid` = '$pid' ") or die(mysql_error()); 


//////////////////////////////



}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (($active == "1") && ($settpass == "2")) {
	
	$_SESSION['login'] = "1";
	
	
/// update last active time

mysql_query("UPDATE pids SET `active_last`= (now()+INTERVAL -1 HOUR)  WHERE `gid` = '$gid' AND `pid` = '$pid' ") or die(mysql_error()); 	

//mysql_query("UPDATE pids SET `active_last`= (now()+INTERVAL 7 HOUR)  WHERE `gid` = '$gid' AND `pid` = '$pid' ") or die(mysql_error());
// set login attempts to 0

mysql_query("UPDATE pids SET `logins`= '0'  WHERE `gid` = '$gid' AND `pid` = '$pid' ") or die(mysql_error()); 

}
}

	
 else

{
       $_SESSION['msg'] = "<span class='msg'>** User don't exist **</span>";	
	   $_SESSION['login'] = "0";


// set try
$logins = $logins +1;

$random = substr(md5(time() * rand()),0,10);



mysql_query("UPDATE pids SET `logins`= '$logins'  WHERE `gid` = '$gid' AND `pid` = '$pid' ") or die(mysql_error()); 

if ($logins == "5") {
	
mysql_query("UPDATE pids SET `active`= '2'  WHERE `gid` = '$gid' AND `pid` = '$pid' ") or die(mysql_error()); 
mysql_query("UPDATE pids SET `random`= '$random'  WHERE `gid` = '$gid' AND `pid` = '$pid' ") or die(mysql_error()); 


$_SESSION['msg'] = "<span class='msg'>** BLOCKED **</span>";

}




$_SESSION['logins'] = $logins;
// end set try
		 

    }
///////////////////////////////////////////////
	}
	
mysql_close();	

//$somedata = print_r($_SESSION);



//$somedata = "test";

echo json_encode($_SESSION);
//echo $somedatat;
?>

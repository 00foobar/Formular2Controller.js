<?php
print_r($_POST);
exit();

if ( isset($_POST['action']) && !empty($_POST['action']) && $_POST['action'] == 'do_something' )
{
	// do stuff
	echo json_encode(true);
}
else
{
	echo json_encode(false);
}

?>
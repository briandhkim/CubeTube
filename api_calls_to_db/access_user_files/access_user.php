<?php
require_once('mysql_connect.php');
$LOCAL_ACCESS = true;
$output = [
    'success' => false,
    'errors' => [],
];
if(empty($_POST['action'])){
    $output['errors'][] = 'No action specified';
    print(json_encode($output));
    exit();
}
switch($_POST['action']){
    case 'read':
        include('read_user.php');
        break;
    case 'insert':
        include('insert_user.php');
        break;
    case 'delete':
        include('delete_user.php');
        break;
    case 'update':
        include('update_user.php');
        break;
    default:
        $output['errors'][] = 'invalid action';
}
$json_output = json_encode($output);
print_r($json_output);
?>
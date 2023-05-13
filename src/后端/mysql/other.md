## mysqljs 报错 ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

解决方法： 
  
  - ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; (eg: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';)

  - flush privileges;
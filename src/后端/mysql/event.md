## EVENT
```SQL
CREATE EVENT IF NOT EXISTS `update_data` 
  ON SCHEDULE EVERY 5 SECOND
  DO  
  UPDATE animals SET `number` = `number` + 1 WHERE `number` >=  0;
```
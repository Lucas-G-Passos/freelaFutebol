-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: fut3
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `responsaveis`
--

DROP TABLE IF EXISTS `responsaveis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsaveis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_aluno` int NOT NULL,
  `nome` varchar(255) NOT NULL,
  `rg` varchar(40) NOT NULL,
  `cpf` varchar(40) NOT NULL,
  `grau_parentesco` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rg` (`rg`),
  UNIQUE KEY `cpf` (`cpf`),
  KEY `id_aluno` (`id_aluno`),
  CONSTRAINT `responsaveis_ibfk_1` FOREIGN KEY (`id_aluno`) REFERENCES `alunos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsaveis`
--

LOCK TABLES `responsaveis` WRITE;
/*!40000 ALTER TABLE `responsaveis` DISABLE KEYS */;
INSERT INTO `responsaveis` VALUES (1,1,'José Silva','RESP-RG-100000001','RESP-CPF-10000000001','Pai'),(2,2,'Ana Souza','RESP-RG-100000002','RESP-CPF-10000000002','Mãe'),(3,3,'José Silva','RESP-RG-100000003','RESP-CPF-10000000003','Pai'),(4,4,'Ana Souza','RESP-RG-100000004','RESP-CPF-10000000004','Mãe'),(5,5,'José Silva','RESP-RG-100000005','RESP-CPF-10000000005','Pai'),(6,6,'Ana Souza','RESP-RG-100000006','RESP-CPF-10000000006','Mãe'),(7,7,'José Silva','RESP-RG-100000007','RESP-CPF-10000000007','Pai'),(8,8,'Ana Souza','RESP-RG-100000008','RESP-CPF-10000000008','Mãe'),(9,9,'José Silva','RESP-RG-100000009','RESP-CPF-10000000009','Pai'),(10,10,'Ana Souza','RESP-RG-100000010','RESP-CPF-10000000010','Mãe'),(11,11,'José Silva','RESP-RG-100000011','RESP-CPF-10000000011','Pai'),(12,12,'Ana Souza','RESP-RG-100000012','RESP-CPF-10000000012','Mãe'),(13,13,'José Silva','RESP-RG-100000013','RESP-CPF-10000000013','Pai'),(14,14,'Ana Souza','RESP-RG-100000014','RESP-CPF-10000000014','Mãe'),(15,15,'José Silva','RESP-RG-100000015','RESP-CPF-10000000015','Pai'),(16,16,'Ana Souza','RESP-RG-100000016','RESP-CPF-10000000016','Mãe'),(17,17,'José Silva','RESP-RG-100000017','RESP-CPF-10000000017','Pai'),(18,18,'Ana Souza','RESP-RG-100000018','RESP-CPF-10000000018','Mãe'),(19,19,'José Silva','RESP-RG-100000019','RESP-CPF-10000000019','Pai'),(20,20,'Ana Souza','RESP-RG-100000020','RESP-CPF-10000000020','Mãe'),(21,21,'José Silva','RESP-RG-100000021','RESP-CPF-10000000021','Pai'),(22,22,'Ana Souza','RESP-RG-100000022','RESP-CPF-10000000022','Mãe'),(23,23,'José Silva','RESP-RG-100000023','RESP-CPF-10000000023','Pai'),(24,24,'Ana Souza','RESP-RG-100000024','RESP-CPF-10000000024','Mãe'),(25,25,'José Silva','RESP-RG-100000025','RESP-CPF-10000000025','Pai'),(26,26,'Ana Souza','RESP-RG-100000026','RESP-CPF-10000000026','Mãe'),(27,27,'José Silva','RESP-RG-100000027','RESP-CPF-10000000027','Pai'),(28,28,'Ana Souza','RESP-RG-100000028','RESP-CPF-10000000028','Mãe'),(29,29,'José Silva','RESP-RG-100000029','RESP-CPF-10000000029','Pai'),(30,30,'Ana Souza','RESP-RG-100000030','RESP-CPF-10000000030','Mãe'),(31,31,'José Silva','RESP-RG-100000031','RESP-CPF-10000000031','Pai'),(32,32,'Ana Souza','RESP-RG-100000032','RESP-CPF-10000000032','Mãe'),(33,33,'José Silva','RESP-RG-100000033','RESP-CPF-10000000033','Pai'),(34,34,'Ana Souza','RESP-RG-100000034','RESP-CPF-10000000034','Mãe'),(35,35,'José Silva','RESP-RG-100000035','RESP-CPF-10000000035','Pai'),(36,36,'Ana Souza','RESP-RG-100000036','RESP-CPF-10000000036','Mãe'),(37,37,'José Silva','RESP-RG-100000037','RESP-CPF-10000000037','Pai'),(38,38,'Ana Souza','RESP-RG-100000038','RESP-CPF-10000000038','Mãe'),(39,39,'José Silva','RESP-RG-100000039','RESP-CPF-10000000039','Pai'),(40,40,'Ana Souza','RESP-RG-100000040','RESP-CPF-10000000040','Mãe'),(41,41,'José Silva','RESP-RG-100000041','RESP-CPF-10000000041','Pai'),(42,42,'Ana Souza','RESP-RG-100000042','RESP-CPF-10000000042','Mãe'),(43,43,'José Silva','RESP-RG-100000043','RESP-CPF-10000000043','Pai'),(44,44,'Ana Souza','RESP-RG-100000044','RESP-CPF-10000000044','Mãe'),(45,45,'José Silva','RESP-RG-100000045','RESP-CPF-10000000045','Pai'),(46,46,'Ana Souza','RESP-RG-100000046','RESP-CPF-10000000046','Mãe'),(47,47,'José Silva','RESP-RG-100000047','RESP-CPF-10000000047','Pai'),(48,48,'Ana Souza','RESP-RG-100000048','RESP-CPF-10000000048','Mãe'),(49,49,'José Silva','RESP-RG-100000049','RESP-CPF-10000000049','Pai'),(50,50,'Ana Souza','RESP-RG-100000050','RESP-CPF-10000000050','Mãe'),(51,51,'José Silva','RESP-RG-100000051','RESP-CPF-10000000051','Pai'),(52,52,'Ana Souza','RESP-RG-100000052','RESP-CPF-10000000052','Mãe'),(53,53,'José Silva','RESP-RG-100000053','RESP-CPF-10000000053','Pai'),(54,54,'Ana Souza','RESP-RG-100000054','RESP-CPF-10000000054','Mãe'),(55,55,'José Silva','RESP-RG-100000055','RESP-CPF-10000000055','Pai'),(56,56,'Ana Souza','RESP-RG-100000056','RESP-CPF-10000000056','Mãe'),(57,57,'José Silva','RESP-RG-100000057','RESP-CPF-10000000057','Pai'),(58,58,'Ana Souza','RESP-RG-100000058','RESP-CPF-10000000058','Mãe'),(59,59,'José Silva','RESP-RG-100000059','RESP-CPF-10000000059','Pai'),(60,60,'Ana Souza','RESP-RG-100000060','RESP-CPF-10000000060','Mãe'),(61,61,'José Silva','RESP-RG-100000061','RESP-CPF-10000000061','Pai'),(62,62,'Ana Souza','RESP-RG-100000062','RESP-CPF-10000000062','Mãe'),(63,63,'José Silva','RESP-RG-100000063','RESP-CPF-10000000063','Pai'),(64,64,'Ana Souza','RESP-RG-100000064','RESP-CPF-10000000064','Mãe'),(65,65,'José Silva','RESP-RG-100000065','RESP-CPF-10000000065','Pai'),(66,66,'Ana Souza','RESP-RG-100000066','RESP-CPF-10000000066','Mãe'),(67,67,'José Silva','RESP-RG-100000067','RESP-CPF-10000000067','Pai'),(68,68,'Ana Souza','RESP-RG-100000068','RESP-CPF-10000000068','Mãe'),(69,69,'José Silva','RESP-RG-100000069','RESP-CPF-10000000069','Pai'),(70,70,'Ana Souza','RESP-RG-100000070','RESP-CPF-10000000070','Mãe'),(71,71,'José Silva','RESP-RG-100000071','RESP-CPF-10000000071','Pai'),(72,72,'Ana Souza','RESP-RG-100000072','RESP-CPF-10000000072','Mãe'),(73,73,'José Silva','RESP-RG-100000073','RESP-CPF-10000000073','Pai'),(74,74,'Ana Souza','RESP-RG-100000074','RESP-CPF-10000000074','Mãe'),(75,75,'José Silva','RESP-RG-100000075','RESP-CPF-10000000075','Pai'),(76,76,'Ana Souza','RESP-RG-100000076','RESP-CPF-10000000076','Mãe'),(77,77,'José Silva','RESP-RG-100000077','RESP-CPF-10000000077','Pai'),(78,78,'Ana Souza','RESP-RG-100000078','RESP-CPF-10000000078','Mãe'),(79,79,'José Silva','RESP-RG-100000079','RESP-CPF-10000000079','Pai'),(80,80,'Ana Souza','RESP-RG-100000080','RESP-CPF-10000000080','Mãe'),(81,81,'José Silva','RESP-RG-100000081','RESP-CPF-10000000081','Pai'),(82,82,'Ana Souza','RESP-RG-100000082','RESP-CPF-10000000082','Mãe'),(83,83,'José Silva','RESP-RG-100000083','RESP-CPF-10000000083','Pai'),(84,84,'Ana Souza','RESP-RG-100000084','RESP-CPF-10000000084','Mãe'),(85,85,'José Silva','RESP-RG-100000085','RESP-CPF-10000000085','Pai'),(86,86,'Ana Souza','RESP-RG-100000086','RESP-CPF-10000000086','Mãe'),(87,87,'José Silva','RESP-RG-100000087','RESP-CPF-10000000087','Pai'),(88,88,'Ana Souza','RESP-RG-100000088','RESP-CPF-10000000088','Mãe'),(89,89,'José Silva','RESP-RG-100000089','RESP-CPF-10000000089','Pai'),(90,90,'Ana Souza','RESP-RG-100000090','RESP-CPF-10000000090','Mãe'),(91,91,'José Silva','RESP-RG-100000091','RESP-CPF-10000000091','Pai'),(92,92,'Ana Souza','RESP-RG-100000092','RESP-CPF-10000000092','Mãe'),(93,93,'José Silva','RESP-RG-100000093','RESP-CPF-10000000093','Pai'),(94,94,'Ana Souza','RESP-RG-100000094','RESP-CPF-10000000094','Mãe'),(95,95,'José Silva','RESP-RG-100000095','RESP-CPF-10000000095','Pai'),(96,96,'Ana Souza','RESP-RG-100000096','RESP-CPF-10000000096','Mãe'),(97,97,'José Silva','RESP-RG-100000097','RESP-CPF-10000000097','Pai'),(98,98,'Ana Souza','RESP-RG-100000098','RESP-CPF-10000000098','Mãe'),(99,99,'José Silva','RESP-RG-100000099','RESP-CPF-10000000099','Pai'),(100,100,'Ana Souza','RESP-RG-100000100','RESP-CPF-10000000100','Mãe'),(101,102,'Nisi aut rerum sit t','Do nobis est quisqua','Voluptas tenetur rep','Sed irure consequunt'),(102,106,'Cupiditate do dolor ','Veniam anim et corr','Mollitia nemo veniam','Nihil hic inventore '),(103,107,'Nulla nesciunt omni','Sit explicabo Magna','Illum animi animi','Enim sint neque sap'),(104,108,'Mollitia qui est qu','Sed in enim reprehen','Fugiat veniam conse','Iusto irure sed dict'),(105,109,'Modi ea ducimus est','Perspiciatis et seq','Qui voluptatem Prae','Quis irure eum natus'),(106,110,'BIG POO','345345','345345','Tio'),(107,111,'Aliqua Odio totam m','45.345.345-3','534.543.534-53','Sunt fugiat volupta'),(108,112,'BLINGUS','32.423.423-4','234.234.234-23','pai'),(109,117,'Tempore temporibus ','34.534.534-5','345.345.345-34','Sit accusamus verita'),(110,118,'Rerum voluptatum exp','34.353.453-4','345.353.534-53','Deleniti aut iure vo');
/*!40000 ALTER TABLE `responsaveis` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-22 18:05:58

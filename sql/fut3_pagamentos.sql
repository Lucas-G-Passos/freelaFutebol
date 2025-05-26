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
-- Table structure for table `pagamentos`
--

DROP TABLE IF EXISTS `pagamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data_vencimento` date NOT NULL,
  `data_pagamento` date DEFAULT NULL,
  `valor_mensalidade` decimal(10,2) NOT NULL,
  `valor_uniforme` decimal(10,2) NOT NULL,
  `status` enum('pago','pendente','atrasado') DEFAULT 'pendente',
  `juros` decimal(10,2) DEFAULT '0.00',
  `responsavel_id` int NOT NULL,
  `tipo` enum('Dinheiro','Pix','Crédito','Débito') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `responsavel_id` (`responsavel_id`),
  CONSTRAINT `pagamentos_ibfk_1` FOREIGN KEY (`responsavel_id`) REFERENCES `responsaveis` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamentos`
--

LOCK TABLES `pagamentos` WRITE;
/*!40000 ALTER TABLE `pagamentos` DISABLE KEYS */;
INSERT INTO `pagamentos` VALUES (1,'2005-01-28',NULL,54.00,45.00,'pendente',0.00,105,'Dinheiro'),(2,'2025-05-16',NULL,50.00,50.00,'pendente',0.00,106,'Dinheiro'),(3,'2000-09-04',NULL,56.00,33.00,'pendente',0.00,107,'Dinheiro'),(4,'2025-04-26',NULL,234.00,234.00,'pendente',0.00,108,'Dinheiro'),(5,'1997-05-14',NULL,5.00,59.00,'pendente',0.00,109,'Dinheiro');
/*!40000 ALTER TABLE `pagamentos` ENABLE KEYS */;
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

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
-- Table structure for table `turmas`
--

DROP TABLE IF EXISTS `turmas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turmas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_filial` int NOT NULL,
  `codigo_turma` varchar(20) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text,
  `dias_semana` set('Seg','Ter','Qua','Qui','Sex','Sáb','Dom') DEFAULT NULL,
  `hora_inicio` time NOT NULL,
  `hora_termino` time NOT NULL,
  `sala` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_turma` (`codigo_turma`),
  KEY `id_filial` (`id_filial`),
  CONSTRAINT `turmas_ibfk_1` FOREIGN KEY (`id_filial`) REFERENCES `filial` (`id`),
  CONSTRAINT `chk_horario_valido` CHECK ((`hora_termino` > `hora_inicio`))
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turmas`
--

LOCK TABLES `turmas` WRITE;
/*!40000 ALTER TABLE `turmas` DISABLE KEYS */;
INSERT INTO `turmas` VALUES (1,1,'TN-M1','Manhã Infantil',NULL,'Seg,Qua','08:00:00','10:00:00',NULL),(2,1,'TN-T1','Tarde Teens',NULL,'Ter,Qui','14:00:00','16:00:00',NULL),(3,1,'TN-N1','Noite Adultos',NULL,'Sex','18:00:00','20:00:00',NULL),(4,1,'TN-K1','Kids Integral',NULL,'Seg,Ter,Qua','09:00:00','11:00:00',NULL),(5,1,'TN-A1','Avançado',NULL,'Qui,Sex','16:00:00','18:00:00',NULL),(6,1,'TN-I1','Iniciantes',NULL,'Seg,Qua,Sex','07:00:00','09:00:00',NULL),(7,1,'TN-V1','VIP',NULL,'Dom','10:00:00','12:00:00',NULL),(8,1,'TN-F1','Funcional',NULL,'Ter,Qui,Sáb','06:00:00','08:00:00',NULL),(9,1,'TN-E1','Expresso',NULL,'Seg,Qui','12:00:00','14:00:00',NULL),(10,1,'TN-P1','Profissional',NULL,'Sex,Sáb','19:00:00','21:00:00',NULL),(11,2,'TS-M2','Manhã Infantil',NULL,'Seg,Qua','08:00:00','10:00:00',NULL),(12,2,'TS-T2','Tarde Teens',NULL,'Ter,Qui','14:00:00','16:00:00',NULL),(13,2,'TS-N2','Noite Adultos',NULL,'Sex','18:00:00','20:00:00',NULL),(14,2,'TS-K2','Kids Integral',NULL,'Seg,Ter,Qua','09:00:00','11:00:00',NULL),(15,2,'TS-A2','Avançado',NULL,'Qui,Sex','16:00:00','18:00:00',NULL),(16,2,'TS-I2','Iniciantes',NULL,'Seg,Qua,Sex','07:00:00','09:00:00',NULL),(17,2,'TS-V2','VIP',NULL,'Dom','10:00:00','12:00:00',NULL),(18,2,'TS-F2','Funcional',NULL,'Ter,Qui,Sáb','06:00:00','08:00:00',NULL),(19,2,'TS-E2','Expresso',NULL,'Seg,Qui','12:00:00','14:00:00',NULL),(20,2,'TS-P2','Profissional',NULL,'Sex,Sáb','19:00:00','21:00:00',NULL),(21,3,'TL-M3','Manhã Infantil',NULL,'Seg,Qua','08:00:00','10:00:00',NULL),(22,3,'TL-T3','Tarde Teens',NULL,'Ter,Qui','14:00:00','16:00:00',NULL),(23,3,'TL-N3','Noite Adultos',NULL,'Sex','18:00:00','20:00:00',NULL),(24,3,'TL-K3','Kids Integral',NULL,'Seg,Ter,Qua','09:00:00','11:00:00',NULL),(25,3,'TL-A3','Avançado',NULL,'Qui,Sex','16:00:00','18:00:00',NULL),(26,3,'TL-I3','Iniciantes',NULL,'Seg,Qua,Sex','07:00:00','09:00:00',NULL),(27,3,'TL-V3','VIP',NULL,'Dom','10:00:00','12:00:00',NULL),(28,3,'TL-F3','Funcional',NULL,'Ter,Qui,Sáb','06:00:00','08:00:00',NULL),(29,3,'TL-E3','Expresso',NULL,'Seg,Qui','12:00:00','14:00:00',NULL),(30,3,'TL-P3','Profissional',NULL,'Sex,Sáb','19:00:00','21:00:00',NULL);
/*!40000 ALTER TABLE `turmas` ENABLE KEYS */;
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

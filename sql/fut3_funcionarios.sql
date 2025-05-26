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
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_filial` int NOT NULL,
  `id_endereco` int NOT NULL,
  `nome_completo` varchar(255) NOT NULL,
  `data_nascimento` date NOT NULL,
  `telefone1` varchar(20) DEFAULT NULL,
  `telefone2` varchar(20) DEFAULT NULL,
  `cargo` varchar(100) NOT NULL,
  `rg` varchar(20) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `data_admissao` date NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `jornada_escala` varchar(100) DEFAULT NULL,
  `situacao` enum('ativo','inativo') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rg` (`rg`),
  UNIQUE KEY `cpf` (`cpf`),
  KEY `id_filial` (`id_filial`),
  KEY `id_endereco` (`id_endereco`),
  CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`id_filial`) REFERENCES `filial` (`id`),
  CONSTRAINT `funcionarios_ibfk_2` FOREIGN KEY (`id_endereco`) REFERENCES `endereco` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (1,1,153,'Carlos Silva','1985-03-15','(11) 99999-0001','(11) 88888-0001','Professor','RG-000153','111.222.333-01','2020-01-01','foto.jpg','Seg-Sex','ativo'),(2,2,154,'Ana Souza','1990-07-22','(21) 99999-0002','(21) 88888-0002','Recepcionista','RG-000154','111.222.333-02','2020-02-01','foto.jpg','Seg-Sex','ativo'),(3,3,155,'Pedro Costa','1988-11-05','(31) 99999-0003','(31) 88888-0003','Coordenador','RG-000155','111.222.333-03','2020-03-01','foto.jpg','Seg-Sex','ativo'),(4,1,156,'Mariana Oliveira','1992-04-30','(11) 99999-0004','(11) 88888-0004','Instrutor','RG-000156','111.222.333-04','2020-04-01','foto.jpg','Seg-Sex','ativo'),(5,2,157,'Lucas Pereira','1987-09-12','(21) 99999-0005','(21) 88888-0005','Gerente','RG-000157','111.222.333-05','2020-05-01','foto.jpg','Seg-Sex','ativo'),(6,3,158,'Juliana Santos','1995-01-25','(31) 99999-0006','(31) 88888-0006','Assistente','RG-000158','111.222.333-06','2020-06-01','foto.jpg','Seg-Sex','ativo'),(7,1,159,'Fernando Alves','1984-06-18','(11) 99999-0007','(11) 88888-0007','Professor','RG-000159','111.222.333-07','2020-07-01','foto.jpg','Seg-Sex','ativo'),(8,2,160,'Patrícia Lima','1993-12-08','(21) 99999-0008','(21) 88888-0008','Recepcionista','RG-000160','111.222.333-08','2020-08-01','foto.jpg','Seg-Sex','ativo'),(9,3,161,'Ricardo Rocha','1986-08-14','(31) 99999-0009','(31) 88888-0009','Coordenador','RG-000161','111.222.333-09','2020-09-01','foto.jpg','Seg-Sex','ativo'),(10,1,162,'Camila Martins','1991-05-09','(11) 99999-0010','(11) 88888-0010','Instrutor','RG-000162','111.222.333-10','2020-10-01','foto.jpg','Seg-Sex','ativo'),(11,2,163,'Gustavo Henrique','1989-02-20','(21) 99999-0011','(21) 88888-0011','Gerente','RG-000163','111.222.333-11','2020-11-01','foto.jpg','Seg-Sex','ativo'),(12,3,164,'Isabela Ferreira','1994-10-11','(31) 99999-0012','(31) 88888-0012','Assistente','RG-000164','111.222.333-12','2020-12-01','foto.jpg','Seg-Sex','ativo'),(13,1,165,'Roberto Campos','1983-03-03','(11) 99999-0013','(11) 88888-0013','Professor','RG-000165','111.222.333-13','2021-01-01','foto.jpg','Seg-Sex','ativo'),(14,2,166,'Tatiane Ribeiro','1996-07-17','(21) 99999-0014','(21) 88888-0014','Recepcionista','RG-000166','111.222.333-14','2021-02-01','foto.jpg','Seg-Sex','ativo'),(15,3,167,'Marcos Vinicius','1982-09-28','(31) 99999-0015','(31) 88888-0015','Coordenador','RG-000167','111.222.333-15','2021-03-01','foto.jpg','Seg-Sex','ativo'),(16,1,168,'Larissa Castro','1997-04-05','(11) 99999-0016','(11) 88888-0016','Instrutor','RG-000168','111.222.333-16','2021-04-01','foto.jpg','Seg-Sex','ativo'),(17,2,169,'Diego Souza','1981-11-19','(21) 99999-0017','(21) 88888-0017','Gerente','RG-000169','111.222.333-17','2021-05-01','foto.jpg','Seg-Sex','ativo'),(18,3,170,'Vanessa Oliveira','1998-08-22','(31) 99999-0018','(31) 88888-0018','Assistente','RG-000170','111.222.333-18','2021-06-01','foto.jpg','Seg-Sex','ativo'),(19,1,171,'Rodrigo Santos','1980-12-30','(11) 99999-0019','(11) 88888-0019','Professor','RG-000171','111.222.333-19','2021-07-01','foto.jpg','Seg-Sex','ativo'),(20,2,172,'Aline Costa','1999-01-14','(21) 99999-0020','(21) 88888-0020','Recepcionista','RG-000172','111.222.333-20','2021-08-01','foto.jpg','Seg-Sex','ativo'),(21,3,173,'Felipe Pereira','1979-06-07','(31) 99999-0021','(31) 88888-0021','Coordenador','RG-000173','111.222.333-21','2021-09-01','foto.jpg','Seg-Sex','ativo'),(22,1,174,'Carolina Dias','2000-05-10','(11) 99999-0022','(11) 88888-0022','Instrutor','RG-000174','111.222.333-22','2021-10-01','foto.jpg','Seg-Sex','ativo'),(23,2,175,'Thiago Almeida','1978-02-23','(21) 99999-0023','(21) 88888-0023','Gerente','RG-000175','111.222.333-23','2021-11-01','foto.jpg','Seg-Sex','ativo'),(24,3,176,'Bianca Lima','2001-03-16','(31) 99999-0024','(31) 88888-0024','Assistente','RG-000176','111.222.333-24','2021-12-01','foto.jpg','Seg-Sex','ativo'),(25,1,177,'Eduardo Rocha','1977-10-09','(11) 99999-0025','(11) 88888-0025','Professor','RG-000177','111.222.333-25','2022-01-01','foto.jpg','Seg-Sex','ativo'),(26,2,178,'Daniela Martins','2002-07-02','(21) 99999-0026','(21) 88888-0026','Recepcionista','RG-000178','111.222.333-26','2022-02-01','foto.jpg','Seg-Sex','ativo'),(27,3,179,'Leonardo Ferreira','1976-04-15','(31) 99999-0027','(31) 88888-0027','Coordenador','RG-000179','111.222.333-27','2022-03-01','foto.jpg','Seg-Sex','ativo'),(28,1,180,'Amanda Castro','2003-09-28','(11) 99999-0028','(11) 88888-0028','Instrutor','RG-000180','111.222.333-28','2022-04-01','foto.jpg','Seg-Sex','ativo'),(29,2,181,'Bruno Henrique','1975-12-11','(21) 99999-0029','(21) 88888-0029','Gerente','RG-000181','111.222.333-29','2022-05-01','foto.jpg','Seg-Sex','ativo'),(30,3,182,'Laura Ribeiro','2004-11-24','(31) 99999-0030','(31) 88888-0030','Assistente','RG-000182','111.222.333-30','2022-06-01','foto.jpg','Seg-Sex','ativo'),(31,1,183,'Gabriel Souza','1974-08-17','(11) 99999-0031','(11) 88888-0031','Professor','RG-000183','111.222.333-31','2022-07-01','foto.jpg','Seg-Sex','ativo'),(32,2,184,'Fernanda Costa','2005-06-09','(21) 99999-0032','(21) 88888-0032','Recepcionista','RG-000184','111.222.333-32','2022-08-01','foto.jpg','Seg-Sex','ativo'),(33,3,185,'Marcelo Oliveira','1973-05-02','(31) 99999-0033','(31) 88888-0033','Coordenador','RG-000185','111.222.333-33','2022-09-01','foto.jpg','Seg-Sex','ativo');
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
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

-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: fut3
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `alunos`
--

DROP TABLE IF EXISTS `alunos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_endereco` int NOT NULL,
  `id_turma` int NOT NULL,
  `nome_completo` varchar(255) NOT NULL,
  `data_nascimento` date NOT NULL,
  `data_matricula` date NOT NULL,
  `telefone1` varchar(20) NOT NULL,
  `telefone2` varchar(20) DEFAULT NULL,
  `foto` varchar(255) NOT NULL,
  `rg` varchar(20) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `convenio` varchar(255) DEFAULT NULL,
  `alergia` varchar(255) DEFAULT NULL,
  `uso_medicamento` varchar(255) DEFAULT NULL,
  `medicamento_horario` time DEFAULT NULL,
  `atestado_medico` enum('S','N') NOT NULL,
  `colegio` varchar(255) DEFAULT NULL,
  `colegio_ano` char(1) DEFAULT NULL,
  `time_coracao` varchar(100) DEFAULT NULL,
  `indicacao` text,
  `observacao` text,
  `id_responsavel` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rg` (`rg`),
  UNIQUE KEY `cpf` (`cpf`),
  KEY `id_endereco` (`id_endereco`),
  KEY `id_turma` (`id_turma`),
  KEY `fk_aluno_responsavel` (`id_responsavel`),
  CONSTRAINT `alunos_ibfk_1` FOREIGN KEY (`id_endereco`) REFERENCES `endereco` (`id`),
  CONSTRAINT `alunos_ibfk_2` FOREIGN KEY (`id_turma`) REFERENCES `turmas` (`id`),
  CONSTRAINT `fk_aluno_responsavel` FOREIGN KEY (`id_responsavel`) REFERENCES `responsaveis` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos`
--

LOCK TABLES `alunos` WRITE;
/*!40000 ALTER TABLE `alunos` DISABLE KEYS */;
INSERT INTO `alunos` VALUES (1,1,1,'João Silva','2010-05-15','2025-04-02','(11) 9999-8888',NULL,'joao.jpg','44.444.444-4','111.222.333-44',NULL,NULL,NULL,NULL,'S',NULL,NULL,NULL,NULL,NULL,NULL),(2,1,3,'Lucas Pereira','2013-02-14','2024-01-15','119999901',NULL,'lucas.jpg','RG201','CPF201',NULL,NULL,NULL,NULL,'S','Colégio Fênix','6','São Paulo FC',NULL,NULL,NULL),(3,1,4,'Lucas Moreira','2014-06-22','2024-01-18','119999902',NULL,'lucas2.jpg','RG202','CPF202',NULL,NULL,NULL,NULL,'S','Colégio Prisma','5','Palmeiras',NULL,NULL,NULL),(4,1,5,'Julia Fernandes','2012-09-10','2024-01-20','119999903',NULL,'julia.jpg','RG203','CPF203',NULL,NULL,NULL,NULL,'S','Colégio Monteiro','7','Flamengo',NULL,NULL,NULL),(5,1,6,'Julia Gomes','2011-03-30','2024-01-22','119999904',NULL,'julia2.jpg','RG204','CPF204',NULL,NULL,NULL,NULL,'S','Colégio Monteiro','8','Corinthians',NULL,NULL,NULL),(6,1,7,'Pedro Costa','2015-12-25','2024-01-25','119999905',NULL,'pedro.jpg','RG205','CPF205',NULL,NULL,NULL,NULL,'S','Colégio Dom Bosco','3','Vasco',NULL,NULL,NULL),(7,1,8,'Pedro Martins','2014-05-19','2024-01-26','119999906',NULL,'pedro2.jpg','RG206','CPF206',NULL,NULL,NULL,NULL,'S','Colégio Dom Bosco','4','Fluminense',NULL,NULL,NULL),(8,1,9,'Ana Souza','2013-08-08','2024-01-28','119999907',NULL,'ana.jpg','RG207','CPF207',NULL,NULL,NULL,NULL,'S','Colégio Vivace','6','Botafogo',NULL,NULL,NULL),(9,1,10,'Ana Barros','2012-10-15','2024-01-30','119999908',NULL,'ana2.jpg','RG208','CPF208',NULL,NULL,NULL,NULL,'S','Colégio Vivace','7','Grêmio',NULL,NULL,NULL),(10,1,11,'Rafael Lima','2013-11-05','2024-02-01','119999909',NULL,'rafael.jpg','RG209','CPF209',NULL,NULL,NULL,NULL,'S','Colégio Castro','6','Inter',NULL,NULL,NULL),(11,1,12,'Rafael Nunes','2014-01-12','2024-02-03','119999910',NULL,'rafael2.jpg','RG210','CPF210',NULL,NULL,NULL,NULL,'S','Colégio Castro','5','Santos',NULL,NULL,NULL),(13,3,1,'Teste Aluno','2010-05-15','2024-04-04','11999999999','11988888888','link-da-foto.jpg','12345678','123.456.789-00','Nenhum','Nenhuma','Não','00:00:00','S','Escola Exemplo','8','Flamengo','Amigo','Nenhuma',1);
/*!40000 ALTER TABLE `alunos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endereco` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cep` varchar(10) NOT NULL,
  `cidade` varchar(255) NOT NULL,
  `estado` char(2) NOT NULL,
  `numero` char(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
INSERT INTO `endereco` VALUES (1,'01311-100','São Paulo','SP','100'),(2,'12345-678','São Paulo','SP','100'),(3,'98765-432','Rio de Janeiro','RJ','200');
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filial`
--

DROP TABLE IF EXISTS `filial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filial` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `id_endereco` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_endereco` (`id_endereco`),
  CONSTRAINT `filial_ibfk_1` FOREIGN KEY (`id_endereco`) REFERENCES `endereco` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filial`
--

LOCK TABLES `filial` WRITE;
/*!40000 ALTER TABLE `filial` DISABLE KEYS */;
INSERT INTO `filial` VALUES (1,'FUT3 Paulista',1),(2,'Filial Centro',1),(3,'Filial Zona Sul',2);
/*!40000 ALTER TABLE `filial` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`),
  KEY `responsavel_id` (`responsavel_id`),
  CONSTRAINT `pagamentos_ibfk_1` FOREIGN KEY (`responsavel_id`) REFERENCES `responsaveis` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamentos`
--

LOCK TABLES `pagamentos` WRITE;
/*!40000 ALTER TABLE `pagamentos` DISABLE KEYS */;
INSERT INTO `pagamentos` VALUES (1,'2024-03-25',NULL,250.00,150.00,'pendente',0.00,1);
/*!40000 ALTER TABLE `pagamentos` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsaveis`
--

LOCK TABLES `responsaveis` WRITE;
/*!40000 ALTER TABLE `responsaveis` DISABLE KEYS */;
INSERT INTO `responsaveis` VALUES (1,1,'Maria Silva','55.555.555-5','999.888.777-66','Mãe');
/*!40000 ALTER TABLE `responsaveis` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turmas`
--

LOCK TABLES `turmas` WRITE;
/*!40000 ALTER TABLE `turmas` DISABLE KEYS */;
INSERT INTO `turmas` VALUES (1,1,'TURMA-A','Sub-15',NULL,'Seg,Qua,Sex','15:00:00','16:30:00','Quadra 1'),(2,1,'TURMA001','Turma A','Turma para iniciantes','Seg,Qua,Sex','08:00:00','10:00:00','Sala 1'),(3,2,'TURMA002','Turma B','Turma avançada','Ter,Qui','10:00:00','12:00:00','Sala 2'),(4,1,'TURMA03','Basquete Iniciante','Aulas para iniciantes','Seg,Qua,Sex','08:00:00','09:30:00','Sala 3'),(5,1,'TURMA04','Futebol Sub-12','Treinamento infantil','Ter,Qui','09:00:00','10:30:00','Campo A'),(6,1,'TURMA05','Ginástica Artística','Turma feminina','Seg,Qua','10:00:00','11:30:00','Ginásio'),(7,1,'TURMA06','Judô Avançado','Aulas faixa marrom e preta','Ter,Qui,Sáb','15:00:00','16:30:00','Dojo'),(8,1,'TURMA07','Vôlei Juvenil','Misto, de 12 a 15 anos','Seg,Qua,Sex','14:00:00','15:30:00','Quadra 1'),(9,1,'TURMA08','Capoeira Mirim','Para crianças de até 10 anos','Seg,Sex','17:00:00','18:00:00','Sala de música'),(10,1,'TURMA09','Basquete Feminino','Aulas para meninas','Qua,Sex','08:00:00','09:30:00','Sala 2'),(11,1,'TURMA10','Natação Infantil','Crianças iniciantes','Ter,Qui','10:00:00','11:00:00','Piscina A'),(12,1,'TURMA11','Tênis Intermediário','Turma mista','Qua,Sáb','16:00:00','17:30:00','Quadra Tênis'),(13,1,'TURMA12','Futsal Sub-10','Treinamento básico','Seg,Qua','13:00:00','14:30:00','Quadra 2');
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

-- Dump completed on 2025-04-06 20:34:14

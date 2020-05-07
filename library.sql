-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2020 at 12:25 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `name` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `type` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `isbn` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `borrowed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `name`, `type`, `isbn`, `borrowed`) VALUES
(1, 'El coronel no tiene quien le escriba', 'Historia', '131345811315', 0),
(3, 'The Hunger Games (The Hunger Games, #1)', 'Historia', '1314545415', 0),
(13, 'El retrado de Dorain Gray', 'Novela', '125458453', 0),
(14, 'Matematicas Operativas', 'Ciencia y calculo', '5456445', 0),
(18, 'Probando desde el formulario', 'Test', '55555', 1);

-- --------------------------------------------------------

--
-- Table structure for table `lends`
--

CREATE TABLE `lends` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_book` int(11) NOT NULL,
  `init_date` datetime NOT NULL DEFAULT current_timestamp(),
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Dumping data for table `lends`
--

INSERT INTO `lends` (`id`, `id_user`, `id_book`, `init_date`, `end_date`) VALUES
(7, 1, 18, '2020-04-02 00:00:00', '2020-04-15'),
(9, 1, 18, '2020-04-02 00:00:00', '2020-04-15');

--
-- Triggers `lends`
--
DELIMITER $$
CREATE TRIGGER `lend insert` AFTER INSERT ON `lends` FOR EACH ROW UPDATE book SET book.borrowed = 1 WHERE book.id = NEW.id_book
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(45) COLLATE latin1_spanish_ci DEFAULT NULL,
  `last_name` varchar(45) COLLATE latin1_spanish_ci DEFAULT NULL,
  `doc` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `last_name`, `doc`) VALUES
(1, 'Jose Manuel', 'Echeverri Palacio', 1022036395);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `lends`
--
ALTER TABLE `lends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_book` (`id_book`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `lends`
--
ALTER TABLE `lends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `lends`
--
ALTER TABLE `lends`
  ADD CONSTRAINT `lends_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `lends_ibfk_2` FOREIGN KEY (`id_book`) REFERENCES `book` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

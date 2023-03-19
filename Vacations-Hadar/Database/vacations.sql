-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 03, 2022 at 09:31 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`userId`, `vacationId`) VALUES
(6, 2),
(6, 13),
(7, 13),
(7, 3),
(8, 1),
(8, 3),
(10, 1),
(10, 13),
(10, 2),
(11, 13),
(11, 1),
(11, 2),
(14, 2),
(17, 24),
(17, 1),
(17, 13),
(17, 31),
(17, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `role`) VALUES
(6, 'Morya', 'Siani', 'Morya123', 'f12f695bf6476bfac9b3d38536f4d688c15769f9f5d5a887f8', '1'),
(7, 'Eliav', 'Shrabi', 'Eliav123', '6912b8b8db94e00e9d95288e8f46793105b39117cd1d6841c1', '1'),
(8, 'Yahel', 'Nov', 'Yahel123', '68999ef0cb3bccb9bb68330e8e5e22774641ce7a16027e2f40', '1'),
(10, 'Ron', 'Haim', 'Ron123', 'acb39c7863b9b34e56b84f5ae4d0f7a7fa34d901ecb2be4f97', '1'),
(11, 'Eyal', 'Menashe', 'Eyal123', '1a03c09a53df046d234ce4540033ce8328d07941c016059ee9', '1'),
(12, 'Shira', 'Ron', 'Shira123', '99b4df018b1816dc11cd02df03e671d9bd6f782a298061cd09', '1'),
(13, 'Eden', 'Golan', 'Eden123', '267cf27dd34ab6072199129c7051cfd7b7b606f58dde6ae4f4', '1'),
(14, 'Adi', 'Sharon', 'Adi123', 'b4cf09c0cdffbb27361ee87a02acdb1221d6a6a63190d7146d', '1'),
(15, 'Moshe', 'Shalom', 'Moshe123', 'f6c40a475156d567e9085423c63d0c95bf34013f9df63cb85c', '1'),
(16, 'Hadar', 'Pozilov', 'Hadar123', '68b52ea6c21270a02ad220db7607e8e6cb99831ab86a08ff4053d11d31d1e1d45f90c107da9b6fffe8f854d59face083f566d69e1b8ff0336f3cf33a5e74656d', '0'),
(17, 'Shay', 'Azulay', 'Shay123', 'aceb4fa27f04c29dbae3827d57da00053b738014e2390a57632da8d6729be0aee2e1a82b4ad99b03c5d0842dafcc2e3e8799008c20f92d6d15e564647f75ce03', '1');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `vacationDestination` varchar(100) NOT NULL,
  `vacationDescription` varchar(100) NOT NULL,
  `vacationImage` varchar(100) NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `vacationPrice` decimal(10,0) NOT NULL,
  `followers` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `vacationDestination`, `vacationDescription`, `vacationImage`, `fromDate`, `toDate`, `vacationPrice`, `followers`) VALUES
(1, 'Cyprus ', 'Fly abroad and feel at home A close, cheap destination', 'a97962c5-9027-475e-9801-e060341eff11.jpg', '2022-08-01', '2022-08-05', '600', '2'),
(2, 'Zanzibar ', ' Zanzibar is the perfect vacation for those who love the sea, and the good life!', '1893b6a4-df6a-43e5-be21-4cdd5445babf.jpg', '2022-08-01', '2022-08-09', '1000', '3'),
(3, 'Maldives', 'The Maldives is a tropical island nation known for its beaches, blue lagoons and extensive reefs', 'e01f703b-c385-4d77-abaa-27bd46fefcb8.jpeg', '2022-08-14', '2022-08-21', '750', '3'),
(13, 'Hawaii', 'Kailua Beach, everyone imagines when they think of a vacation in Hawaii.', 'ba83cb9a-4d95-48cb-9ee0-568dfe4d7546.jpeg', '2022-09-12', '2022-09-17', '550', '2'),
(24, 'New York', 'A visit to a city that does not stop for a moment', '0d751743-9111-4f74-8b2c-74eabe2c9d24.jpg', '2022-09-18', '2022-09-21', '1000', '1'),
(31, 'Slovenia', 'for those looking for an inexpensive trip that combines magical nature', '274ec7c3-5186-41b9-8c25-89b9c41595c7.jpg', '2022-11-20', '2022-11-24', '750', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

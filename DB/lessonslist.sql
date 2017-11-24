-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 14, 2017 at 09:49 PM
-- Server version: 5.6.31
-- PHP Version: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lessonslist`
--
CREATE DATABASE IF NOT EXISTS `lessonslist` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `lessonslist`;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
CREATE TABLE IF NOT EXISTS `groups` (
  `group_ID` varchar(15) NOT NULL,
  `group_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='group data table';

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`group_ID`, `group_description`) VALUES('K-415A', 'first cours');
INSERT INTO `groups` (`group_ID`, `group_description`) VALUES('K-515A', 'second cours');

-- --------------------------------------------------------

--
-- Table structure for table `lectures`
--

DROP TABLE IF EXISTS `lectures`;
CREATE TABLE IF NOT EXISTS `lectures` (
  `lecture_ID` int(11) NOT NULL,
  `lecture_name` text NOT NULL,
  `lecture_second` text NOT NULL,
  `lecture_last` text NOT NULL,
  `lecture_description` text
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='lecture data table';

--
-- Dumping data for table `lectures`
--

INSERT INTO `lectures` (`lecture_ID`, `lecture_name`, `lecture_second`, `lecture_last`, `lecture_description`) VALUES(1, 'Victor', 'Petrovich', 'Turov', 'mathematic');

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
CREATE TABLE IF NOT EXISTS `lessons` (
  `lesson_ID` int(11) NOT NULL,
  `lesson_name` text NOT NULL,
  `lesson_lecture_ID` int(11) NOT NULL,
  `lesson_description` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='lesson data table';

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`lesson_ID`, `lesson_name`, `lesson_lecture_ID`, `lesson_description`) VALUES(1, 'Mathematic', 1, 'For first course');

-- --------------------------------------------------------

--
-- Table structure for table `lessonslist`
--

DROP TABLE IF EXISTS `lessonslist`;
CREATE TABLE IF NOT EXISTS `lessonslist` (
  `lessonslist_ID` int(11) NOT NULL,
  `lessonslist_day` int(1) NOT NULL,
  `lessonslist_number` int(11) NOT NULL,
  `lessonslist_lesson_ID` int(11) DEFAULT NULL,
  `lessonslist_room_ID` varchar(15) DEFAULT NULL,
  `lessonslist_group_ID` varchar(15) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='lessonslist data table';

--
-- Dumping data for table `lessonslist`
--

INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(1, 3, 1, NULL, NULL, 'K-415A');
INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(2, 1, 1, 1, '253', 'K-415A');
INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(3, 1, 2, 1, '253', 'K-515A');
INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(4, 2, 1, NULL, NULL, 'K-415A');
INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(5, 2, 1, 1, '253', 'K-515A');
INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(6, 2, 2, NULL, NULL, 'K-415A');
INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(7, 2, 3, 1, '253', 'K-415A');
INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(8, 2, 4, NULL, NULL, 'K-415A');
INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(9, 2, 5, NULL, NULL, 'K-415A');
INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(10, 2, 6, NULL, NULL, 'K-415A');
INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(11, 1, 2, 1, '253', 'K-415A');
INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(12, 1, 3, NULL, NULL, 'K-415A');
INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(13, 2, 7, 1, '253', 'K-415A');
INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(14, 2, 2, 1, '253', 'K-515A');
INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(15, 4, 1, 1, '253', 'K-415A');
INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(16, 4, 2, 1, '253', 'K-415A');
INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(17, 1, 4, 1, '253', 'K-415A');
INSERT INTO `lessonslist` (`lessonslist_ID`, `lessonslist_day`, `lessonslist_number`, `lessonslist_lesson_ID`, `lessonslist_room_ID`, `lessonslist_group_ID`) VALUES(18, 1, 5, 0, '', 'K-415A');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE IF NOT EXISTS `rooms` (
  `room_ID` varchar(15) NOT NULL,
  `room_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='rooms data table';

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`room_ID`, `room_description`) VALUES('253', 'Computers room');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
CREATE TABLE IF NOT EXISTS `settings` (
  `ID` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `ID` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `name` text NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='user data table';

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `email`, `password`, `name`, `role`) VALUES(1, 'vinex@mail.ru', '96e79218965eb72c92a549dd5a330112', 'Admin', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_ID`),
  ADD KEY `group_ID` (`group_ID`);

--
-- Indexes for table `lectures`
--
ALTER TABLE `lectures`
  ADD PRIMARY KEY (`lecture_ID`),
  ADD KEY `lecture_ID` (`lecture_ID`);

--
-- Indexes for table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`lesson_ID`),
  ADD KEY `lesson_ID` (`lesson_ID`),
  ADD KEY `lesson_lecture_ID` (`lesson_lecture_ID`);

--
-- Indexes for table `lessonslist`
--
ALTER TABLE `lessonslist`
  ADD PRIMARY KEY (`lessonslist_ID`),
  ADD KEY `lessonslist_lesson_ID` (`lessonslist_lesson_ID`),
  ADD KEY `lessonslist_room_ID` (`lessonslist_room_ID`),
  ADD KEY `lessonslist_group_ID` (`lessonslist_group_ID`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_ID`),
  ADD KEY `room_ID` (`room_ID`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lectures`
--
ALTER TABLE `lectures`
  MODIFY `lecture_ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `lesson_ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `lessonslist`
--
ALTER TABLE `lessonslist`
  MODIFY `lessonslist_ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`lesson_lecture_ID`) REFERENCES `lectures` (`lecture_ID`) ON DELETE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

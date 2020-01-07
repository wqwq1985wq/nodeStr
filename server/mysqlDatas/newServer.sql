/*
Navicat MySQL Data Transfer

Source Server         : mysql1
Source Server Version : 50168
Source Host           : localhost:3306
Source Database       : nodejs

Target Server Type    : MYSQL
Target Server Version : 50168
File Encoding         : 65001

Date: 2019-12-31 10:15:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_accounts
-- ----------------------------
DROP TABLE IF EXISTS `t_accounts`;
CREATE TABLE `t_accounts` (
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_accounts
-- ----------------------------

-- ----------------------------
-- Table structure for t_games
-- ----------------------------
DROP TABLE IF EXISTS `t_games`;
CREATE TABLE `t_games` (
  `room_uuid` char(20) NOT NULL,
  `game_index` smallint(6) NOT NULL,
  `base_info` varchar(1024) NOT NULL,
  `create_time` int(11) NOT NULL,
  `snapshots` char(255) DEFAULT NULL,
  `action_records` varchar(2048) DEFAULT NULL,
  `result` char(255) DEFAULT NULL,
  PRIMARY KEY (`room_uuid`,`game_index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_games
-- ----------------------------

-- ----------------------------
-- Table structure for t_games_archive
-- ----------------------------
DROP TABLE IF EXISTS `t_games_archive`;
CREATE TABLE `t_games_archive` (
  `room_uuid` char(20) NOT NULL,
  `game_index` smallint(6) NOT NULL,
  `base_info` varchar(1024) NOT NULL,
  `create_time` int(11) NOT NULL,
  `snapshots` char(255) DEFAULT NULL,
  `action_records` varchar(2048) DEFAULT NULL,
  `result` char(255) DEFAULT NULL,
  PRIMARY KEY (`room_uuid`,`game_index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_games_archive
-- ----------------------------
INSERT INTO `t_games_archive` VALUES ('1576130735449989585', '0', '{\"type\":\"xzdd\",\"button\":0,\"index\":0,\"mahjongs\":[10,14,22,14,11,2,18,5,16,6,23,8,5,19,5,13,15,25,19,20,24,21,4,13,20,17,12,23,14,8,15,20,16,21,12,23,15,1,25,18,7,3,18,11,24,17,13,17,26,10,21,5,1,23,20,16,7,22,0,26,4,11,9,22,2,9,9,9,25,19,2,24,7,24,8,3,0,11,10,0,6,16,17,25,8,4,1,18,22,7,0,3,2,1,12,12,15,14,6,21,26,26,13,19,4,10,6,3],\"game_seats\":[[10,11,16,5,15,24,20,14,16,15,7,24,26,1],[14,2,6,19,25,21,17,8,21,1,3,17,10],[22,18,23,5,19,4,12,15,12,25,18,13,21],[14,5,8,13,20,13,23,20,23,18,11,17,5]]}', '1576135747', null, '[0,1,1,1,2,23,1,1,17,2,2,20,2,1,5,3,3,5,3,1,17,0,2,16,0,1,7,1,2,7,1,1,17,2,2,22,2,1,4,3,2,0,3,1,14,0,2,26,0,1,5,1,2,4,1,1,14,2,2,11,2,1,15,0,3,15,0,1,26,1,2,9,1,1,9,2,2,22,2,1,22,3,2,2,3,1,11,0,2,9,0,1,20,3,3,20,3,1,13,0,2,9,0,1,9,1,2,9,1,1,9,2,2,25,2,1,25,3,2,19,3,1,13,0,2,2,0,1,2,1,2,24,1,1,10,2,2,7,2,1,7,3,2,24,3,1,18,2,3,18,2,1,25,3,2,8,3,1,19,0,2,3,0,1,3,1,2,0,1,1,19,2,2,11,2,1,22,3,2,10,3,1,10,0,2,0,0,1,0,1,2,6,1,1,6,2,2,16,2,1,23,3,3,23,3,1,24,0,3,24,0,1,26,1,2,17,1,1,17,2,2,25,2,1,25,3,2,8,3,1,2,1,5,2,2,2,4,2,1,4,3,2,1,3,1,1,0,2,18,0,1,18,2,2,22,2,1,16,0,4,16,0,2,7,0,1,7,2,2,0,2,1,0,3,5,0,0,2,3,0,1,3,2,2,2,2,1,2,0,2,1,0,1,1,2,2,12,2,1,11,0,2,12,0,1,12,2,5,12]', '[0,1,-2,1]');

-- ----------------------------
-- Table structure for t_guests
-- ----------------------------
DROP TABLE IF EXISTS `t_guests`;
CREATE TABLE `t_guests` (
  `guest_account` varchar(255) NOT NULL,
  PRIMARY KEY (`guest_account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_guests
-- ----------------------------

-- ----------------------------
-- Table structure for t_message
-- ----------------------------
DROP TABLE IF EXISTS `t_message`;
CREATE TABLE `t_message` (
  `type` varchar(32) NOT NULL,
  `msg` varchar(1024) NOT NULL,
  `version` varchar(32) NOT NULL,
  PRIMARY KEY (`type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_message
-- ----------------------------
INSERT INTO `t_message` VALUES ('notice', '游戏测试1', '20161128');
INSERT INTO `t_message` VALUES ('fkgm', '测试消息', '20161128');

-- ----------------------------
-- Table structure for t_rooms
-- ----------------------------
DROP TABLE IF EXISTS `t_rooms`;
CREATE TABLE `t_rooms` (
  `uuid` char(20) NOT NULL,
  `id` char(8) NOT NULL,
  `base_info` varchar(256) NOT NULL DEFAULT '0',
  `create_time` int(11) NOT NULL,
  `num_of_turns` int(11) NOT NULL DEFAULT '0',
  `next_button` int(11) NOT NULL DEFAULT '0',
  `user_id0` int(11) NOT NULL DEFAULT '0',
  `user_icon0` varchar(128) NOT NULL DEFAULT '',
  `user_name0` varchar(32) NOT NULL DEFAULT '',
  `user_score0` int(11) NOT NULL DEFAULT '0',
  `user_id1` int(11) NOT NULL DEFAULT '0',
  `user_icon1` varchar(128) NOT NULL DEFAULT '',
  `user_name1` varchar(32) NOT NULL DEFAULT '',
  `user_score1` int(11) NOT NULL DEFAULT '0',
  `user_id2` int(11) NOT NULL DEFAULT '0',
  `user_icon2` varchar(128) NOT NULL DEFAULT '',
  `user_name2` varchar(32) NOT NULL DEFAULT '',
  `user_score2` int(11) NOT NULL DEFAULT '0',
  `user_id3` int(11) NOT NULL DEFAULT '0',
  `user_icon3` varchar(128) NOT NULL DEFAULT '',
  `user_name3` varchar(32) NOT NULL DEFAULT '',
  `user_score3` int(11) NOT NULL DEFAULT '0',
  `ip` varchar(16) DEFAULT NULL,
  `port` int(11) DEFAULT '0',
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_rooms
-- ----------------------------
INSERT INTO `t_rooms` VALUES ('1576130502354144637', '144637', '{\"type\":\"xzdd\",\"baseScore\":1,\"zimo\":0,\"jiangdui\":false,\"hsz\":false,\"dianganghua\":0,\"menqing\":false,\"tiandihu\":false,\"maxFan\":3,\"maxGames\":4,\"creator\":763127}', '1576130503', '0', '0', '763127', '', '5a2Q6L2m6LWM5L6g', '0', '0', '', '', '0', '0', '', '', '0', '0', '', '', '0', '127.0.0.1', '10000');

-- ----------------------------
-- Table structure for t_users
-- ----------------------------
DROP TABLE IF EXISTS `t_users`;
CREATE TABLE `t_users` (
  `userid` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `account` varchar(64) NOT NULL DEFAULT '' COMMENT '账号',
  `name` varchar(32) DEFAULT NULL COMMENT '用户昵称',
  `sex` int(1) DEFAULT NULL,
  `headimg` varchar(256) DEFAULT NULL,
  `lv` smallint(6) DEFAULT '1' COMMENT '用户等级',
  `exp` int(11) DEFAULT '0' COMMENT '用户经验',
  `coins` int(11) DEFAULT '0' COMMENT '用户金币',
  `gems` int(11) DEFAULT '0' COMMENT '用户宝石',
  `roomid` varchar(8) DEFAULT NULL,
  `history` varchar(4096) NOT NULL DEFAULT '',
  PRIMARY KEY (`userid`),
  UNIQUE KEY `account` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=763128 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_users
-- ----------------------------
INSERT INTO `t_users` VALUES ('9', 'guest_123456', '5aSP5L6v6LWM5L6g', '0', null, '1', '0', '1000', '21', '526035', '');
INSERT INTO `t_users` VALUES ('10', 'guest_asdf1', '55qH55Sr56iz6LWi', '0', null, '1', '0', '1000', '21', '526035', '');
INSERT INTO `t_users` VALUES ('11', 'guest_asdf2', '5Lic5pa56ZuA5Zyj', '0', null, '1', '0', '1000', '21', '526035', '');
INSERT INTO `t_users` VALUES ('12', 'guest_asdf3', '5qyn6Ziz6Ieq5pG4', '0', null, '1', '0', '1000', '21', '526035', '');
INSERT INTO `t_users` VALUES ('305901', 'guest_wq004', 'V3E0', '0', null, '1', '0', '1000', '21', null, '[{\"uuid\":\"1576130735449989585\",\"id\":\"989585\",\"time\":1576130736,\"seats\":[{\"userid\":558885,\"name\":\"55qH55Sr6LWM5L6gd3E=\",\"score\":0},{\"userid\":665730,\"name\":\"V3Ey\",\"score\":1},{\"userid\":700223,\"name\":\"V3Ez\",\"score\":-2},{\"userid\":305901,\"name\":\"V3E0\",\"score\":1}]}]');
INSERT INTO `t_users` VALUES ('451764', 'guest_1576061320946', '6L2p6L6V6Ieq5pG4', '0', null, '1', '0', '1000', '21', null, '');
INSERT INTO `t_users` VALUES ('558885', 'guest_wq001', '55qH55Sr6LWM5L6gd3E=', '0', null, '1', '0', '1000', '19', null, '[{\"uuid\":\"1576130735449989585\",\"id\":\"989585\",\"time\":1576130736,\"seats\":[{\"userid\":558885,\"name\":\"55qH55Sr6LWM5L6gd3E=\",\"score\":0},{\"userid\":665730,\"name\":\"V3Ey\",\"score\":1},{\"userid\":700223,\"name\":\"V3Ez\",\"score\":-2},{\"userid\":305901,\"name\":\"V3E0\",\"score\":1}]}]');
INSERT INTO `t_users` VALUES ('665730', 'guest_wq002', 'V3Ey', '0', null, '1', '0', '1000', '21', null, '[{\"uuid\":\"1576130735449989585\",\"id\":\"989585\",\"time\":1576130736,\"seats\":[{\"userid\":558885,\"name\":\"55qH55Sr6LWM5L6gd3E=\",\"score\":0},{\"userid\":665730,\"name\":\"V3Ey\",\"score\":1},{\"userid\":700223,\"name\":\"V3Ez\",\"score\":-2},{\"userid\":305901,\"name\":\"V3E0\",\"score\":1}]}]');
INSERT INTO `t_users` VALUES ('700223', 'guest_wq003', 'V3Ez', '0', null, '1', '0', '1000', '21', null, '[{\"uuid\":\"1576130735449989585\",\"id\":\"989585\",\"time\":1576130736,\"seats\":[{\"userid\":558885,\"name\":\"55qH55Sr6LWM5L6gd3E=\",\"score\":0},{\"userid\":665730,\"name\":\"V3Ey\",\"score\":1},{\"userid\":700223,\"name\":\"V3Ez\",\"score\":-2},{\"userid\":305901,\"name\":\"V3E0\",\"score\":1}]}]');
INSERT INTO `t_users` VALUES ('763127', 'guest_1576061632809', '5a2Q6L2m6LWM5L6g', '0', null, '1', '0', '1000', '21', '144637', '');

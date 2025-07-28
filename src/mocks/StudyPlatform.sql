
USE master;
GO

IF EXISTS (SELECT name FROM sys.databases WHERE name = 'StudyPlatform')
BEGIN
    ALTER DATABASE StudyPlatform SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE StudyPlatform;
END

CREATE DATABASE StudyPlatform;
GO

USE StudyPlatform;
GO

IF OBJECT_ID('dbo.[Following]', 'U') IS NOT NULL
    DROP TABLE dbo.[Following];
    GO
IF OBJECT_ID('dbo.[AccomplishAchievement]', 'U') IS NOT NULL
    DROP TABLE dbo.[AccomplishAchievement];
    GO
IF OBJECT_ID('dbo.[Achievement]', 'U') IS NOT NULL
    DROP TABLE dbo.[Achievement];
    GO
IF OBJECT_ID('dbo.[TopicProgress]', 'U') IS NOT NULL
    DROP TABLE dbo.[TopicProgress];
    GO
IF OBJECT_ID('dbo.[ChapterProgress]', 'U') IS NOT NULL
    DROP TABLE dbo.[ChapterProgress];
    GO
IF OBJECT_ID('dbo.[Progress]', 'U') IS NOT NULL
    DROP TABLE dbo.[Progress];
    GO
IF OBJECT_ID('dbo.[BoughtSubject]', 'U') IS NOT NULL
    DROP TABLE dbo.[BoughtSubject];
    GO
IF OBJECT_ID('dbo.[Comment]', 'U') IS NOT NULL
    DROP TABLE dbo.[Comment];
    GO
IF OBJECT_ID('dbo.[User]', 'U') IS NOT NULL
    DROP TABLE dbo.[User];
    GO
IF OBJECT_ID('dbo.[Question]', 'U') IS NOT NULL
    DROP TABLE dbo.[Question];
    GO
IF OBJECT_ID('dbo.[Topic]', 'U') IS NOT NULL
    DROP TABLE dbo.[Topic];
    GO
IF OBJECT_ID('dbo.[Chapter]', 'U') IS NOT NULL
    DROP TABLE dbo.[Chapter];
    GO
IF OBJECT_ID('dbo.[Subject]', 'U') IS NOT NULL
    DROP TABLE dbo.[Subject];
    GO

CREATE TABLE [Subject] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    Name			NVARCHAR(255),
    Image			NVARCHAR(255),
    Price			INT,
    UploadDate		DATE,
    LastEditDate	DATE
);

CREATE TABLE [Chapter] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    Number			INT,
    Name			NVARCHAR(255),
    SubjectId		INT FOREIGN KEY REFERENCES [Subject](Id)
);

CREATE TABLE [Topic] (
    Id			INT PRIMARY KEY IDENTITY(1,1),
    Number		INT,
    Name		NVARCHAR(255),
    ChapterId	INT FOREIGN KEY REFERENCES [Chapter](Id)
);

CREATE TABLE [Question] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    Number			INT,
    Type			NVARCHAR(255),
    Question		NVARCHAR(255),
    CorrectAnswer	NVARCHAR(255),
    Answers			NVARCHAR(255),
    Explanation	    NVARCHAR(255),
    Note			NVARCHAR(255),
    TopicId			INT FOREIGN KEY REFERENCES [Topic](Id)
);

CREATE TABLE [User] (
    Id					INT PRIMARY KEY IDENTITY(1,1),
    Name				NVARCHAR(255),
    Image               NVARCHAR(255),
    Username			NVARCHAR(255) UNIQUE,
    Password			NVARCHAR(255),
    Role				NVARCHAR(255),
    Type				NVARCHAR(255),
    CuratorId			INT,
    Email				NVARCHAR(255),
    Point				INT,
    LastOnline          DATE,
    JoinedDate			DATE,
    DayStreak			INT,
    HighestDayStreak	INT
);

CREATE TABLE [Comment] (
    Id			INT PRIMARY KEY IDENTITY(1,1),
    Content		NVARCHAR(255),
    Answer		INT,
    CommentDate DATETIME,
    QuestionId	INT FOREIGN KEY REFERENCES [Question](Id),
    UserId		INT FOREIGN KEY REFERENCES [User](Id)
);

CREATE TABLE [BoughtSubject] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    PurchaseDate	DATE,
    Feedback		NVARCHAR(255),
    Rating          INT,
    SubjectId		INT FOREIGN KEY REFERENCES [Subject](Id),
    UserId			INT FOREIGN KEY REFERENCES [User](Id)
);

CREATE TABLE [Progress] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    Chapter			INT,
    Topic			INT,
    BoughtSubjectId	INT UNIQUE FOREIGN KEY REFERENCES [BoughtSubject](Id)
);

CREATE TABLE [ChapterProgress] (
    Id			INT PRIMARY KEY IDENTITY(1,1),
    Score		INT,
    StartDate	DATETIME,
    Note        NVARCHAR(255),
    UserId		INT FOREIGN KEY REFERENCES [User](Id),
    ChapterId   INT FOREIGN KEY REFERENCES [Chapter](Id)
);

CREATE TABLE [TopicProgress] (
    Id			INT PRIMARY KEY IDENTITY(1,1),
    Score		INT,
    StartDate	DATETIME,
    Note        NVARCHAR(255),
    UserId		INT FOREIGN KEY REFERENCES [User](Id),
    TopicId		INT FOREIGN KEY REFERENCES [Topic](Id)
);

CREATE TABLE [Achievement] (
    Id			INT PRIMARY KEY IDENTITY(1,1),
    Name		NVARCHAR(255),
    Description	NVARCHAR(255)
);

CREATE TABLE [AccomplishAchievement] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    Progress		INT,
    AchieveDate		DATE,
    Status			INT,
    AchievementId	INT FOREIGN KEY REFERENCES [Achievement](Id),
    UserId			INT FOREIGN KEY REFERENCES [User](Id)
);

CREATE TABLE [Following] (
    Id			INT PRIMARY KEY IDENTITY(1,1),
    FollowDate	DATE,
    FollowingId	INT FOREIGN KEY REFERENCES [User](Id),
    UserId		INT FOREIGN KEY REFERENCES [User](Id)
);

INSERT INTO [Subject] (Name, Image, Price, UploadDate, LastEditDate) VALUES
('Mathematics', 'https://i.pinimg.com/736x/ca/cd/c1/cacdc137ba5fa2b0e1fe5b3b89d87aad.jpg', 600000, '2024-01-15', '2025-05-20'),
('Physics', 'https://i.pinimg.com/736x/47/b1/d8/47b1d8383b7538c114b8008dfbad2ec4.jpg', 700000, '2024-02-10', '2025-06-01'),
('Chemistry', 'https://i.pinimg.com/736x/ad/a8/b7/ada8b78b5d1fbf18ca2c9ea379070e42.jpg', 800000, '2024-03-05', '2025-05-25'),
('Japanese', 'https://i.pinimg.com/736x/16/90/0a/16900a3ebf88003bc85fc12c7a490dae.jpg', 30000000, '2025-07-17', '2025-07-17')

INSERT INTO [Chapter] (Number, Name, SubjectId) VALUES
(1, 'Calculus', 1),
(2, 'Comparison', 1),
(3, 'Sorting', 1),
(1, 'Velocity, Time And Distance', 2),
(2, 'Force And Gravity', 2),
(1, 'Electromagnetism', 3),
(2, 'Organic Chemistry', 3),

(1, N'信　想　伝　欲', 4),
(2, N'苦　悩　困　難', 4),
(3, N'怒　悲　笑　喜', 4),
(4, 'Chapter 4', 4),
(5, 'Chapter 5', 4),
(6, 'Chapter 6', 4),
(7, 'Chapter 7', 4),
(8, 'Chapter 8', 4)

INSERT INTO [Topic] (Number, Name, ChapterId) VALUES
(1, 'Plus Numbers', 1),
(2, 'Subtract Numbers', 1),
(3, 'Multiply Numbers', 1),
(4, 'Divide Numbers', 1),
(1, 'Compare Numbers', 2),
(2, 'Find The Largest Number', 2),
(3, 'Find The Smallest Number', 2),
(4, 'Find Matching Number', 2),
(1, 'Ascending Sort', 3),
(2, 'Descending Sort', 3),
(1, 'Newtons Laws', 4),
(2, 'E=mc^2', 4),
(1, 'Hydrocarbons', 6),
(2, 'C12H22O11', 6),

(1, N'信', 8),
(2, N'想', 8),
(3, N'伝', 8),
(4, N'欲', 8),

(1, N'苦', 9),
(2, N'悩', 9),
(3, N'困', 9),
(4, N'難', 9),

(1, N'怒', 10),
(2, N'悲', 10),
(3, N'笑', 10),
(4, N'喜', 10)

-- (1, 'aaaaaaaaaaa1', 10),
-- (2, 'aaaaaaaaaaa2', 10),
-- (3, 'aaaaaaaaaaa3', 10),
-- (4, 'aaaaaaaaaaa4', 10),
-- (5, 'aaaaaaaaaaa5', 10),
-- (6, 'aaaaaaaaaaa6', 10)

-- (1, 'aaaaaaaaaaa1', 11),
-- (2, 'aaaaaaaaaaa2', 11),
-- (3, 'aaaaaaaaaaa3', 11),
-- (4, 'aaaaaaaaaaa4', 11),
-- (5, 'aaaaaaaaaaa5', 11),
-- (6, 'aaaaaaaaaaa6', 11)

INSERT INTO [Question] (Number, Type, Question, CorrectAnswer, Answers, Explanation, Note, TopicId) VALUES
(1, 'Multiple Choice', 'What is 2 + 3?', '5', '6@@3@@5@@4', '', 'Regular', 1),
(2, 'Multiple Choice', 'What is 1 + 6?', '7', '5@@8@@7@@6', '', 'Regular', 1),
(3, 'Multiple Choice', 'What is 4 + 5?', '9', '10@@9@@7@@8', '', 'Regular', 1),
(4, 'Multiple Choice', 'What is 3 + 3?', '6', '7@@6@@5@@4', '', 'Regular', 1),
(5, 'Multiple Choice', 'What is 0 + 8?', '8', '6@@9@@7@@8', '', 'Regular', 1),
(6, 'Multiple Choice', 'What is 6 + 2?', '8', '6@@8@@9@@7', '', 'Regular', 1),
(7, 'Multiple Choice', 'What is 5 + 4?', '9', '8@@9@@7@@10', '', 'Regular', 1),
(8, 'Multiple Choice', 'What is 7 + 2?', '9', '9@@7@@8@@10', '', 'Regular', 1),
(9, 'Multiple Choice', 'What is 9 + 1?', '10', '9@@8@@10@@11', '', 'Regular', 1),
(10, 'Multiple Choice', 'What is 8 + 3?', '11', '11@@12@@9@@10', '', 'Regular', 1),
(11, 'Multiple Choice', 'What is 14 + 27?', '41', '40@@30@@41@@31', '', 'Advanced', 1),
(12, 'Multiple Choice', 'What is 44 + 66?', '110', '120@@110@@100@@90', '', 'Advanced', 1),
(13, 'Multiple Choice', 'What is 34 + 56?', '90', '90@@80@@70@@60', '', 'Advanced', 1),

(1, 'Multiple Choice', 'What is 5 - 2?', '3', '2@@3@@4@@1', '', 'Regular', 2),
(2, 'Multiple Choice', 'What is 8 - 3?', '5', '3@@6@@5@@4', '', 'Regular', 2),
(3, 'Multiple Choice', 'What is 10 - 7?', '3', '2@@5@@3@@4', '', 'Regular', 2),
(4, 'Multiple Choice', 'What is 6 - 1?', '5', '4@@3@@5@@6', '', 'Regular', 2),
(5, 'Multiple Choice', 'What is 9 - 4?', '5', '5@@6@@3@@4', '', 'Regular', 2),
(6, 'Multiple Choice', 'What is 7 - 2?', '5', '4@@3@@6@@5', '', 'Regular', 2),
(7, 'Multiple Choice', 'What is 4 - 1?', '3', '2@@3@@1@@4', '', 'Regular', 2),
(8, 'Multiple Choice', 'What is 6 - 3?', '3', '3@@2@@5@@4', '', 'Regular', 2),
(9, 'Multiple Choice', 'What is 10 - 5?', '5', '5@@3@@4@@6', '', 'Regular', 2),
(10, 'Multiple Choice', 'What is 3 - 2?', '1', '1@@2@@0@@3', '', 'Regular', 2),

(1, 'Multiple Choice', 'What is 2 x 3?', '6', '6@@7@@4@@5', '', 'Regular', 3),
(2, 'Multiple Choice', 'What is 4 x 2?', '8', '6@@8@@9@@7', '', 'Regular', 3),
(3, 'Multiple Choice', 'What is 5 x 3?', '15', '12@@10@@15@@18', '', 'Regular', 3),
(4, 'Multiple Choice', 'What is 6 x 2?', '12', '12@@14@@10@@8', '', 'Regular', 3),
(5, 'Multiple Choice', 'What is 3 x 3?', '9', '6@@7@@9@@8', '', 'Regular', 3),
(6, 'Multiple Choice', 'What is 7 x 1?', '7', '6@@7@@9@@8', '', 'Regular', 3),
(7, 'Multiple Choice', 'What is 2 x 8?', '16', '14@@18@@12@@16', '', 'Regular', 3),
(8, 'Multiple Choice', 'What is 9 x 1?', '9', '10@@9@@8@@7', '', 'Regular', 3),
(9, 'Multiple Choice', 'What is 4 x 3?', '12', '11@@10@@14@@12', '', 'Regular', 3),
(10, 'Multiple Choice', 'What is 5 x 2?', '10', '8@@12@@9@@10', '', 'Regular', 3),

(1, 'Multiple Choice', 'What is 6 / 2?', '3', '2@@5@@4@@3', '', 'Regular', 4),
(2, 'Multiple Choice', 'What is 8 / 4?', '2', '2@@3@@4@@1', '', 'Regular', 4),
(3, 'Multiple Choice', 'What is 9 / 3?', '3', '5@@4@@2@@3', '', 'Regular', 4),
(4, 'Multiple Choice', 'What is 12 / 4?', '3', '5@@4@@3@@2', '', 'Regular', 4),
(5, 'Multiple Choice', 'What is 15 / 5?', '3', '4@@3@@5@@2', '', 'Regular', 4),
(6, 'Multiple Choice', 'What is 10 / 2?', '5', '4@@3@@6@@5', '', 'Regular', 4),
(7, 'Multiple Choice', 'What is 14 / 2?', '7', '6@@5@@7@@8', '', 'Regular', 4),
(8, 'Multiple Choice', 'What is 16 / 4?', '4', '3@@5@@2@@4', '', 'Regular', 4),
(9, 'Multiple Choice', 'What is 18 / 3?', '6', '4@@3@@5@@6', '', 'Regular', 4),
(10, 'Multiple Choice', 'What is 20 / 5?', '4', '4@@5@@2@@3', '', 'Regular', 4),


(1, 'Multiple Choice', 'Which number is greater: 4 or 6?', '6', '4@@6', '', 'Regular', 5),
(2, 'Multiple Choice', 'Which number is smaller: 7 or 3?', '3', '7@@3', '', 'Regular', 5),
(3, 'Multiple Choice', 'Which number is greater: 9 or 2?', '9', '9@@2', '', 'Regular', 5),
(4, 'Multiple Choice', 'Which number is smaller: 5 or 8?', '5', '5@@8', '', 'Regular', 5),
(5, 'Multiple Choice', 'Which number is greater: 10 or 10?', '10', '10@@10', '', 'Regular', 5),
(6, 'Multiple Choice', 'Which number is smaller: 0 or 1?', '0', '0@@1', '', 'Regular', 5),
(7, 'Multiple Choice', 'Which number is greater: 12 or 11?', '12', '12@@11', '', 'Regular', 5),
(8, 'Multiple Choice', 'Which number is smaller: 20 or 19?', '19', '20@@19', '', 'Regular', 5),
(9, 'Multiple Choice', 'Which number is greater: 15 or 18?', '18', '15@@18', '', 'Regular', 5),
(10, 'Multiple Choice', 'Which number is smaller: 25 or 30?', '25', '25@@30', '', 'Regular', 5),

(1, 'Multiple Choice', 'Which is the greatest number: 3, 7, 2, 5?', '7', '3@@7@@2@@5', '', 'Regular', 6),
(2, 'Multiple Choice', 'Which is the greatest number: 8, 6, 4, 9?', '9', '6@@9@@8@@4', '', 'Regular', 6),
(3, 'Multiple Choice', 'Which is the greatest number: 1, 3, 0, 2?', '3', '2@@1@@0@@3', '', 'Regular', 6),
(4, 'Multiple Choice', 'Which is the greatest number: 12, 15, 11, 14?', '15', '14@@11@@15@@12', '', 'Regular', 6),
(5, 'Multiple Choice', 'Which is the greatest number: 10, 20, 30, 40?', '40', '20@@10@@40@@30', '', 'Regular', 6),
(6, 'Multiple Choice', 'Which is the greatest number: 5, 9, 8, 6?', '9', '5@@6@@8@@9', '', 'Regular', 6),
(7, 'Multiple Choice', 'Which is the greatest number: 13, 17, 15, 16?', '17', '17@@15@@13@@16', '', 'Regular', 6),
(8, 'Multiple Choice', 'Which is the greatest number: 22, 18, 25, 19?', '25', '22@@25@@18@@19', '', 'Regular', 6),
(9, 'Multiple Choice', 'Which is the greatest number: 31, 33, 32, 30?', '33', '31@@30@@32@@33', '', 'Regular', 6),
(10, 'Multiple Choice', 'Which is the greatest number: 45, 44, 46, 43?', '46', '45@@43@@44@@46', '', 'Regular', 6),

(1, 'Multiple Choice', 'Which is the smallest number: 3, 7, 2, 5?', '2', '3@@7@@2@@5', '', 'Regular', 7),
(2, 'Multiple Choice', 'Which is the smallest number: 8, 6, 4, 9?', '4', '6@@9@@8@@4', '', 'Regular', 7),
(3, 'Multiple Choice', 'Which is the smallest number: 1, 3, 0, 2?', '0', '2@@1@@0@@3', '', 'Regular', 7),
(4, 'Multiple Choice', 'Which is the smallest number: 12, 15, 11, 14?', '11', '14@@11@@15@@12', '', 'Regular', 7),
(5, 'Multiple Choice', 'Which is the smallest number: 10, 20, 30, 40?', '10', '20@@10@@40@@30', '', 'Regular', 7),
(6, 'Multiple Choice', 'Which is the smallest number: 5, 9, 8, 6?', '5', '5@@6@@8@@9', '', 'Regular', 7),
(7, 'Multiple Choice', 'Which is the smallest number: 13, 17, 15, 16?', '13', '17@@15@@13@@16', '', 'Regular', 7),
(8, 'Multiple Choice', 'Which is the smallest number: 22, 18, 25, 19?', '18', '22@@25@@18@@19', '', 'Regular', 7),
(9, 'Multiple Choice', 'Which is the smallest number: 31, 33, 32, 30?', '30', '31@@30@@32@@33', '', 'Regular', 7),
(10, 'Multiple Choice', 'Which is the smallest number: 45, 44, 46, 43?', '43', '45@@43@@44@@46', '', 'Regular', 7),

(1, 'Multiple Choice', 'Fill in the blank: 10 > 9 > ? > 7', '8', '7@@8@@9@@6', '', 'Regular', 8),
(2, 'Multiple Choice', 'Fill in the blank: 5 < 6 < ? < 8', '7', '6@@8@@7@@9', '', 'Regular', 8),
(3, 'Multiple Choice', 'Fill in the blank: 12 > 11 > ? > 9', '10', '10@@11@@12@@8', '', 'Regular', 8),
(4, 'Multiple Choice', 'Fill in the blank: 3 < 4 < ? < 6', '5', '5@@6@@3@@4', '', 'Regular', 8),
(5, 'Multiple Choice', 'Fill in the blank: 20 > 18 > ? > 16', '17', '16@@17@@18@@19', '', 'Regular', 8),
(6, 'Multiple Choice', 'Fill in the blank: 1 < 2 < ? < 4', '3', '4@@3@@1@@2', '', 'Regular', 8),
(7, 'Multiple Choice', 'Fill in the blank: 30 > 28 > ? > 26', '27', '27@@28@@29@@26', '', 'Regular', 8),
(8, 'Multiple Choice', 'Fill in the blank: 0 < 1 < ? < 3', '2', '2@@3@@1@@0', '', 'Regular', 8),
(9, 'Multiple Choice', 'Fill in the blank: 15 > 14 > ? > 12', '13', '12@@14@@13@@15', '', 'Regular', 8),
(10, 'Multiple Choice', 'Fill in the blank: 6 < 7 < ? < 9', '8', '6@@9@@7@@8', '', 'Regular', 8),


(1, 'Multiple Choice', 'Arrange in ascending order: 4, 2, 5, 1', '1, 2, 4, 5', '4, 2, 5, 1@@1, 2, 4, 5@@5, 4, 2, 1@@2, 1, 4, 5', '', 'Regular', 9),
(2, 'Multiple Choice', 'Arrange in ascending order: 7, 3, 6, 2', '2, 3, 6, 7', '6, 2, 3, 7@@2, 3, 6, 7@@7, 6, 3, 2@@3, 2, 6, 7', '', 'Regular', 9),
(3, 'Multiple Choice', 'Arrange in ascending order: 9, 5, 8, 6', '5, 6, 8, 9', '9, 5, 8, 6@@6, 8, 9, 5@@5, 6, 8, 9@@8, 5, 6, 9', '', 'Regular', 9),
(4, 'Multiple Choice', 'Arrange in ascending order: 10, 8, 7, 9', '7, 8, 9, 10', '10, 9, 8, 7@@9, 10, 7, 8@@8, 7, 10, 9@@7, 8, 9, 10', '', 'Regular', 9),
(5, 'Multiple Choice', 'Arrange in ascending order: 3, 1, 2, 0', '0, 1, 2, 3', '3, 2, 1, 0@@1, 0, 3, 2@@0, 1, 2, 3@@2, 0, 1, 3', '', 'Regular', 9),
(6, 'Multiple Choice', 'Arrange in ascending order: 12, 14, 11, 13', '11, 12, 13, 14', '14, 12, 13, 11@@12, 11, 14, 13@@11, 12, 13, 14@@13, 11, 12, 14', '', 'Regular', 9),
(7, 'Multiple Choice', 'Arrange in ascending order: 5, 7, 6, 8', '5, 6, 7, 8', '6, 7, 8, 5@@8, 6, 5, 7@@5, 6, 7, 8@@7, 5, 6, 8', '', 'Regular', 9),
(8, 'Multiple Choice', 'Arrange in ascending order: 15, 12, 13, 14', '12, 13, 14, 15', '15, 12, 13, 14@@13, 14, 12, 15@@12, 13, 14, 15@@14, 15, 13, 12', '', 'Regular', 9),
(9, 'Multiple Choice', 'Arrange in ascending order: 20, 18, 19, 17', '17, 18, 19, 20', '18, 20, 17, 19@@20, 19, 18, 17@@19, 18, 17, 20@@17, 18, 19, 20', '', 'Regular', 9),
(10, 'Multiple Choice', 'Arrange in ascending order: 0, 2, 1, 3', '0, 1, 2, 3', '2, 1, 3, 0@@0, 2, 1, 3@@1, 0, 2, 3@@0, 1, 2, 3', '', 'Regular', 9),

(1, 'Multiple Choice', 'Arrange in descending order: 4, 2, 5, 1', '5, 4, 2, 1', '1, 2, 4, 5@@5, 4, 2, 1@@4, 5, 1, 2@@2, 1, 5, 4', '', 'Regular', 10),
(2, 'Multiple Choice', 'Arrange in descending order: 7, 3, 6, 2', '7, 6, 3, 2', '2, 3, 6, 7@@6, 3, 2, 7@@3, 2, 7, 6@@7, 6, 3, 2', '', 'Regular', 10),
(3, 'Multiple Choice', 'Arrange in descending order: 9, 5, 8, 6', '9, 8, 6, 5', '6, 8, 9, 5@@9, 8, 6, 5@@8, 5, 9, 6@@5, 6, 8, 9', '', 'Regular', 10),
(4, 'Multiple Choice', 'Arrange in descending order: 10, 8, 7, 9', '10, 9, 8, 7', '7, 8, 9, 10@@9, 10, 7, 8@@10, 9, 8, 7@@8, 7, 10, 9', '', 'Regular', 10),
(5, 'Multiple Choice', 'Arrange in descending order: 3, 1, 2, 0', '3, 2, 1, 0', '1, 0, 3, 2@@2, 0, 1, 3@@3, 2, 1, 0@@0, 1, 2, 3', '', 'Regular', 10),
(6, 'Multiple Choice', 'Arrange in descending order: 12, 14, 11, 13', '14, 13, 12, 11', '12, 11, 14, 13@@11, 12, 13, 14@@13, 11, 12, 14@@14, 13, 12, 11', '', 'Regular', 10),
(7, 'Multiple Choice', 'Arrange in descending order: 5, 7, 6, 8', '8, 7, 6, 5', '6, 7, 8, 5@@7, 5, 6, 8@@8, 7, 6, 5@@5, 6, 7, 8', '', 'Regular', 10),
(8, 'Multiple Choice', 'Arrange in descending order: 15, 12, 13, 14', '15, 14, 13, 12', '13, 14, 12, 15@@12, 13, 14, 15@@14, 15, 13, 12@@15, 14, 13, 12', '', 'Regular', 10),
(9, 'Multiple Choice', 'Arrange in descending order: 20, 18, 19, 17', '20, 19, 18, 17', '18, 20, 17, 19@@19, 18, 17, 20@@17, 18, 19, 20@@20, 19, 18, 17', '', 'Regular', 10),
(10, 'Multiple Choice', 'Arrange in descending order: 0, 2, 1, 3', '3, 2, 1, 0', '0, 2, 1, 3@@2, 1, 3, 0@@3, 2, 1, 0@@1, 0, 2, 3', '', 'Regular', 10),



-- 信
(1, 'Multiple Choice', N'私は親から「信頼」されている。', N'しんらい', N'しらい@@しんら@@しんらい@@しら', N'Tôi được bố mẹ tin tưởng.', 'Regular', 15),
(1, 'Multiple Choice', N'「信号」をよく見て横断歩道を渡る。', N'しんごう', N'しんごう@@しんご@@しごう@@しご', N'Nhìn đèn tín hiệu kỹ rồi băng qua đường dành cho người đi bộ.', 'Regular', 15),
(1, 'Multiple Choice', N'私は彼を「しんじて」いる。', N'信じて', N'信じ@@信じて@@信二@@信二て', N'Tôi tin tưởng anh ấy.', 'Regular', 15),
(1, 'Multiple Choice', N'人の前で話すことに「じしん」がある。', N'自信', N'時針@@自信@@自身@@地震', N'Tôi tự tin khi nói trước đám đông.', 'Regular', 15),
(1, 'Multiple Choice', N'友達を「しんよう」してお金を貸した。', N'信用', N'信用@@新用@@信頼@@信陽', N'Vì tin tưởng bạn nên tôi đã cho mượn tiền.', 'Regular', 15),
-- 想
(1, 'Multiple Choice', N'未来の生活を「空想」する。', N'くうそう', N'くそ@@くうそ@@くそう@@くうそう', N'Tôi tưởng tượng về cuộc sống trong tương lai.', 'Regular', 16),
(1, 'Multiple Choice', N'彼女はだれに対しても「愛想」がいい。', N'あいそ', N'あいそう@@あいそ@@おいそう@@おいそ', N'Cô ấy rất thân thiện với mọi người.', 'Regular', 16),
(1, 'Multiple Choice', N'毎朝、「瞑想」しています。', N'めいそう', N'めいそう@@めいそ@@めそう@@めそ', N'Mỗi sáng tôi đều thiền định.', 'Regular', 16),
(1, 'Multiple Choice', N'どちらが勝つか「よそう」する。', N'予想', N'予装@@予想@@装う@@予想う', N'Tôi dự đoán bên nào sẽ thắng.', 'Regular', 16),
(1, 'Multiple Choice', N'彼は「りそう」の恋人だ。', N'理想', N'離巣@@離窓@@理想@@裏層', N'Anh ấy là người yêu lý tưởng.', 'Regular', 16),
-- 伝
(1, 'Multiple Choice', N'階段の手すりを「伝って」上る。', N'つたって', N'つなって@@つたって@@つたわって@@つたえって', N'Tôi vịn tay vịn cầu thang để leo lên.', 'Regular', 17),
(1, 'Multiple Choice', N'この村には昔からの「伝説」が多くある。', N'でんせつ', N'てんせつ@@でんせつ@@つたせつ@@つだせつ', N'Ngôi làng này có rất nhiều truyền thuyết từ xưa.', 'Regular', 17),
(1, 'Multiple Choice', N'友達に先生への「伝言」をたのむ。', N'でんごん', N'でんごん@@てんごん@@でんこん@@てんこん', N'Nhờ bạn nhắn lại lời cho thầy cô.', 'Regular', 17),
(1, 'Multiple Choice', N'日本の「伝統」文化にきょうみがある。', N'でんとう', N'でんとう@@てんとう@@でんどう@@てんどう', N'Tôi có hứng thú với văn hóa truyền thống Nhật Bản.', 'Regular', 17),
(1, 'Multiple Choice', N'表情から彼の悲しみが「つたわった」。', N'伝わった', N'会わった@@合わった@@伝わった@@答わった', N'Qua biểu cảm, tôi cảm nhận được nỗi buồn của anh ấy.', 'Regular', 17),
-- 欲
(1, 'Multiple Choice', N'心の「欲する」ままに行動する。', N'ほっする', N'はっする@@ほっする@@ぼっする@@ぽっする', N'Tôi hành động theo những gì trái tim mong muốn.', 'Regular', 18),
(1, 'Multiple Choice', N'彼は「愛欲」に溺れて、自分を見失った', N'あいよく', N'あいほしい@@あいよく@@あいほっする@@おいよく', N'Anh ta chìm đắm trong ái dục và đánh mất chính mình.', 'Regular', 18),
(1, 'Multiple Choice', N'「性欲」は人間の本能の一つだ。', N'せいよく', N'せいほっする@@せいほしい@@せいよぐ@@せいよく', N'Ham muốn tình dục là một trong những bản năng của con người.', 'Regular', 18),
(1, 'Multiple Choice', N'いいにおいがして「しょくよく」がわく。', N'食欲', N'食飲欲@@食事欲@@飲欲@@食欲', N'Mùi thơm khiến tôi cảm thấy thèm ăn.', 'Regular', 18),
(1, 'Multiple Choice', N'人気ブランドの洋服が「ほしい」。', N'欲しい', N'想しい@@想っしい@@欲しい@@欲っしい', N'Tôi muốn có quần áo của thương hiệu nổi tiếng.', 'Regular', 18),


-- 苦
(1, 'Multiple Choice', N'重い病気で長い間「苦しんで」いる。', N'くるしんで', N'くるしん@@くるしんで@@くしん@@くしんで', N'Tôi đã chịu đựng một căn bệnh nặng trong thời gian dài.', 'Regular', 19),
(1, 'Multiple Choice', N'若いころ非行に走って親を「苦しめた」。', N'くるしめた', N'くしめ@@くしめた@@くるしめ@@くるしめた', N'Khi còn trẻ tôi đã hư hỏng và làm bố mẹ khổ sở.', 'Regular', 19),
(1, 'Multiple Choice', N'このコーヒーは少し「苦み」がある。', N'にがみ', N'にがみ@@にかみ@@こがみ@@こかみ', N'Cà phê này có hơi vị đắng một chút.', 'Regular', 19),
(1, 'Multiple Choice', N'せきが止まらなくて「くるしい」。', N'苦しい', N'古し@@古しい@@苦し@@苦しい', N'Bị ho không ngừng khiến tôi rất đau khổ.', 'Regular', 19),
(1, 'Multiple Choice', N'このお茶は「にがい」。', N'苦い', N'古@@古い@@苦@@苦い', N'Trà này đắng.', 'Regular', 19),
-- 悩
(1, 'Multiple Choice', N'頭痛に「悩まされて」いる。', N'なやまされて', N'たやまされ@@たやまされて@@なやまされ@@なやまされて', N'Tôi đang bị cơn đau đầu hành hạ.', 'Regular', 20),
(1, 'Multiple Choice', N'将来のことで「悩んで」います。', N'なやんで', N'なやん@@なやんで@@のうん@@のうんで', N'Tôi đang lo lắng về tương lai.', 'Regular', 20),
(1, 'Multiple Choice', N'彼は恋愛に「悩んで」いる。', N'なやんで', N'なや@@なやで@@なやんで@@なやん', N'Anh ấy đang phiền muộn vì chuyện tình cảm.', 'Regular', 20),
(1, 'Multiple Choice', N'深刻な「悩殺」シーンに観客は驚いた。', N'のうさつ', N'なやさつ@@のうさつ@@なやんさつ@@のさつ', N'Khán giả đã bất ngờ với cảnh quyến rũ chết người.', 'Regular', 20),
(1, 'Multiple Choice', N'進学するか帰国するか、「なやんで」いる。', N'悩んで', N'悩で@@悩@@悩んで@@悩ん', N'Tôi đang phân vân giữa việc học tiếp hay về nước.', 'Regular', 20),
-- 困
(1, 'Multiple Choice', N'急に雨が降り出して「困った」。', N'こまった', N'こんなった@@こんな@@こまった@@こま', N'Tự nhiên trời đổ mưa khiến tôi rất khổ sở.', 'Regular', 21),
(1, 'Multiple Choice', N'彼はどんな「困難」にも立ち向かう人だ。', N'こんなん', N'こんなん@@こんな@@こなん@@こな', N'Anh ấy là người luôn đối mặt với mọi khó khăn.', 'Regular', 21),
(1, 'Multiple Choice', N'助けてくれなくて、本当に「困った」。', N'こまった', N'こんなった@@こんな@@こまった@@こま', N'Không ai giúp đỡ, tôi thực sự rất khốn đốn.', 'Regular', 21),
(1, 'Multiple Choice', N'「困難」を乗り越えて、夢を叶えた。', N'こんなん', N'こなん@@こんなん@@こまなん@@こまんなん', N'Vượt qua khó khăn, tôi đã thực hiện được ước mơ.', 'Regular', 21),
(1, 'Multiple Choice', N'お金がなくて生活に「こまって」いる。', N'困って', N'国って@@国った@@困って@@困った', N'Tôi đang khốn đốn vì không có tiền để sống.', 'Regular', 21),
-- 難
(1, 'Multiple Choice', N'たえ「難い」痛みで病院へ運ばれた。', N'かたい', N'むずがしい@@むずかしい@@がたい@@かたい', N'Vì cơn đau không thể chịu nổi nên tôi đã được đưa đến bệnh viện.', 'Regular', 22),
(1, 'Multiple Choice', N'工事は今、最大の「難所」にかかっている。', N'なんしょ', N'なんしょ@@なしょ@@たんしょ@@たしょ', N'Công trình hiện đang đến đoạn khó khăn nhất.', 'Regular', 22),
(1, 'Multiple Choice', N'この問題はとても「難しい」。', N'むずかしい', N'むすがしい@@むすかしい@@むずがしい@@むずかしい', N'Câu hỏi này rất khó.', 'Regular', 22),
(1, 'Multiple Choice', N'問題が「むずかしくて」、答えがわからない。', N'難しくて', N'難しで@@難しくて@@悩しくて@@悩しで', N'Bài toán quá khó, tôi không biết đáp án là gì.', 'Regular', 22),
(1, 'Multiple Choice', N'数学の「なんもん」をすらすら解いた。', N'難問', N'難問@@難聞@@難開@@難間', N'Tôi giải trôi chảy các bài toán khó trong môn Toán.', 'Regular', 22),


-- 怒
(1, 'Multiple Choice', N'成績が下がって親に「怒られた」。', N'おこられた', N'いかられた@@おこられた@@どられた@@あこられた', N'Vì thành tích giảm sút nên tôi bị bố mẹ la mắng.', 'Regular', 23),
(1, 'Multiple Choice', N'相手の失礼なたいどに「激怒」する。', N'げきど', N'けきど@@げきと@@げきど@@けきと', N'Tôi nổi cơn thịnh nộ với thái độ vô lễ của đối phương.', 'Regular', 23),
(1, 'Multiple Choice', N'彼は急に「怒り」出した。', N'おこり', N'いかる@@いかり@@おこる@@おこり', N'Anh ấy bất ngờ nổi giận.', 'Regular', 23),
(1, 'Multiple Choice', N'「怒り」を抑えられなかった。', N'いかり', N'いかる@@いかり@@おこる@@おこり', N'Tôi không thể kiềm chế cơn giận.', 'Regular', 23),
(1, 'Multiple Choice', N'失言により相手の「いかり」を買った。', N'怒り', N'題り@@題る@@怒り@@怒る', N'Vì lỡ lời nên tôi khiến đối phương nổi giận.', 'Regular', 23),
-- 悲
(1, 'Multiple Choice', N'かわいがっていた犬が死んで「悲しい」。', N'かなしい', N'かなしい@@かたしい@@がなしい@@がたしい', N'Con chó tôi yêu quý đã chết nên tôi rất buồn.', 'Regular', 24),
(1, 'Multiple Choice', N'二人の結婚は「悲劇」に終わった。', N'ひげき', N'びげき@@ひげき@@ぴけき@@ひけき', N'Cuộc hôn nhân của hai người đã kết thúc trong bi kịch.', 'Regular', 24),
(1, 'Multiple Choice', N'しょうらいを「悲観」してはいけない。', N'ひかん', N'がなかん@@びかん@@かなかん@@ひかん', N'Không nên bi quan về tương lai.', 'Regular', 24),
(1, 'Multiple Choice', N'友人の死を「かなしむ」。', N'悲しむ', N'哀しむ@@悲しむ@@怒しむ@@難しむ', N'Tôi đau buồn vì cái chết của người bạn.', 'Regular', 24),
(1, 'Multiple Choice', N'「ひれん」の物語を読んだ。', N'悲恋', N'悲恋@@笑恋@@悲赤@@笑赤', N'Tôi đã đọc một câu chuyện tình buồn.', 'Regular', 24),
-- 笑
(1, 'Multiple Choice', N'面白い話に声をあげて「笑った」。', N'わらった', N'わらいった@@しょうった@@えった@@わらった', N'Tôi bật cười vì câu chuyện thú vị.', 'Regular', 25),
(1, 'Multiple Choice', N'彼のギャグにクラス中が「爆笑」した。', N'ばくしょう', N'ばくわらい@@ばくしょう@@はくわらい@@はくしょう', N'Cả lớp cười phá lên vì trò đùa của cậu ấy.', 'Regular', 25),
(1, 'Multiple Choice', N'赤ちゃんを見て、思わずほほ「笑んだ」。', N'えんだ', N'わらうんだ@@えんだ@@わらんだ@@えみんだ', N'Nhìn thấy em bé, tôi bất giác mỉm cười.', 'Regular', 25),
(1, 'Multiple Choice', N'落語を聞いて「おおわらい」する。', N'大笑い', N'犬笑い@@大笑い@@多笑い@@起笑い', N'Tôi đã cười phá lên khi nghe truyện cười.', 'Regular', 25),
(1, 'Multiple Choice', N'彼女はいつも「えがお」をたやさない。', N'笑顔', N'難問@@笑問@@難顔@@笑顔', N'Cô ấy luôn luôn giữ nụ cười trên môi.', 'Regular', 25),
-- 喜
(1, 'Multiple Choice', N'ジュースを差し入れして「喜ばれた」。', N'よろこばれた', N'きばれた@@よろこばれた@@ぎばれた@@よるこばれた', N'Tôi được vui mừng đón nhận vì mang nước trái cây đến.', 'Regular', 26),
(1, 'Multiple Choice', N'彼女は「喜怒哀楽」がはっきりした性格だ。', N'きどあいらく', N'ぎどあいらく@@きとあいらく@@きどおいらく@@きどあいらく', N'Cô ấy có tính cách thể hiện rõ vui, giận, buồn, vui.', 'Regular', 26),
(1, 'Multiple Choice', N'彼の言葉に「喜ん」だ。', N'よろこん', N'よるこん@@よろこん@@よろごん@@よるごん', N'Tôi đã vui mừng vì lời nói của anh ấy.', 'Regular', 26),
(1, 'Multiple Choice', N'母は大学合格を「よろこんで」くれた。', N'喜んで', N'言んで@@事んで@@喜んで@@信んで', N'Mẹ đã rất vui vì tôi đậu đại học.', 'Regular', 26),
(1, 'Multiple Choice', N'さいふが見つかって「おおよろこび」する。', N'大喜び', N'大事び@@大信び@@大喜び@@大言び', N'Tôi vô cùng vui mừng vì đã tìm thấy ví.', 'Regular', 26)


INSERT INTO [User] (Name, Image, Username, Password, Role, Type, CuratorId, Email, Point, LastOnline, JoinedDate, DayStreak, HighestDayStreak) VALUES
(N'Đặng Ngọc Hải Triều', 'https://i.pinimg.com/736x/6e/0e/87/6e0e8709ebd23983fb4f3ffe64b42e70.jpg', 'haitrieu', '123456', 'Student', 'Regular', null, 'haitrieu@example.com', 16890, '2024-07-01', '2024-06-01', 880, 880),
(N'Nguyễn Xuân Trường', 'https://i.pinimg.com/736x/af/2e/45/af2e450dee86885b777c32b584f15ed5.jpg', 'xuantruong', '123456', 'Student', 'VIP', null, 'xuantruong@example.com', 15070, '2024-07-01', '2024-06-02', 802, 802),
('Mountain Daddy', 'https://i.pinimg.com/736x/e2/7c/dd/e27cdd4e412c291955ab8e817df46be2.jpg', 'mountain', '123456', 'Parent', 'Regular', null, 'mountain@example.com', 2000000, '2024-07-01', '2024-06-03', 0, 0),
('Admin Trieu', 'https://i.pinimg.com/736x/f2/24/cb/f224cb341f23ac57d8508b0035ac6554.jpg', 'admin', '123456', 'Admin', 'Regular', NULL, 'admin@example.com', 0, '2024-07-01', '2024-06-04', 0, 0),
('Teacher Trieu', 'https://i.pinimg.com/736x/0a/32/52/0a325220d9212e51e6fd98b42f99c1b0.jpg', 'teacher', '123456', 'Teacher', 'Regular', NULL, 'teacher@example.com', 0, '2024-07-01', '2025-06-01', 0, 0),
('Tester Trieu', 'https://i.pinimg.com/736x/cc/9e/bd/cc9ebdead570cc7b070dfd23d7bf4351.jpg', 'tester', '123456', 'Student', 'Regular', 3, 'tester@example.com', 100000, '2024-07-01', '2024-06-02', 100, 1000),
(N'Nguyễn Thành Dương', 'https://i.pinimg.com/736x/04/e4/7a/04e47a806a5d6ff80720858457657241.jpg', 'thanhduong', '123456', 'Student', 'Regular', 3, 'thanhduong@example.com', 13540, '2025-07-10', '2025-07-10', 406, 406),
(N'Trương Kim Hằng', 'https://i.pinimg.com/736x/bf/cb/ce/bfcbce2283cee2265de4e2b2094ce984.jpg', 'kimhang', '123456', 'Student', 'Regular', 3, 'kimhang@example.com', 9990, '2025-07-10', '2025-07-10', 693, 940),
(N'Lê Minh Khoa', 'https://i.pinimg.com/736x/11/77/fe/1177feaaa2da0e7cac19a3342be0c393.jpg', 'minhkhoa', '123456', 'Student', 'Regular', 3, 'minhkhoa@example.com', 12600, '2025-07-10', '2025-07-10', 313, 872),
(N'Lê Huy Vũ', 'https://i.pinimg.com/736x/5f/b7/ae/5fb7ae8203d059646c1b2d05b7f4ebdf.jpg', 'huyvu', '123456', 'Student', 'Regular', 3, 'huyvu@example.com', 4260, '2025-07-10', '2025-07-10', 603, 603),
(N'Nguyễn Gia Huy', 'https://i.pinimg.com/736x/76/71/31/767131bbd40a7b293183727c7e6da827.jpg', 'giahuy', '123456', 'Student', 'Regular', 3, 'giahuy@example.com', 8320, '2025-07-10', '2025-07-10', 518, 518),
(N'Nguyễn Gia Hoàng', 'https://i.pinimg.com/736x/d1/ba/15/d1ba156c10b10d44a92d6bac20849953.jpg', 'giahoang', '123456', 'Student', 'Regular', 3, 'giahoang@example.com', 9420, '2025-07-10', '2025-07-10', 244, 861),
(N'Nguyễn Huy Hoàng', 'https://i.pinimg.com/736x/93/7a/df/937adf21934953e7342a695b936b031c.jpg', 'huyhoang', '123456', 'Student', 'Regular', 3, 'huyhoang@example.com', 7490, '2025-07-10', '2025-07-10', 211, 211),
(N'Phạm Thành Danh', 'https://i.pinimg.com/736x/d1/ba/15/d1ba156c10b10d44a92d6bac20849953.jpg', 'thanhdanh', '123456', 'Student', 'Regular', 3, 'thanhdanh@example.com', 2970, '2025-07-10', '2025-07-10', 731, 952),
(N'Nguyễn Trường Sang', 'https://i.pinimg.com/736x/88/39/3e/88393ead9af03f8f76814c42352ded55.jpg', 'truongsang', '123456', 'Student', 'Regular', 3, 'truongsang@example.com', 5230, '2025-07-10', '2025-07-10', 533, 587),
(N'Võ Minh Tiến', 'https://i.pinimg.com/736x/d1/ba/15/d1ba156c10b10d44a92d6bac20849953.jpg', 'minhtien', '123456', 'Student', 'Regular', 3, 'minhtien@example.com', 14780, '2025-07-10', '2025-07-10', 601, 601),
(N'Nguyễn Văn Khoa', 'https://i.pinimg.com/736x/75/7f/86/757f86f55d1ad5ac6529267d1f405ce7.jpg', 'vankhoa', '123456', 'Student', 'Regular', 3, 'vankhoa@example.com', 8590, '2025-07-10', '2025-07-10', 687, 687),
(N'HCM25_CPL_JS_02', 'https://i.pinimg.com/736x/51/f9/4b/51f94b909520bde0f044aa4d276e8c56.jpg', 'hcm25_cpl_js_02', '123456', 'Student', 'Regular', 3, 'hcm25_cpl_js_02@example.com', 0, '2025-07-17', '2025-07-17', 0, 0)
UPDATE [User] SET CuratorId = 3 WHERE Id = 1;

INSERT INTO [Comment] (Content, Answer, CommentDate, QuestionId, UserId) VALUES
('I talk about the question', NULL, '2025-06-11 00:00:00', 11, 1),
('I answer 1', 1, '2025-06-11 00:00:00', 11, 7),
('I answer 1', 1, '2025-06-11 00:00:00', 11, 8),
('I answer 2', 2, '2025-06-11 00:00:00', 11, 9),
('I answer 2', 2, '2025-06-11 00:00:00', 11, 10),
('I answer 5', 5, '2025-06-11 00:00:00', 11, 11),
('I answer 2', 2, '2025-06-11 00:00:00', 11, 12),
('I answer 3', 3, '2025-06-11 00:00:00', 11, 13),
('I answer 3', 3, '2025-06-11 00:00:00', 11, 14),
('I answer 9', 9, '2025-06-11 00:00:00', 11, 15),
('I talk about the question too', NULL, '2025-06-11 00:00:00', 11, 16),
('I answer 11', 11, '2025-06-11 00:00:00', 11, 17)
--('Good explanation', null, '2025-06-01 14:30:00', 1, 1),
--('Disagree with answer', 1, '2025-06-02 14:30:00', 2, 1),
--('Clear solution', 2, '2025-06-03 14:30:00', 3, 1),
--('Needs more detail', 2, '2025-06-04 14:30:00', 4, 1),
--('Useful note', 3, '2025-06-05 14:30:00', 5, 1)

INSERT INTO [BoughtSubject] (PurchaseDate, Feedback, Rating, SubjectId, UserId) VALUES
('2025-01-10', 'Great Math course', 5, 1, 1),
('2025-01-10', 'Great Physics course', 4, 2, 1),
('2025-01-10', 'Japanese is great!', 5, 4, 1),
('2025-02-15', 'Very informative', 5, 2, 2),
('2025-03-20', 'Needs more examples', 3, 3, 7),
('2025-04-25', 'Excellent content', 4, 2, 8),
('2025-05-30', 'Highly recommended', 5, 3, 9),
('2025-07-17', 'I LOVE LEARNING MATH!', 5, 1, 18),
('2025-07-17', 'I LOVE LEARNING JAPANESE!', 5, 4, 18)

INSERT INTO [Progress] (Chapter, Topic, BoughtSubjectId) VALUES
(2, 1, 1),
(1, 1, 2),
(1, 1, 3),
(1, 1, 4),
(1, 1, 5),
(1, 1, 6),
(1, 1, 7),
(4, 1, 8),
(4, 1, 9)

INSERT INTO [ChapterProgress] (Score, StartDate, Note, UserId, ChapterId) VALUES
(30, '2025-06-01 14:30:00', 'Quiz', 1, 1),
(100, '2025-06-02 14:30:00', 'Quiz', 2, 2),
(60, '2025-06-03 14:30:00', 'Advanced', 3, 3),
(90, '2025-06-04 14:30:00', 'Quiz', 4, 4),
(80, '2025-06-05 14:30:00', 'Advanced', 5, 5)

INSERT INTO [TopicProgress] (Score, StartDate, Note, UserId, TopicId) VALUES
(80, '2025-06-01 14:30:00', 'Topic', 1, 1),
(90, '2025-06-02 14:30:00', 'Topic', 2, 2),
(80, '2025-06-03 14:30:00', 'Topic', 3, 3),
(70, '2025-06-04 14:30:00', 'Topic', 4, 4),
(100, '2025-06-05 14:30:00', 'Topic', 5, 5)

INSERT INTO [Achievement] (Name, Description) VALUES
('Beginer', 'Completed first chapter'),
('Intermediate', 'Completed five topics'),
('Advanced', 'Scored 90+ in quiz'),
('Expert', 'Completed all subjects'),
('Master', 'Highest streak achieved')

INSERT INTO [AccomplishAchievement] (Progress, AchieveDate, Status, AchievementId, UserId) VALUES
(85, '2025-06-01', 1, 1, 1),
(90, '2025-06-02', 1, 2, 1),
(88, '2025-06-03', 1, 3, 3),
(92, '2025-06-04', 1, 4, 1),
(87, '2025-06-05', 1, 5, 5)

INSERT INTO [Following] (FollowDate, FollowingId, UserId) VALUES
('2025-06-01', 1, 2),
('2025-06-02', 2, 1),
('2025-07-10', 1, 7),
('2025-07-10', 1, 8),
('2025-07-10', 1, 9),
('2025-07-10', 1, 10),
('2025-07-10', 1, 11),
('2025-07-10', 1, 12),
('2025-07-10', 1, 13),
('2025-07-10', 1, 16),
('2025-07-10', 1, 17),
('2025-07-10', 2, 12),
('2025-07-10', 2, 13),
('2025-07-10', 2, 14),
('2025-07-10', 2, 15)

--SELECT * FROM [Subject]
--SELECT * FROM [Chapter]
--SELECT * FROM [Topic]
--SELECT * FROM [Question]
--SELECT * FROM [User]
--SELECT * FROM [Comment]
--SELECT * FROM [BoughtSubject]
--SELECT * FROM [Progress]
--SELECT * FROM [ChapterProgress]
--SELECT * FROM [TopicProgress]
--SELECT * FROM [Achievement]
--SELECT * FROM [AccomplishAchievement]
--SELECT * FROM [Following]
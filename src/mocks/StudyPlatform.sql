
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
('Chemistry', 'https://i.pinimg.com/736x/ad/a8/b7/ada8b78b5d1fbf18ca2c9ea379070e42.jpg', 800000, '2024-03-05', '2025-05-25')

INSERT INTO [Chapter] (Number, Name, SubjectId) VALUES
(1, 'Calculus', 1),
(2, 'Comparison', 1),
(3, 'Sorting', 1),
(1, 'Velocity, Time And Distance', 2),
(2, 'Force And Gravity', 2),
(1, 'Electromagnetism', 3),
(2, 'Organic Chemistry', 3)

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
(2, 'C12H22O11', 6)

--INSERT INTO [Question] (Number, Type, Question, CorrectAnswer, Answers, Explanation, Note, TopicId) VALUES
--(1, 'Multiple Choice', 'What is 3 + 2?', '5', '7@@6@@5@@8', '3 + 2 equals 5 because you add 3 and 2 together.', 'Basic addition', 1),
--(2, 'Text Answer', 'Fill in the blank: 4 + _ = 7', '3', '2@@3@@4@@5', 'To find the missing number, you subtract 4 from 7. 7 - 4 = 3.', 'Simple addition', 1),
--(3, 'Multiple Choice', 'Which number is greater: 8 or 5?', '8', '8@@5', '8 is greater than 5 because 8 is a larger number.', 'Number comparison', 1),
--(4, 'Sorting', 'Arrange the numbers in ascending order: 5, 3, 8, 2', '2, 3, 5, 8', '2, 3, 5, 8@@3, 5, 8, 2@@8, 5, 3, 2@@5, 2, 3, 8', 'Ascending order means arranging numbers from the smallest to the largest.', 'Number sequencing', 1),
--(5, 'Sorting', 'Arrange the numbers in descending order: 7, 2, 9, 5', '9, 7, 5, 2', '9, 7, 5, 2@@2, 5, 7, 9@@9, 7, 2, 5@@7, 5, 2, 9', 'Descending order means arranging numbers from the largest to the smallest.', 'Number sequencing', 1),
--(6, 'Text Answer', 'Fill in the blank: 10 - _ = 6', '4', '3@@5@@6@@4', 'To find the missing number, subtract 6 from 10. 10 - 6 = 4.', 'Simple subtraction', 1),
--(7, 'Multiple Choice', 'What is 6 + 3?', '9', '8@@9@@7@@6', '6 + 3 equals 9 because adding 6 and 3 gives you 9.', 'Basic addition', 1),
--(8, 'Multiple Choice', 'What is the number that comes after 10?', '11', '11@@9@@10@@12', 'The number after 10 is 11.', 'Basic counting', 1),
--(9, 'Text Answer', 'Fill in the blank: _ + 5 = 9', '4', '6@@3@@4@@5', 'To find the missing number, subtract 5 from 9. 9 - 5 = 4.', 'Simple addition', 1),
--(10, 'Multiple Choice', 'Which number is smaller: 4 or 6?', '4', '4@@6', '4 is smaller than 6 because 4 is less than 6.', 'Number comparison', 1);
-- Addition (TopicId = 1)
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
(10, 'Multiple Choice', 'Arrange in descending order: 0, 2, 1, 3', '3, 2, 1, 0', '0, 2, 1, 3@@2, 1, 3, 0@@3, 2, 1, 0@@1, 0, 2, 3', '', 'Regular', 10);


INSERT INTO [User] (Name, Image, Username, Password, Role, Type, CuratorId, Email, Point, LastOnline, JoinedDate, DayStreak, HighestDayStreak) VALUES
(N'Đặng Ngọc Hải Triều', 'https://i.pinimg.com/736x/e7/10/17/e7101751e85d4960b039adc0cffada4f.jpg', 'haitrieu', '123456', 'Student', 'Regular', null, 'haitrieu@example.com', 108900, '2024-07-01', '2024-06-01', 880, 880),
(N'Nguyễn Xuân Trường', 'https://i.pinimg.com/736x/af/2e/45/af2e450dee86885b777c32b584f15ed5.jpg', 'xuantruong', '123456', 'Student', 'VIP', null, 'xuantruong@example.com', 15070, '2024-07-01', '2024-06-02', 7, 1200),
('Mountain Daddy', 'https://i.pinimg.com/736x/e2/7c/dd/e27cdd4e412c291955ab8e817df46be2.jpg', 'mountain', '123456', 'Parent', 'Regular', null, 'mountain@example.com', 2000000, '2024-07-01', '2024-06-03', 0, 0),
('Admin Trieu', 'https://i.pinimg.com/736x/f2/24/cb/f224cb341f23ac57d8508b0035ac6554.jpg', 'admin', '123456', 'Admin', 'Regular', NULL, 'admin@example.com', 0, '2024-07-01', '2024-06-04', 0, 0),
('Teacher Trieu', 'https://i.pinimg.com/736x/0a/32/52/0a325220d9212e51e6fd98b42f99c1b0.jpg', 'teacher', '123456', 'Teacher', 'Regular', NULL, 'teacher@example.com', 0, '2024-07-01', '2025-06-01', 0, 0),
('Tester Trieu', 'https://i.pinimg.com/736x/cc/9e/bd/cc9ebdead570cc7b070dfd23d7bf4351.jpg', 'tester', '123456', 'Student', 'Regular', 3, 'tester@example.com', 100000, '2024-07-01', '2024-06-02', 100, 1000)
UPDATE [User] SET CuratorId = 3 WHERE Id = 1;

INSERT INTO [Comment] (Content, Answer, CommentDate, QuestionId, UserId) VALUES
('Good explanation', null, '2025-06-01 14:30:00', 1, 1),
('Disagree with answer', 1, '2025-06-02 14:30:00', 2, 1),
('Clear solution', 2, '2025-06-03 14:30:00', 3, 1),
('Needs more detail', 2, '2025-06-04 14:30:00', 4, 1),
('Useful note', 3, '2025-06-05 14:30:00', 5, 1)

INSERT INTO [BoughtSubject] (PurchaseDate, Feedback, Rating, SubjectId, UserId) VALUES
('2025-01-10', 'Great Math course', 5, 1, 1),
('2025-01-10', 'Great Physics course', 4, 2, 1),
('2025-02-15', 'Very informative', 5, 2, 2),
('2025-03-20', 'Needs more examples', 3, 3, 3),
('2025-04-25', 'Excellent content', 4, 2, 4),
('2025-05-30', 'Highly recommended', 5, 3, 5)

INSERT INTO [Progress] (Chapter, Topic, BoughtSubjectId) VALUES
(2, 1, 1),
(1, 1, 2),
(1, 1, 3),
(1, 1, 4),
(1, 1, 5),
(1, 1, 6)

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
('2025-06-03', 1, 3),
('2025-06-04', 1, 4),
('2025-06-05', 4, 3)

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
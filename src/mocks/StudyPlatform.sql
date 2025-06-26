
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

-- Table: [Subject]
CREATE TABLE [Subject] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    Name			NVARCHAR(255),
    Price			INT,
    UploadDate		DATE,
    LastEditDate	DATE
);

-- Table: [Chapter]
CREATE TABLE [Chapter] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    Number			INT,
    Name			NVARCHAR(255),
    SubjectId		INT FOREIGN KEY REFERENCES [Subject](Id)
);

-- Table: [Topic]
CREATE TABLE [Topic] (
    Id			INT PRIMARY KEY IDENTITY(1,1),
    Number		INT,
    Name		NVARCHAR(255),
    ChapterId	INT FOREIGN KEY REFERENCES [Chapter](Id)
);

-- Table: [Question]
CREATE TABLE [Question] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    Number			INT,
    Type			NVARCHAR(255),
    Question		NVARCHAR(255),
    CorrectAnswer	NVARCHAR(255),
    Answers			NVARCHAR(255),
    Explaination	NVARCHAR(255),
    Note			NVARCHAR(255),
    TopicId			INT FOREIGN KEY REFERENCES [Topic](Id)
);

-- Table: [User]
CREATE TABLE [User] (
    Id					INT PRIMARY KEY IDENTITY(1,1),
    Name				NVARCHAR(255),
    Username			NVARCHAR(255),
    Password			NVARCHAR(255),
    Role				NVARCHAR(255),
    CuratorId			INT,
    Email				NVARCHAR(255),
    Point				INT,
    JoinedDate			DATE,
    DayStreak			INT,
    HighestDayStreak	INT
);

-- Table: [Comment]
CREATE TABLE [Comment] (
    Id			INT PRIMARY KEY IDENTITY(1,1),
    Content		NVARCHAR(255),
    Answer		INT,
    CommentDate DATE,
    QuestionId	INT FOREIGN KEY REFERENCES [Question](Id),
    UserId		INT FOREIGN KEY REFERENCES [User](Id)
);

-- Table: [BoughtSubject]
CREATE TABLE [BoughtSubject] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    PurchaseDate	DATE,
    Feedback		NVARCHAR(255),
    SubjectId		INT FOREIGN KEY REFERENCES [Subject](Id),
    UserId			INT FOREIGN KEY REFERENCES [User](Id)
);

-- Table: [Progress]
CREATE TABLE [Progress] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    Chapter			INT,
    Topic			INT,
    BoughtSubjectId	INT FOREIGN KEY REFERENCES [BoughtSubject](Id)
);

-- Table: [TopicProgress]
CREATE TABLE [TopicProgress] (
    Id			INT PRIMARY KEY IDENTITY(1,1),
    Score		INT,
    StartDate	DATE,
    UserId		INT FOREIGN KEY REFERENCES [User](Id),
    TopicId		INT FOREIGN KEY REFERENCES [Topic](Id)
);

-- Table: [Achievement]
CREATE TABLE [Achievement] (
    Id			INT PRIMARY KEY IDENTITY(1,1),
    Name		NVARCHAR(255),
    Description	NVARCHAR(255)
);

-- Table: [AccomplishAchievement]
CREATE TABLE [AccomplishAchievement] (
    Id				INT PRIMARY KEY IDENTITY(1,1),
    Progress		INT,
    AchieveDate		DATE,
    Status			INT,
    AchievementId	INT FOREIGN KEY REFERENCES [Achievement](Id),
    UserId			INT FOREIGN KEY REFERENCES [User](Id)
);

-- Table: [Following]
CREATE TABLE [Following] (
    Id			INT PRIMARY KEY IDENTITY(1,1),
    FollowDate	DATE,
    FollowingId	INT FOREIGN KEY REFERENCES [User](Id),
    UserId		INT FOREIGN KEY REFERENCES [User](Id)
);

-- Table: [Subject]
INSERT INTO [Subject] (Name, Price, UploadDate, LastEditDate) VALUES
('Mathematics', 600000, '2024-01-15', '2025-05-20'),
('Physics', 700000, '2024-02-10', '2025-06-01'),
('Chemistry', 800000, '2024-03-05', '2025-05-25')

-- Table: [Chapter]
INSERT INTO [Chapter] (Number, Name, SubjectId) VALUES
(1, 'Calculus', 1),
(2, 'Comparison', 1),
(3, 'Sorting', 1),
(1, 'Velocity, Time And Distance', 2),
(2, 'Force And Gravity', 2),
(1, 'Electromagnetism', 3),
(2, 'Organic Chemistry', 3)

-- Table: [Topic]
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
(1, 'Hydrocarbons', 6)

-- Table: [Question]
--INSERT INTO [Question] (Number, Type, Question, CorrectAnswer, Answers, Explaination, Note, TopicId) VALUES
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
INSERT INTO [Question] (Number, Type, Question, CorrectAnswer, Answers, Explaination, Note, TopicId) VALUES
(1, 'Multiple Choice', 'What is 2 + 3?', '5', '6@@3@@5@@4', '', '', 1),
(2, 'Multiple Choice', 'What is 1 + 6?', '7', '5@@8@@7@@6', '', '', 1),
(3, 'Multiple Choice', 'What is 4 + 5?', '9', '10@@9@@7@@8', '', '', 1),
(4, 'Multiple Choice', 'What is 3 + 3?', '6', '7@@6@@5@@4', '', '', 1),
(5, 'Multiple Choice', 'What is 0 + 8?', '8', '6@@9@@7@@8', '', '', 1),
(6, 'Multiple Choice', 'What is 6 + 2?', '8', '6@@8@@9@@7', '', '', 1),
(7, 'Multiple Choice', 'What is 5 + 4?', '9', '8@@9@@7@@10', '', '', 1),
(8, 'Multiple Choice', 'What is 7 + 2?', '9', '9@@7@@8@@10', '', '', 1),
(9, 'Multiple Choice', 'What is 9 + 1?', '10', '9@@8@@10@@11', '', '', 1),
(10, 'Multiple Choice', 'What is 8 + 3?', '11', '11@@12@@9@@10', '', '', 1),

(1, 'Multiple Choice', 'What is 5 - 2?', '3', '2@@3@@4@@1', '', '', 2),
(2, 'Multiple Choice', 'What is 8 - 3?', '5', '3@@6@@5@@4', '', '', 2),
(3, 'Multiple Choice', 'What is 10 - 7?', '3', '2@@5@@3@@4', '', '', 2),
(4, 'Multiple Choice', 'What is 6 - 1?', '5', '4@@3@@5@@6', '', '', 2),
(5, 'Multiple Choice', 'What is 9 - 4?', '5', '5@@6@@3@@4', '', '', 2),
(6, 'Multiple Choice', 'What is 7 - 2?', '5', '4@@3@@6@@5', '', '', 2),
(7, 'Multiple Choice', 'What is 4 - 1?', '3', '2@@3@@1@@4', '', '', 2),
(8, 'Multiple Choice', 'What is 6 - 3?', '3', '3@@2@@5@@4', '', '', 2),
(9, 'Multiple Choice', 'What is 10 - 5?', '5', '5@@3@@4@@6', '', '', 2),
(10, 'Multiple Choice', 'What is 3 - 2?', '1', '1@@2@@0@@3', '', '', 2),

(1, 'Multiple Choice', 'What is 2 x 3?', '6', '6@@7@@4@@5', '', '', 3),
(2, 'Multiple Choice', 'What is 4 x 2?', '8', '6@@8@@9@@7', '', '', 3),
(3, 'Multiple Choice', 'What is 5 x 3?', '15', '12@@10@@15@@18', '', '', 3),
(4, 'Multiple Choice', 'What is 6 x 2?', '12', '12@@14@@10@@8', '', '', 3),
(5, 'Multiple Choice', 'What is 3 x 3?', '9', '6@@7@@9@@8', '', '', 3),
(6, 'Multiple Choice', 'What is 7 x 1?', '7', '6@@7@@9@@8', '', '', 3),
(7, 'Multiple Choice', 'What is 2 x 8?', '16', '14@@18@@12@@16', '', '', 3),
(8, 'Multiple Choice', 'What is 9 x 1?', '9', '10@@9@@8@@7', '', '', 3),
(9, 'Multiple Choice', 'What is 4 x 3?', '12', '11@@10@@14@@12', '', '', 3),
(10, 'Multiple Choice', 'What is 5 x 2?', '10', '8@@12@@9@@10', '', '', 3),

(1, 'Multiple Choice', 'What is 6 / 2?', '3', '2@@5@@4@@3', '', '', 4),
(2, 'Multiple Choice', 'What is 8 / 4?', '2', '2@@3@@4@@1', '', '', 4),
(3, 'Multiple Choice', 'What is 9 / 3?', '3', '5@@4@@2@@3', '', '', 4),
(4, 'Multiple Choice', 'What is 12 / 4?', '3', '5@@4@@3@@2', '', '', 4),
(5, 'Multiple Choice', 'What is 15 / 5?', '3', '4@@3@@5@@2', '', '', 4),
(6, 'Multiple Choice', 'What is 10 / 2?', '5', '4@@3@@6@@5', '', '', 4),
(7, 'Multiple Choice', 'What is 14 / 2?', '7', '6@@5@@7@@8', '', '', 4),
(8, 'Multiple Choice', 'What is 16 / 4?', '4', '3@@5@@2@@4', '', '', 4),
(9, 'Multiple Choice', 'What is 18 / 3?', '6', '4@@3@@5@@6', '', '', 4),
(10, 'Multiple Choice', 'What is 20 / 5?', '4', '4@@5@@2@@3', '', '', 4);

INSERT INTO [Question] (Number, Type, Question, CorrectAnswer, Answers, Explaination, Note, TopicId) VALUES
(1, 'Multiple Choice', 'Which number is greater: 4 or 6?', '6', '4@@6', '', '', 5),
(2, 'Multiple Choice', 'Which number is smaller: 7 or 3?', '3', '7@@3', '', '', 5),
(3, 'Multiple Choice', 'Which number is greater: 9 or 2?', '9', '9@@2', '', '', 5),
(4, 'Multiple Choice', 'Which number is smaller: 5 or 8?', '5', '5@@8', '', '', 5),
(5, 'Multiple Choice', 'Which number is greater: 10 or 10?', '10', '10@@10', '', '', 5),
(6, 'Multiple Choice', 'Which number is smaller: 0 or 1?', '0', '0@@1', '', '', 5),
(7, 'Multiple Choice', 'Which number is greater: 12 or 11?', '12', '12@@11', '', '', 5),
(8, 'Multiple Choice', 'Which number is smaller: 20 or 19?', '19', '20@@19', '', '', 5),
(9, 'Multiple Choice', 'Which number is greater: 15 or 18?', '18', '15@@18', '', '', 5),
(10, 'Multiple Choice', 'Which number is smaller: 25 or 30?', '25', '25@@30', '', '', 5),

(1, 'Multiple Choice', 'Which is the greatest number: 3, 7, 2, 5?', '7', '3@@7@@2@@5', '', '', 6),
(2, 'Multiple Choice', 'Which is the greatest number: 8, 6, 4, 9?', '9', '6@@9@@8@@4', '', '', 6),
(3, 'Multiple Choice', 'Which is the greatest number: 1, 3, 0, 2?', '3', '2@@1@@0@@3', '', '', 6),
(4, 'Multiple Choice', 'Which is the greatest number: 12, 15, 11, 14?', '15', '14@@11@@15@@12', '', '', 6),
(5, 'Multiple Choice', 'Which is the greatest number: 10, 20, 30, 40?', '40', '20@@10@@40@@30', '', '', 6),
(6, 'Multiple Choice', 'Which is the greatest number: 5, 9, 8, 6?', '9', '5@@6@@8@@9', '', '', 6),
(7, 'Multiple Choice', 'Which is the greatest number: 13, 17, 15, 16?', '17', '17@@15@@13@@16', '', '', 6),
(8, 'Multiple Choice', 'Which is the greatest number: 22, 18, 25, 19?', '25', '22@@25@@18@@19', '', '', 6),
(9, 'Multiple Choice', 'Which is the greatest number: 31, 33, 32, 30?', '33', '31@@30@@32@@33', '', '', 6),
(10, 'Multiple Choice', 'Which is the greatest number: 45, 44, 46, 43?', '46', '45@@43@@44@@46', '', '', 6),

(1, 'Multiple Choice', 'Which is the smallest number: 3, 7, 2, 5?', '2', '3@@7@@2@@5', '', '', 7),
(2, 'Multiple Choice', 'Which is the smallest number: 8, 6, 4, 9?', '4', '6@@9@@8@@4', '', '', 7),
(3, 'Multiple Choice', 'Which is the smallest number: 1, 3, 0, 2?', '0', '2@@1@@0@@3', '', '', 7),
(4, 'Multiple Choice', 'Which is the smallest number: 12, 15, 11, 14?', '11', '14@@11@@15@@12', '', '', 7),
(5, 'Multiple Choice', 'Which is the smallest number: 10, 20, 30, 40?', '10', '20@@10@@40@@30', '', '', 7),
(6, 'Multiple Choice', 'Which is the smallest number: 5, 9, 8, 6?', '5', '5@@6@@8@@9', '', '', 7),
(7, 'Multiple Choice', 'Which is the smallest number: 13, 17, 15, 16?', '13', '17@@15@@13@@16', '', '', 7),
(8, 'Multiple Choice', 'Which is the smallest number: 22, 18, 25, 19?', '18', '22@@25@@18@@19', '', '', 7),
(9, 'Multiple Choice', 'Which is the smallest number: 31, 33, 32, 30?', '30', '31@@30@@32@@33', '', '', 7),
(10, 'Multiple Choice', 'Which is the smallest number: 45, 44, 46, 43?', '43', '45@@43@@44@@46', '', '', 7),

(1, 'Multiple Choice', 'Fill in the blank: 10 > 9 > ? > 7', '8', '7@@8@@9@@6', '', '', 8),
(2, 'Multiple Choice', 'Fill in the blank: 5 < 6 < ? < 8', '7', '6@@8@@7@@9', '', '', 8),
(3, 'Multiple Choice', 'Fill in the blank: 12 > 11 > ? > 9', '10', '10@@11@@12@@8', '', '', 8),
(4, 'Multiple Choice', 'Fill in the blank: 3 < 4 < ? < 6', '5', '5@@6@@3@@4', '', '', 8),
(5, 'Multiple Choice', 'Fill in the blank: 20 > 18 > ? > 16', '17', '16@@17@@18@@19', '', '', 8),
(6, 'Multiple Choice', 'Fill in the blank: 1 < 2 < ? < 4', '3', '4@@3@@1@@2', '', '', 8),
(7, 'Multiple Choice', 'Fill in the blank: 30 > 28 > ? > 26', '27', '27@@28@@29@@26', '', '', 8),
(8, 'Multiple Choice', 'Fill in the blank: 0 < 1 < ? < 3', '2', '2@@3@@1@@0', '', '', 8),
(9, 'Multiple Choice', 'Fill in the blank: 15 > 14 > ? > 12', '13', '12@@14@@13@@15', '', '', 8),
(10, 'Multiple Choice', 'Fill in the blank: 6 < 7 < ? < 9', '8', '6@@9@@7@@8', '', '', 8);

INSERT INTO [Question] (Number, Type, Question, CorrectAnswer, Answers, Explaination, Note, TopicId) VALUES
(1, 'Multiple Choice', 'Arrange in ascending order: 4, 2, 5, 1', '1, 2, 4, 5', '4, 2, 5, 1@@1, 2, 4, 5@@5, 4, 2, 1@@2, 1, 4, 5', '', '', 9),
(2, 'Multiple Choice', 'Arrange in ascending order: 7, 3, 6, 2', '2, 3, 6, 7', '6, 2, 3, 7@@2, 3, 6, 7@@7, 6, 3, 2@@3, 2, 6, 7', '', '', 9),
(3, 'Multiple Choice', 'Arrange in ascending order: 9, 5, 8, 6', '5, 6, 8, 9', '9, 5, 8, 6@@6, 8, 9, 5@@5, 6, 8, 9@@8, 5, 6, 9', '', '', 9),
(4, 'Multiple Choice', 'Arrange in ascending order: 10, 8, 7, 9', '7, 8, 9, 10', '10, 9, 8, 7@@9, 10, 7, 8@@8, 7, 10, 9@@7, 8, 9, 10', '', '', 9),
(5, 'Multiple Choice', 'Arrange in ascending order: 3, 1, 2, 0', '0, 1, 2, 3', '3, 2, 1, 0@@1, 0, 3, 2@@0, 1, 2, 3@@2, 0, 1, 3', '', '', 9),
(6, 'Multiple Choice', 'Arrange in ascending order: 12, 14, 11, 13', '11, 12, 13, 14', '14, 12, 13, 11@@12, 11, 14, 13@@11, 12, 13, 14@@13, 11, 12, 14', '', '', 9),
(7, 'Multiple Choice', 'Arrange in ascending order: 5, 7, 6, 8', '5, 6, 7, 8', '6, 7, 8, 5@@8, 6, 5, 7@@5, 6, 7, 8@@7, 5, 6, 8', '', '', 9),
(8, 'Multiple Choice', 'Arrange in ascending order: 15, 12, 13, 14', '12, 13, 14, 15', '15, 12, 13, 14@@13, 14, 12, 15@@12, 13, 14, 15@@14, 15, 13, 12', '', '', 9),
(9, 'Multiple Choice', 'Arrange in ascending order: 20, 18, 19, 17', '17, 18, 19, 20', '18, 20, 17, 19@@20, 19, 18, 17@@19, 18, 17, 20@@17, 18, 19, 20', '', '', 9),
(10, 'Multiple Choice', 'Arrange in ascending order: 0, 2, 1, 3', '0, 1, 2, 3', '2, 1, 3, 0@@0, 2, 1, 3@@1, 0, 2, 3@@0, 1, 2, 3', '', '', 9),

(1, 'Multiple Choice', 'Arrange in descending order: 4, 2, 5, 1', '5, 4, 2, 1', '1, 2, 4, 5@@5, 4, 2, 1@@4, 5, 1, 2@@2, 1, 5, 4', '', '', 10),
(2, 'Multiple Choice', 'Arrange in descending order: 7, 3, 6, 2', '7, 6, 3, 2', '2, 3, 6, 7@@6, 3, 2, 7@@3, 2, 7, 6@@7, 6, 3, 2', '', '', 10),
(3, 'Multiple Choice', 'Arrange in descending order: 9, 5, 8, 6', '9, 8, 6, 5', '6, 8, 9, 5@@9, 8, 6, 5@@8, 5, 9, 6@@5, 6, 8, 9', '', '', 10),
(4, 'Multiple Choice', 'Arrange in descending order: 10, 8, 7, 9', '10, 9, 8, 7', '7, 8, 9, 10@@9, 10, 7, 8@@10, 9, 8, 7@@8, 7, 10, 9', '', '', 10),
(5, 'Multiple Choice', 'Arrange in descending order: 3, 1, 2, 0', '3, 2, 1, 0', '1, 0, 3, 2@@2, 0, 1, 3@@3, 2, 1, 0@@0, 1, 2, 3', '', '', 10),
(6, 'Multiple Choice', 'Arrange in descending order: 12, 14, 11, 13', '14, 13, 12, 11', '12, 11, 14, 13@@11, 12, 13, 14@@13, 11, 12, 14@@14, 13, 12, 11', '', '', 10),
(7, 'Multiple Choice', 'Arrange in descending order: 5, 7, 6, 8', '8, 7, 6, 5', '6, 7, 8, 5@@7, 5, 6, 8@@8, 7, 6, 5@@5, 6, 7, 8', '', '', 10),
(8, 'Multiple Choice', 'Arrange in descending order: 15, 12, 13, 14', '15, 14, 13, 12', '13, 14, 12, 15@@12, 13, 14, 15@@14, 15, 13, 12@@15, 14, 13, 12', '', '', 10),
(9, 'Multiple Choice', 'Arrange in descending order: 20, 18, 19, 17', '20, 19, 18, 17', '18, 20, 17, 19@@19, 18, 17, 20@@17, 18, 19, 20@@20, 19, 18, 17', '', '', 10),
(10, 'Multiple Choice', 'Arrange in descending order: 0, 2, 1, 3', '3, 2, 1, 0', '0, 2, 1, 3@@2, 1, 3, 0@@3, 2, 1, 0@@1, 0, 2, 3', '', '', 10);


-- Table: [User]
INSERT INTO [User] (Name, Username, Password, Role, CuratorId, Email, Point, JoinedDate, DayStreak, HighestDayStreak) VALUES
('John Doe', 'jdoe', 'pass123', 'Student', NULL, 'jdoe@example.com', 100, '2024-06-01', 5, 10),
('Jane Smith', 'jsmith', 'pass456', 'Student', NULL, 'jsmith@example.com', 150, '2024-06-02', 7, 12),
('Alice Brown', 'abrown', 'pass789', 'Curator', 1, 'abrown@example.com', 200, '2024-06-03', 3, 8),
('Bob Johnson', 'bjohnson', 'pass101', 'Student', NULL, 'bjohnson@example.com', 120, '2024-06-04', 4, 9),
('Carol White', 'cwhite', 'pass112', 'Student', NULL, 'cwhite@example.com', 180, '2025-06-01', 6, 11)

-- Table: [Comment]
INSERT INTO [Comment] (Content, Answer, CommentDate, QuestionId, UserId) VALUES
('Good explanation', null, '2025-06-01', 1, 1),
('Disagree with answer', 1, '2025-06-02', 2, 1),
('Clear solution', 2, '2025-06-03', 3, 1),
('Needs more detail', 2, '2025-06-04', 4, 1),
('Useful note', 3, '2025-06-05', 5, 1)

-- Table: [BoughtSubject]
INSERT INTO [BoughtSubject] (PurchaseDate, Feedback, SubjectId, UserId) VALUES
('2025-01-10', 'Great course', 1, 1),
('2025-02-15', 'Very informative', 2, 2),
('2025-03-20', 'Needs more examples', 3, 3),
('2025-04-25', 'Excellent content', 2, 4),
('2025-05-30', 'Highly recommended', 3, 5)

-- Table: [Progress]
INSERT INTO [Progress] (Chapter, Topic, BoughtSubjectId) VALUES
(2, 1, 1)

-- Table: [TopicProgress]
INSERT INTO [TopicProgress] (Score, StartDate, UserId, TopicId) VALUES
(85, '2025-06-01', 1, 1),
(90, '2025-06-02', 2, 2),
(88, '2025-06-03', 3, 3),
(92, '2025-06-04', 4, 4),
(87, '2025-06-05', 5, 5)

-- Table: [Achievement]
INSERT INTO [Achievement] (Name, Description) VALUES
('Beginer', 'Completed first chapter'),
('Intermediate', 'Completed five topics'),
('Advanced', 'Scored 90+ in quiz'),
('Expert', 'Completed all subjects'),
('Master', 'Highest streak achieved')

-- Table: [AccomplishAchievement]
INSERT INTO [AccomplishAchievement] (Progress, AchieveDate, Status, AchievementId, UserId) VALUES
(85, '2025-06-01', 1, 1, 1),
(90, '2025-06-02', 1, 2, 2),
(88, '2025-06-03', 1, 3, 3),
(92, '2025-06-04', 1, 4, 4),
(87, '2025-06-05', 1, 5, 5)

-- Table: [Following]
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
--SELECT * FROM [TopicProgress]
--SELECT * FROM [Achievement]
--SELECT * FROM [AccomplishAchievement]
--SELECT * FROM [Following]
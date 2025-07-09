import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchData, patchData, postData, putData } from '../../../mocks/CallingAPI.js';
import Button from '../../components/Button.jsx';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import Loading from '../../layouts/Loading/Loading.jsx';
import MultipleForm from './Form/MultipleForm.jsx';
import './Studying.css';

export default function Studying() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const formRef = useRef(null);
    const location = useLocation();
    const Params = useParams();

    const TopicId = location.state;
    console.log('TopicId', TopicId);
    const IsTopic = !(String(TopicId).includes('-')) && !(String(TopicId).includes('+'));
    const IsQuiz = String(TopicId).includes('-');
    const IsAdvanced = String(TopicId).includes('+');
    console.log('IsTopic', IsTopic);

    const ChapterId = Params.chapter;
    console.log('ChapterId', ChapterId);


    const [QUESTIONs, setQUESTIONs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [Order, setOrder] = useState(0);
    const [QuizProgress, setQuizProgress] = useState(new Array(QUESTIONs.length).fill(null));

    const [SelectedAnswer, setSelectedAns] = useState(null);

    useEffect(() => {
        // const token = user?.token; // === FIX ===
        const token = '';
        const fetchDataTopicAPI = async () => {
            try {
                const questionData = await fetchData(`api/topic/${TopicId}`, token);
                console.log('questionData', questionData);
                setQUESTIONs(questionData.questions.filter(q => q.note == 'Regular'));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        const fetchDataQuizAPI = async () => {
            try {
                const chapterData = await fetchData(`api/chapter/${ChapterId}`, token);
                const allQuestions = chapterData.topics.flatMap(topic => topic.questions);
                const random10Questions = allQuestions
                    .map(question => ({ ...question, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .filter((_, index) => index < 10)
                    .map(({ sort, ...rest }) => rest);
                setQUESTIONs(random10Questions);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        const fetchDataAdvancedAPI = async () => {
            try {
                const chapterData = await fetchData(`api/chapter/${ChapterId}`, token);
                const allQuestions = chapterData.topics.flatMap(topic => topic.questions.filter(q => q.note == 'Advanced'));
                const random10Questions = allQuestions
                    .map(question => ({ ...question, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .filter((_, index) => index < 10)
                    .map(({ sort, ...rest }) => rest);
                setQUESTIONs(random10Questions);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (IsTopic) fetchDataTopicAPI();
        else if (IsQuiz) fetchDataQuizAPI();
        else if (IsAdvanced) fetchDataAdvancedAPI();
    }, [TopicId]);

    const handleChangeQuestion = () => {
        console.log('Change Question');
        formRef.current.reset();
        setOrder(p => p + 1);
        setSelectedAns(null);
    };

    const handleCheckQuestion = (e) => {
        e.preventDefault();
        console.log('handleCheckQuestion');
        if (SelectedAnswer == null) return;

        const NewQuizProgress = [...QuizProgress];
        if (SelectedAnswer == QUESTIONs[Order].correctAnswer) {
            NewQuizProgress[Order] = true;
            console.log('Status: ', true);
        } else {
            NewQuizProgress[Order] = false;
            console.log('Status: ', false);
        }
        setQuizProgress(NewQuizProgress);
        console.log('SelectedAnswer: ', SelectedAnswer);
    };

    const updateDataAPI = async (Percent, CorrectCount) => {
        const TopicProgressData = {
            score: Percent,
            userId: Number(user?.id),
            topicId: String(TopicId).split('-')[0].split('+')[0],
            note: 'Topic',
        };
        console.log('TopicProgressData:', TopicProgressData);

        const ChapterProgressData = {
            score: Percent,
            userId: Number(user?.id),
            chapterId: ChapterId,
            note: IsQuiz ? 'Quiz' : (IsAdvanced ? 'Advanced' : 'Error'),
        };
        console.log('ChapterProgressData:', ChapterProgressData);

        // const token = user?.token; // === FIX ===
        const token = '';
        try {
            // Lưu lịch sử vào Chapter/Topic Progress
            if (IsTopic) {
                const updatedTopicProgressData = await postData(`api/topicprogress`, TopicProgressData, token);
                console.log('updatedTopicProgressData', updatedTopicProgressData);
            }
            else if (IsQuiz || IsAdvanced) {
                const updatedChapterProgressData = await postData(`api/chapterprogress`, ChapterProgressData, token);
                console.log('updatedChapterProgressData', updatedChapterProgressData);
            }

            // Lấy tiến trình hiện tại của Subject đó
            const SubjectId = localStorage.getItem('SubjectId');
            const boughtSubjectData = await fetchData(`api/boughtsubject/user/${user.id}`, token);
            const currentProgressData = await fetchData(`api/progress/boughtsubject/${boughtSubjectData.find(bs => bs.subjectId == SubjectId).id}`, token);
            console.log('currentProgressData', currentProgressData);

            if (Percent >= 10) {
                const chapters = await fetchData(`api/chapter`);
                const chapter = chapters.find(c => c.id == ChapterId);

                if (IsTopic) {
                    // Nếu đang ở Topic có Topic.number bằng với Process.Topic và Chapter.number bằng với Process.Chapter, không phải Quiz, thì cộng tiến trình Topic lên 1
                    console.log('It is a Topic');
                    const topic = await fetchData(`api/topic/${TopicId}`);

                    if (chapter.number == currentProgressData.chapter && topic.number == currentProgressData.topic) {
                        console.log('Current Topic');
                        const newProgressData = {
                            chapter: currentProgressData.chapter,
                            topic: currentProgressData.topic + 1,
                        };
                        console.log('newProgressData:', newProgressData);

                        await patchData(`api/progress?id=${currentProgressData.id}`, newProgressData, token);

                    } else console.log('Not current Topic');
                }
                else if (IsQuiz) {
                    // Nếu đang ở Quiz của Chapter có number trùng với Process.Chapter thì mở khóa Chapter mới, đưa tiến trình Topic về 1
                    console.log('It is a Quiz');

                    if (chapter.number == currentProgressData.chapter) {
                        console.log('Current Quiz');
                        const newProgressData = {
                            chapter: currentProgressData.chapter + 1,
                            topic: 1,
                        };
                        console.log('newProgressData:', newProgressData);

                        await patchData(`api/progress?id=${currentProgressData.id}`, newProgressData, token);

                    } else console.log('Not current Chapter');
                } else console.log('Not Quiz or Topic');
            } else console.log('Percent < 10%');

            const UserData = await fetchData(`api/user/${user?.id}`, token);
            const newPoint = UserData.point + CorrectCount * 10;
            const newLastOnline = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Bangkok' }).split('T')[0];
            let newDayStreak = UserData.dayStreak + 1;
            let newHighestDayStreak = UserData.highestDayStreak;

            const lastOnline = new Date(UserData.lastOnline);
            const today = new Date();
            lastOnline.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            const diffDays = Math.floor((today - lastOnline) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                console.log('Hôm qua online');
                newDayStreak = UserData.dayStreak + 1;
            } else if (diffDays > 1) {
                console.log('Trước hôm qua online');
                newDayStreak = 1;
            } else if (diffDays === 0) {
                console.log('Hôm nay online');
                newDayStreak = UserData.dayStreak;
            } else {
                console.log('Tương lai online?');
            }

            if (newDayStreak > UserData.highestDayStreak) newHighestDayStreak = newDayStreak;

            const UpdatedUserData = {
                name: UserData.name,
                username: UserData.username,
                password: UserData.password,
                role: UserData.role,
                curatorId: UserData.curatorId,
                email: UserData.email,
                point: newPoint, //newPoint
                dayStreak: newDayStreak, //newDayStreak
                highestDayStreak: newHighestDayStreak, //newHighestDayStreak
                image: UserData.image,
                lastOnline: newLastOnline, //newLastOnline
                type: UserData.type,
            };
            console.log('UpdatedUserData:', UpdatedUserData);

            const resultUpdatedUserData = await putData(`api/user?id=${UserData.id}`, UpdatedUserData, token);
            console.log('resultUpdatedUserData', resultUpdatedUserData);

            navigate('/learn');
        } catch (error) {
            console.log('Saving progress failed');
        }
    };

    const CorrectCount = QuizProgress.filter(q => q === true).length;
    const Percent = parseInt(100 * CorrectCount / QUESTIONs.length);
    const handleFinish = () => {
        setLoading(true);
        updateDataAPI(Percent, CorrectCount);
    };

    // useEffect(() => {
    //     if (QUESTIONs?.length <= 0) navigate('/learn');
    // }, []);

    if (loading) return <Loading Size={'Large'} />
    if (QUESTIONs?.length <= 0) navigate('/learn');
    return (
        <div className='studying-container'>
            {Order < QUESTIONs.length ? (
                <div className='card-study'>
                    <div className='heading'>
                        <Link to='/'><i className='fa-solid fa-xmark'></i></Link>
                        <div className='current-question'>Question {Order + 1} of {QUESTIONs.length}</div>
                        <div className='studying-progress'>
                            {[...Array(QUESTIONs.length)].map((_, i) => (
                                <div
                                    key={i}
                                    className='question-order'
                                    style={{
                                        backgroundColor: QuizProgress[i] === true ? '#59d600'
                                            : (QuizProgress[i] === false ? '#ff3333'
                                                : '#eee'
                                            ),
                                        border: `2px solid ${QuizProgress[i] === true ? '#28a745'
                                            : (QuizProgress[i] === false ? '#dc3545'
                                                : '#aaa'
                                            )}`,
                                        boxShadow: i === Order ? `0 0 0 6px ${QuizProgress[i] === true ? '#55cc0066'
                                            : (QuizProgress[i] === false ? '#ff000066'
                                                : '#ddd'
                                            )}`
                                            : 'none',
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className='content'>
                        <form ref={formRef} onSubmit={handleCheckQuestion}>
                            <div className='information'>
                                <div className='question'>{QUESTIONs[Order].question1}</div>
                            </div>
                            {(() => {
                                if (QUESTIONs[Order].type === 'Multiple') {
                                    return <MultipleForm Question={QUESTIONs[Order]} Status={QuizProgress[Order]} SelectedAnswer={SelectedAnswer} setSelectedAns={setSelectedAns} />
                                } else return (
                                    <MultipleForm Question={QUESTIONs[Order]} Status={QuizProgress[Order]} SelectedAnswer={SelectedAnswer} setSelectedAns={setSelectedAns} />

                                    // <div className='answer-group'>
                                    //     ELSE
                                    //     {RandomAnswers.map((ans, i) => (
                                    //         <label key={i} className='radio-label'>
                                    //             <input
                                    //                 type='radio'
                                    //                 name='choice'
                                    //                 value={ans}
                                    //                 className='hidden-radio'
                                    //             // onChange={handleChange}
                                    //             />
                                    //             <div className={
                                    //                 `radio-box ${QuizProgress[Order] === true ? 'correct-answer'
                                    //                     : (QuizProgress[Order] === false ? 'incorrect-answer'
                                    //                         : '')
                                    //                 }`
                                    //             }>{ans}</div>
                                    //         </label>
                                    //     ))}
                                    // </div>
                                )
                            })()}
                            <div className={`check-result ${QuizProgress[Order] === true ? 'correct-result'
                                : (QuizProgress[Order] === false ? 'incorrect-result'
                                    : '')
                                }`
                            }>
                                <div className='result-status'>
                                    {QuizProgress[Order] == null ? <i className='fa-solid fa-ellipsis'></i>
                                        : (QuizProgress[Order] === true ?
                                            <>
                                                <i className='fa-solid fa-circle-check'></i>
                                                <div className='text-status'>Correct</div>
                                            </>
                                            :
                                            <>
                                                <i className='fa-solid fa-circle-xmark'></i>
                                                <div className='text-explanation'>{QUESTIONs[Order].explanation || 'No explanation'}</div>
                                            </>
                                        )
                                    }
                                </div>
                                <div>
                                    <Button
                                        width={'200px'}
                                        height={'52px'}
                                        border={'6px'}
                                        radius={'16px'}
                                        maincolor={
                                            QuizProgress[Order] == null ? 'white'
                                                : (QuizProgress[Order] === true ? 'correct'
                                                    : (QuizProgress[Order] === false ? 'incorrect'
                                                        : 'white'))
                                        }
                                        active={false}
                                        onToggle={QuizProgress[Order] == null ? handleCheckQuestion : handleChangeQuestion}
                                    >
                                        {QuizProgress[Order] == null ? 'CHECK' : 'CONTINUE'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
                :
                <div className='card-study card-finish'>
                    {Percent === 100 ?
                        <><div className='percent perfect'>{Percent}%</div>
                            <div className='text perfect'>Perfect!</div></> :
                        ((Percent < 100 && Percent >= 80) ?
                            <><div className='percent welldone'>{Percent}%</div>
                                <div className='text welldone'>Well done!</div></> :
                            ((Percent < 80 && Percent >= 50) ?
                                <><div className='percent good'>{Percent}%</div>
                                    <div className='text good'>Good!</div></> :
                                <><div className='percent tryharder'>{Percent}%</div>
                                    <div className='text tryharder'>Try Harder!</div></>
                            ))}
                    <div className='btn-box'>
                        <div className='bonus'>
                            <div className='point'>+{CorrectCount * 10}</div><i className='fa-solid fa-lightbulb'></i>
                        </div>
                        <Button
                            width={'120px'}
                            height={'52px'}
                            border={'6px'}
                            radius={'16px'}
                            maincolor={'correct'}
                            active={false}
                            onToggle={handleFinish}
                        >
                            FINISH
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}

import { useState } from 'react';
import { postData } from '../../../../../mocks/CallingAPI.js';
import Button from '../../../../components/Button.jsx';
import { useAuth } from '../../../../hooks/AuthContext/AuthContext.jsx';
import './BuySubject.css';

export default function BuySubject({ SubjectId, USERs }) {
    const { user } = useAuth();

    const [BuyingStatus, setBuyingStatus] = useState('');
    const [Student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const SubmitBuySubject = async (StudentId) => {

        const BuySubjectData = {
            subjectId: SubjectId,
            userId: StudentId,
            rating: 0,
            feedback: '',
        };
        console.log('BuySubjectData:', BuySubjectData);

        // const token = user?.token;
        const token = '';
        try {
            setBuyingStatus('');
            setLoading(true);
            const resultBuySubject = await postData('api/boughtsubject', BuySubjectData, token);
            console.log('resultBuySubject', resultBuySubject);

            if (resultBuySubject) {
                const ProgressData = {
                    chapter: 1,
                    topic: 1,
                    boughtSubjectId: resultBuySubject?.id,
                };
                console.log('ProgressData:', ProgressData);

                const resultProgress = await postData('api/progress', ProgressData, token);
                console.log('resultProgress', resultProgress);

                console.log('Success');
                setBuyingStatus('Success');
            }
        } catch (error) {
            setBuyingStatus('Fail');
            setError(error);
        } finally {
            console.log('Finish');
            setLoading(false);
        }
    };

    const handleSubmitBuySubject = (Student) => {
        const StudentId = Student;
        console.log({
            StudentId,
        });
        if (!loading) SubmitBuySubject(StudentId);
    }

    return (
        <div className='buysubject-container'>
            <form className='buysubject-form'>
                <select onChange={(e) => setStudent(e.target.value)}>
                    <option value={null}>--Select a student--</option>
                    {USERs.filter(u => user && u.curatorId == user?.id).map((student, i) => (
                        <option key={i} value={student.id}>{student.name}</option>
                    ))}
                </select>
                <div className='btn-box'>
                    <Button
                        width={'fit-content'}
                        height={'40px'}
                        border={'6px'}
                        radius={'12px'}
                        maincolor={'correct'}
                        active={false}
                        onToggle={() => handleSubmitBuySubject(Student)}
                    >
                        <div className='text'>BUY FOR THIS STUDENT</div>
                    </Button>
                    {user?.role == 'Student' &&
                        <Button
                            width={'fit-content'}
                            height={'40px'}
                            border={'6px'}
                            radius={'12px'}
                            maincolor={'edit'}
                            active={false}
                            onToggle={() => handleSubmitBuySubject(user?.id)}
                        >
                            <div className='text'>BUY FOR YOURSELF</div>
                        </Button>
                    }
                </div>
                {BuyingStatus == 'Success' && <div className='buying-status buying-success'>Buying Success</div>}
                {BuyingStatus == 'Fail' && <div className='buying-status buying-fail'>Buying Fail</div>}
            </form>
        </div>
    )
}

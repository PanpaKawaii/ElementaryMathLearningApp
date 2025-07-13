import './ManagerContainer.css';
import SubjectManager from './SubjectManager/SubjectManager.jsx';

export default function ManagerContainer() {
    return (
        <div className='managercontainer-container learn-container'>
            <div className='tabs'>
                <div className='tab'>
                    <div>SUBJECT</div>
                    <i className='fa-solid fa-xmark'></i>
                </div>
            </div>
            <SubjectManager />
        </div>
    )
}

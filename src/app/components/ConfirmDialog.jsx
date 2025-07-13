import SimpleButton from '../components/SimpleButton.jsx';
import './ConfirmDialog.css';

export default function ConfirmDialog({ title, message, button, color, onConfirm, onCancel }) {
    return (
        <div className='confirm-modal'>
            <div className='modal-box'>
                <div className='title'>{title || 'Confirm'}</div>
                <div className='message'>{message || 'Are you sure?'}</div>
                <div className='btn-box'>
                    <SimpleButton
                        width={'fit-content'}
                        height={'40px'}
                        radius={'8px'}
                        padding={'0 8px'}
                        textcolor={color || '#28a745'}
                        bgcolor={'#eee'}
                        active={false}
                        onToggle={onConfirm}
                    >
                        <div className='text'>{button || 'CONFIRM'}</div>
                    </SimpleButton>
                    <SimpleButton
                        width={'80px'}
                        height={'40px'}
                        radius={'8px'}
                        textcolor={'#888'}
                        bgcolor={'#eee'}
                        active={false}
                        onToggle={onCancel}
                    >
                        <div className='text'>CANCEL</div>
                    </SimpleButton>
                </div>
            </div>
        </div>
    )
}

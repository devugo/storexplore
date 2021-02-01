import { message } from 'antd';

export const Message = (type, content, duration) => {
    switch (type) {
        case 'error':
            message.error(content, duration);
            break;
        case 'warning':
            message.warning(content, duration);
            break;
        case 'success':
            message.success(content, duration);
            break;
        default:
            message.success(content, duration);
            break;
    }
}
import { IButtonStyles } from '@fluentui/react';

const FloatingButton: IButtonStyles = {
    root: {
      boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#feffff',
      borderRadius: '50%',
     
    },
    icon: {
      color: '#1b7fd1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
    },
  }

  export { FloatingButton };
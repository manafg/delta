 const handleBaseStyles = {
    width: '10px',
    height: '10px',
    background: '#0078d4',
    border: '2px solid #fff',
};

 const handleLeftStyles = {
    ...handleBaseStyles,
    left: -8,
};

 const handleRightStyles = {
    ...handleBaseStyles,
    right: -8,
};

const cardStyles = (valid: boolean) => ({
    root: {
      border: '1px solid',
      borderColor: '#0078d4',
      width: '250px',
      cursor: 'pointer',
      position: 'relative' as const,
      '&::before': {
        content: '""',
        position: 'absolute' as const,
        left: 0,
        top: 0,
        bottom: 0,
        width: '4px',
        backgroundColor:'#0078d4' 
      }
    }
  });


export { handleBaseStyles, handleLeftStyles, handleRightStyles, cardStyles };
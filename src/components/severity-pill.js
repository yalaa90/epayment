import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const SeverityPillRoot = styled('span')(({ theme, ownerState }) => {
 

  return {
    alignItems: 'center',
    borderRadius: 12,
    cursor: 'default',
    display: 'inline-flex',
    flexGrow: 0,
    flexShrink: 0,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 2,
    fontWeight: 600,
    justifyContent: 'center',
    letterSpacing: 0.5,
    minWidth: 20,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  };
});

export const SeverityPill = (props) => {
  const {  children, ...other } = props;


  return (
    <SeverityPillRoot
      {...other}
    >
      {children}
    </SeverityPillRoot>
  );
};

SeverityPill.propTypes = {
  children: PropTypes.node
};

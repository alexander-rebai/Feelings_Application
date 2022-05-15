import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px',
  },
  title: {
    padding: '4px 4px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  container: {
    height: '100%',
    display: 'flex',
    spacing: '0',
    direction: 'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
});